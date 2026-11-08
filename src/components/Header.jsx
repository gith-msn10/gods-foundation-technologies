import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { businessInfo } from '../data/businessInfo';
import ActionLink from './ActionLink';
import MobileMenu from './MobileMenu';
import { navLinks } from '../data/navLinks';
import logoMark from "../assets/logo-mark.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Esc closes the menu; leaving the mobile breakpoint also resets it.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const reset = () => mq.matches && setOpen(false);
    mq.addEventListener('change', reset);
    return () => mq.removeEventListener('change', reset);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#home" className="flex min-w-0 items-center gap-2.5 rounded-md">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan">
               <img src="/images/branding/logo-mark.svg" alt="" width="36" height="36" className="h-9 w-9 shrink-0" />
          </span>
          <span className="truncate text-sm font-bold leading-tight text-ink sm:text-base">{businessInfo.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-mist">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ActionLink href="#products" external={false} className="hidden md:inline-flex">
            Explore Products
          </ActionLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink hover:bg-mist md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
