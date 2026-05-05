import {defineWorkspace} from 'sanity'
import {schemaTypes} from './schema'

export default defineWorkspace({
  projects: [
    {
      name: 'nativeplantsdmv',
      title: 'NativePlantsDMV Studio',
      
      rootDocumentId: 'event', // defaults to first document type
      
      schema: {
        types: schemaTypes,
      },
      
      studioHost: 'nativeplantsdmv.sanity.studio',
    },
  ],
})
