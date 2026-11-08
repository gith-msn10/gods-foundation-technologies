import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { businessInfo, locationLine } from '../data/businessInfo';
import SectionHeading from './SectionHeading';

const faqs = [
  { q: "Where is God's Foundation Technologies located?", a: `We are in ${locationLine}.${businessInfo.streetAddress ? ` Our address is ${businessInfo.streetAddress}.` : ' Contact us for directions to the shop.'}` },
  { q: 'How can I find out the price of a product?', a: 'Prices can change, so please contact us on WhatsApp and we will tell you the current price.' },
  { q: 'How can I confirm product availability?', a: 'Use the "Ask on WhatsApp" button on any product. We will confirm whether it is available.' },
  { q: 'Can I contact the store through WhatsApp?', a: 'Yes. Use any "Chat on WhatsApp" button on this page to message the store directly.' },
  { q: 'How can I find directions to the shop?', a: 'Use the "Get Directions" button in the Location section, or message us and we will guide you to the shop in Emene, Enugu.' },
  { q: 'How do I inquire about a particular phone accessory?', a: 'Search for it in the product catalog and tap "Ask on WhatsApp", or message us with the name of the accessory and your phone model.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section aria-labelledby="faq-heading" className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" />
        <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-white">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-3 text-left text-base font-semibold text-ink hover:bg-mist"
                  >
                    {item.q}
                    <FontAwesomeIcon icon={faChevronDown} className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!open} className="px-5 pb-5 text-sm leading-relaxed text-muted">
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
