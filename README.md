# Konst Portfolio

A one-page Astro portfolio with anchor navigation, light/dark/system themes, theme-aware screenshots, responsive galleries, a portrait hero, and a short opening animation.

## Live Demo

> [konstpartner.github.io/portfolio/](https://konstpartner.github.io/portfolio/)

## Run locally

```bash
npm ci
npm run dev
```

Production check:

```bash
npm run check
npm run build
npm run preview
```

## Favicon

The favicon is located at:

```text
public/favicon.svg
```

## Content

Project descriptions, links, contacts, and education details are stored in:

```text
src/data/portfolio.ts
```

## Icons

- Interface icons: `@lucide/astro`
- Brand icons: `@fortawesome/free-brands-svg-icons` and `simple-icons`

## Structure

```text
src/
├── components/
├── data/portfolio.ts
├── layouts/BaseLayout.astro
├── pages/index.astro
├── scripts/main.ts
└── styles/global.css
```

The site is statically generated. No React runtime is shipped to the browser. The section rail follows normal page scrolling and can also be dragged to snap to a section.
