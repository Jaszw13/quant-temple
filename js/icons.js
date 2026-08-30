// =============================================
// Quantum Temple - SVG Icon Library
// All icons: stroke style, round caps/joins, 1.5px stroke-width
// Built with React.createElement (no JSX needed)
// =============================================

(function() {
  const h = React.createElement;

  function createIcon(paths, props) {
    const sizeClass = props.size ? `icon-${props.size}` : '';
    const className = `icon ${sizeClass} ${props.className || ''}`.trim();
    const rest = {};
    for (const k in props) {
      if (k !== 'size' && k !== 'className') rest[k] = props[k];
    }
    return h('svg', {
      className,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg',
      ...rest,
    }, paths);
  }

  // Helper to build paths array from definitions
  // Each def: { type: 'path'|'circle'|'line'|'polyline'|'polygon'|'rect', ...attrs }
  function buildPaths(defs) {
    return defs.map((d, i) => {
      const type = d.type;
      const attrs = {};
      for (const k in d) {
        if (k !== 'type') attrs[k] = d[k];
      }
      return h(type, { key: i, ...attrs });
    });
  }

  const iconDefs = {
    Temple: [
      { type: 'path', d: 'M4 22h16' },
      { type: 'path', d: 'M6 22V10l6-5 6 5v12' },
      { type: 'path', d: 'M9 22v-6h6v6' },
      { type: 'path', d: 'M12 3v2' },
    ],
    Sun: [
      { type: 'circle', cx: '12', cy: '12', r: '4' },
      { type: 'path', d: 'M12 2v2' },
      { type: 'path', d: 'M12 20v2' },
      { type: 'path', d: 'M4.93 4.93l1.41 1.41' },
      { type: 'path', d: 'M17.66 17.66l1.41 1.41' },
      { type: 'path', d: 'M2 12h2' },
      { type: 'path', d: 'M20 12h2' },
      { type: 'path', d: 'M6.34 17.66l-1.41 1.41' },
      { type: 'path', d: 'M19.07 4.93l-1.41 1.41' },
    ],
    Moon: [
      { type: 'path', d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' },
    ],
    Volume: [
      { type: 'polygon', points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' },
      { type: 'path', d: 'M15.54 8.46a5 5 0 0 1 0 7.07' },
      { type: 'path', d: 'M19.07 4.93a10 10 0 0 1 0 14.14' },
    ],
    Mute: [
      { type: 'polygon', points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' },
      { type: 'line', x1: '23', y1: '9', x2: '17', y2: '15' },
      { type: 'line', x1: '17', y1: '9', x2: '23', y2: '15' },
    ],
    Flame: [
      { type: 'path', d: 'M12 2s4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s-1 4 1 5c0 0-1-3 2-6s0-5 0-5z' },
      { type: 'path', d: 'M8 16a4 4 0 0 0 8 0' },
    ],
    Check: [
      { type: 'polyline', points: '20 6 9 17 4 12' },
    ],
    Scroll: [
      { type: 'path', d: 'M8 3h11v14H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z' },
      { type: 'path', d: 'M5 14v3a3 3 0 0 0 3 3h11' },
      { type: 'line', x1: '10', y1: '8', x2: '17', y2: '8' },
      { type: 'line', x1: '10', y1: '11', x2: '17', y2: '11' },
      { type: 'line', x1: '10', y1: '14', x2: '14', y2: '14' },
    ],
    Award: [
      { type: 'circle', cx: '12', cy: '9', r: '6' },
      { type: 'path', d: 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12' },
    ],
    ChevronLeft: [
      { type: 'polyline', points: '15 18 9 12 15 6' },
    ],
    ChevronRight: [
      { type: 'polyline', points: '9 18 15 12 9 6' },
    ],
    X: [
      { type: 'line', x1: '18', y1: '6', x2: '6', y2: '18' },
      { type: 'line', x1: '6', y1: '6', x2: '18', y2: '18' },
    ],
    Sparkles: [
      { type: 'path', d: 'M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z' },
      { type: 'path', d: 'M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z' },
      { type: 'path', d: 'M5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6L5 15z' },
    ],
    Calendar: [
      { type: 'rect', x: '3', y: '4', width: '18', height: '18', rx: '2' },
      { type: 'line', x1: '16', y1: '2', x2: '16', y2: '6' },
      { type: 'line', x1: '8', y1: '2', x2: '8', y2: '6' },
      { type: 'line', x1: '3', y1: '10', x2: '21', y2: '10' },
    ],
    Target: [
      { type: 'circle', cx: '12', cy: '12', r: '9' },
      { type: 'circle', cx: '12', cy: '12', r: '5' },
      { type: 'circle', cx: '12', cy: '12', r: '1.5' },
    ],
    Download: [
      { type: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
      { type: 'polyline', points: '7 10 12 15 17 10' },
      { type: 'line', x1: '12', y1: '15', x2: '12', y2: '3' },
    ],
    Upload: [
      { type: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
      { type: 'polyline', points: '17 8 12 3 7 8' },
      { type: 'line', x1: '12', y1: '3', x2: '12', y2: '15' },
    ],
    Star: [
      { type: 'polygon', points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' },
    ],
    Book: [
      { type: 'path', d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' },
      { type: 'path', d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
    ],
    ExternalLink: [
      { type: 'path', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
      { type: 'polyline', points: '15 3 21 3 21 9' },
      { type: 'line', x1: '10', y1: '14', x2: '21', y2: '3' },
    ],
    Lock: [
      { type: 'rect', x: '5', y: '11', width: '14', height: '10', rx: '2' },
      { type: 'path', d: 'M8 11V7a4 4 0 0 1 8 0v4' },
    ],
    Unlock: [
      { type: 'rect', x: '5', y: '11', width: '14', height: '10', rx: '2' },
      { type: 'path', d: 'M8 11V7a4 4 0 0 1 7.5-2' },
    ],
    Copy: [
      { type: 'rect', x: '9', y: '9', width: '13', height: '13', rx: '2' },
      { type: 'path', d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' },
    ],
    Revelation: [
      { type: 'path', d: 'M4 6h4a3 3 0 0 1 3 3v11a2.5 2.5 0 0 0-2.5-2.5H4V6z' },
      { type: 'path', d: 'M20 6h-4a3 3 0 0 0-3 3v11a2.5 2.5 0 0 1 2.5-2.5H20V6z' },
      { type: 'path', d: 'M12 2l.9 2.1L15 5l-2.1.9L12 8l-.9-2.1L9 5l2.1-.9L12 2z' },
    ],
  };

  // Build icon components
  const Icons = {};
  for (const name in iconDefs) {
    const paths = buildPaths(iconDefs[name]);
    Icons[name] = function(props = {}) {
      return createIcon(paths, props);
    };
  }

  window.TempleIcons = Icons;
})();
