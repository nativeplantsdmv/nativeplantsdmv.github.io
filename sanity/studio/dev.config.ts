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
})
