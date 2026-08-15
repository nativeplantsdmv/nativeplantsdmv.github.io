import { execSync } from 'node:child_process'

function gitLastCommit(): Date | null {
  try {
    const raw = execSync('git log -1 --format=%ci', { encoding: 'utf-8', timeout: 5000 }).trim()
    const d = new Date(raw)
    return isNaN(d.getTime()) ? null : d
  } catch {
    return null
  }
}

// Content lives in data/*.yaml, so the last git commit IS the last content edit.
export function getLastUpdated(): string {
  const date = gitLastCommit()
  if (!date) return 'Unknown'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
