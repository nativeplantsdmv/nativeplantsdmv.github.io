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
    console.warn('Failed to initialize Sanity client -- building with fallback data.')
  }
}

export const sanity = _sanity!

// Seed data fallback for local dev without Sanity configured
// Lazy-loaded so Node.js builtins (fs/path) are NOT bundled by Vite in production
let _cachedSeedData: Record<string, unknown[]> | null = null

async function loadSeedData(): Promise<Record<string, unknown[]>> {
  if (_cachedSeedData) return _cachedSeedData

  const fs = await import('node:fs')
  const path = await import('node:path')

  const seedDir = path.resolve(process.cwd(), 'sanity-seed')

  const types: Record<string, string> = {
    event: 'events.json',
    nursery: 'nurseries.json',
    landscapeCompany: 'landscapers.json',
    garden: 'gardens.json',
  }

  _cachedSeedData = {} as Record<string, unknown[]>

  for (const [type, file] of Object.entries(types)) {
    try {
      const raw = fs.readFileSync(path.join(seedDir, file), 'utf-8')
      _cachedSeedData[type] = JSON.parse(raw)
    } catch {
      // File doesn't exist or is invalid -- skip silently
    }
  }

  return _cachedSeedData
}

export async function sanityFetch<D>(query: string, params: QueryParams = {}): Promise<D[]> {
  if (_sanity) {
    try {
      const results = await _sanity.fetch<D[]>(query, params)
      return results ?? []
    } catch (err) {
      console.error('Sanity fetch failed:', err instanceof Error ? err.message : String(err))
      return [] as D[]
    }
  }

  // Fallback: parse query and serve from seed data
  const typeMatch = query.match(/[_type\s*==\s*"(\w+)"]/)
  if (!typeMatch) {
    console.warn('Cannot parse Sanity query for seed fallback:', query.substring(0, 80))
    return [] as D[]
  }

  const typeName = typeMatch[1]
  const seedData = await loadSeedData()
  return (seedData[typeName] ?? []) as D[]
}
