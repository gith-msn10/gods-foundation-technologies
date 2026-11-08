import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { scheduleExceptions, businessInfo } from '../data/businessInfo';
import { describeStatus, upcomingExceptions } from '../utils/hours';
import { generalWhatsappUrl } from '../utils/links';
import SectionHeading from './SectionHeading';
import StoreStatusBadge from './StoreStatusBadge';
import HoursTable from './HoursTable';
import ActionLink from './ActionLink';
import { useStoreStatus } from './StoreClock';

const formatDate = (key) =>
  new Date(`${key}T00:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

export default function OpeningHours() {
  const { now, result } = useStoreStatus();
  const changes = upcomingExceptions(scheduleExceptions, now, businessInfo.timeZone);
  const unconfigured = result?.status === 'unconfigured';

  return (
    <section id="hours" aria-labelledby="hours-heading" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="hours-heading" title="Opening Hours">
          Check when the store is open before you visit. Times are in Enugu local time.
        </SectionHeading>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-5">
          <div className="rounded-xl bg-navy p-6 text-white lg:col-span-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <FontAwesomeIcon icon={faClock} className="text-cyan" aria-hidden="true" />
              Store status
            </p>
            <StoreStatusBadge dark className="mt-4" />
            {result?.todayText && <p className="mt-4 text-sm text-slate-300">Today: {result.todayText}</p>}
            {result?.todayNote && <p className="mt-1 text-sm text-slate-300">{result.todayNote}</p>}
            {unconfigured && (
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Message us on WhatsApp to confirm when we are open.
              </p>
            )}
            <ActionLink href={generalWhatsappUrl()} icon={faWhatsapp} variant="accent" className="mt-6 w-full sm:w-auto">
              Chat on WhatsApp
            </ActionLink>
          </div>

          <div className="lg:col-span-3">
            <HoursTable />
            {changes.length > 0 && (
              <div className="mt-5 rounded-xl border border-line bg-mist p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <FontAwesomeIcon icon={faCalendarDay} className="text-brand" aria-hidden="true" />
                  Schedule changes
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {changes.map((c) => (
                    <li key={c.date} className="text-ink">
                      <span className="font-semibold">{formatDate(c.date)}:</span> {c.text}
                      {c.note && <span className="text-muted"> ({c.note})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
