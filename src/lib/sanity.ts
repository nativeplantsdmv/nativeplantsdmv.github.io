import {createClient, type QueryParams} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID ?? ''
const dataset = process.env.SANITY_DATASET ?? 'production'

let _sanity: ReturnType<typeof createClient> | null = null
if (projectId) {
  try {
    _sanity = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  } catch {
    console.warn('⚠️  Failed to initialize Sanity client — building with fallback data.')
  }
}

export const sanity = _sanity!

export async function sanityFetch<D>(query: string, params: QueryParams = {}): Promise<D[]> {
  if (!sanity) {
    console.warn('⚠️  No SANITY_PROJECT_ID set — returning empty arrays. Set the env var to use live CMS data.')
    return [] as D[]
  }

  try {
    const results = await sanity.fetch<D[]>(query, params)
    return results ?? []
  } catch (err) {
    console.error('❌ Sanity fetch failed:', err instanceof Error ? err.message : String(err))
    return [] as D[]
  }
}
