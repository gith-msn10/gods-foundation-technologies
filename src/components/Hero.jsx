import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faMobileScreenButton,
  faPlug,
  faHeadphones,
  faBatteryFull,
  faShieldHalved,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { businessInfo } from '../data/businessInfo';
import { generalWhatsappUrl } from '../utils/links';
import ActionLink from './ActionLink';

const tiles = [
  { icon: faMobileScreenButton, label: 'Phones', span: 'row-span-2' },
  { icon: faPlug, label: 'Chargers & cables' },
  { icon: faHeadphones, label: 'Earphones' },
  { icon: faBatteryFull, label: 'Power banks' },
  { icon: faShieldHalved, label: 'Cases & protectors' },
];

function HeroVisual() {
  // A real, licensed photo can replace the tile composition via businessInfo.heroImage.
  if (businessInfo.heroImage) {
    return (
      <img
        src={businessInfo.heroImage}
        alt={businessInfo.heroImageAlt || ''}
        width="640"
        height="520"
        fetchpriority="high"
        className="aspect-[5/4] w-full rounded-2xl object-cover"
      />
    );
  }
  return (
    <div className="grid aspect-[5/4] grid-cols-2 grid-rows-3 gap-3" role="img" aria-label="Phones, chargers, earphones, power banks and cases">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center ${t.span || ''}`}
        >
          <FontAwesomeIcon icon={t.icon} className={`text-cyan ${t.span ? 'text-6xl' : 'text-3xl'}`} aria-hidden="true" />
          <span className="text-xs text-slate-300 sm:text-sm">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="scroll-mt-16 bg-navy">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-sm text-slate-300">
            <FontAwesomeIcon icon={faLocationDot} className="text-cyan" aria-hidden="true" />
            Emene, Enugu State, Nigeria
          </p>
          <h1 id="hero-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Trusted Phone &amp; Accessories Store in Emene, Enugu.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore phones and everyday mobile essentials at {businessInfo.name}. Discover our product range and contact us
            for availability, pricing, and inquiries.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#products" external={false} variant="accent">
              Explore Products
            </ActionLink>
            <ActionLink href={generalWhatsappUrl()} icon={faWhatsapp} variant="outlineDark">
              Contact Us on WhatsApp
            </ActionLink>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
