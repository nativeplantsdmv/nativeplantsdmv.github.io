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

const seedDir = path.join(process.cwd(), 'sanity-seed')

const files = {
  event: 'events.json',
  nursery: 'nurseries.json',
  landscapeCompany: 'landscapers.json',
  garden: 'gardens.json',
}

let created = 0
let updated = 0
let errors = []

for (const [type, file] of Object.entries(files)) {
  const filePath = path.join(seedDir, file)
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping ${file} — not found.`)
    continue
  }
  
  const docs = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`\nImporting ${type}: ${docs.length} documents...`)
  
  for (const doc of docs) {
    try {
      // Create a unique identifier if not present
      const id = doc._id || `${type}-${doc.name || doc.title || ''}`.replace(/\s+/g, '-').toLowerCase()
      
      const sanitized = { ...doc }
      delete sanitized._id // Let Sanity assign the ID
      
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
      errors.push(`${type}: ${err.message}`)
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
