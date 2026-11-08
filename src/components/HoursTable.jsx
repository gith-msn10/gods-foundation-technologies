import { weeklyHours, businessInfo } from '../data/businessInfo';
import { getWeekRows } from '../utils/hours';
import { useStoreStatus } from './StoreClock';

const PLACEHOLDER = '[Opening Time] \u2013 [Closing Time]';

export default function HoursTable({ compact = false }) {
  const { now } = useStoreStatus();
  const rows = getWeekRows(weeklyHours, now, businessInfo.timeZone);
  const pad = compact ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">Weekly opening hours</caption>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.key} className={r.isToday ? 'bg-cyan/10' : ''} aria-current={r.isToday ? 'date' : undefined}>
              <th scope="row" className={`${pad} w-[42%] font-semibold text-ink sm:w-2/5`}>
                {r.label}
                {r.isToday && (
                  <span className="ml-2 inline-block rounded bg-navy px-1.5 py-0.5 align-middle text-xs font-medium text-white">Today</span>
                )}
              </th>
              <td className={`${pad} break-words ${r.state === 'unset' ? 'italic text-muted' : r.state === 'closed' ? 'text-muted' : 'text-ink'}`}>
                {r.text ?? PLACEHOLDER}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
