// =============================================
// Quantum Temple - Main React App (Gemini Edition)
// =============================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;
const I = window.TempleIcons;

// ==== State Management with localStorage ====
const STORAGE_KEY = 'quantum-temple-progress-v1';
const UNLOCK_KEY = 'qt_unlocked';
const TRIAL_MAX_DAY = 28; // Day 1-28 = trial (启蒙之階)

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load progress');
  }
  return {
    completedDays: [],
    dailyRituals: {},
    currentDay: 1,
    fireStreak: 0,
    lastActiveDate: null,
    theme: 'dark',
    soundEnabled: true,
    panelCollapsed: false,
    revelationCollapsed: true,
    notes: {},
  };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save progress');
  }
}

// ==== Unlock / License Verification ====
const PUBLIC_KEY_JWK = {"kty":"EC","x":"CRhaxqwtKg4UYuhE10GRBzXJS-y3_UO6vBG6Dg4-MD0","y":"PXeumJbN73Rf5N0M85y8W8fwwE-hMyg3snlkEGO4wWY","crv":"P-256"};

function loadUnlocked() {
  try {
    return localStorage.getItem(UNLOCK_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function saveUnlocked(val) {
  try {
    localStorage.setItem(UNLOCK_KEY, val ? 'true' : 'false');
  } catch (e) {}
}

// base64url helpers
function b64urlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function b64urlEncode(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function verifyLicense(code) {
  // Expected format: QT.<ip_b64url>.<nonce_b64url>.<sig_b64url>
  const parts = code.trim().split('.');
  if (parts.length !== 4 || parts[0] !== 'QT') {
    return { ok: false, error: '格式錯誤：解鎖碼應為 QT.xxxx.xxxx.xxxx 四段格式' };
  }

  let currentIp = '';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    currentIp = data.ip;
  } catch (e) {
    return { ok: false, error: '無法獲取當前 IP，請檢查網路連線後重試' };
  }

  let ipBytes, nonceBytes, sigBytes;
  try {
    ipBytes = b64urlDecode(parts[1]);
    nonceBytes = b64urlDecode(parts[2]);
    sigBytes = b64urlDecode(parts[3]);
  } catch (e) {
    return { ok: false, error: '格式錯誤：解鎖碼編碼無效' };
  }

  const decoder = new TextDecoder();
  const codeIp = decoder.decode(ipBytes);
  if (codeIp !== currentIp) {
    return {
      ok: false,
      error: `此解鎖碼與當前網路 IP 不匹配。\n解鎖碼綁定 IP：${codeIp}\n當前 IP：${currentIp}\n請確認在付款時的網路環境下使用。`,
    };
  }

  if (sigBytes.length !== 64) {
    return { ok: false, error: '簽名無效：長度不正確' };
  }

  try {
    const key = await crypto.subtle.importKey(
      'jwk',
      PUBLIC_KEY_JWK,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    );
    const message = new TextEncoder().encode(codeIp + ':' + parts[2]);
    const valid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key,
      sigBytes,
      message
    );
    if (!valid) {
      return { ok: false, error: '簽名無效：解鎖碼不正確或已被篡改' };
    }
    return { ok: true, ip: currentIp };
  } catch (e) {
    return { ok: false, error: '驗證過程發生錯誤，請重試' };
  }
}

async function fetchCurrentIp() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}

// ==== Particle System (refined, gentle) ====
class ParticleSystem {
  constructor(canvas, isDark) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isDark = isDark;
    this.running = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.width = rect.width;
    this.height = rect.height;
  }

  setTheme(isDark) { this.isDark = isDark; }

  spawn(count = 1, options = {}) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: options.x ?? Math.random() * this.width,
        y: options.y ?? this.height + 10,
        vx: options.vx ?? (Math.random() - 0.5) * 0.2,
        vy: options.vy ?? -(Math.random() * 0.4 + 0.15),
        size: options.size ?? Math.random() * 2 + 1,
        life: 1,
        decay: options.decay ?? 0.002 + Math.random() * 0.003,
      });
    }
  }

  burst(x, y, count = 24) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = Math.random() * 1.5 + 0.5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: Math.random() * 3 + 1.5,
        life: 1,
        decay: 0.006 + Math.random() * 0.006,
      });
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.animate();
  }

  stop() { this.running = false; }

  animate() {
    if (!this.running) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Gentle ambient particles
    if (Math.random() < 0.15) {
      this.spawn(1);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.002;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -10) {
        this.particles.splice(i, 1);
        continue;
      }

      const color = this.isDark ? '124, 140, 255' : '184, 149, 106';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.life * 0.7})`;
      ctx.fill();

      // soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.life * 0.08})`;
      ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// =============================================
