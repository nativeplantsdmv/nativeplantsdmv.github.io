// Event type
const eventSchema = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'venue', title: 'Venue / Location Name', type: 'string'},
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'dateStart', title: 'Date & Time (starts)', description: 'e.g. 2026-05-09T13:00', type: 'datetime'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'hosts', title: 'Hosted by (plain text)', type: 'string', description: 'e.g. CAC, SSTP Aid Community Garden group'},
    {name: 'noteType', title: 'Warning Note Type', description: 'Optional callout box before the event details', type: 'string', options: {list: [{title: 'Members Only', value: 'amber'}, {title: 'Info / Tip', value: 'green'}, {title: 'None', value: null}]}},
    {name: 'noteContent', title: 'Warning Note Text', type: 'text', hidden: ({parent}) => parent?.noteType !== 'amber' && parent?.noteType !== 'green'},
    {name: 'imageAsset', title: 'Event Image', type: 'image', options: {hotspot: true}},
  ],
  preview: {
    select: {title: 'title', dateStart: 'dateStart'},
    prepare({title, dateStart}) {
      const dateStr = dateStart ? new Date(dateStart).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) : ''
      return {title, subtitle: dateStr}
    },
  },
}

// Nursery type
const nurserySchema = {
  name: 'nursery',
  title: 'Nursery',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'url', title: 'Website URL', type: 'url'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'contactEmail', title: 'Contact Email', type: 'string'},
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'description', title: 'Description (1-2 sentences)', type: 'text'},
    {name: 'notes', title: 'Additional Notes', type: 'text', description: 'e.g. "Online orders only", "By appointment"'},
    {name: 'isEndorsed', title: 'Endorsed (Top 3)', description: 'Shown on Home page + top of Nurseries page with green border', type: 'boolean'},
    {name: 'sortOrder', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first. Endorsed nurseries sort first regardless.'},
  ],
  preview: {
    select: {title: 'name', url: 'url'},
    prepare({title, url}) { return {title, subtitle: url || '(no website)'} },
  },
}

// Landscape Company type
const landscapeCompanySchema = {
  name: 'landscapeCompany',
  title: 'Landscape Company',
  type: 'document',
  fields: [
    {name: 'name', title: 'Company Name', type: 'string'},
    {name: 'url', title: 'Website URL', type: 'url'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'contactEmail', title: 'Contact Email / Notes', description: 'e.g. "hello@bloom-wild.com" or "text 202-747-4702"', type: 'string'},
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
  ],
  preview: {select: {title: 'name'}, prepare({title}) { return {title} }},
}

// Garden type
const gardenSchema = {
  name: 'garden',
  title: 'Garden to Visit',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'url', title: 'Website URL', type: 'url'},
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'contactEmail', title: 'Contact Email', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
  ],
  preview: {select: {title: 'name'}, prepare({title}) { return {title} }},
}

export const schemaTypes = [
  eventSchema,
  nurserySchema,
  landscapeCompanySchema,
  gardenSchema,
]
