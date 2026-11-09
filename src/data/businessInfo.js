// SINGLE SOURCE OF TRUTH for business details.
// Empty strings / empty arrays mean "not supplied yet". Nothing is invented:
// buttons that need a missing value render as visibly disabled, and the
// JSON-LD only includes fields that are filled in.

export const businessInfo = {
  name: "God's Foundation Technologies",
  description:
    "God's Foundation Technologies is a phone and accessories business located in Emene, Enugu State, Nigeria. Our website makes it easier for customers to explore our product range, find our store, and contact us about the products they need.",
  shortDescription: 'Phones and accessories in Emene, Enugu State, Nigeria.',

  // --- FILL THESE IN (leave "" until verified) ---
  phone: '0810 997 6506', // display format, e.g. "0801 234 5678"
  whatsappNumber: '2348109976506', // international format, digits only, e.g. "2348012345678"
  facebookUrl: 'https://www.facebook.com/profile.php?id=61557347282633', // e.g. "https://www.facebook.com/your-page"
  email: 'Godsfounda84@gmail.com', // e.g. "info@yourdomain.com"
  streetAddress: '22 Rahabilitation Road Opposite our Lady Catholic Church, Emene Enugu.', // exact, verified street address
  mapsUrl: 'https://maps.app.goo.gl/uxyH9e5vLkbf5kbFA', // Google Maps link to the verified shop location
  latitude: '', // verified coordinates, optional (used only in JSON-LD)
  longitude: '',
  siteUrl: '', // e.g. "https://www.yourdomain.com" (no trailing slash)
  logoUrl: '/images/branding/gft-logo/favicon.svg', // absolute URL or path to a real logo file, optional
  heroImage: '/images/branding/hero.jpg', // path in /public/images, e.g. "/images/branding/hero.webp"
  heroImageAlt: 'store image',
  aboutPhoto: '/images/branding/store.jpg', // genuine photo of the store or owner, e.g. "/images/branding/store.webp"
  aboutPhotoAlt: 'business owner',

  // --- Opening hours: see the instructions in the block below ---
  timeZone: 'Africa/Lagos', // Enugu time (UTC+1, no daylight saving)

  // --- Fixed location facts from the brief ---
  city: 'Emene',
  state: 'Enugu State',
  country: 'Nigeria',
};

// OPENING HOURS (single source for every section, the live status and the JSON-LD).
// Use 24-hour "HH:MM" times. Replace each `null` once the owner confirms the real hours:
//   monday: { open: '08:00', close: '18:00' }
//   sunday: { closed: true }
//   friday: { open: '18:00', close: '02:00' }          (a close before the open crosses midnight)
//   saturday: [{ open: '08:00', close: '12:00' }, { open: '14:00', close: '18:00' }]   (split shift)
// Until all seven days are filled in, the site shows "Opening hours not yet available",
// never an open/closed status, and leaves opening hours out of the structured data.
weeklyHours: [
  { days: "Monday - Saturday", hours: "7:00 AM - 9:00 PM" },
  { days: "Sunday", hours: "Closed" },
]

export const weeklyHours = {
  monday: {open: '07:00', close: '21:00'},
  tuesday: {open: '07:00', close: '21:00'},
  wednesday: {open: '07:00', close: '21:00'},
  thursday: {open: '07:00', close: '21:00'},
  friday: {open: '07:00', close: '21:00'},
  saturday: {open: '07:00', close: '21:00'},
  sunday: {closed:true, closed:true},
};

// TEMPORARY CHANGES (holidays, early closing...). Dates are YYYY-MM-DD in Enugu time.
//   { date: '2026-12-25', closed: true, note: 'Christmas Day' }
//   { date: '2026-12-31', hours: { open: '08:00', close: '14:00' }, note: 'Early closing' }
// Remove entries once their date has passed (past entries are ignored anyway).
export const scheduleExceptions = [];

export const locationLine = `${businessInfo.city}, ${businessInfo.state}, ${businessInfo.country}`;

// Values that must be supplied before launch (used for the dev-only console warning).
export const requiredFields = [
  'whatsappNumber',
  'facebookUrl',
  'email',
  'streetAddress',
  'mapsUrl',
  'weeklyHours',
  'siteUrl',
];
