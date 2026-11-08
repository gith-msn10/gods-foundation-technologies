# Product photos

Put one photo per product type in this folder. The **file name must match the product id**
(see `src/data/products.js`). Supported: `.webp` (preferred), `.avif`, `.jpg`, `.png`.
No code changes are needed: the photo appears automatically after you rebuild or restart `npm run dev`.
Products without a file show an icon tile.

## Recommended photo format
- Landscape 4:3, about 800 x 600 px, WebP, under about 60 KB each.
- Plain or white background, product fully visible and centred.
- NO visible brand names, logos or model numbers (this section must stay brand-free).
- Only use images whose licence allows commercial use (Unsplash, Pexels, Pixabay licences, or Wikimedia Commons
  files with a commercial-use licence), or your own photos. Check the licence on each image page.
- Record every image in `IMAGE-CREDITS.md` (source URL, author, licence, date checked).

## File names to use
android-phones, iphones, tablets, button-phones,
televisions, standing-fans, electric-clippers, cctv-cameras, electric-stabilizers, electric-cookers,
refrigerators, ceiling-fans, freezers, sound-systems, bluetooth-speakers,
light-bulbs, electrical-sockets, extension-boxes, power-adapters,
phone-cases, screen-protectors, usb-a-chargers, usb-c-chargers, wireless-chargers, headphones, earpieces,
earbuds, power-banks-small, power-banks-medium, power-banks-high, phone-pouches, tripods, selfie-sticks, ring-lights,
rechargeable-torches, rechargeable-fans, cooking-gas-cylinders

Example: `src/assets/products/android-phones.webp`
