import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schema'

export default defineConfig({
  name: 'nativeplantsdmv',
  title: 'NativePlantsDMV',

  projectId: 'z9dgpdy9',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
