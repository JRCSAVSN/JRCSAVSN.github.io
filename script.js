// Plain JavaScript; no build tools or dependencies required.
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Color design playground. Defaults are defined in theme.css.
// A preview is local to this browser until you paste the copied CSS into theme.css.
const COLOR_KEYS = ['bg', 'surface', 'text', 'muted', 'accent', 'border'];
const PALETTES = {
  phosphor: { bg: '#0b1210', surface: '#14201b', text: '#eaf4ed', muted: '#a2b8aa', accent: '#a5f4a9', border: '#2a4236' },
  emerald:  { bg: '#081719', surface: '#10252a', text: '#e5f8f5', muted: '#97bdba', accent: '#67e8c1', border: '#294747' },
  sage:     { bg: '#151916', surface: '#202922', text: '#f0f4e9', muted: '#adbba9', accent: '#b8d7a2', border: '#3b493d' },
  lambda473: { bg: '#081719', surface: '#10252a', text: '#e5f8f5', muted: '#97bdba', accent: '#2a57df', border: '#294747' },
  lambda532: { bg: '#081719', surface: '#10252a', text: '#e5f8f5', muted: '#97bdba', accent: '#68e8a6', border: '#294747' },
  lambda660: { bg: '#081719', surface: '#10252a', text: '#e5f8f5', muted: '#97bdba', accent: '#c36060', border: '#294747' },

};
const root = document.documentElement;
const panel = document.getElementById('palette-panel');
const toggle = document.getElementById('palette-toggle');
const feedback = document.getElementById('palette-feedback');
const defaultPalette = Object.fromEntries(COLOR_KEYS.map(key => [key, getComputedStyle(root).getPropertyValue(`--${key}`).trim().toLowerCase()]));
const isHex = value => /^#[0-9a-f]{6}$/i.test(value);
let palette = { ...defaultPalette };

function savePalette() {
  try { localStorage.setItem('personal-site-palette', JSON.stringify(palette)); }
  catch { /* If browser storage is disabled, live color previews still work. */ }
}
function renderPalette() {
  COLOR_KEYS.forEach(key => {
    root.style.setProperty(`--${key}`, palette[key]);
    document.getElementById(`color-${key}`).value = palette[key];
    const hex = document.getElementById(`hex-${key}`);
    hex.value = palette[key];
    hex.setAttribute('aria-invalid', 'false');
  });
  document.querySelector('meta[name="theme-color"]').setAttribute('content', palette.bg);
  document.querySelectorAll('[data-preset]').forEach(button => {
    const match = COLOR_KEYS.every(key => palette[key].toLowerCase() === PALETTES[button.dataset.preset][key]);
    button.setAttribute('aria-pressed', String(match));
  });
}
function setColor(key, value) {
  if (!COLOR_KEYS.includes(key) || !isHex(value)) return;
  palette[key] = value.toLowerCase();
  renderPalette();
  savePalette();
  feedback.textContent = 'Preview saved locally. Copy the CSS to make it permanent.';
}
try {
  const stored = JSON.parse(localStorage.getItem('personal-site-palette') || 'null');
  if (stored && COLOR_KEYS.every(key => typeof stored[key] === 'string' && isHex(stored[key]))) {
    palette = Object.fromEntries(COLOR_KEYS.map(key => [key, stored[key].toLowerCase()]));
  }
} catch { /* Ignore malformed saved preferences. */ }
renderPalette();

function showPanel(show) {
  panel.hidden = !show;
  toggle.setAttribute('aria-expanded', String(show));
  if (show) document.getElementById('color-accent').focus();
  else toggle.focus();
}
toggle.addEventListener('click', () => showPanel(panel.hidden));
document.getElementById('palette-close').addEventListener('click', () => showPanel(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel.hidden) showPanel(false);
});

document.querySelectorAll('[data-preset]').forEach(button => {
  button.addEventListener('click', () => {
    palette = { ...PALETTES[button.dataset.preset] };
    renderPalette();
    savePalette();
    feedback.textContent = `${button.textContent.trim()} preset selected.`;
  });
});
document.querySelectorAll('[data-color]').forEach(input => {
  input.addEventListener('input', () => setColor(input.dataset.color, input.value));
});
document.querySelectorAll('[data-hex]').forEach(input => {
  input.addEventListener('change', () => {
    const value = input.value.trim();
    if (isHex(value)) setColor(input.dataset.hex, value);
    else {
      input.setAttribute('aria-invalid', 'true');
      feedback.textContent = 'Use a six-digit hex color, such as #a5f4a9.';
    }
  });
});
// document.getElementById('reset-palette').addEventListener('click', () => {
//   palette = { ...defaultPalette };
//   renderPalette();
//   savePalette();
//   feedback.textContent = 'Back to the default colors in theme.css.';
// });
// document.getElementById('copy-palette').addEventListener('click', async () => {
//   const css = ':root {\n  color-scheme: dark;\n' + COLOR_KEYS.map(key => `  --${key}: ${palette[key]};`).join('\n') + '\n}';
//   try {
//     if (navigator.clipboard && window.isSecureContext) {
//       await navigator.clipboard.writeText(css);
//     } else {
//       // Fallback for users opening index.html directly without localhost.
//       const field = document.createElement('textarea');
//       field.value = css;
//       field.style.position = 'fixed';
//       field.style.left = '-9999px';
//       document.body.appendChild(field);
//       field.select();
//       const ok = document.execCommand('copy');
//       field.remove();
//       if (!ok) throw new Error('Clipboard unavailable');
//     }
//     feedback.textContent = 'Copied! Replace the :root block in theme.css with these colors.';
//   } catch {
//     feedback.textContent = 'Clipboard access is blocked. Open theme.css and enter the six hex colors manually.';
//   }
// });
