// Optional: paste a Pexels link for a product here instead of downloading the photo.
// 1. On pexels.com open the photo you like and copy the page address, for example
//      https://www.pexels.com/photo/white-smartphone-on-a-table-1234567/
//    (a direct images.pexels.com link also works).
// 2. Paste it between the quotes next to the matching product below.
// Photos saved in src/assets/products/ (named after the product id) take priority over links here.
// Choose photos with no visible brand names or logos. Leave a product as '' to keep its icon tile.
// If a link is wrong or fails to load, the card automatically falls back to the icon tile.

export const productImageUrls = {
  'android-phones': '',
  'iphones': '',
  'tablets': '',
  'button-phones': '',
  'televisions': '',
  'standing-fans': '',
  'electric-clippers': '',
  'cctv-cameras': '',
  'electric-stabilizers': '',
  'electric-cookers': '',
  'refrigerators': '',
  'ceiling-fans': '',
  'freezers': '',
  'sound-systems': '',
  'bluetooth-speakers': '',
  'light-bulbs': '',
  'electrical-sockets': '',
  'extension-boxes': '',
  'power-adapters': '',
  'phone-cases': '',
  'screen-protectors': '',
  'usb-a-chargers': '',
  'usb-c-chargers': '',
  'wireless-chargers': '',
  'headphones': '',
  'earpieces': '',
  'earbuds': '',
  'power-banks-small': '',
  'power-banks-medium': '',
  'power-banks-high': '',
  'phone-pouches': '',
  'tripods': '',
  'selfie-sticks': '',
  'ring-lights': '',
  'rechargeable-torches': '',
  'rechargeable-fans': '',
  'cooking-gas-cylinders': '',
};

// Turns a Pexels photo page link into a direct, compressed 800px image URL. Other http(s) links pass through.
export function normalizeImageUrl(url) {
  const u = String(url || '').trim();
  if (!u) return '';
  const page = /^https?:\/\/(?:www\.)?pexels\.com\/.*?-(\d+)\/?(?:[?#].*)?$/i.exec(u);
  if (page) return `https://images.pexels.com/photos/${page[1]}/pexels-photo-${page[1]}.jpeg?auto=compress&cs=tinysrgb&w=800`;
  return /^https?:\/\//i.test(u) ? u : '';
}
