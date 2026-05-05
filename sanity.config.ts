import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schema'

export default defineConfig({
  name: 'nativeplantsdmv',
  title: 'NativePlantsDMV',

  projectId: '', // Set after project creation via `npx sanity projects list` or in Sanity Dashboard
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
