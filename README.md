# José Reinaldo — dark research website (version 3)

A minimal, dark, holography-inspired website built with **HTML, CSS, and JavaScript**. No framework, npm install, or build step is needed. The Home, Research, Publications, Background, and Contact sections are retained from the first version.

## 1. Preview it without publishing

Extract the ZIP, open a terminal in the folder containing `index.html`, and run:

```bash
python -m http.server 8000
```

Open **http://localhost:8000** in Chrome, Edge, or Firefox. Stop the server with `Ctrl+C`. You can also double-click `index.html`, but the local server makes browser testing more reliable.

In Chrome/Edge, press **F12**, then **Ctrl+Shift+M** to simulate different mobile/tablet sizes.

If you use Visual Studio Code, its optional *Live Server* extension automatically reloads the page after each save.

## 2. Change colors (two ways)

### Method A: Visually, while previewing

Click **Palette** in the website's top right corner. Choose Phosphor, Emerald, or Sage, or edit six colors with the color pickers or hex inputs. The illustration, headings, buttons, cards, and backgrounds update immediately.

The changes are saved in **your browser's localStorage only**. They are **not** written to your files or published automatically.

When you like a palette, click **Copy CSS colors**. Open `theme.css` and replace its `:root { ... }` color declarations with the copied block. (Keep the rest of the file or its comments if you like.) Reload the page. If your browser still shows an old palette, click **Reset** in the Palette panel to see the actual colors from `theme.css`.

### Method B: Directly in CSS

All six essential colors are in **`theme.css`**:

```css
:root {
  color-scheme: dark;
  --bg: #0b1210;       /* Page background */
  --surface: #14201b;  /* Cards */
  --text: #eaf4ed;     /* Main foreground */
  --muted: #a2b8aa;    /* Secondary text */
  --accent: #a5f4a9;   /* Holographic accent */
  --border: #2a4236;   /* Lines */
}
```

Changing a variable in this file changes all elements that use it, including the inline SVG illustration. Secondary tones, glow, and tints derive automatically from these six colors using CSS `color-mix()`.

Preset combinations are inside `script.js`, in `PALETTES`; you can add new presets if you want. `styles.css` contains the layout and component styles and normally does not require edits for color experiments.

**Accessibility tip:** When trying more extreme palettes, keep good contrast between the background and `--text`/`--muted`; and between the accent and the dark background. Light accents are especially effective for this design.

## 3. Update the introduction

In `index.html`, look for `class="hero-content"` to edit your name, affiliation, research description, and the four research-interest labels. The hero illustration immediately follows in `class="hero-graphic"`. Text sizing, spacing, and the keyword style are defined in the `/* Hero */` section of `styles.css`. The color variables remain in `theme.css`, including the highlighted words.

## 4. What each file does

| File | Purpose |
| --- | --- |
| `index.html` | Page sections, copy, navigation, color-editor UI, inline SVG visual |
| `theme.css` | **Six editable global color values** |
| `styles.css` | Layout, typography, visual effects, responsive rules |
| `script.js` | Color editor, palette presets, mobile navigation, footer year |
| `assets/favicon.svg` | Browser-tab icon |
| `.nojekyll` | Simple GitHub Pages publishing compatibility |

## 5. Content to finish before publishing

- [ ] Confirm name/title, lab affiliation, degree dates, and awards.
- [ ] Replace publication placeholder with verified papers (authors, venue, year, PDF/code links).
- [ ] Add your real contact address, GitHub, Google Scholar, and CV links.
- [ ] Review all research descriptions and optionally add a portrait.
- [ ] Check the final palette in desktop and mobile browsers.

## 6. Publish when ready

Create a public GitHub repository named **`YOUR_GITHUB_USERNAME.github.io`**. Upload the **contents** of this folder to its root. In **Settings → Pages**, choose **Deploy from a branch → main → /(root)**. The site then appears at `https://YOUR_GITHUB_USERNAME.github.io/` after deployment.

Only files committed to GitHub get deployed; locally previewed palette choices are not published. Your GitHub Pages repository may be publicly visible, so do not include secrets or private documents.

Official guide: https://docs.github.com/en/pages/quickstart
