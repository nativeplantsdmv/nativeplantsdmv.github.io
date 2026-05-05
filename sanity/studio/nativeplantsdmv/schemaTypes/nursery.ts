export const nurserySchema = {
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
    {name: 'isEndorsed', title: '⭐ Endorsed (Top 3)', description: 'Shown on Home page + top of Nurseries page with green border', type: 'boolean'},
    {name: 'sortOrder', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first. Endorsed nurseries sort first regardless.'},
  ],
  preview: {
    select: {title: 'name', url: 'url'},
    prepare({title, url}) { return {title, subtitle: url || '(no website)'} },
  },
}
