import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { weeklyHours, scheduleExceptions, businessInfo } from '../data/businessInfo';
import { computeStatus, isScheduleConfigured } from '../utils/hours';

const StoreClockContext = createContext({ now: null, result: { status: 'unconfigured' } });

// One shared clock for every section, so the status and schedule never disagree.
// `now` stays null until the page has mounted in the browser, so the prerendered HTML
// never contains a stale open/closed status.
export function StoreClockProvider({ children }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30000);
    document.addEventListener('visibilitychange', tick); // refresh immediately when the tab is revisited
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);

  const value = useMemo(() => {
    if (!isScheduleConfigured(weeklyHours)) return { now, result: { status: 'unconfigured' } };
    return { now, result: now ? computeStatus(weeklyHours, scheduleExceptions, now, businessInfo.timeZone) : null };
  }, [now]);

  return <StoreClockContext.Provider value={value}>{children}</StoreClockContext.Provider>;
}

export const useStoreStatus = () => useContext(StoreClockContext);
