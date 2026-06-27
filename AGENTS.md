# Agent Guidelines

## Sanity CMS

Use `.skills/sanity-api/SKILL.md` for all Sanity Content API operations. Direct REST via `fetch()` in eval — **not** MCP. Token is loaded from `.env` with `env('SANITY_API_TOKEN')`.

## Tech Stack

- Astro 4.x
- Node.js 20+
## Dev Workflow

- Local dev server: `npm run dev` on port 4321. Hot-reloads on file changes.
- Use the headless browser (`browser` tool) to verify visual changes; Astro's type checker has a stale shiki dependency that's not worth fixing.
- Sanity data is fetched at build time — restart the dev server after content changes to re-fetch.

## Page Conventions

- Homepage hero: title + Climate Action Coffee badge centered together in a flex row; intro paragraph below butterfly photos uses `text-center max-w-2xl mx-auto`.
- Tailwind CSS via CDN (config in `public/tailwind.config.js`). Standard utility classes for layout, no custom component library.
