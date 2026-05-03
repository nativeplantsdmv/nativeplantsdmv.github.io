import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nativeplantsdmv.com',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
});
