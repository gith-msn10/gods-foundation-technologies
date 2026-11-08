import { useMemo, useState } from 'react';
import { categories, products } from '../data/products';
import { generalWhatsappUrl } from '../utils/links';
import SectionHeading from './SectionHeading';
import ProductSearch from './ProductSearch';
import CategoryNavigation from './CategoryNavigation';
import ProductCategory from './ProductCategory';

// The product section (id="products"). Receives the selected category from App so the footer's
// category links can control it.
export default function ProductCatalog({ category, onCategoryChange }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const whatsappReady = Boolean(generalWhatsappUrl());

  const groups = useMemo(
    () =>
      categories
        .filter((c) => category === 'all' || c.id === category)
        .map((c) => ({
          category: c,
          items: products.filter(
            (p) => p.category === c.id && (!q || `${p.name} ${p.subtitle} ${c.label}`.toLowerCase().includes(q))
          ),
        }))
        .filter((g) => g.items.length > 0),
    [category, q]
  );

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);
  const showAll = q.length > 0 || category !== 'all';
  const reset = () => {
    setQuery('');
    onCategoryChange('all');
  };

  return (
    <section id="products" aria-labelledby="products-heading" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="products-heading" title="Explore Our Products">
          Browse the types of phones, appliances and accessories we sell. Contact us to confirm availability and current prices
          {whatsappReady ? '. Tap any product to ask about it on WhatsApp.' : '.'}
        </SectionHeading>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <CategoryNavigation active={category} onChange={onCategoryChange} />
          <ProductSearch value={query} onChange={setQuery} />
        </div>

        {import.meta.env.DEV && !whatsappReady && (
          <p className="mt-4 rounded-md bg-mist px-3 py-2 text-xs text-muted">
            Dev note: cards become tappable WhatsApp enquiries once whatsappNumber is set in src/data/businessInfo.js.
          </p>
        )}

        <p className="mt-5 text-sm text-muted" role="status" aria-live="polite">
          {total} {total === 1 ? 'product type' : 'product types'} shown
        </p>

        {groups.length > 0 ? (
          <div className="mt-4 space-y-12">
            {groups.map((g) => (
              <ProductCategory key={g.category.id} category={g.category} items={g.items} showAll={showAll} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-line bg-mist p-8 text-center">
            <p className="font-semibold text-ink">No products match your search.</p>
            <p className="mt-1 text-sm text-muted">Try a different word, or contact us to ask if we have what you need.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
