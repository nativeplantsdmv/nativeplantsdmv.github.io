# Agent Guidelines

## Content Data

Content for the directory pages lives in `data/*.yaml` (nurseries, landscapers, gardens, events) — the single source of truth. Edit the YAML directly and commit; there is no CMS and no API token. Each file has a header comment with its field rules (quoting, `sortOrder`, `isEndorsed`).

## Tech Stack

- Astro 4.x
- Node.js 20+
- Content: YAML in `data/`, loaded by `src/lib/data.ts`

## Dev Workflow

- Local dev server: `npm run dev` on port 4321. Hot-reloads on file changes; data files are re-read per request, so content edits need no restart.
- Use the headless browser (`browser` tool) to verify visual changes; Astro's type checker has a stale shiki dependency that's not worth fixing.

## Page Conventions

- Homepage hero: title + Climate Action Coffee badge centered together in a flex row; intro paragraph below butterfly photos uses `text-center max-w-2xl mx-auto`.
- Tailwind CSS via `@astrojs/tailwind` (config in `tailwind.config.cjs`). Standard utility classes for layout, no custom component library.
