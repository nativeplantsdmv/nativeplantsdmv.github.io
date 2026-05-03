# NativePlantsDMV.com

A static website for native plant resources in the DC Metro area (DMV). Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## Structure

```
new/
├── public/          # Static files served as-is
│   ├── images/      # Photos (renamed meaningfully from original MD5 hashes)
│   └── favicon.svg  # Leaf logo
├── src/
│   ├── components/  # Reusable UI pieces
│   │   ├── Header.astro    # Navigation bar with mobile menu
│   │   └── Footer.astro    # Site footer with links and contact
│   ├── layouts/     # Page templates
│   │   ├── BaseLayout.astro   # HTML document shell
│   │   └── PageLayout.astro   # Wraps pages with header + footer
│   ├── pages/       # Each file becomes a URL route
│   │   ├── index.astro         # Home page (main content hub)
│   │   ├── about/index.astro   # About Us / CAC / Pollinators
│   │   ├── events/index.astro  # Current Events / Plant Swaps
│   │   └── invasives/index.astro  # Non-Native Invasives resources
│   └── styles/
│       └── global.css   # Tailwind + custom CSS classes
├── astro.config.mjs # Astro configuration
├── tailwind.config.cjs  # Tailwind content paths
└── package.json     # Dependencies and scripts
```

## Quick Start

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (localhost:4321)
npm run build  # Build static site to dist/
npm run preview # Preview the built site locally
```

## Editing Content

All pages are Astro files (.astro) which mix HTML with Markdown-like text. To edit:

### Adding a Nursery to the Home Page
Open `src/pages/index.astro`, find the nurseries section, and add an entry to the array:

```js
{ name: 'New Nursery', url: 'https://example.com', address: '123 Main St', phone: '555-0000', note: 'Description here' },
```

### Adding an Event
Open `src/pages/events/index.astro` and add a new `<article>` block under the events section.

### Adding a Resource Link
Find the relevant resource array in the page and add:

```js
{ title: 'Resource Name', url: 'https://example.com' },
```

### Adding an Image
1. Copy the image file to `public/images/` with a meaningful name
2. Reference it in the page with `<img src="/images/filename.jpg" alt="Description" />`

### Updating the "Last Updated" Date
At the bottom of each page, edit the `lastUpdated` variable or the date text directly.

## Deployment

The site builds to static HTML/CSS/JS in the `dist/` folder. This can be deployed anywhere:

- **Netlify**: Drag and drop the `dist/` folder to netlify.com/drop
- **GitHub Pages**: Push to a repo and enable GitHub Pages from the `dist/` folder
- **Any web host**: Upload the `dist/` folder contents

## Original Content

The original Google Sites export is at `/OLD/DRAFT/` with 4 HTML files. All content has been ported to this new site structure.
