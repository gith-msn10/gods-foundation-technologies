// PRODUCT CATALOGUE: general product types only.
// By design this file contains NO brands, model numbers, prices, discounts, ratings, stock levels or reviews.
//
// To add a product type: add one line to `products` below (and an icon in productIcons.js).
// Photos are NOT referenced here. Drop a file named after the product `id` into src/assets/products/
// (for example src/assets/products/android-phones.webp) and it appears automatically.
// Until a photo exists, the card shows an icon tile, never a broken image.

export const categories = [
  { id: 'mobile-phones', label: 'Mobile Phones' },
  { id: 'home-office', label: 'Home & Office Appliances' },
  { id: 'electrical', label: 'Electrical Appliances' },
  { id: 'phone-accessories', label: 'Phone Accessories' },
  { id: 'other-accessories', label: 'Other Accessories' },
  { id: 'other-products', label: 'Other Products' },
];

// p(id, name, category, subtitle, alt)
const p = (id, name, category, subtitle, alt) => ({ id, name, category, subtitle, alt });

export const products = [
  // MOBILE PHONES
  p('android-phones', 'Android Phones', 'mobile-phones', 'Touchscreen Android smartphones', 'Selection of Android smartphones'),
  p('iphones', 'iPhones', 'mobile-phones', 'iOS smartphones', 'Selection of iPhones'),
  p('tablets', 'Tablets', 'mobile-phones', 'Portable touchscreen tablets', 'Tablet computers'),
  p('button-phones', 'Button Phones', 'mobile-phones', 'Simple keypad mobile phones', 'Keypad button phones'),

  // HOME & OFFICE APPLIANCES
  p('televisions', 'Televisions', 'home-office', 'Screens for home and office', 'Flat-screen television'),
  p('standing-fans', 'Standing Fans', 'home-office', 'Adjustable floor-standing fans', 'Standing fan'),
  p('electric-clippers', 'Electric Clippers', 'home-office', 'Hair and beard trimming', 'Electric hair clipper'),
  p('cctv-cameras', 'CCTV Cameras', 'home-office', 'Security and surveillance cameras', 'CCTV security cameras'),
  p('electric-stabilizers', 'Electric Stabilizers', 'home-office', 'Voltage protection for appliances', 'Electric voltage stabilizer'),
  p('electric-cookers', 'Electric Cookers', 'home-office', 'Electric cooking appliances', 'Electric cooker'),
  p('refrigerators', 'Refrigerators', 'home-office', 'Keep food and drinks cool', 'Refrigerator'),
  p('ceiling-fans', 'Ceiling Fans', 'home-office', 'Ceiling-mounted room fans', 'Ceiling fan'),
  p('freezers', 'Freezers', 'home-office', 'Frozen food storage', 'Chest freezer'),
  p('sound-systems', 'Sound Systems', 'home-office', 'Home and event audio systems', 'Home sound system'),
  p('bluetooth-speakers', 'Bluetooth Speakers', 'home-office', 'Wireless portable speakers', 'Portable Bluetooth speaker'),

  // ELECTRICAL APPLIANCES
  p('light-bulbs', 'Light Bulbs', 'electrical', 'Lighting for rooms and offices', 'Light bulbs'),
  p('electrical-sockets', 'Electrical Sockets', 'electrical', 'Wall and power outlet sockets', 'Electrical wall sockets'),
  p('extension-boxes', 'Extension Boxes', 'electrical', 'Multi-outlet power extensions', 'Power extension box'),
  p('power-adapters', 'Power Adapters', 'electrical', 'Adapters for electronic devices', 'Power adapter'),

  // PHONE ACCESSORIES
  p('phone-cases', 'Phone Cases', 'phone-accessories', 'Protective covers for phones', 'Assorted phone cases'),
  p('screen-protectors', 'Screen Protectors / Screen Guards', 'phone-accessories', 'Protect your phone screen', 'Phone screen protector'),
  p('usb-a-chargers', 'USB-A Chargers', 'phone-accessories', 'Phone Chargers', 'USB-A phone charger'),
  p('usb-c-chargers', 'USB-C Chargers', 'phone-accessories', 'Phone Chargers', 'USB-C phone charger'),
  p('iphone-chargers', 'iOS Chargers', 'phone-accessories', 'Phone Chargers', 'Wireless charging pad'),
  p('headphones', 'Headphones', 'phone-accessories', 'Headphones for music and calls', 'Headphones'),
  p('earpieces', 'Earpieces', 'phone-accessories', 'Earpieces for calls and music', 'Wired earpieces'),
  p('earbuds', 'Earbuds / EarPods', 'phone-accessories', 'Compact in-ear audio', 'Earbuds'),
  p('power-banks-small', 'Small Capacity Power Banks', 'phone-accessories', 'Power Banks', 'Small capacity power bank'),
  p('power-banks-medium', 'Medium Capacity Power Banks', 'phone-accessories', 'Power Banks', 'Medium capacity power bank'),
  p('power-banks-high', 'High Capacity Power Banks', 'phone-accessories', 'Power Banks', 'High capacity power bank'),
  p('phone-pouches', 'Phone Pouches', 'phone-accessories', 'Carry pouches for phones', 'Phone pouch'),
  p('tripods', 'Tripods', 'phone-accessories', 'Stands for phones and cameras', 'Phone tripod'),
  p('selfie-sticks', 'Selfie Sticks', 'phone-accessories', 'Extendable phone holders', 'Selfie stick'),
  p('ring-lights', 'Ring Lights', 'phone-accessories', 'Lighting for photos and video', 'Ring light on a stand'),

  // OTHER ACCESSORIES
  p('rechargeable-torches', 'Rechargeable Torches', 'other-accessories', 'Portable rechargeable lights', 'Rechargeable torch'),
  p('rechargeable-fans', 'Rechargeable Fans', 'other-accessories', 'Fans that run on a battery', 'Rechargeable fan'),

  // OTHER PRODUCTS
  p('cooking-gas-cylinders', 'Cooking Gas Cylinders', 'other-products', 'Gas cylinders for cooking', 'Cooking gas cylinder'),
];
