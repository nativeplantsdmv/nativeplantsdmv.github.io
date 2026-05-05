import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Sanity env vars — set via .env.production or CI/deploy config
const sanityProjectId = process.env.SANITY_PROJECT_ID;
const sanityDataset = process.env.SANITY_DATASET || 'production';

if (!sanityProjectId) {
  console.warn('⚠️  SANITY_PROJECT_ID not set — site will build with empty data until Sanity is connected.');
}

export default defineConfig({
  site: 'https://nativeplantsdmv.github.io',
  integrations: [
    tailwind({ applyBaseStyles: true }),
  ],
  // Expose env vars to server-side Astro code (including getStaticPaths / frontmatter)
  vite: {
    define: {
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(sanityProjectId),
      'import.meta.env.SANITY_DATASET': JSON.stringify(sanityDataset),
    },
  },
});
