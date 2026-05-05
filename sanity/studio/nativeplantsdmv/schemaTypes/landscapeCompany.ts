export const landscapeCompanySchema = {
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
