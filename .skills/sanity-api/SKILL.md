# Sanity Content API

Direct REST access to Sanity CMS. No MCP needed.

## Config

- **Project:** `z9dgpdy9`
- **Dataset:** `production`
- **API Version:** `2024-01-01`
- **Token:** loaded from `.env` via `env('SANITY_API_TOKEN')`

## Usage

Use plain `fetch` in eval (JS). The Bun sandbox can't resolve local node_modules, so don't use `@sanity/client`.

Get the token with `env('SANITY_API_TOKEN')` — the harness auto-loads `.env`. `process.env` is NOT populated.

### Read Query

```js
const token = env('SANITY_API_TOKEN');
const res = await fetch(
  'https://z9dgpdy9.api.sanity.io/v2024-01-01/data/query/production?query=' +
    encodeURIComponent('*[0...5]{_type, _id}'),
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const data = await res.json();
// result is in data.result
```

### Create Document

```js
const token = env('SANITY_API_TOKEN');
await fetch(
  'https://z9dgpdy9.api.sanity.io/v2024-01-01/data/document/production',
  {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _type: 'garden', name: '...', slug: { current: '...' } })
  }
);
```

### Patch Document

```js
const token = env('SANITY_API_TOKEN');
await fetch(
  'https://z9dgpdy9.api.sanity.io/v2024-01-01/data/document/production/patch/' +
    encodeURIComponent(docId),
  {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ set: { fieldName: 'newValue' } })
  }
);
```

### Delete Document

```js
const token = env('SANITY_API_TOKEN');
await fetch(
  'https://z9dgpdy9.api.sanity.io/v2024-01-01/data/document/production/delete/' +
    encodeURIComponent(docId),
  {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token}` }
  }
);
```

## Document Types

- `event` — plant swaps, workshops, community events
- `nursery` — local native plant nurseries
- `landscapeCompany` — landscape professionals
- `garden` — public gardens, arboreta
- `recurringActivity` — ongoing activities at locations

## Notes

- `.env` is auto-loaded by the harness. Use `env('SANITY_API_TOKEN')` in eval cells.
- `process.env` is NOT populated from `.env` in the Bun sandbox.
- GROQ queries use URL-encoded `query` parameter on the endpoint.
- Unauthenticated reads work on public datasets but authed reads return system docs too.
