import ProductCard from './ProductCard';

// Two columns on phones (readable down to 320px), then 3 and 4 as space allows.
export default function ProductGrid({ id, items }) {
  return (
    <ul id={id} className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
