import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const sanityProjectId = process.env.SANITY_PROJECT_ID;
const sanityDataset = process.env.SANITY_DATASET || 'production';
const sanityStudioToken = process.env.SANITY_STUDIO_TOKEN;

if (!sanityProjectId) {
  console.warn('\u26a0\ufe0f  SANITY_PROJECT_ID not set');
}

export default defineConfig({
  site: 'https://nativeplantsdmv.com',
  integrations: [tailwind({ applyBaseStyles: true })],
  vite: {
    define: {
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(sanityProjectId),
      'import.meta.env.SANITY_DATASET': JSON.stringify(sanityDataset),
      'import.meta.env.SANITY_STUDIO_TOKEN': JSON.stringify(sanityStudioToken),
    },
  },
});
