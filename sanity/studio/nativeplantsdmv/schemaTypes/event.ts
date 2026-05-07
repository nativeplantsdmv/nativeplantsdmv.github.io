export const eventSchema = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'venue', title: 'Venue / Location Name', type: 'string'},
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'dateStart', title: 'Date & Time (starts)', description: 'e.g. 2026-05-09T13:00', type: 'datetime'},
    {name: 'description', title: 'Description', type: 'blockContent'},
    {name: 'hosts', title: 'Hosted by (plain text)', type: 'string', description: 'e.g. CAC, SSTP Aid Community Garden group'},
    {name: 'noteType', title: 'Warning Note Type', description: 'Optional callout box before the event details', type: 'string', options: {list: [{title: 'Members Only', value: 'amber'}, {title: 'Info / Tip', value: 'green'}, {title: 'None', value: null}]}},
    {name: 'noteContent', title: 'Warning Note Text', type: 'blockContent', hidden: ({parent}) => parent?.noteType !== 'amber' && parent?.noteType !== 'green'},
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
