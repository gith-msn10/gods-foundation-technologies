import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { businessInfo, locationLine } from '../data/businessInfo';
import { mapsUrl, generalWhatsappUrl } from '../utils/links';
import SectionHeading from './SectionHeading';
import ActionLink from './ActionLink';
import HoursSummary from './HoursSummary';

export default function StoreLocation() {
  return (
    <section id="location" aria-labelledby="location-heading" className="scroll-mt-16 bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="location-heading" title="Visit Our Store in Emene, Enugu">
          Contact us for directions and product inquiries before you visit.
        </SectionHeading>
        <address className="mt-8 max-w-xl rounded-xl border border-line bg-white p-6 not-italic">
          <p className="text-lg font-semibold text-ink">{businessInfo.name}</p>
          {businessInfo.streetAddress && <p className="mt-1 text-ink">{businessInfo.streetAddress}</p>}
          <p className={businessInfo.streetAddress ? 'text-muted' : 'mt-1 text-muted'}>{locationLine}</p>
          <div className="mt-4">
            <HoursSummary />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ActionLink href={mapsUrl()} icon={faLocationArrow}>Get Directions</ActionLink>
            <ActionLink href={generalWhatsappUrl()} icon={faWhatsapp} variant="outline">Chat on WhatsApp</ActionLink>
          </div>
        </address>
        {/* A map embed is intentionally omitted until the exact shop location is verified. */}
      </div>
    </section>
  );
}
