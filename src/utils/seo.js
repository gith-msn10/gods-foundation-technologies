import { businessInfo, weeklyHours } from '../data/businessInfo';
import { buildOpeningHoursSpec } from './hours';

const siteUrl = () => (businessInfo.siteUrl || '').trim().replace(/\/$/, '');

// JSON-LD with verified (non-empty) fields only. Opening hours appear only when all seven days are configured.
export function buildJsonLd() {
  const url = siteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: businessInfo.name,
    description: businessInfo.shortDescription,
    address: {
      '@type': 'PostalAddress',
      ...(businessInfo.streetAddress && { streetAddress: businessInfo.streetAddress }),
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.state,
      addressCountry: 'NG',
    },
  };
  if (url) data.url = `${url}/`;
  if (businessInfo.logoUrl) data.logo = businessInfo.logoUrl;
  if (businessInfo.phone) data.telephone = businessInfo.phone;
  if (businessInfo.email) data.email = businessInfo.email;
  if (businessInfo.facebookUrl) data.sameAs = [businessInfo.facebookUrl];
  if (businessInfo.latitude && businessInfo.longitude) {
    data.geo = { '@type': 'GeoCoordinates', latitude: businessInfo.latitude, longitude: businessInfo.longitude };
  }
  const hours = buildOpeningHoursSpec(weeklyHours);
  if (hours) data.openingHoursSpecification = hours;
  return data;
}

export const serializeJsonLd = () => JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');

// Head tags written into the prerendered HTML. `data-seo` lets SEO.jsx know they already exist.
export function buildHeadHtml() {
  const url = siteUrl();
  const tags = [];
  if (url) {
    tags.push(`<link rel="canonical" href="${url}/" data-seo />`);
    tags.push(`<meta property="og:url" content="${url}/" data-seo />`);
  }
  tags.push(`<script type="application/ld+json" data-seo>${serializeJsonLd()}</script>`);
  return tags.join('\n    ');
}
