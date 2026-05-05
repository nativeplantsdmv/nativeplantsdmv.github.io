import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from '../schema'

export default defineConfig({
  name: 'nativeplantsdmv',
  title: 'NativePlantsDMV Studio',
  
  projectId: 'z9dgpdy9',
  dataset: 'production',
  
  // Base path when embedded in the Astro site at /studio/
  basePath: '/studio',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  // Use API token for server-side operations (build/deploy)
  // but keep browser auth for Ken's editor session
  apiToken: process.env.SANITY_TOKEN,
})
