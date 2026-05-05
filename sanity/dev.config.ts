// Used for `sanity dev` — points to the studio directory
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'nativeplantsdmv-studio',
  title: 'NativePlantsDMV Studio',
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [deskTool()],
})
