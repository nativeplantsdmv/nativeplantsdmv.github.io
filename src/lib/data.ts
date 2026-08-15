import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

export interface Nursery {
  name: string
  url?: string
  phone?: string
  contactEmail?: string
  address?: string
  description?: string
  notes?: string
  isEndorsed?: boolean
  sortOrder?: number
}

export interface LandscapeCompany {
  name: string
  url?: string
  phone?: string
  contactEmail?: string
  address?: string
  description?: string
}

export interface Garden {
  name: string
  url?: string
  address?: string
  phone?: string
  contactEmail?: string
  description?: string
}

export interface EventItem {
  title: string
  venue?: string
  address?: string
  dateStart: string
  description?: string | unknown[]
  hosts?: string
  noteType?: string
  noteContent?: string | unknown[]
  imageAsset?: { url?: string }
}

export interface RecurringActivity {
  title: string
  body?: unknown[] | string
  sortOrder?: number
}

// data/*.yaml is the single source of truth. Files are re-read on every
// build (and every dev request), so content edits need no cache-busting.
// An empty or comment-only file yields [].
function load<T>(file: string): T[] {
  const raw = readFileSync(path.resolve(process.cwd(), 'data', file), 'utf-8')
  return (parse(raw) ?? []) as T[]
}

// Sorting that the old GROQ queries used to do server-side
export const nurseries: Nursery[] = load<Nursery>('nurseries.yaml')
  .sort(
    (a, b) =>
      Number(b.isEndorsed ?? false) - Number(a.isEndorsed ?? false) ||
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  )

export const landscapers: LandscapeCompany[] = load<LandscapeCompany>('landscapers.yaml')
  .sort((a, b) => a.name.localeCompare(b.name))

export const events: EventItem[] = load<EventItem>('events.yaml')
  .sort((a, b) => a.dateStart.localeCompare(b.dateStart))

export const gardens: Garden[] = load<Garden>('gardens.yaml')
  .sort((a, b) => a.name.localeCompare(b.name))

export const recurringActivities: RecurringActivity[] = load<RecurringActivity>('recurring-activities.yaml')
  .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
