import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import StoreStatusBadge from './StoreStatusBadge';
import { useStoreStatus } from './StoreClock';

// Compact "status + today's hours + link to the full schedule", used in the location card and footer.
export default function HoursSummary({ dark = false }) {
  const { result } = useStoreStatus();
  const muted = dark ? 'text-slate-300' : 'text-muted';
  return (
    <div className="space-y-2">
      <StoreStatusBadge dark={dark} showMessage={false} />
      {result?.todayText && (
        <p className={`flex items-center gap-2 text-sm ${muted}`}>
          <FontAwesomeIcon icon={faClock} aria-hidden="true" />
          Today: {result.todayText}
        </p>
      )}
      <a href="#hours" className={`inline-block py-1 text-sm font-medium underline underline-offset-2 ${dark ? 'text-cyan' : 'text-brand'}`}>
        View full opening hours
      </a>
    </div>
  );
}
