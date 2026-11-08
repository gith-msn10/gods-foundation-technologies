// Downloads one starter photo per product type from Pexels into src/assets/products/.
// Usage (from the project root):  PEXELS_API_KEY=your_key node scripts/fetch-images.mjs
// Free key: https://www.pexels.com/api/   Requires Node 18+.
// Review every photo afterwards: replace wrong items or photos showing brand logos with your own photo of the
// same file name. Existing files are never overwritten. Credits are appended to IMAGE-CREDITS.md.
import fs from 'node:fs';
import path from 'node:path';
import { products } from '../src/data/products.js';

const KEY = (process.env.PEXELS_API_KEY || '').trim().replace(/^["']|["']$/g, '');
if (!KEY) {
  console.error('Missing PEXELS_API_KEY. Get a free key at https://www.pexels.com/api/ and run:\n  PEXELS_API_KEY=your_key node scripts/fetch-images.mjs');
  process.exit(1);
}

const OUT = path.resolve('src/assets/products');
const CREDITS = path.join(OUT, 'IMAGE-CREDITS.md');
fs.mkdirSync(OUT, { recursive: true });

// id -> [search words, which result to take (0 = first)]
const queries = {
  'android-phones': ['android smartphones'], 'iphones': ['iphone smartphone'], 'tablets': ['tablet computer'],
  'button-phones': ['keypad feature phone'], 'televisions': ['flat screen television'], 'standing-fans': ['standing fan'],
  'electric-clippers': ['electric hair clipper'], 'cctv-cameras': ['cctv security camera'], 'electric-stabilizers': ['voltage stabilizer'],
  'electric-cookers': ['electric cooker'], 'refrigerators': ['refrigerator'], 'ceiling-fans': ['ceiling fan'],
  'freezers': ['chest freezer'], 'sound-systems': ['home audio speakers'], 'bluetooth-speakers': ['bluetooth speaker'],
  'light-bulbs': ['light bulb'], 'electrical-sockets': ['electrical wall socket'], 'extension-boxes': ['power extension cord'],
  'power-adapters': ['power adapter plug'], 'phone-cases': ['phone case'], 'screen-protectors': ['phone screen protector'],
  'usb-a-chargers': ['usb phone charger'], 'usb-c-chargers': ['usb c charger cable'], 'wireless-chargers': ['wireless charger'],
  'headphones': ['headphones'], 'earpieces': ['wired earphones'], 'earbuds': ['wireless earbuds'],
  'power-banks-small': ['power bank', 0], 'power-banks-medium': ['power bank', 1], 'power-banks-high': ['power bank', 2],
  'phone-pouches': ['phone pouch'], 'tripods': ['phone tripod'], 'selfie-sticks': ['selfie stick'], 'ring-lights': ['ring light'],
  'rechargeable-torches': ['led flashlight'], 'rechargeable-fans': ['portable handheld fan'], 'cooking-gas-cylinders': ['gas cylinder'],
};

const exists = (id) => fs.readdirSync(OUT).some((f) => f.replace(/\.[^.]+$/, '') === id && /\.(webp|avif|jpe?g|png)$/i.test(f));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!fs.existsSync(CREDITS)) {
  fs.writeFileSync(CREDITS, '# Image credits and licences\n\n| File | Source page URL | Author | Licence | Date checked |\n|------|-----------------|--------|---------|--------------|\n');
}

let added = 0;
for (const p of products) {
  if (exists(p.id)) { console.log(`skip  ${p.id} (already has a photo)`); continue; }
  const [q, pick = 0] = queries[p.id] || [p.name.toLowerCase()];
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&orientation=landscape&per_page=5`, { headers: { Authorization: KEY } });
    if (res.status === 401 || res.status === 403) {
      console.error('\nPexels rejected the API key (' + res.status + '). Check that the full key was copied with no placeholder text,\nand that it was set correctly for your terminal (see the comments at the top of this file). Nothing more was downloaded.');
      process.exit(1);
    }
    if (!res.ok) throw new Error(`search failed (${res.status})`);
    const data = await res.json();
    const photo = data.photos?.[pick] || data.photos?.[0];
    if (!photo) throw new Error('no results');
    const img = await fetch(photo.src.large);
    if (!img.ok) throw new Error(`download failed (${img.status})`);
    fs.writeFileSync(path.join(OUT, `${p.id}.jpg`), Buffer.from(await img.arrayBuffer()));
    fs.appendFileSync(CREDITS, `| ${p.id}.jpg | ${photo.url} | ${photo.photographer} | Pexels License | ${new Date().toISOString().slice(0, 10)} |\n`);
    added += 1;
    console.log(`saved ${p.id}.jpg  (${photo.photographer})`);
  } catch (err) {
    console.log(`FAILED ${p.id}: ${err.message}`);
  }
  await sleep(400);
}
console.log(`\nDone. ${added} photos added. Open src/assets/products/ and check each one before publishing.`);
