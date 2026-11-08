import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { productInquiryUrl } from '../utils/links';
import ProductImage from './ProductImage';

const shell = 'flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white';

function CardBody({ product, interactive }) {
  return (
    <>
      <ProductImage product={product} />
      <div className="flex flex-1 flex-col border-t border-line p-3 sm:p-4">
        <h4 className="text-sm font-semibold leading-snug text-ink sm:text-base">{product.name}</h4>
        {product.subtitle && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">{product.subtitle}</p>}
        {interactive && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold text-brand sm:text-sm">
            <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
            Ask about this
            <FontAwesomeIcon icon={faArrowRight} className="text-[0.7em] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );
}

// The whole card opens a WhatsApp enquiry for that product type. If no WhatsApp number is configured
// yet, the card is a plain, non-interactive tile (no fake hover or link).
function ProductCard({ product }) {
  const href = productInquiryUrl(product.name);
  if (!href) {
    return (
      <article className={shell}>
        <CardBody product={product} interactive={false} />
      </article>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} group transition-shadow hover:border-brand/40 hover:shadow-md active:bg-mist`}
    >
      <CardBody product={product} interactive />
      <span className="sr-only">: ask about {product.name} on WhatsApp (opens in a new tab)</span>
    </a>
  );
}

export default memo(ProductCard);
