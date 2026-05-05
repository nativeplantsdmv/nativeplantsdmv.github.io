export const gardenSchema = {
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
