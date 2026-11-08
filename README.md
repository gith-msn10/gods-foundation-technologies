# God's Foundation Technologies website

React + Tailwind CSS + Font Awesome (JavaScript/JSX). Phone and accessories catalog for Emene, Enugu.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build + prerendering (writes dist/index.html and dist/404.html)
npm test         # unit tests: opening-hours logic and product data
npm run verify   # compares your files with the original and lists missing/different/extra files
npm run preview  # preview the build
```

## Replace business details
Edit **src/data/businessInfo.js**. Leave a value as `""` until it is verified; buttons that need it show as disabled and the JSON-LD leaves it out.
Needed: whatsappNumber (digits only, e.g. 2348012345678), phone, email, facebookUrl, streetAddress, mapsUrl, siteUrl, logoUrl, latitude/longitude, aboutPhoto, heroImage.

## Opening hours and live status
Edit `weeklyHours` and `scheduleExceptions` in **src/data/businessInfo.js** (instructions are in the comments above them).
- Per day: `{ open: '08:00', close: '18:00' }`, `{ closed: true }`, a close earlier than the open for hours past midnight, or an array for split shifts.
- Holidays or early closing: add an entry to `scheduleExceptions`, for example `{ date: '2026-12-25', closed: true, note: 'Christmas Day' }`.
- Until **all seven days** are filled in, the site shows "Opening hours not yet available", no Open/Closed status, and leaves hours out of the JSON-LD.
- Times use the Africa/Lagos time zone (`timeZone` in the config). The status refreshes every 30 seconds and when the tab is revisited.
- The schedule appears in the Opening Hours section, the Store Location card, the Contact section and the footer, all from this one config.

## Products
The product section lists general product types (no brands, models or prices) in six categories. Edit **src/data/products.js** to add or rename a product type (and add an icon for it in `src/data/productIcons.js`).
Photos: drop a file named after the product id into **src/assets/products/** (for example `android-phones.webp`, 4:3, about 800x600). It appears automatically; products without a photo show an icon tile. See the README in that folder for all file names and licence rules.
Each card opens a WhatsApp enquiry once `whatsappNumber` is set in businessInfo.js.

## SEO files
After you know your domain, update `siteUrl` in businessInfo.js and replace `YOUR-DOMAIN.example` in `public/robots.txt` and `public/sitemap.xml`.

## Deploy to Vercel
1. Push the project to GitHub.
2. In Vercel choose **Add New > Project** and import the repo.
3. Framework preset: **Vite** (build `npm run build`, output `dist`). Deploy.
4. Add your domain under Project Settings > Domains, then update siteUrl, robots.txt and sitemap.xml.

## Prerendering and the 404 page
`npm run build` renders the page to real HTML (React hydrates it in the browser) and creates `dist/404.html`, which Vercel serves with a 404 status for unknown URLs. The open/closed status is deliberately not baked into the HTML; it is calculated in the visitor's browser.

Create a Google Business Profile separately. This website does not create or verify one, so keep the name, address, phone and hours identical in both places.
