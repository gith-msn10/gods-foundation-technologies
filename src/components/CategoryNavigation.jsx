import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories } from '../data/products';
import { categoryIcons, allProductsIcon } from '../data/productIcons';

const items = [{ id: 'all', label: 'All Products', icon: allProductsIcon }, ...categories.map((c) => ({ ...c, icon: categoryIcons[c.id] }))];

// Selecting a category filters the catalogue to that category; "All Products" shows every category.
export default function CategoryNavigation({ active, onChange }) {
  return (
    <nav aria-label="Product categories">
      <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {items.map((c) => {
          const selected = active === c.id;
          return (
            <li key={c.id} className={c.id === 'all' ? 'col-span-2 sm:col-auto' : ''}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(c.id)}
                className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center text-sm font-medium leading-tight transition-colors sm:w-auto sm:rounded-full sm:px-4 ${
                  selected ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:bg-mist'
                }`}
              >
                <FontAwesomeIcon icon={c.icon} className={`shrink-0 ${selected ? 'text-cyan' : 'text-brand'}`} aria-hidden="true" />
                {c.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
