// Run with: node scripts/test-products.mjs   (plain Node, no dependencies)
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { categories, products } from '../src/data/products.js';

const expected = {
  'mobile-phones': ['Android Phones', 'iPhones', 'Tablets', 'Button Phones'],
  'home-office': ['Televisions', 'Standing Fans', 'Electric Clippers', 'CCTV Cameras', 'Electric Stabilizers', 'Electric Cookers', 'Refrigerators', 'Ceiling Fans', 'Freezers', 'Sound Systems', 'Bluetooth Speakers'],
  'electrical': ['Light Bulbs', 'Electrical Sockets', 'Extension Boxes', 'Power Adapters'],
  'phone-accessories': ['Phone Cases', 'Screen Protectors / Screen Guards', 'USB-A Chargers', 'USB-C Chargers', 'Wireless Chargers', 'Headphones', 'Earpieces', 'Earbuds / EarPods', 'Small Capacity Power Banks', 'Medium Capacity Power Banks', 'High Capacity Power Banks', 'Phone Pouches', 'Tripods', 'Selfie Sticks', 'Ring Lights'],
  'other-accessories': ['Rechargeable Torches', 'Rechargeable Fans'],
  'other-products': ['Cooking Gas Cylinders'],
};
const labels = ['Mobile Phones', 'Home & Office Appliances', 'Electrical Appliances', 'Phone Accessories', 'Other Accessories', 'Other Products'];
let n = 0;
const test = (name, fn) => { fn(); n += 1; console.log(`ok  ${name}`); };

test('six main categories with the requested titles, in order', () => {
  assert.deepEqual(categories.map((c) => c.label), labels);
});
test('every requested product is present in its category, in order', () => {
  for (const [id, names] of Object.entries(expected)) {
    assert.deepEqual(products.filter((p) => p.category === id).map((p) => p.name), names, id);
  }
  assert.equal(products.length, 37);
});
test('ids are unique, kebab-case, and categories are valid', () => {
  const ids = products.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  ids.forEach((id) => assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/));
  const valid = new Set(categories.map((c) => c.id));
  products.forEach((p) => assert.ok(valid.has(p.category), p.id));
});
test('products carry no price, brand, rating, stock or discount fields', () => {
  products.forEach((p) => assert.deepEqual(Object.keys(p).sort(), ['alt', 'category', 'id', 'name', 'subtitle']));
});
test('no prices, currency symbols or brand names appear in any text', () => {
  const brands = /\b(samsung|galaxy|tecno|infinix|itel|xiaomi|redmi|huawei|oppo|vivo|nokia|apple|lg|hisense|haier|thermocool|oraimo|anker|jbl|sony|philips|binatone|scanfrost|bruhm|midea|tcl|hp|dell|lenovo|realme|ugreen|baseus|mi)\b/i;
  const money = /[\u20A6$\u00A3\u20AC]|\b(ngn|naira|price|discount|sale|off)\b/i;
  const text = JSON.stringify([categories, products]);
  assert.ok(!brands.test(text), 'brand name found');
  assert.ok(!money.test(text), 'price wording found');
});
test('every product has alt text and a subtitle', () => {
  products.forEach((p) => { assert.ok(p.alt.length > 3, p.id); assert.ok(p.subtitle.length > 3 && p.subtitle.length <= 40, p.id); });
});
test('icon map covers every product and category', () => {
  const src = fs.readFileSync(new URL('../src/data/productIcons.js', import.meta.url), 'utf8');
  [...products.map((p) => p.id), ...categories.map((c) => c.id)].forEach((id) => assert.ok(src.includes(`'${id}':`), `icon missing for ${id}`));
});
console.log(`\n${n} tests passed`);
