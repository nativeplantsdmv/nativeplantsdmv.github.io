import { execSync } from 'node:child_process'
import { sanityFetch } from './sanity'

function gitLastCommit(): Date | null {
  try {
    const raw = execSync('git log -1 --format=%ci', { encoding: 'utf-8', timeout: 5000 }).trim()
    const d = new Date(raw)
    return isNaN(d.getTime()) ? null : d
  } catch {
    return null
  }
}

async function sanityLastEdit(): Promise<Date | null> {
  try {
    const results: Array<{ _updatedAt: string }> = await sanityFetch(
      '*[_type in ["event", "nursery", "landscapeCompany", "garden", "recurringActivity"]] | order(_updatedAt desc) [0..0]',
    )
    if (results.length > 0 && results[0]._updatedAt) {
      const d = new Date(results[0]._updatedAt)
      return isNaN(d.getTime()) ? null : d
    }
  } catch {
    // Sanity unavailable — not a failure condition
  }
  return null
}

export async function getLastUpdated(): Promise<string> {
  const gitDate = gitLastCommit()
  const sanityDate = await sanityLastEdit()

  const date = gitDate && sanityDate
    ? (gitDate > sanityDate ? gitDate : sanityDate)
    : (gitDate ?? sanityDate)

  if (!date) return 'Unknown'

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
