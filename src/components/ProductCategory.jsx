import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ProductGrid from './ProductGrid';

export const INITIAL_VISIBLE = 8;

// One category block: heading, grid, and a working "View All" toggle (only shown when there is more to reveal).
// `showAll` forces the full list (used when a single category is selected or a search is active).
export default function ProductCategory({ category, items, showAll = false }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = !showAll && items.length > INITIAL_VISIBLE;
  const visible = collapsible && !expanded ? items.slice(0, INITIAL_VISIBLE) : items;
  const headingId = `${category.id}-heading`;
  const gridId = `${category.id}-grid`;

  return (
    <section id={`category-${category.id}`} aria-labelledby={headingId} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-3 border-b border-line pb-3">
        <h3 id={headingId} className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-ink sm:text-base">
          <span className="h-5 w-1 rounded bg-cyan" aria-hidden="true" />
          {category.label}
        </h3>
        <p className="shrink-0 text-xs text-muted">
          {items.length} {items.length === 1 ? 'product type' : 'product types'}
        </p>
      </div>

      <ProductGrid id={gridId} items={visible} />

      {collapsible && (
        <div className="mt-5 text-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={gridId}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-mist active:bg-line"
          >
            {expanded ? 'Show Less' : `View All ${items.length}`}
            <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
