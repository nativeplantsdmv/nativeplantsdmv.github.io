# NativePlantsDMV.com

A static website for native plant resources in the DC Metro area (DMV). Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/). All content lives in the repo as YAML — no CMS.

## Tech Stack

- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS
- **Content:** YAML files in `data/`, loaded by `src/lib/data.ts`
- **Hosting:** GitHub Pages (custom domain via `public/CNAME`)

## Structure

```
new/
├── public/                    # Static files served as-is
│   ├── images/                # Photos
│   └── favicon.svg            # Leaf logo
├── data/                      # Content source of truth (YAML)
│   ├── nurseries.yaml         #   /nurseries/
│   ├── landscapers.yaml       #   /landscapers/
│   ├── gardens.yaml           #   /gardens-to-visit/
│   ├── events.yaml            #   /events/ (upcoming events)
│   └── recurring-activities.yaml  # /events/ (recurring)
├── src/
│   ├── components/            # Reusable UI pieces
│   │   ├── Header.astro       # Navigation bar with mobile menu
│   │   └── Footer.astro       # Site footer with links and contact
│   ├── layouts/               # Page templates
│   │   └── PageLayout.astro   # Wraps pages with header + footer
│   ├── lib/
│   │   ├── data.ts            # YAML loader + types + sorting
│   │   ├── lastUpdated.ts     # "Last updated" stamp (git commit date)
│   │   ├── organizations.ts   # Hardcoded org list (home + resources)
│   │   └── portabletext.ts    # Portable Text → HTML (recurring activity bodies)
│   ├── pages/                 # Each file becomes a URL route
│   │   ├── index.astro                # Home page (main content hub)
│   │   ├── about/index.astro          # About Us / CAC / Pollinators
│   │   ├── events/index.astro         # Current Events / Plant Swaps
│   │   ├── invasives/index.astro      # Non-Native Invasives resources
│   │   ├── nurseries/index.astro      # Native plant nursery directory
│   │   ├── landscapers/index.astro    # Landscaping companies
│   │   ├── gardens-to-visit/index.astro  # Public native gardens
│   │   └── resources/index.astro      # Reference guides, apps, organizations
│   └── styles/
│       └── global.css         # Tailwind + custom CSS classes
├── astro.config.mjs           # Astro configuration
├── tailwind.config.cjs        # Tailwind content paths
└── package.json               # Dependencies and scripts
```

## Content Management

Content is plain YAML in `data/` — edit a file, commit, done. GitHub history is the version history. Each file has a header comment with its field rules (e.g. `isEndorsed`, `sortOrder`, quoting requirements for dates).

Pages and their data files:

| Page | File |
|------|------|
| /nurseries/ | `data/nurseries.yaml` |
| /landscapers/ | `data/landscapers.yaml` |
| /gardens-to-visit/ | `data/gardens.yaml` |
| /events/ (upcoming) | `data/events.yaml` |
| /events/ (recurring) | `data/recurring-activities.yaml` |

Everything else (home, about, resources, invasives) is static Astro — edit the page files directly.

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build static site to dist/
npm run preview      # Preview the built site locally
```

No environment variables are required.

## Deployment

Deployed to **GitHub Pages** with automatic builds on `main` branch pushes (`.github/workflows/astro.yml`).

- Build command: `npm run build`
- Output directory: `dist/`

## Adding Content

### Directory entries (nurseries, landscapers, gardens, events)

Add an entry to the matching `data/*.yaml` file — see the header comment in each file for field rules and an example. Commit and the site deploys.

### Static pages

Find the relevant section or link array in the page and add:

```js
{ title: 'Resource Name', url: 'https://example.com' },
```

### Adding an Image

1. Copy the image file to `public/images/` with a meaningful name
2. Reference it with `<img src="/images/filename.jpg" alt="Description" />`
