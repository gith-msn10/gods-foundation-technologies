import { useEffect } from 'react';
import { businessInfo } from '../data/businessInfo';
import { serializeJsonLd } from '../utils/seo';

// In production the prerendered HTML already contains these tags (marked data-seo).
// This fallback adds them when running `npm run dev`, where no prerendering happens.
export default function SEO() {
  useEffect(() => {
    if (document.querySelector('[data-seo]')) return undefined;
    const added = [];
    const url = (businessInfo.siteUrl || '').trim().replace(/\/$/, '');
    if (url) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = `${url}/`;
      const og = document.createElement('meta');
      og.setAttribute('property', 'og:url');
      og.content = `${url}/`;
      added.push(canonical, og);
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = serializeJsonLd();
    added.push(script);
    document.head.append(...added);
    return () => added.forEach((el) => el.remove());
  }, []);

  return null;
}
