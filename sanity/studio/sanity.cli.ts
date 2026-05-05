import {defineCliConfig} from 'sanity'

export default defineCliConfig({
  api: {
    projectId: 'z9dgpdy9',
    dataset: 'production',
  },
  // Include dev workspace for the build
  studios: [
    {
      name: 'nativeplantsdmv',
      path: './dev.config.ts',
    },
  ],
})
