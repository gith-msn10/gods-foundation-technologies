import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeadset, faCommentDots, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SectionHeading from './SectionHeading';

const features = [
  { icon: faMagnifyingGlass, title: 'Convenient Product Discovery', text: 'Browse phones and accessories by category or search for the item you need before you visit.' },
  { icon: faHeadset, title: 'Helpful Customer Assistance', text: 'Contact the store with questions about a product and get help finding the right accessory.' },
  { icon: faCommentDots, title: 'Easy Product Inquiries', text: 'Ask about any product on WhatsApp with the product name already filled in.' },
  { icon: faLocationDot, title: 'Convenient Store Location', text: 'Visit the shop in Emene, Enugu and contact us for directions.' },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="why-heading" title="Why Choose God's Foundation Technologies" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-white p-5 transition-shadow hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-cyan">
                <FontAwesomeIcon icon={f.icon} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
