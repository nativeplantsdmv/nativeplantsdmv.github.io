import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nativeplantsdmv.github.io',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
});
