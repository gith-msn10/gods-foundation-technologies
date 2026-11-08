import "./MajorBrands.css";

// Display-only list. Every brand appears exactly once.
const BRANDS = [
  "Apple",
  "Vivo",
  "Itel",
  "Tecno",
  "Oppo",
  "Huawei",
  "Samsung",
  "Infinix",
  "Haier Thermocool",
  "Nokia",
  "Redmi",
  "Hisense",
  "Oraimo",
  "Lontor",
  "LG",
  "HMD",
  "JBL",
  "Nexus",
  "Binatone",
  "Polystar",
  "Bosch",
  "TCL",
  "Midea",
];

// Standalone, display-only section. No links, buttons, or click handlers.
export default function MajorBrands() {
  return (
    <section className="gftb-section" aria-labelledby="gftb-heading">
      <div className="gftb-inner">
        <h2 id="gftb-heading" className="gftb-heading">
          Our Major Brands
        </h2>
        <span className="gftb-rule" aria-hidden="true"></span>
        <ul className="gftb-grid">
          {BRANDS.map((brand) => (
            <li key={brand} className="gftb-item">
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