// Mist Layer (soft ambient blobs)
// =============================================
function MistLayer({ parallax, isDark }) {
  const blobs = useMemo(() => {
    const arr = [];
    const configs = [
      { size: 400, top: '10%', left: '-10%', depth: 0.3, opacity: 0.5 },
      { size: 500, top: '30%', right: '-15%', depth: 0.5, opacity: 0.4 },
      { size: 350, top: '55%', left: '5%', depth: 0.2, opacity: 0.35 },
      { size: 450, top: '70%', right: '5%', depth: 0.4, opacity: 0.3 },
      { size: 300, top: '20%', left: '30%', depth: 0.15, opacity: 0.25 },
      { size: 380, top: '80%', left: '40%', depth: 0.25, opacity: 0.3 },
    ];
    configs.forEach((c, i) => {
      arr.push({
        id: `mist-${i}`,
        ...c,
        animationDelay: `${i * 2}s`,
      });
    });
    return arr;
  }, []);

  return (
    <div className="mist-layer">
      {blobs.map(b => {
        const offsetX = parallax.x * b.depth * 40;
        const offsetY = parallax.y * b.depth * 30;
        return (
          <div
            key={b.id}
            className="mist-blob"
            style={{
              width: `${b.size}px`,
              height: `${b.size * 0.7}px`,
              top: b.top,
              left: b.left,
              right: b.right,
              opacity: b.opacity,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              animation: `mistDrift ${15 + b.depth * 20}s ease-in-out ${b.animationDelay} infinite alternate`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes mistDrift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// =============================================
// Temple Stairs (minimalist dot-line style)
// =============================================
// Step height (virtual) — 168 days × STEP_HEIGHT = total path length
const STEP_HEIGHT = 36;
// Window size: 5 steps above + current + 5 steps below = 11 visible
const WINDOW_HALF = 5;
const WINDOW_SIZE = WINDOW_HALF * 2 + 1;

function TempleStairs({
  steps, completedDays, currentDay, onStepClick, parallax, scrollProgress,
  unlocked, onUnlockClick,
}) {
  const { HALLS, getHallByDay } = window.QUANTUM_TEMPLE_DATA;
  const totalSteps = steps.length;

  // Focus index based on scrollProgress (0 = bottom/first, totalSteps-1 = top/last)
  const focusIdx = Math.round(scrollProgress * (totalSteps - 1));

  // Compute visible window
  const visibleSteps = useMemo(() => {
    const start = Math.max(0, focusIdx - WINDOW_HALF);
    const end = Math.min(totalSteps - 1, focusIdx + WINDOW_HALF);
    const result = [];
    for (let i = start; i <= end; i++) {
      const step = steps[i];
      const distance = i - focusIdx; // negative = below/past, positive = above/future (higher on screen)
      const absDist = Math.abs(distance);

      // Distance ratio: 0 = focus, 1 = window edge
      const distRatio = absDist / WINDOW_HALF;

      result.push({
        step,
        idx: i,
        distance,
        absDist,
        distRatio,
      });
    }
    return result;
  }, [focusIdx, steps]);

  // Compute visible hall markers (only those whose starting step is in window)
  const visibleHallMarkers = useMemo(() => {
    const start = Math.max(0, focusIdx - WINDOW_HALF);
    const end = Math.min(totalSteps - 1, focusIdx + WINDOW_HALF);
    const markers = [];
    for (let i = start; i <= end; i++) {
      const step = steps[i];
      const hall = getHallByDay(step.day);
      const isFirstOfHall = i === 0 || getHallByDay(steps[i - 1].day).id !== hall.id;
      if (isFirstOfHall) {
        const distance = i - focusIdx;
        const absDist = Math.abs(distance);
        const distRatio = absDist / WINDOW_HALF;
        markers.push({ hall, idx: i, distance, absDist, distRatio });
      }
    }
    return markers;
  }, [focusIdx, steps, getHallByDay]);

  // Focus bottom position (where current focused step sits)
  // Path-wrap has 1000px height, centered at 50%-30% = 20% from top of viewport.
  // So path bottom is ~20% of viewport + 500px = roughly at bottom of viewport.
  // Put focus in the lower 1/3 of visible path for good composition.
  const FOCUS_BOTTOM = 310; // px from bottom of path-wrap

  const getStepStyle = (info) => {
    const { idx, distance, distRatio } = info;
    // Vertical offset from focus: distance > 0 → higher day → higher on screen (larger bottom)
    const bottom = FOCUS_BOTTOM + distance * STEP_HEIGHT;

    // Depth effect: steps above focus (future, up the mountain) get smaller, more blurred
    // Steps below focus (past, already climbed) are closer/larger
    const aboveRatio = Math.max(0, distance) / WINDOW_HALF;  // 0..1 (future / up)
    const belowRatio = Math.max(0, -distance) / WINDOW_HALF; // 0..1 (past / down)

    // Scale: focus = 1, above shrink into distance, below slightly larger (closer)
    const scale = 1 - aboveRatio * 0.55 + belowRatio * 0.2;
    // Perspective Y: above steps move up into the distance (add extra upward shift)
    const translateY = -aboveRatio * 140 + belowRatio * 20;
    // Blur: edges get blurry, slightly more blur above (farther away)
    const blur = aboveRatio * 2.5 + belowRatio * 1.5;
    // Opacity: focus = 1, edges fade out; above fades a bit more
    const opacity = 1 - aboveRatio * 0.7 - belowRatio * 0.4;
    // z-index: below (past, closer) = higher; above (future, farther) = lower
    const zIndex = 100 + Math.round(-distance);

    return { bottom, scale, translateY, blur, opacity, zIndex, aboveRatio, belowRatio, distRatio };
  };

  const isStepCompleted = (day) => completedDays.includes(day);
  const isCurrentDay = (day) => day === currentDay;

  return (
    <div
      className="temple-inner"
      style={{
        transform: `rotateX(${parallax.y * 1.5}deg) rotateY(${parallax.x * 1.5}deg)`,
      }}
    >
      {/* Peak (shown near top only when close to end) */}
      {focusIdx > totalSteps - WINDOW_HALF - 5 && (
        <>
          <div className="temple-peak" />
          <I.Temple className="temple-peak-icon" size="lg" />
        </>
      )}

      <div className="path-wrap">
        {/* Central line */}
        <div className="path-line" />

        {/* Hall markers in window */}
        {visibleHallMarkers.map((marker) => {
          const s = getStepStyle(marker);
          return (
            <React.Fragment key={`hall-${marker.hall.id}`}>
              <div
                className="hall-marker hall-name"
                style={{
                  bottom: `${s.bottom + 30}px`,
                  transform: `translateX(-50%) scale(${s.scale})`,
                  opacity: (0.6 + (1 - s.distRatio) * 0.3) * s.opacity,
                  filter: `blur(${s.blur}px)`,
                  color: `var(--hall-${marker.hall.order})`,
                }}
              >
                {marker.hall.name}
              </div>
              <div
                className="hall-marker hall-cn"
                style={{
                  bottom: `${s.bottom + 8}px`,
                  transform: `translateX(-50%) scale(${s.scale})`,
                  opacity: (0.4 + (1 - s.distRatio) * 0.3) * s.opacity,
                  filter: `blur(${s.blur}px)`,
                }}
              >
                {marker.hall.cnName}
              </div>
            </React.Fragment>
          );
        })}

        {/* Step nodes in window */}
        {visibleSteps.map((info) => {
          const { step, idx, distRatio } = info;
          const s = getStepStyle(info);
          const hall = getHallByDay(step.day);
          const completed = isStepCompleted(step.day);
          const current = isCurrentDay(step.day);
          const isHallMilestone = step.type === 'hall-boss' || step.type === 'final-boss';
          const locked = !unlocked && step.day > TRIAL_MAX_DAY;

          // Fade in/out based on window edge proximity
          const fadeOpacity = s.opacity;
          const finalOpacity = locked
            ? Math.max(fadeOpacity * 0.5, 0.15)
            : (completed ? Math.max(fadeOpacity, 0.7) : (current ? 1 : Math.max(fadeOpacity, 0.35)));

          const handleClick = () => {
            if (locked) {
              onUnlockClick && onUnlockClick();
            } else {
              onStepClick(step);
            }
          };

          return (
            <div
              key={step.day}
              className={`step-node ${completed ? 'completed' : ''} ${current ? 'current' : ''} ${isHallMilestone ? 'hall-milestone' : ''} ${locked ? 'locked' : ''}`}
              style={{
                bottom: `${s.bottom}px`,
                transform: `translateX(-50%) translateY(${s.translateY}px) scale(${s.scale})`,
                opacity: finalOpacity,
                filter: `blur(${s.blur}px)`,
                zIndex: s.zIndex,
                transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
                '--accent': locked ? 'var(--text-muted)' : `var(--hall-${hall.order})`,
                '--accent-soft': locked ? 'rgba(128,128,128,0.1)' : `color-mix(in srgb, var(--hall-${hall.order}) 15%, transparent)`,
                '--glow-color': locked ? 'transparent' : `color-mix(in srgb, var(--hall-${hall.order}) 30%, transparent)`,
              }}
              onClick={handleClick}
              onMouseEnter={() => !locked && window.QuantumAudio && window.QuantumAudio.hoverStep(1 - s.distRatio)}
            >
              <div className="step-dot">
                {locked && <I.Lock size="sm" className="step-lock-icon" />}
              </div>
              <div className="step-label">
                <span className="step-day">{locked ? '鎖' : `D${step.day}`}</span>
                {locked ? '未解鎖' : step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================
// Top Navigation
// =============================================
function TopNav({
  completedCount, totalSteps, title, fireStreak,
  theme, soundEnabled, onThemeToggle, onSoundToggle,
  unlocked, onUnlockClick,
}) {
  const progress = Math.round((completedCount / totalSteps) * 100);
  const { getFireLevel } = window.QUANTUM_TEMPLE_DATA;
  const fire = getFireLevel(fireStreak);

  return (
    <div className="top-nav">
      <div className="nav-title">
        <I.Temple className="nav-title-icon" size="sm" />
        <span>量化聖殿</span>
      </div>

      <div className="nav-center">
        <div className="progress-label">
          <span>進度</span>
          <span>{progress}% · {completedCount}/{totalSteps}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="nav-right">
        {!unlocked && (
          <button className="nav-unlock-btn" onClick={onUnlockClick}>
            <I.Lock size="sm" />
            <span>解鎖登峰版</span>
          </button>
        )}
        <div className="nav-pill" title="當前稱號">
          <I.Award size="sm" />
          <strong>{title.cn}</strong>
        </div>
        <div className="nav-pill" title={`聖火 · ${fire.name}${fireStreak > 0 ? ` · 連續${fireStreak}天` : ''}`}>
          <I.Flame size="sm" />
          <strong>{fireStreak}</strong>
          <span>天</span>
        </div>
        <button
          className="icon-btn"
          onClick={onThemeToggle}
          title={theme === 'dark' ? '切換至白日光' : '切換至深暮色'}
        >
          {theme === 'dark' ? <I.Sun size="sm" /> : <I.Moon size="sm" />}
        </button>
        <button
          className="icon-btn"
          onClick={onSoundToggle}
          title={soundEnabled ? '關閉音效' : '開啟音效'}
        >
          {soundEnabled ? <I.Volume size="sm" /> : <I.Mute size="sm" />}
        </button>
      </div>
    </div>
  );
}

// =============================================
// Left Panel: Daily Rituals
// =============================================
function LeftPanel({
  collapsed, onToggle, currentDay, dailyTasks, currentStep, completedRituals,
  onRitualToggle, fireStreak, hall, unlocked, onUnlockClick,
}) {
  const { getFireLevel } = window.QUANTUM_TEMPLE_DATA;
  const fire = getFireLevel(fireStreak);

  const fireClass = fireStreak >= 30 ? 'peak' : (fireStreak >= 14 ? 'high' : '');

  const rituals = [
    { key: 'core', label: '核心任務', tag: '核心', text: dailyTasks.core },
    { key: 'resource', label: '配套資源', tag: '資源', text: dailyTasks.resource || '今日無配套資源', tagClass: 'resource', disabled: !dailyTasks.resource },
    { key: 'review', label: '複習任務', tag: '複習', text: dailyTasks.review || '尚無複習內容', tagClass: 'review', disabled: !dailyTasks.review },
  ];

  return (
    <>
      <div className={`left-panel ${collapsed ? 'collapsed' : ''}`}>
        <button className="panel-mobile-close" onClick={onToggle}>
          <I.X size="sm" />
        </button>
        <div className="panel-section">
          <div className="panel-section-header">
            <div className="panel-title">
              <I.Scroll size="sm" />
              <span>每日祭壇</span>
            </div>
          </div>
          <div className="hall-label">
            {hall.cnName} · {hall.month}
          </div>
           <div className="day-count">
             Day {currentDay} / {unlocked ? 168 : TRIAL_MAX_DAY}
             {!unlocked && <span className="day-count-trial"> · 試煉版</span>}
           </div>
        </div>

        <div className="panel-section">
          {rituals.map(r => (
            <div
              key={r.key}
              className={`ritual-card ${completedRituals[r.key] ? 'completed' : ''} ${r.disabled ? 'disabled' : ''}`}
              onClick={() => !r.disabled && onRitualToggle(r.key)}
            >
              <div className={`ritual-check ${completedRituals[r.key] ? 'checked' : ''}`}>
                <I.Check />
              </div>
              <div className="ritual-content">
                <span className={`ritual-tag ${r.tagClass || ''}`}>{r.tag}</span>
                <div className="ritual-text">{r.text}</div>
              </div>
            </div>
          ))}
        </div>

        {currentStep?.resources?.length > 0 && (
          <div className="panel-section">
            <div className="panel-section-header">
              <div className="panel-title panel-title-sm">
                <I.Book size="sm" />
                <span>學習資源</span>
              </div>
            </div>
            <div className="panel-resource-list">
              {currentStep.resources.map((r, i) => (
                <a
                  key={i}
                  className="panel-resource-link"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <I.ExternalLink size="sm" />
                  <span className="panel-resource-text">{r.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="sacred-fire">
          <div className={`fire-icon-wrap ${fireClass}`}>
            <div className="fire-glow" />
            <I.Flame size="lg" />
          </div>
          <div className="fire-streak">{fireStreak}</div>
          <div className="fire-label">聖火 · {fire.name}</div>
        </div>

        {!unlocked && (
          <div className="panel-unlock-card" onClick={onUnlockClick}>
            <div className="panel-unlock-icon">
              <I.Lock size="sm" />
            </div>
            <div className="panel-unlock-text">
              <div className="panel-unlock-title">試煉版 · 僅開放 Day 1–28</div>
              <div className="panel-unlock-desc">解鎖登峰版，開啟全部 168 天</div>
            </div>
            <I.ChevronRight size="sm" className="panel-unlock-arrow" />
          </div>
        )}
      </div>

      <div className="panel-toggle" onClick={onToggle}>
        {collapsed ? <I.ChevronRight size="sm" /> : <I.ChevronLeft size="sm" />}
      </div>
    </>
  );
}

// =============================================
// Revelation Panel (啟示錄 · 備忘錄)
// =============================================
const NOTE_TAGS = {
  problem: { label: '問題' },
  insight: { label: '心得' },
  idea: { label: '靈感' },
  note: { label: '備註' },
};

function RevelationPanel({
  collapsed, onToggle, currentDay, notes,
  onAddNote, onDeleteNote,
}) {
  const { STEPS } = window.QUANTUM_TEMPLE_DATA;
  const [view, setView] = useState('today'); // 'today' | 'all'
  const [text, setText] = useState('');
  const [tag, setTag] = useState('problem');
  const [showInput, setShowInput] = useState(false);

  const todayNotes = notes[String(currentDay)] || [];
  const allDays = Object.keys(notes).map(Number).sort((a, b) => a - b);

  const stepTitle = (day) => {
    const s = STEPS.find(x => x.day === day);
    return s ? s.title : '';
  };

  const tagLabel = (t) => (NOTE_TAGS[t] ? NOTE_TAGS[t].label : '備註');

  const handleAdd = () => {
    const t = text.trim();
    if (!t) return;
    onAddNote(currentDay, t, tag);
    setText('');
  };

  return (
    <>
      <div className={`right-panel ${collapsed ? 'collapsed' : ''}`}>
        <button className="panel-mobile-close" onClick={onToggle}>
          <I.X size="sm" />
        </button>

        <div className="panel-section-header revelation-head">
          <div className="panel-title">
            <I.Revelation size="sm" />
            <span>啟示錄</span>
          </div>
          <div className="revelation-view-switch">
            <button
              className={`revelation-view-btn ${view === 'today' ? 'active' : ''}`}
              onClick={() => setView('today')}
            >今日</button>
            <button
              className={`revelation-view-btn ${view === 'all' ? 'active' : ''}`}
              onClick={() => setView('all')}
            >全部</button>
          </div>
        </div>
        <div className="hall-label revelation-sub">
          Day {currentDay} · 記下修行路上的困頓與頓悟
        </div>

        {view === 'today' ? (
          <>
            <div className="revelation-list">
              {todayNotes.length === 0 && (
                <div className="revelation-empty">今日尚無啟示。<br/>遇到問題、心有所得時，記一筆。</div>
              )}
              {todayNotes.map(n => (
                <div className="revelation-card" key={n.id}>
                  <div className="revelation-card-top">
                    <span className={`revelation-tag tag-${n.tag}`}>{tagLabel(n.tag)}</span>
                    <span className="revelation-time">{n.time}</span>
                    <button
                      className="revelation-del"
                      onClick={() => onDeleteNote(currentDay, n.id)}
                      title="刪除"
                    >
                      <I.X size="sm" />
                    </button>
                  </div>
                  <div className="revelation-text">{n.text}</div>
                </div>
              ))}
            </div>

            {showInput ? (
              <div className="revelation-input-box">
                <div className="revelation-tags">
                  {Object.keys(NOTE_TAGS).map(k => (
                    <button
                      key={k}
                      className={`revelation-tag-btn ${tag === k ? 'active' : ''}`}
                      onClick={() => setTag(k)}
                    >{NOTE_TAGS[k].label}</button>
                  ))}
                </div>
                <textarea
                  className="revelation-textarea"
                  placeholder="記錄此刻的困惑、頓悟或靈感…"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={4}
                />
                <div className="revelation-input-actions">
                  <button className="btn btn-ghost" onClick={() => { setShowInput(false); setText(''); }}>取消</button>
                  <button className="btn btn-primary" onClick={handleAdd} disabled={!text.trim()}>記下</button>
                </div>
              </div>
            ) : (
              <button className="revelation-add-btn" onClick={() => setShowInput(true)}>
                <I.Sparkles size="sm" />
                <span>記下一則啟示</span>
              </button>
            )}
          </>
        ) : (
          <div className="revelation-all-list">
            {allDays.length === 0 && (
              <div className="revelation-empty">尚無任何啟示。<br/>在「今日」分頁記下第一筆。</div>
            )}
            {allDays.map(day => (
              <div className="revelation-day-block" key={day}>
                <div className="revelation-day-header">
                  <span>Day {day}</span>
                  <span className="revelation-day-title">{stepTitle(day)}</span>
                </div>
                {(notes[String(day)] || []).map(n => (
                  <div className="revelation-card" key={n.id}>
                    <div className="revelation-card-top">
                      <span className={`revelation-tag tag-${n.tag}`}>{tagLabel(n.tag)}</span>
                      <span className="revelation-time">{n.time}</span>
                      <button
                        className="revelation-del"
                        onClick={() => onDeleteNote(day, n.id)}
                        title="刪除"
                      >
                        <I.X size="sm" />
                      </button>
                    </div>
                    <div className="revelation-text">{n.text}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="right-panel-toggle" onClick={onToggle}>
        {collapsed ? <I.ChevronLeft size="sm" /> : <I.ChevronRight size="sm" />}
      </div>
    </>
  );
}

// =============================================
// Step Detail Modal
// =============================================
function StepModal({ step, isCompleted, onClose, onComplete, hall }) {
  if (!step) return null;

  const daily = window.QUANTUM_TEMPLE_DATA.DAILY_TASKS[step.day];
  const tools = step.tools || step.tool || daily?.tools || '自學';
  const acceptance = step.acceptance || step.verify || daily?.acceptance || '當日任務完成';
  // Prefer step.resources [{name, url}]; fall back to daily.resources (names) + getResUrl
  const resourceList = step.resources && step.resources.length
    ? step.resources
    : (daily?.resources || [step.tool, step.verify]).filter(Boolean).map(name => ({
        name,
        url: window.QUANTUM_TEMPLE_DATA.getResUrl(name),
      }));

  return (
    <div className={`modal-overlay ${step ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-hall-tag">
          {hall.name} · {hall.month}
        </div>
        <div className="modal-title">{step.title}</div>
        <div className="modal-day">DAY {step.day} / 168</div>

        <div className="modal-section">
          <div className="modal-section-label">任務描述</div>
          <div className="modal-section-content">{step.desc}</div>
        </div>

        <div className="modal-section">
          <div className="modal-section-label">工具與平台</div>
          <div className="modal-section-content" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            {step.tool ? step.tool : tools}
          </div>
        </div>

        <div className="modal-section">
          <div className="modal-section-label">驗收標準</div>
          <div className="modal-section-content">{step.verify ? step.verify : acceptance}</div>
        </div>

        <div className="modal-section">
          <div className="modal-section-label">學習資源</div>
          <div className="modal-resource-list">
            {resourceList.map((r, i) => (
              <a
                key={i}
                className="resource-link"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="resource-link-text">{r.name}</span>
                <I.ExternalLink size="sm" className="resource-link-icon" />
              </a>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>返回</button>
          {!isCompleted ? (
            <button className="btn btn-primary" onClick={onComplete}>
              我已完成
            </button>
          ) : (
            <button className="btn" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={onClose}>
              已啟蒙
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================
// Unlock Modal (登峰版解鎖)
// =============================================
function UnlockModal({ open, onClose, onSuccess }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [errorMsg, setErrorMsg] = useState('');
  const [ip, setIp] = useState('');
  const [copied, setCopied] = useState(false);
  const ipFetchedRef = useRef(false);

  useEffect(() => {
    if (open && !ipFetchedRef.current) {
      ipFetchedRef.current = true;
      fetchCurrentIp().then(setIp).catch(() => {});
    }
    if (!open) {
      ipFetchedRef.current = false;
      setCode('');
      setStatus('idle');
      setErrorMsg('');
      setCopied(false);
    }
  }, [open]);

  const handleCopyIp = useCallback(async () => {
    try {
      let current = ip;
      if (!current) {
        current = await fetchCurrentIp();
        setIp(current);
      }
      await navigator.clipboard.writeText(current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setErrorMsg('複製失敗，請手動複製：' + ip);
      setStatus('error');
    }
  }, [ip]);

  const handleVerify = useCallback(async () => {
    if (!code.trim()) {
      setErrorMsg('請輸入解鎖碼');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    const result = await verifyLicense(code.trim());
    if (result.ok) {
      setStatus('success');
      saveUnlocked(true);
      if (window.QuantumAudio) {
        window.QuantumAudio.achievement();
        window.QuantumAudio.hallComplete();
      }
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 1500);
    } else {
      setErrorMsg(result.error);
      setStatus('error');
    }
  }, [code, onSuccess]);

  if (!open) return null;

  return (
    <div className={`modal-overlay unlock-modal ${open ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-panel unlock-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <I.X size="sm" />
        </button>

        <div className="unlock-header">
          <div className="unlock-icon">
            <I.Lock size="lg" />
          </div>
          <div className="unlock-title">解鎖登峰版</div>
          <div className="unlock-subtitle">
            試煉版僅開放 Day 1 – 28（啟蒙之階）<br/>
            解鎖後永久享有全部 168 天修煉之路
          </div>
        </div>

        {status === 'success' ? (
          <div className="unlock-success">
            <div className="unlock-success-icon">
              <I.Unlock size="lg" />
            </div>
            <div className="unlock-success-title">解鎖成功</div>
            <div className="unlock-success-text">登峰之路已為你鋪開，願你早日抵達山頂。</div>
          </div>
        ) : (
          <>
            <div className="unlock-ip-section">
              <div className="unlock-ip-label">你的公網 IP（解鎖碼與此綁定）</div>
              <div className="unlock-ip-row">
                <div className="unlock-ip-value">{ip || '獲取中…'}</div>
                <button
                  className="btn btn-ghost unlock-copy-btn"
                  onClick={handleCopyIp}
                  disabled={!ip}
                >
                  <I.Copy size="sm" />
                  <span>{copied ? '已複製' : '複製 IP'}</span>
                </button>
              </div>
              <div className="unlock-ip-hint">
                請將此 IP 發送給站長以生成專屬解鎖碼
              </div>
            </div>

            <div className="unlock-input-section">
              <div className="unlock-input-label">輸入解鎖碼</div>
              <input
                type="text"
                className="unlock-input"
                placeholder="QT.xxxxxxxx.xxxxxxxx.xxxxxxxx"
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleVerify(); }}
                spellCheck={false}
                autoComplete="off"
              />
              {status === 'error' && (
                <div className="unlock-error">{errorMsg}</div>
              )}
            </div>

            <div className="modal-actions unlock-actions">
              <button className="btn" onClick={onClose}>取消</button>
              <button
                className="btn btn-primary"
                onClick={handleVerify}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '驗證中…' : '解鎖登峰版'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================
// Milestone Celebration
// =============================================
function MilestoneCelebration({ show, title, subtitle, onDone }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 2800);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  return (
    <div className={`milestone-overlay ${show ? 'active' : ''}`}>
      {show && <div className="milestone-ring" />}
      <div className="milestone-title">{title}</div>
      <div className="milestone-subtitle">{subtitle}</div>
    </div>
  );
}

// =============================================
// Bottom Bar
// =============================================
function BottomBar({ completedCount, totalSteps, title, fireStreak, currentDay }) {
  const { getFireLevel } = window.QUANTUM_TEMPLE_DATA;
  const fire = getFireLevel(fireStreak);
  const progress = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="bottom-bar">
      <div className="bottom-item">
        <I.Award size="sm" />
        <span>稱號</span>
        <strong>{title.cn}</strong>
      </div>
      <div className="bottom-item">
        <I.Flame size="sm" />
        <span>聖火</span>
        <strong>{fireStreak} 天</strong>
      </div>
      <div className="bottom-item">
        <I.Target size="sm" />
        <span>總進度</span>
        <strong>{progress}%</strong>
      </div>
      <div className="bottom-item">
        <I.Calendar size="sm" />
        <span>已完成</span>
        <strong>{completedCount} / {totalSteps}</strong>
      </div>
    </div>
  );
}

// =============================================
// Scroll Indicator
// =============================================
function ScrollIndicator({ steps, currentDay, completedDays, scrollProgress, onJumpTo, unlocked, maxDay }) {
  const trackRef = useRef(null);
  const [hoverDay, setHoverDay] = useState(null);
  const [hoverTop, setHoverTop] = useState(0);

  const totalSteps = steps.length;
  const totalDays = steps[totalSteps - 1].day;
  const currentIdx = Math.round(scrollProgress * (totalSteps - 1));
  const displayMaxDay = unlocked ? totalDays : maxDay;
  const displayMaxIdx = steps.findIndex(s => s.day === displayMaxDay);
  const displaySteps = displayMaxIdx >= 0 ? displayMaxIdx + 1 : totalSteps;

  // Generate tick positions: every 7 days + hall milestones + day 1 + last day
  const ticks = useMemo(() => {
    const set = new Set();
    set.add(1); // start
    set.add(totalDays); // end

    // Every 7 days
    for (let d = 7; d < totalDays; d += 7) {
      set.add(d);
    }

    // Hall milestones
    const { getHallByDay } = window.QUANTUM_TEMPLE_DATA;
    steps.forEach((s) => {
      if (s.type === 'hall-boss' || s.type === 'final-boss') {
        if (s.day <= displayMaxDay) set.add(s.day);
      }
    });

    // Convert to step-index based positions
    const dayToIdx = {};
    steps.forEach((s, i) => { dayToIdx[s.day] = i; });

    return Array.from(set)
      .filter((d) => dayToIdx[d] !== undefined)
      .map((d) => {
        const idx = dayToIdx[d];
        const step = steps[idx];
        const isMilestone = step.type === 'hall-boss' || step.type === 'final-boss';
        const ratio = idx / (totalSteps - 1); // 0 = bottom (day 1), 1 = top (day 168)
        return { day: d, idx, ratio, isMilestone, title: step.title };
      })
      .sort((a, b) => a.idx - b.idx);
  }, [steps, totalDays, totalSteps]);

  const handleTrackClick = useCallback((e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    // y=0 is top of track → ratio=1 (day 168); y=height is bottom → ratio=0 (day 1)
    const clickRatio = 1 - (e.clientY - rect.top) / rect.height;
    const clamped = Math.max(0, Math.min(1, clickRatio));
    const rawIdx = Math.round(clamped * (totalSteps - 1));
    // Limit to unlocked range
    const idx = unlocked ? rawIdx : Math.min(rawIdx, displayMaxIdx);
    onJumpTo(idx);
  }, [totalSteps, onJumpTo, unlocked, displayMaxIdx]);

  const handleTrackMove = useCallback((e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = 1 - (e.clientY - rect.top) / rect.height;
    const clamped = Math.max(0, Math.min(1, ratio));
    const dayIdx = Math.round(clamped * (totalSteps - 1));
    const day = steps[dayIdx]?.day || 1;
    const cappedDay = unlocked ? day : Math.min(day, displayMaxDay);
    setHoverDay(cappedDay);
    setHoverTop(e.clientY - rect.top);
  }, [totalSteps, steps]);

  const handleTrackLeave = useCallback(() => {
    setHoverDay(null);
  }, []);

  return (
    <div className="scroll-indicator">
      <div
        className="scroll-track"
        ref={trackRef}
        onClick={handleTrackClick}
        onMouseMove={handleTrackMove}
        onMouseLeave={handleTrackLeave}
      >
        {/* Vertical axis line */}
        <div className="scroll-axis" />

        {/* Ticks */}
        {ticks.map((t) => {
          const isCompleted = completedDays.includes(t.day);
          const isCurrent = t.idx === currentIdx || t.day === currentDay;
          // Position from bottom: ratio 0 = bottom (day 1), ratio 1 = top (day 168)
          const bottomPct = t.ratio * 100;
          return (
            <div
              key={t.day}
              className={`scroll-tick
                ${t.isMilestone ? 'milestone' : ''}
                ${isCurrent ? 'active' : ''}
                ${isCompleted ? 'completed' : ''}`}
              style={{ bottom: `calc(${bottomPct}% - 3px)` }}
              onClick={(e) => { e.stopPropagation(); onJumpTo(t.idx); }}
              title={`Day ${t.day}: ${t.title}`}
            />
          );
        })}

        {/* Current position indicator (glowing dot) */}
        <div
          className="scroll-current"
          style={{ bottom: `calc(${scrollProgress * 100}% - 5px)` }}
        />

        {/* Hover tooltip */}
        {hoverDay !== null && (
          <div
            className="scroll-tooltip"
            style={{ top: `${hoverTop}px`, transform: 'translateY(-50%)' }}
          >
            Day {hoverDay} / {totalDays}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// Theme Transition Overlay
// =============================================
function ThemeTransition({ active, direction }) {
  return (
    <div
      className={`theme-transition-overlay ${active ? 'active' : ''} ${direction}`}
    />
  );
}

// =============================================
// Main App
// =============================================
function App() {
  const { STEPS, TITLES, getTitle, getFireLevel, getHallByDay, getDailyTasks, TOTAL_STEPS } = window.QUANTUM_TEMPLE_DATA;

  const [state, setState] = useState(loadState);
  const [selectedStep, setSelectedStep] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionDir, setTransitionDir] = useState('dark-to-heaven');
  const [milestone, setMilestone] = useState(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [entered, setEntered] = useState(false);
  const [unlocked, setUnlocked] = useState(loadUnlocked);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const particleCanvasRef = useRef(null);
  const particleSystemRef = useRef(null);
  const sceneRef = useRef(null);

  // Compute max accessible day based on unlock status
  const maxDay = unlocked ? STEPS[STEPS.length - 1].day : TRIAL_MAX_DAY;
  // Find step index of max day
  const maxStepIdx = useMemo(() => {
    const idx = STEPS.findIndex(s => s.day === maxDay);
    return idx >= 0 ? idx : STEPS.length - 1;
  }, [maxDay, STEPS]);
  const maxScrollRatio = maxStepIdx / (STEPS.length - 1);

  const isDark = state.theme === 'dark';
  const currentHall = getHallByDay(state.currentDay);
  const currentStep = STEPS.find(s => s.day === state.currentDay) || STEPS[0];
  const title = getTitle(state.completedDays.length);
  const dailyTasks = getDailyTasks(state.currentDay, state.completedDays);
  const dailyRitualsKey = `day-${state.currentDay}`;
  const completedRituals = state.dailyRituals[dailyRitualsKey] || { core: false, resource: false, review: false };

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Persist state
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply theme
  useEffect(() => {
    document.body.className = isDark ? 'theme-dark' : 'theme-heaven';
  }, [isDark]);

  // Audio init
  useEffect(() => {
    const firstInteraction = () => {
      window.QuantumAudio.init();
      window.QuantumAudio.setEnabled(state.soundEnabled);
      if (state.soundEnabled) {
        window.QuantumAudio.entrance();
        window.QuantumAudio.startAmbient(isDark);
      }
      document.removeEventListener('click', firstInteraction);
      document.removeEventListener('keydown', firstInteraction);
    };
    document.addEventListener('click', firstInteraction);
    document.addEventListener('keydown', firstInteraction);
    return () => {
      document.removeEventListener('click', firstInteraction);
      document.removeEventListener('keydown', firstInteraction);
    };
  }, []);

  // Particle system
  useEffect(() => {
    if (particleCanvasRef.current) {
      const ps = new ParticleSystem(particleCanvasRef.current, isDark);
      particleSystemRef.current = ps;
      ps.start();
    }
    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.setTheme(isDark);
    }
  }, [isDark]);

  // Mouse parallax (subtle)
  useEffect(() => {
    let raf = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setParallax({ x: currentX, y: currentY });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll / wheel navigation
  useEffect(() => {
    let scrollVal = 0;
    let targetScroll = 0;
    let animFrame = null;
    let maxScroll = maxScrollRatio;

    const animate = () => {
      scrollVal += (targetScroll - scrollVal) * 0.08;
      setScrollProgress(scrollVal);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    const handleWheel = (e) => {
      if (e.target.closest('.left-panel') || e.target.closest('.modal-overlay') ||
          e.target.closest('.top-nav') || e.target.closest('.bottom-bar') ||
          e.target.closest('.scroll-indicator') || e.target.closest('.data-controls')) {
        return;
      }
      e.preventDefault();
      // Wheel up (deltaY < 0) → scrollProgress increases → climb up → higher day number
      // Wheel down (deltaY > 0) → scrollProgress decreases → go down → lower day number
      targetScroll -= e.deltaY * 0.0008;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));

      const stepIdx = Math.round(targetScroll * (STEPS.length - 1));
      const newDay = STEPS[stepIdx].day;
      setState(prev => prev.currentDay === newDay ? prev : { ...prev, currentDay: newDay });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animFrame);
    };
  }, [maxScrollRatio, STEPS]);

  const jumpToStep = useCallback((idx) => {
    const clampedIdx = unlocked ? idx : Math.min(idx, maxStepIdx);
    const target = clampedIdx / (STEPS.length - 1);
    setScrollProgress(target);
    const newDay = STEPS[clampedIdx].day;
    setState(prev => ({ ...prev, currentDay: newDay }));
  }, [unlocked, maxStepIdx, STEPS]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'heaven' : 'dark';
    const dir = isDark ? 'dark-to-heaven' : 'heaven-to-dark';
    setTransitionDir(dir);
    setTransitionActive(true);

    if (window.QuantumAudio) {
      if (isDark) {
        window.QuantumAudio.switchToHeaven();
      } else {
        window.QuantumAudio.switchToDark();
      }
      window.QuantumAudio.setAmbientTheme(!isDark);
    }

    setTimeout(() => {
      setState(prev => ({ ...prev, theme: newTheme }));
    }, 450);

    setTimeout(() => {
      setTransitionActive(false);
    }, 1300);
  }, [isDark]);

  // Sound toggle
  const toggleSound = useCallback(() => {
    setState(prev => {
      const newEnabled = !prev.soundEnabled;
      window.QuantumAudio.setEnabled(newEnabled);
      if (newEnabled) {
        window.QuantumAudio.startAmbient(isDark);
      } else {
        window.QuantumAudio.stopAmbient();
      }
      return { ...prev, soundEnabled: newEnabled };
    });
  }, [isDark]);

  const togglePanel = useCallback(() => {
    setState(prev => ({ ...prev, panelCollapsed: !prev.panelCollapsed }));
  }, []);

  const handleStepClick = useCallback((step) => {
    setSelectedStep(step);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedStep(null);
  }, []);

  const openUnlock = useCallback(() => {
    setUnlockModalOpen(true);
  }, []);

  const closeUnlock = useCallback(() => {
    setUnlockModalOpen(false);
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    setUnlocked(true);
    saveUnlocked(true);
    setUnlockModalOpen(false);
    // Adjust current day & scroll if currently beyond trial limit (shouldn't happen, but safe)
  }, []);

  // Complete step
  const completeStep = useCallback((step) => {
    setState(prev => {
      if (prev.completedDays.includes(step.day)) return prev;
      const newCompleted = [...prev.completedDays, step.day].sort((a, b) => a - b);

      const oldTitle = getTitle(prev.completedDays.length);
      const newTitle = getTitle(newCompleted.length);
      const titleChanged = oldTitle.cn !== newTitle.cn;

      const hall = getHallByDay(step.day);
      const hallSteps = STEPS.filter(s => getHallByDay(s.day).id === hall.id);
      const hallCompleted = hallSteps.every(s => newCompleted.includes(s.day));

      const nextIncomplete = STEPS.find(s => !newCompleted.includes(s.day));
      const newCurrentDay = nextIncomplete ? nextIncomplete.day : prev.currentDay;

      if (window.QuantumAudio) {
        window.QuantumAudio.achievement();
        if (hallCompleted) {
          setTimeout(() => window.QuantumAudio.hallComplete(), 800);
        }
        if (titleChanged) {
          setTimeout(() => window.QuantumAudio.hallComplete(), 400);
        }
      }

      if (particleSystemRef.current) {
        particleSystemRef.current.burst(window.innerWidth / 2, window.innerHeight / 2, 36);
      }

      if (titleChanged || hallCompleted) {
        setTimeout(() => {
          setMilestone({
            title: titleChanged ? newTitle.name : hall.name,
            subtitle: titleChanged ? newTitle.cn : `${hall.cnName} · 圓滿`,
          });
          setShowMilestone(true);
        }, 300);
      }

      return {
        ...prev,
        completedDays: newCompleted,
        currentDay: newCurrentDay,
      };
    });
    setSelectedStep(null);
  }, []);

  // Daily ritual toggle
  const toggleRitual = useCallback((key) => {
    setState(prev => {
      const ritualKey = `day-${prev.currentDay}`;
      const rituals = { ...(prev.dailyRituals[ritualKey] || { core: false, resource: false, review: false }) };
      const wasAllDone = rituals.core && rituals.resource && (rituals.review || !dailyTasks.review);
      rituals[key] = !rituals[key];
      const isAllDone = rituals.core && rituals.resource && (rituals.review || !dailyTasks.review);

      if (window.QuantumAudio) {
        const idx = ['core', 'resource', 'review'].indexOf(key);
        if (rituals[key]) {
          window.QuantumAudio.dailyComplete(idx);
        }
      }

      if (rituals[key] && particleSystemRef.current) {
        particleSystemRef.current.burst(window.innerWidth * 0.22, window.innerHeight * 0.45, 12);
      }

      let newStreak = prev.fireStreak;
      const today = new Date().toDateString();
      if (isAllDone && !wasAllDone && prev.lastActiveDate !== today) {
        newStreak = prev.fireStreak + 1;
        if (newStreak % 7 === 0 && window.QuantumAudio) {
          setTimeout(() => window.QuantumAudio.streakMilestone(), 500);
        }
      }

      return {
        ...prev,
        dailyRituals: {
          ...prev.dailyRituals,
          [ritualKey]: rituals,
        },
        fireStreak: newStreak,
        lastActiveDate: isAllDone ? today : prev.lastActiveDate,
      };
    });
  }, [dailyTasks]);

  const handleMilestoneDone = useCallback(() => {
    setShowMilestone(false);
  }, []);

  const exportProgress = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-temple-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importProgress = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          setState(prev => ({ ...prev, ...data }));
        } catch (err) {
          alert('導入失敗：文件格式錯誤');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  // ==== 啟示錄（備忘錄）操作 ====
  const addNote = useCallback((day, text, tag) => {
    const key = String(day);
    const now = new Date();
    const timeStr =
      `${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ` +
      `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const note = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: text.trim(),
      tag: tag || 'note',
      time: timeStr,
    };
    setState(prev => {
      const list = prev.notes[key] || [];
      return { ...prev, notes: { ...prev.notes, [key]: [...list, note] } };
    });
  }, []);

  const deleteNote = useCallback((day, id) => {
    const key = String(day);
    setState(prev => {
      const list = (prev.notes[key] || []).filter(n => n.id !== id);
      const notes = { ...prev.notes };
      if (list.length) notes[key] = list;
      else delete notes[key];
      return { ...prev, notes };
    });
  }, []);

  const toggleRevelation = useCallback(() => {
    setState(prev => ({ ...prev, revelationCollapsed: !prev.revelationCollapsed }));
  }, []);

  // ==== 導出報告（Markdown，人性化） ====
  const exportReport = useCallback(() => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const lines = [];
    lines.push('# 量化聖殿 · 啟示錄報告');
    lines.push(`> 生成時間：${dateStr} ｜ 總進度：${state.completedDays.length}/${TOTAL_STEPS} ｜ 聖火：${state.fireStreak} 天`);
    lines.push('');

    // 收集：已完成 或 有筆記 的天
    const daySet = new Set();
    Object.keys(state.notes).forEach(d => daySet.add(parseInt(d, 10)));
    state.completedDays.forEach(d => daySet.add(d));
    const days = Array.from(daySet).sort((a, b) => a - b);

    const tagLabel = { problem: '問題', insight: '心得', idea: '靈感', note: '備註' };

    for (const day of days) {
      const step = STEPS.find(s => s.day === day);
      if (!step) continue;
      const hall = getHallByDay(day);
      const done = state.completedDays.includes(day);
      const notes = state.notes[String(day)] || [];
      lines.push(`## Day ${day} · ${step.title}`);
      lines.push(`- 殿區：${hall.cnName}`);
      lines.push(`- 狀態：${done ? '已完成' : '未完成'}`);
      if (notes.length) {
        lines.push('- 啟示錄：');
        notes.forEach(n => {
          lines.push(`  - [${tagLabel[n.tag] || '備註'}] ${n.text}（${n.time}）`);
        });
      }
      lines.push('');
    }

    const md = lines.join('\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quant-temple-report-${dateStr}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state, STEPS, getHallByDay, TOTAL_STEPS]);

  const selectedHall = selectedStep ? getHallByDay(selectedStep.day) : currentHall;

  return (
    <div className={`app ${entered ? 'entered' : 'entering'}`}>
      {/* ===== BACKGROUND LAYER (blur lives here only) ===== */}
      <div className="background-layer" ref={sceneRef}>
        <div className="temple-scene">
          <TempleStairs
            steps={STEPS}
            completedDays={state.completedDays}
            currentDay={state.currentDay}
            onStepClick={handleStepClick}
            parallax={parallax}
            scrollProgress={scrollProgress}
            unlocked={unlocked}
            onUnlockClick={openUnlock}
          />

          <MistLayer parallax={parallax} isDark={isDark} />

          <canvas className="particles-canvas" ref={particleCanvasRef} />
        </div>
      </div>

      {/* ===== UI LAYER (always crisp, no filter ancestors) ===== */}
      <div className="ui-layer">
        <TopNav
          completedCount={state.completedDays.length}
          totalSteps={TOTAL_STEPS}
          title={title}
          fireStreak={state.fireStreak}
          theme={state.theme}
          soundEnabled={state.soundEnabled}
          onThemeToggle={toggleTheme}
          onSoundToggle={toggleSound}
          unlocked={unlocked}
          onUnlockClick={openUnlock}
        />

        <LeftPanel
          collapsed={state.panelCollapsed}
          onToggle={togglePanel}
          currentDay={state.currentDay}
          dailyTasks={dailyTasks}
          currentStep={currentStep}
          completedRituals={completedRituals}
          onRitualToggle={toggleRitual}
          fireStreak={state.fireStreak}
          hall={currentHall}
          unlocked={unlocked}
          onUnlockClick={openUnlock}
        />

        <RevelationPanel
          collapsed={state.revelationCollapsed}
          onToggle={toggleRevelation}
          currentDay={state.currentDay}
          notes={state.notes}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
        />

        <ScrollIndicator
          steps={STEPS}
          currentDay={state.currentDay}
          completedDays={state.completedDays}
          scrollProgress={scrollProgress}
          onJumpTo={jumpToStep}
          unlocked={unlocked}
          maxDay={maxDay}
        />

        <BottomBar
          completedCount={state.completedDays.length}
          totalSteps={TOTAL_STEPS}
          title={title}
          fireStreak={state.fireStreak}
          currentDay={state.currentDay}
        />

        <StepModal
          step={selectedStep}
          isCompleted={selectedStep ? state.completedDays.includes(selectedStep.day) : false}
          onClose={closeModal}
          onComplete={() => selectedStep && completeStep(selectedStep)}
          hall={selectedHall}
        />

        <UnlockModal
          open={unlockModalOpen}
          onClose={closeUnlock}
          onSuccess={handleUnlockSuccess}
        />

        <ThemeTransition active={transitionActive} direction={transitionDir} />

        {milestone && (
          <MilestoneCelebration
            show={showMilestone}
            title={milestone.title}
            subtitle={milestone.subtitle}
            onDone={handleMilestoneDone}
          />
        )}

        {state.revelationCollapsed && (
          <div className="data-controls">
            <button className="text-btn" onClick={exportReport}>導出報告</button>
            <button className="text-btn" onClick={exportProgress}>導出進度</button>
            <button className="text-btn" onClick={importProgress}>導入進度</button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
