// Finds product photos automatically: any file in src/assets/products/ named after a product id
// (android-phones.webp, tablets.jpg, ...) is picked up at build time, hashed, and served by Vite.
// A product with no file simply gets no URL, so no request is made and no broken image can appear.
import { productImageUrls, normalizeImageUrl } from '../data/productImageUrls';

const files = import.meta.glob('../assets/products/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byId = {};
Object.entries(files).forEach(([path, url]) => {
  const id = path.split('/').pop().replace(/\.[^.]+$/, '');
  if (!byId[id]) byId[id] = url;
});

// A photo file in src/assets/products/ wins; otherwise a link pasted into data/productImageUrls.js; otherwise '' (icon tile).
export const getProductImage = (id) => byId[id] || normalizeImageUrl(productImageUrls[id]);
