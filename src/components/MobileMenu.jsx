import { navLinks } from '../data/navLinks';
import ActionLink from './ActionLink';

export default function MobileMenu({ open, onClose }) {
  return (
    <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white md:hidden">
      <nav aria-label="Mobile">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-mist"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="px-3 pb-3 pt-2">
            <ActionLink href="#products" external={false} onClick={onClose} className="w-full">
              Explore Products
            </ActionLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
