import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { describeStatus } from '../utils/hours';
import { useStoreStatus } from './StoreClock';

const tones = {
  open: { light: 'border-emerald-200 bg-emerald-50 text-emerald-800', dark: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200', dot: 'bg-emerald-500' },
  closed: { light: 'border-red-200 bg-red-50 text-red-800', dark: 'border-red-400/40 bg-red-400/10 text-red-200', dot: 'bg-red-500' },
  neutral: { light: 'border-line bg-mist text-muted', dark: 'border-white/20 bg-white/5 text-slate-300', dot: 'bg-slate-400' },
};

// Status is always written out as text; the colored dot is only a visual extra.
export default function StoreStatusBadge({ dark = false, showMessage = true, className = '' }) {
  const { result } = useStoreStatus();
  const state = result?.status === 'open' || result?.status === 'closed' ? result.status : 'neutral';
  const { headline, message } = result ? describeStatus(result) : { headline: 'Checking store status\u2026', message: '' };
  const tone = tones[state][dark ? 'dark' : 'light'];

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`} role="status" aria-live="polite">
      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${tone}`}>
        <FontAwesomeIcon icon={faStore} aria-hidden="true" />
        <span className={`h-2.5 w-2.5 rounded-full ${tones[state].dot}`} aria-hidden="true" />
        {headline}
      </span>
      {showMessage && message && <span className={`text-sm ${dark ? 'text-slate-300' : 'text-muted'}`}>{message}</span>}
    </div>
  );
}
