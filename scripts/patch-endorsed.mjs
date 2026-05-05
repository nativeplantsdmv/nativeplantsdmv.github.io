
import {createClient} from '@sanity/client';

const client = createClient({
  projectId: 'z9dgpdy9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
});

const docs = await client.fetch("*[_type == 'nursery' && !defined(isEndorsed)]");
console.log(`Found ${docs.length} nurseries without isEndorsed`);

for (const doc of docs) {
  await client.patch(doc._id).set({isEndorsed: false}).commit();
  console.log(`  Patched: ${doc.name}`);
}

const all = await client.fetch("*[_type == 'nursery'] | order(isEndorsed desc)");
const endorsed = all.filter(d => d.isEndorsed);
const notEndorsed = all.filter(d => d.isEndorsed === false);
const missing = all.filter(d => d.isEndorsed === undefined || d.isEndorsed === null);
console.log(`\nResult: ${endorsed.length} endorsed, ${notEndorsed.length} explicitly false, ${missing.length} still missing`);
