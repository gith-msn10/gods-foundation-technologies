import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { businessInfo, locationLine } from '../data/businessInfo';
import { categories } from '../data/products';
import { navLinks } from '../data/navLinks';
import { generalWhatsappUrl, facebookUrl, mailtoUrl } from '../utils/links';
import HoursSummary from './HoursSummary';

function FooterContact({ href, icon, children, external = true }) {
  const cls = 'inline-flex min-h-[32px] items-center gap-2 text-sm';
  if (!href) {
    return (
      <span className={`${cls} text-slate-400`}>
        <FontAwesomeIcon icon={icon} aria-hidden="true" />
        {children} (not added yet)
      </span>
    );
  }
  return (
    <a href={href} className={`${cls} text-slate-200 hover:text-cyan`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
      {children}
    </a>
  );
}

export default function Footer({ onCategorySelect }) {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{businessInfo.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{businessInfo.shortDescription}</p>
          <p className="mt-3 text-sm">Phone Accessories in Emene, Enugu, Nigeria.</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-semibold text-white">Quick links</p>
          <ul className="mt-3 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="inline-block py-1 text-sm hover:text-cyan">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-white">Product categories</p>
          <ul className="mt-3 space-y-1">
            {categories.map((c) => (
              <li key={c.id}>
                <a href="#products" onClick={() => onCategorySelect(c.id)} className="inline-block py-1 text-sm hover:text-cyan">{c.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <div className="mt-3 flex flex-col items-start gap-1">
            <FooterContact href={generalWhatsappUrl()} icon={faWhatsapp}>WhatsApp</FooterContact>
            <FooterContact href={facebookUrl()} icon={faFacebook}>Facebook</FooterContact>
            <FooterContact href={mailtoUrl()} icon={faEnvelope} external={false}>{businessInfo.email || 'Email'}</FooterContact>
            <span className="inline-flex items-start gap-2 text-sm">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1" aria-hidden="true" />
              <span>{businessInfo.streetAddress ? `${businessInfo.streetAddress}, ` : ''}{locationLine}</span>
            </span>
          </div>
          <div className="mt-4">
            <p className="mb-2 font-semibold text-white">Opening hours</p>
            <HoursSummary dark />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs">
        <span suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
