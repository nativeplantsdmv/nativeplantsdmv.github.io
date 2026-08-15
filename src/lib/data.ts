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
  notes?: string | unknown[]
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

// data/*.yaml is the single source of truth. Getters re-read the file on
// every call: dev re-runs page frontmatter per request, so content edits
// hot-reload without a server restart; at build time each page reads once.
// An empty or comment-only file yields [].
function load<T>(file: string): T[] {
  const raw = readFileSync(path.resolve(process.cwd(), 'data', file), 'utf-8')
  return (parse(raw) ?? []) as T[]
}

// Sorting that the old GROQ queries used to do server-side
export function getNurseries(): Nursery[] {
  return load<Nursery>('nurseries.yaml').sort(
    (a, b) =>
      Number(b.isEndorsed ?? false) - Number(a.isEndorsed ?? false) ||
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  )
}

export function getLandscapers(): LandscapeCompany[] {
  return load<LandscapeCompany>('landscapers.yaml').sort((a, b) => a.name.localeCompare(b.name))
}

export function getEvents(): EventItem[] {
  return load<EventItem>('events.yaml').sort((a, b) => a.dateStart.localeCompare(b.dateStart))
}

export function getGardens(): Garden[] {
  return load<Garden>('gardens.yaml').sort((a, b) => a.name.localeCompare(b.name))
}

export function getRecurringActivities(): RecurringActivity[] {
  return load<RecurringActivity>('recurring-activities.yaml').sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}
