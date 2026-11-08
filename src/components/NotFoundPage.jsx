import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faHouse, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { businessInfo } from '../data/businessInfo';
import { generalWhatsappUrl } from '../utils/links';
import ActionLink from './ActionLink';

// Prerendered to dist/404.html. Vercel serves it with a 404 status for unknown URLs.
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
          <a href="/" className="flex items-center gap-2.5 rounded-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-cyan">
              <FontAwesomeIcon icon={faMicrochip} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold sm:text-base">{businessInfo.name}</span>
          </a>
        </div>
      </header>
      <main id="main" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
          <p className="text-6xl font-bold text-cyan sm:text-7xl">404</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">We couldn&rsquo;t find that page</h1>
          <p className="mt-3 text-slate-300">
            The link may be old or mistyped. Head back to the store page to browse phones and accessories in Emene, Enugu.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionLink href="/" external={false} variant="accent" icon={faHouse}>Back to Home</ActionLink>
            <ActionLink href="/#products" external={false} variant="outlineDark" icon={faMobileScreenButton}>Browse Products</ActionLink>
            <ActionLink href={generalWhatsappUrl()} variant="outlineDark" icon={faWhatsapp}>Chat on WhatsApp</ActionLink>
          </div>
        </div>
      </main>
      <footer className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-300">
        <span suppressHydrationWarning>&copy; {new Date().getFullYear()} {businessInfo.name}</span>
      </footer>
    </div>
  );
}
