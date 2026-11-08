import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const variants = {
  primary: 'bg-brand text-white hover:bg-blue-700 active:bg-blue-800',
  accent: 'bg-cyan text-navy hover:bg-cyan-300 active:bg-cyan-400',
  outline: 'border border-line bg-white text-ink hover:bg-mist active:bg-line',
  outlineDark: 'border border-white/30 text-white hover:bg-white/10 active:bg-white/20',
};

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors';

/**
 * A link-styled button. When `href` is missing (value not configured yet) it renders
 * a clearly disabled element instead of a fake working link.
 */
export default function ActionLink({
  href,
  icon,
  children,
  variant = 'primary',
  external = true,
  onClick,
  className = '',
  dark = false,
}) {
  if (!href) {
    const tone = dark || variant.endsWith('Dark')
      ? 'border-slate-500 text-slate-300'
      : 'border-slate-400 text-muted';
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Not set up yet. Add this detail in src/data/businessInfo.js"
        className={`${base} cursor-not-allowed border border-dashed ${tone} ${className}`}
      >
        {icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
        {children}
        <span className="sr-only"> (not available yet)</span>
      </span>
    );
  }

  const externalProps = external && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...externalProps}
    >
      {icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
      {children}
      {externalProps.target && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
