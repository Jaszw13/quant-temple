// =============================================
// Quantum Temple - Web Audio Sound Engine
// =============================================

const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let ambientGain = null;
  let enabled = true;
  let initialized = false;
  let ambientOscs = [];
  let ambientInterval = null;

  function init() {
    if (initialized) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(ctx.destination);
      initialized = true;
    } catch (e) {
      console.warn('Web Audio not supported');
      enabled = false;
    }
  }

  function resume() {
    if (!initialized) init();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  function setEnabled(v) {
    enabled = v;
    if (masterGain) {
      masterGain.gain.setTargetAtTime(v ? 0.3 : 0, ctx.currentTime, 0.3);
    }
  }

  function isEnabled() { return enabled; }

  // ==== Play envelope note ====
  function playNote(freq, duration, type = 'sine', gain = 0.2, attack = 0.01, release = 0.5) {
    if (!enabled || !initialized) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration + release);
    osc.connect(g);
    g.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + duration + release + 0.05);
  }

  // ==== Play chord ====
  function playChord(freqs, duration, type = 'sine', gain = 0.15) {
    freqs.forEach(f => playNote(f, duration, type, gain));
  }

  // ==== SOUNDS ====

  // Page entrance - deep resonant hum + distant bell
  function entrance() {
    resume();
    if (!enabled) return;
    // Deep drone
    playNote(55, 3, 'sine', 0.15, 0.5, 2);
    playNote(110, 3, 'sine', 0.08, 0.5, 2);
    // Distant bell after delay
    setTimeout(() => {
      playNote(880, 0.8, 'sine', 0.12, 0.02, 1.5);
      playNote(1320, 0.6, 'sine', 0.08, 0.02, 1.2);
    }, 400);
  }

  // Hover step - crystal resonance, pitch increases with height
  function hoverStep(heightRatio = 0.5) {
    resume();
    if (!enabled) return;
    const baseFreq = 440 + heightRatio * 440;
    playNote(baseFreq, 0.15, 'sine', 0.06, 0.005, 0.1);
    playNote(baseFreq * 1.5, 0.12, 'triangle', 0.03, 0.005, 0.1);
  }

  // Achievement unlock - choir chord + metal strike + rise
  function achievement() {
    resume();
    if (!enabled) return;
    // C major chord rising
    const chord = [261.63, 329.63, 392.00, 523.25]; // C4 E4 G4 C5
    chord.forEach((f, i) => {
      setTimeout(() => {
        playNote(f, 1.2, 'sine', 0.1, 0.1, 0.8);
        playNote(f * 2, 0.8, 'triangle', 0.04, 0.1, 0.6);
      }, i * 120);
    });
    // Metal strike
    setTimeout(() => {
      playNote(1200, 0.3, 'square', 0.05, 0.001, 0.4);
      playNote(1800, 0.2, 'sine', 0.04, 0.001, 0.3);
    }, 200);
    // Particle rise whoosh
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.6);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }, 300);
  }

  // Daily ritual complete - three rising bell tones
  function dailyComplete(index = 0) {
    resume();
    if (!enabled) return;
    const freqs = [523.25, 659.25, 783.99]; // C5 E5 G5
    const f = freqs[index % 3];
    playNote(f, 0.3, 'sine', 0.12, 0.01, 0.5);
    playNote(f * 2, 0.2, 'triangle', 0.05, 0.01, 0.4);
  }

  // Hall / major milestone reached - fanfare + choir
  function hallComplete() {
    resume();
    if (!enabled) return;
    // Trumpet-like fanfare
    const fanfare = [
      [523.25, 0.15],  // C5
      [659.25, 0.15],  // E5
      [783.99, 0.15],  // G5
      [1046.50, 0.4],  // C6
    ];
    fanfare.forEach(([f, d], i) => {
      setTimeout(() => {
        playNote(f, d, 'sawtooth', 0.08, 0.02, 0.2);
        playNote(f * 2, d * 0.5, 'sine', 0.04, 0.02, 0.2);
      }, i * 150);
    });
    // Choir open chord
    setTimeout(() => {
      const choir = [261.63, 329.63, 392.00, 523.25, 659.25];
      choir.forEach(f => {
        playNote(f, 2, 'sine', 0.06, 0.3, 1.5);
      });
    }, 600);
  }

  // 7-day streak - harp arpeggio
  function streakMilestone() {
    resume();
    if (!enabled) return;
    const arp = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    arp.forEach((f, i) => {
      setTimeout(() => {
        playNote(f, 0.4, 'triangle', 0.07, 0.01, 0.5);
      }, i * 80);
    });
    // Descending echo
    setTimeout(() => {
      [...arp].reverse().forEach((f, i) => {
        setTimeout(() => {
          playNote(f * 0.5, 0.3, 'sine', 0.03, 0.01, 0.4);
        }, i * 60);
      });
    }, 600);
  }

  // Theme switch to heaven - ethereal voice + cloud flow
  function switchToHeaven() {
    resume();
    if (!enabled) return;
    // Ethereal high frequency chord fade in
    const chord = [1046.50, 1318.51, 1567.98, 2093.00];
    chord.forEach((f, i) => {
      setTimeout(() => {
        playNote(f, 2, 'sine', 0.05, 0.3, 1.5);
        playNote(f * 1.5, 1.5, 'triangle', 0.02, 0.3, 1.2);
      }, i * 100);
    });
    // Cloud flow whoosh
    setTimeout(() => {
      const noise = ctx.createBufferSource();
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
      }
      noise.buffer = buffer;
      const g = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      g.gain.value = 0.08;
      noise.connect(filter);
      filter.connect(g);
      g.connect(masterGain);
      noise.start();
    }, 200);
  }

  // Theme switch to dark - deep drone roll
  function switchToDark() {
    resume();
    if (!enabled) return;
    playNote(55, 2, 'sawtooth', 0.1, 0.2, 1.5);
    playNote(82.41, 1.8, 'sine', 0.08, 0.2, 1.2);
    playNote(110, 1.5, 'triangle', 0.05, 0.2, 1);
  }

  // ==== Ambient background ====
  function startAmbient(isDark) {
    if (!enabled || !initialized) return;
    stopAmbient();

    ambientGain = ctx.createGain();
    ambientGain.gain.value = 0;
    ambientGain.connect(masterGain);
    ambientGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);

    if (isDark) {
      // Dark: low electronic drone
      [55, 82.41, 110].forEach(f => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        g.gain.value = 0.3;
        osc.connect(g);
        g.connect(ambientGain);
        osc.start();
        ambientOscs.push(osc);
      });
      // Slow LFO modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.1;
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      ambientOscs.forEach(o => lfoGain.connect(o.frequency));
      lfo.start();
      ambientOscs.push(lfo);
    } else {
      // Heaven: wind chimes + distant choir
      [261.63, 329.63, 392.00, 523.25].forEach(f => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        g.gain.value = 0.15;
        osc.connect(g);
        g.connect(ambientGain);
        osc.start();
        ambientOscs.push(osc);
      });
    }

    // Occasional wind chime tones for heaven
    if (!isDark) {
      ambientInterval = setInterval(() => {
        if (Math.random() > 0.5) {
          const freqs = [1318.51, 1567.98, 2093.00, 1046.50];
          const f = freqs[Math.floor(Math.random() * freqs.length)];
          playNote(f, 1.5, 'sine', 0.02, 0.05, 1.2);
        }
      }, 4000);
    }
  }

  function stopAmbient() {
    ambientOscs.forEach(o => {
      try { o.stop(); } catch (e) {}
    });
    ambientOscs = [];
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  }

  function setAmbientTheme(isDark) {
    if (!enabled || !initialized) return;
    if (ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        stopAmbient();
        startAmbient(isDark);
      }, 1200);
    }
  }

  return {
    init,
    resume,
    setEnabled,
    isEnabled,
    entrance,
    hoverStep,
    achievement,
    dailyComplete,
    hallComplete,
    streakMilestone,
    switchToHeaven,
    switchToDark,
    startAmbient,
    stopAmbient,
    setAmbientTheme,
  };
})();

window.QuantumAudio = AudioEngine;
