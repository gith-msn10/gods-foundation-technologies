import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProductImage } from '../utils/productImages';
import { productIcons, fallbackIcon } from '../data/productIcons';

// Real photo when one exists in src/assets/products/, otherwise (or if it fails to load) an icon tile.
// The fixed 4:3 box prevents layout shift; object-contain shows the whole product without cropping.
export default function ProductImage({ product, eager = false }) {
  const [failed, setFailed] = useState(false);
  const src = getProductImage(product.id);

  if (!src || failed) {
    return (
      <div
        className="flex aspect-[4/3] w-full items-center justify-center bg-mist"
        role="img"
        aria-label={`${product.name} (photo coming soon)`}
      >
        <FontAwesomeIcon icon={productIcons[product.id] || fallbackIcon} className="text-4xl text-brand/70 sm:text-5xl" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={product.alt}
      width="400"
      height="300"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full bg-white object-contain p-3"
    />
  );
}
