/**
 * Seed script — imports sanity-seed/*.json into Sanity Cloud project.
 * 
 * Usage: SANITY_PROJECT_ID=z9dgpdy9 SANITY_DATASET=production SANITY_TOKEN=<api-token> node sanity-seed.js
 * 
 * To get an API token:
 *   1. Go to https://www.sanity.io/manage/project/<projectId>/api
 *   2. Click "Create New Token" (or use existing)
 *   3. Give it read/write permission for the production dataset
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const projectId = process.env.SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN || ''

if (!projectId || !token) {
  console.error('Need SANITY_PROJECT_ID and SANITY_TOKEN environment variables.')
  console.error('Get a token from: https://www.sanity.io/manage/project/' + projectId + '/api')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false, // Must use token with useCdn: false
})

// Sanitize a string into a valid Sanity document ID component
function sanitizeId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '')        // Trim leading/trailing hyphens
    .substring(0, 50)               // Max 50 chars
}

const seedDir = path.join(process.cwd(), 'sanity-seed')

// Map file types to Sanity document type names
const files = {
  event: { file: 'events.json', typeName: 'event' },
  nursery: { file: 'nurseries.json', typeName: 'nursery' },
  landscapeCompany: { file: 'landscapers.json', typeName: 'landscapeCompany' },
  garden: { file: 'gardens.json', typeName: 'garden' },
}

let created = 0
let updated = 0
let errors = []

for (const [key, config] of Object.entries(files)) {
  const filePath = path.join(seedDir, config.file)
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping ${config.file} — not found.`)
    continue
  }
  
  const docs = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`\nImporting ${key}: ${docs.length} documents...`)
  
  for (const doc of docs) {
    try {
      // Create a unique identifier if not present
      const rawName = doc.name || doc.title || `${key}-unknown`
      const id = `${config.typeName}-${sanitizeId(rawName)}`
      
      const sanitized = { ...doc }
      delete sanitized._id // Let Sanity handle IDs
      
      // IMPORTANT: Every Sanity document MUST have a _type field
      sanitized._type = config.typeName
      
      // Upsert: create if doesn't exist, update if does
      try {
        await client.create({ _id: id, ...sanitized })
        created++
      } catch (err) {
        if (err.statusCode === 409 || err.message?.includes('conflict')) {
          // Document already exists — try patching
          const result = await client.patch(id).set(sanitized).commit()
          updated++
        } else throw err
      }
    } catch (err) {
      errors.push(`${key}: ${err.message}`)
      console.error(`  ✗ Failed: ${doc.name || doc.title || '(unknown)'}`)
    }
  }
}

console.log(`\n${'='.repeat(50)}`)
console.log(`Done. Created: ${created}, Updated: ${updated}, Errors: ${errors.length}`)
if (errors.length > 0) {
  console.error('\nErrors:')
  errors.forEach(e => console.error(`  - ${e}`))
}
