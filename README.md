# NativePlantsDMV.com

A static website for native plant resources in the DC Metro area (DMV). Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), with content managed via [Sanity CMS](https://www.sanity.io/).

## Tech Stack

- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS
- **CMS:** Sanity Cloud (content API)
- **Hosting:** Cloudflare Pages

## Structure

```
new/
├── public/                    # Static files served as-is
│   ├── images/                # Photos
│   └── favicon.svg            # Leaf logo
├── src/
│   ├── components/            # Reusable UI pieces
│   │   ├── Header.astro       # Navigation bar with mobile menu
│   │   └── Footer.astro       # Site footer with links and contact
│   ├── layouts/               # Page templates
│   │   ├── BaseLayout.astro   # HTML document shell
│   │   └── PageLayout.astro   # Wraps pages with header + footer
│   ├── lib/
│   │   └── sanity.ts          # Sanity client + seed data fallback
│   ├── pages/                 # Each file becomes a URL route
│   │   ├── index.astro                # Home page (main content hub)
│   │   ├── about/index.astro          # About Us / CAC / Pollinators
│   │   ├── events/index.astro         # Current Events / Plant Swaps (Sanity-powered)
│   │   ├── invasives/index.astro      # Non-Native Invasives resources
│   │   ├── nurseries/index.astro      # Native plant nursery directory (Sanity-powered)
│   │   ├── landscapers/index.astro    # Landscaping companies (Sanity-powered)
│   │   ├── gardens-to-visit/index.astro  # Public native gardens (Sanity-powered)
│   │   ├── resources/index.astro      # Reference guides, apps, organizations
│   │   └── studio/index.astro         # Embedded admin for editing content
│   └── styles/
│       └── global.css         # Tailwind + custom CSS classes
├── sanity-seed/               # JSON seed data (local dev fallback)
│   ├── events.json
│   ├── nurseries.json
│   ├── landscapers.json
│   └── gardens.json
├── astro.config.mjs           # Astro configuration
├── tailwind.config.cjs        # Tailwind content paths
└── package.json               # Dependencies and scripts
```

## Content Management

Content for events, nurseries, landscapers, and gardens is managed through **Sanity CMS**. There are two ways to edit:

### Option 1: Hosted Sanity Studio (Recommended)

Full-featured admin UI at https://nativeplantsdmv.sanity.studio/ with schema validation and rich text editing.

### Option 2: Embedded Admin Page

Access the embedded editor at `https://yoursite.com/studio/` for quick edits without leaving the site. Requires `SANITY_STUDIO_TOKEN` environment variable to be set during build.

### Content Types

- **Event:** Plant swaps, meetups, community events
- **Nursery:** Native plant vendors (with endorsement flag)
- **Landscape Company:** Landscaping services using native plants
- **Garden:** Public gardens and arboretums to visit

## Environment Variables

Set these in Cloudflare Pages (or a `.env` file locally):

| Variable | Required | Purpose |
|----------|----------|---------|
| `SANITY_PROJECT_ID` | Yes | Sanity project ID (`z9dgpdy9`) |
| `SANITY_DATASET` | No | Dataset name (default: `production`) |
| `SANITY_STUDIO_TOKEN` | For `/studio/` only | Write token for embedded admin |

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build static site to dist/
npm run preview      # Preview the built site locally
```

### Local Development Without Sanity

The site includes seed data fallback in `sanity-seed/`. If `SANITY_PROJECT_ID` is not set, it loads from local JSON files automatically. To update seed data:

1. Edit files in `sanity-seed/` directly (JSON format)
2. Or pull fresh data from Sanity Studio and re-export

## Deployment

Deployed to **Cloudflare Pages** with automatic builds on `main` branch pushes.

- Build command: `npm run build`
- Output directory: `dist/`
- Environment variables configured in Cloudflare dashboard

## Adding Static Content

For pages not connected to Sanity (about, invasives, resources), edit the Astro files directly:

### Adding a Resource Link

Find the relevant array in the page and add:

```js
{ title: 'Resource Name', url: 'https://example.com' },
```

### Adding an Image

1. Copy the image file to `public/images/` with a meaningful name
2. Reference it with `<img src="/images/filename.jpg" alt="Description" />`
