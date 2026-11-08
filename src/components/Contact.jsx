import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import { businessInfo, locationLine } from '../data/businessInfo';
import { generalWhatsappUrl, facebookUrl, mailtoUrl, mapsUrl } from '../utils/links';
import SectionHeading from './SectionHeading';
import ActionLink from './ActionLink';
import HoursTable from './HoursTable';
import StoreStatusBadge from './StoreStatusBadge';

function Card({ icon, title, children, action }) {
  return (
    <li className="flex flex-col rounded-xl border border-line bg-white p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-cyan">
        <FontAwesomeIcon icon={icon} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <div className="mt-1 flex-1 break-words text-sm text-muted">{children}</div>
      <div className="mt-4">{action}</div>
    </li>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="contact-heading" title="Let's Help You Find What You Need">
          Have a question about a product or need help finding our store? Contact {businessInfo.name}.
        </SectionHeading>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={faWhatsapp} title="WhatsApp" action={<ActionLink href={generalWhatsappUrl()} icon={faWhatsapp} className="w-full">Chat on WhatsApp</ActionLink>}>
            {businessInfo.whatsappNumber ? <p>{businessInfo.phone || `+${businessInfo.whatsappNumber}`}</p> : <p>WhatsApp number not added yet.</p>}
          </Card>
          <Card icon={faFacebook} title="Facebook" action={<ActionLink href={facebookUrl()} icon={faFacebook} variant="outline" className="w-full">Visit Our Facebook Page</ActionLink>}>
            <p>{facebookUrl() ? 'Follow the store on Facebook.' : 'Facebook page not added yet.'}</p>
          </Card>
          <Card icon={faEnvelope} title="Email" action={<ActionLink href={mailtoUrl()} icon={faEnvelope} variant="outline" external={false} className="w-full">Send Us an Email</ActionLink>}>
            <p>{businessInfo.email || 'Email address not added yet.'}</p>
          </Card>
          <Card icon={faLocationDot} title="Location" action={<ActionLink href={mapsUrl()} icon={faLocationDot} variant="outline" className="w-full">Open in Maps</ActionLink>}>
            {businessInfo.streetAddress && <p>{businessInfo.streetAddress}</p>}
            <p>{locationLine}</p>
          </Card>
        </ul>
        <div className="mt-6 rounded-xl border border-line bg-mist p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
              <FontAwesomeIcon icon={faClock} className="text-brand" aria-hidden="true" />
              Opening hours
            </h3>
            <StoreStatusBadge />
          </div>
          <div className="mt-4 max-w-xl">
            <HoursTable compact />
          </div>
          <a href="#hours" className="mt-3 inline-block py-1 text-sm font-medium text-brand underline underline-offset-2">
            View full opening hours
          </a>
        </div>
      </div>
    </section>
  );
}
