# José Reinaldo — dark research website (version 3)

A minimal, dark, holography-inspired website built with **HTML, CSS, and JavaScript**. No framework, npm install, or build step is needed. The Home, Research, Publications, Background, and Contact sections are retained from the first version.

## 1. Preview it without publishing

Extract the ZIP, open a terminal in the folder containing `../index.html`, and run:

```bash
python -m http.server 8000
```

Open **http://localhost:8000** in Chrome, Edge, or Firefox. Stop the server with `Ctrl+C`. You can also double-click `../index.html`, but the local server makes browser testing more reliable.

In Chrome/Edge, press **F12**, then **Ctrl+Shift+M** to simulate different mobile/tablet sizes.

If you use Visual Studio Code, its optional *Live Server* extension automatically reloads the page after each save.

## 2. Change colors (two ways)

### Method A: Visually, while previewing

Click **Palette** in the website's top right corner. Choose Phosphor, Emerald, or Sage, or edit six colors with the color pickers or hex inputs. The illustration, headings, buttons, cards, and backgrounds update immediately.

The changes are saved in **your browser's localStorage only**. They are **not** written to your files or published automatically.

When you like a palette, click **Copy CSS colors**. Open `../theme.css` and replace its `:root { ... }` color declarations with the copied block. (Keep the rest of the file or its comments if you like.) Reload the page. If your browser still shows an old palette, click **Reset** in the Palette panel to see the actual colors from `theme.css`.

### Method B: Directly in CSS

All six essential colors are in **`../theme.css`**:

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

Preset combinations are inside `../script.js`, in `PALETTES`; you can add new presets if you want. `styles.css` contains the layout and component styles and normally does not require edits for color experiments.

**Accessibility tip:** When trying more extreme palettes, keep good contrast between the background and `--text`/`--muted`; and between the accent and the dark background. Light accents are especially effective for this design.

## 3. Update the introduction

In `../index.html`, look for `class="hero-content"` to edit your name, affiliation, research description, and the four research-interest labels. The hero illustration immediately follows in `class="hero-graphic"`. Text sizing, spacing, and the keyword style are defined in the `/* Hero */` section of `styles.css`. The color variables remain in `theme.css`, including the highlighted words.

## 4. What each file does

| File | Purpose |
| --- | --- |
| `../index.html` | Page sections, copy, navigation, color-editor UI, inline SVG visual |
| `../theme.css` | **Six editable global color values** |
| `../styles.css` | Layout, typography, visual effects, responsive rules |
| `../script.js` | Color editor, palette presets, mobile navigation, footer year |
| `../assets/favicon.svg` | Browser-tab icon |
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

## 4. Add publications

The Publications section in `../index.html` uses one `<article class="publication-row">` per paper. Duplicate an existing article within `<div class="publication-list">` and update the year, title, authors, venue, and resource links. New papers automatically use the same responsive styling and the colors in `theme.css`.

Minimal entry to copy (replace the example text and URLs with verified publication details):

```html
<article class="publication-row" id="paper-unique-id">
  <time class="publication-year" datetime="2027">2027</time>
  <div class="publication-main">
    <h3>Your paper title</h3>
    <p class="publication-authors"><strong>Your name</strong>, Coauthor A, and Coauthor B.</p>
    <p class="publication-venue"><em>Conference or Journal Name</em> · pp. 1–10</p>
    <div class="publication-links" aria-label="Publication resources">
      <a href="https://example.org/paper" target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a>
      <a href="https://example.org/preprint" target="_blank" rel="noopener noreferrer">arXiv <span aria-hidden="true">↗</span></a>
      <a href="https://github.com/your-account/project" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</article>
```

Remove resource links that are not available. For an expandable BibTeX block, copy the `<details class="publication-citation">` element from the NSDD entry and replace its contents with the publisher's BibTeX citation. Keep the `id` unique for each entry. The list intentionally has no publication images, summaries, or external dependencies so it stays easy to maintain.

**NSDD citation sources:** [IEEE Xplore](https://ieeexplore.ieee.org/document/11668888/), [arXiv](https://arxiv.org/abs/2511.12024), and [project repository](https://github.com/JRCSAVSN/NullSpaceDiffusionDistillation).

## Full publication history and homepage link

`../index.html` now ends the selected-publications section with a **View full publication history** button. It links to `publications.html` using a relative URL that also works when hosted under a GitHub Pages project path.

`../publications.html` provides **Journals**, **Peer-reviewed conferences**, and **Invited talks & presentations** sections, with the same header, palette selector, publication-row styles, and footer as the homepage. The three papers already listed on the homepage are copied into their appropriate sections; they are starting entries, **not an exhaustive publication history**.

To add another journal or conference publication, duplicate an `<article class="publication-row">` within the corresponding `<div class="publication-list">`, update its unique `id`, year, title, author list, venue, resource links and optional BibTeX, and maintain reverse chronological order.

To add a talk, replace the `history-empty` placeholder with publication rows using the talk's verified title, presenter, event, and date/location. BibTeX and paper links are optional for talks.

Test locally with `python -m http.server 8000` and visit `http://localhost:8000/publications.html` or click the link on the homepage.

## Talks, non-peer-reviewed conference presentations, and live demos

The third section of `../publications.html` (anchor `#talks`) is now titled **Talks, presentations & demos**. Each entry uses the same two-column `publication-row` layout as the papers, with an accent-colored type keyword directly before the title:

- `[talk]` — invited webinars or talks
- `[presentation]` — non-peer-reviewed conference presentations and other presentation sessions
- `[poster]` — workshop/poster presentations
- `[demo]` — live technology demonstrations

To add an entry, duplicate an existing `<article class="publication-row">` within this section and change the `id`, year, keyword, title, author/presenter or team credit, venue/date, and any relevant links. Remove the `publication-links` div if there is no verified public event link. Keep the entries in newest-first order. Colors follow `--accent` from the existing Palette controls.

**Source notes / verification:**
- 2026 Osaka University Co-Creation Day @ EXPOCITY: public lensless-camera exhibit, 26 September 2026, based on the University's official event page. The listing credits the participating research team rather than naming an individual leader.
- ICASSP 2024: one verified Show & Tell demo (DEMO-2A.1), and one separate non-peer-reviewed SPS Journal Presentation (CI-P2.5).
- IEEE Signal Processing Society webinar: official resource records **28 January 2025**, while the older Google Sites page listed January 2024; the official date is used.
- 2025 IDW presentation and 2023 DHIP poster/Student Presentation Award are drawn from the previous Google Sites record and corroborating event/proceedings pages.
- This section is a curated list of identifiable talks, posters, presentations and demos, not necessarily every informal presentation.
