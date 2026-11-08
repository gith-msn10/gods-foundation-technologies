// Pure opening-hours logic: no React, no config imports, so it can be unit-tested with plain Node.
// Schedule shape (see src/data/businessInfo.js):
//   weeklyHours[day] = null                                  -> not configured yet
//                    | { closed: true }                      -> closed all day
//                    | { open: '08:00', close: '18:00' }     -> one opening period
//                    | [{ open, close }, { open, close }]    -> split shifts
// A close time earlier than the open time means the period crosses midnight ("18:00" to "02:00").
// "24:00" is allowed as a close time. All times are 24-hour "HH:MM" in the store's time zone.

export const DEFAULT_TIME_ZONE = 'Africa/Lagos';
export const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export const DAY_LABELS = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
  friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};
const WEEKDAY_BY_UTC_INDEX = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_MIN = 1440;
const WINDOW_START = -1; // look back one day for periods that crossed midnight
const WINDOW_END = 8; // look ahead far enough to find the next opening
const pad = (n) => String(n).padStart(2, '0');

export function toMinutes(time) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(time ?? '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (min > 59 || h > 24 || (h === 24 && min !== 0)) return null;
  return h * 60 + min;
}

export function formatMinutes(totalMinutes) {
  const mins = ((Math.round(totalMinutes) % DAY_MIN) + DAY_MIN) % DAY_MIN;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
}

export const formatTime = (time) => {
  const mins = toMinutes(time);
  return mins === null ? '' : formatMinutes(mins);
};

export function normalizeDay(value) {
  if (!value) return { state: 'unset', intervals: [] };
  if (!Array.isArray(value) && value.closed) return { state: 'closed', intervals: [] };
  const list = Array.isArray(value) ? value : [value];
  const intervals = [];
  for (const item of list) {
    const o = toMinutes(item?.open);
    const c = toMinutes(item?.close);
    if (o === null || c === null || o === c) return { state: 'unset', intervals: [] };
    intervals.push({ open: item.open, close: item.close, openMin: o, closeMin: c > o ? c : c + DAY_MIN });
  }
  return intervals.length ? { state: 'open', intervals } : { state: 'unset', intervals: [] };
}

// The weekly schedule counts as configured only when all seven days are filled in.
export const isScheduleConfigured = (weekly) =>
  Boolean(weekly) && DAY_ORDER.every((d) => normalizeDay(weekly[d]).state !== 'unset');

export function zonedParts(date, timeZone = DEFAULT_TIME_ZONE) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return {
    year: Number(p.year), month: Number(p.month), day: Number(p.day),
    minutes: Number(p.hour) * 60 + Number(p.minute) + Number(p.second) / 60,
  };
}

function dayAt(parts, offset) {
  const dt = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + offset));
  return { key: dt.toISOString().slice(0, 10), weekday: WEEKDAY_BY_UTC_INDEX[dt.getUTCDay()] };
}

function effectiveDay(weekly, exceptions, info) {
  const ex = (exceptions || []).find((e) => e?.date === info.key);
  if (ex) {
    const day = normalizeDay(ex.closed ? { closed: true } : ex.hours);
    if (day.state !== 'unset') return { ...day, note: ex.note || '' };
  }
  return { ...normalizeDay(weekly?.[info.weekday]), note: '' };
}

export function describeDay(day) {
  if (day.state === 'closed') return 'Closed';
  if (day.state === 'open') return day.intervals.map((i) => `${formatTime(i.open)} \u2013 ${formatTime(i.close)}`).join(', ');
  return null;
}

/**
 * Returns { status: 'unconfigured' | 'open' | 'closed', ... } for the given instant.
 * open:   closesLabel, closesDayOffset (0 = today, 1 = tomorrow). closesLabel is null for 24/7 stores.
 * closed: opensLabel, opensDayOffset, opensWeekday (null when no opening was found).
 * Also returns todayText / todayNote for the current local day.
 */
export function computeStatus(weekly, exceptions = [], now = new Date(), timeZone = DEFAULT_TIME_ZONE) {
  if (!isScheduleConfigured(weekly)) return { status: 'unconfigured' };

  const parts = zonedParts(now, timeZone);
  const nowMin = parts.minutes;
  const slots = [];
  let today = null;
  for (let off = WINDOW_START; off <= WINDOW_END; off += 1) {
    const info = dayAt(parts, off);
    const day = effectiveDay(weekly, exceptions, info);
    if (off === 0) today = day;
    day.intervals.forEach((i) => slots.push({ start: off * DAY_MIN + i.openMin, end: off * DAY_MIN + i.closeMin }));
  }

  slots.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const s of slots) {
    const last = merged[merged.length - 1];
    if (last && s.start <= last.end) last.end = Math.max(last.end, s.end);
    else merged.push({ ...s });
  }

  const base = { todayText: describeDay(today), todayNote: today.note };
  const current = merged.find((s) => s.start <= nowMin && nowMin < s.end);
  if (current) {
    const alwaysOpen = current.end >= (WINDOW_END + 1) * DAY_MIN;
    return {
      status: 'open', ...base,
      closesLabel: alwaysOpen ? null : formatMinutes(current.end),
      closesDayOffset: Math.floor(current.end / DAY_MIN),
    };
  }
  const next = merged.find((s) => s.start > nowMin);
  if (!next) return { status: 'closed', ...base, opensLabel: null, opensDayOffset: null, opensWeekday: null };
  const offset = Math.floor(next.start / DAY_MIN);
  return {
    status: 'closed', ...base,
    opensLabel: formatMinutes(next.start),
    opensDayOffset: offset,
    opensWeekday: dayAt(parts, offset).weekday,
  };
}

// Human-readable headline + supporting message for a computeStatus() result.
export function describeStatus(result) {
  if (!result || result.status === 'unconfigured') return { headline: 'Opening hours not yet available', message: '' };
  if (result.status === 'open') {
    if (!result.closesLabel) return { headline: 'Open Now', message: 'Open 24 hours' };
    const when = result.closesDayOffset === 1 ? ' tomorrow' : '';
    return { headline: 'Open Now', message: `Closes at ${result.closesLabel}${when}` };
  }
  if (!result.opensLabel) return { headline: 'Closed Now', message: '' };
  const day = result.opensDayOffset === 0 ? 'today' : result.opensDayOffset === 1 ? 'tomorrow' : DAY_LABELS[result.opensWeekday];
  return { headline: 'Closed Now', message: `Opens ${day} at ${result.opensLabel}` };
}

// Seven rows for the weekly table. `isToday` is only set once a current time is known.
export function getWeekRows(weekly, now = null, timeZone = DEFAULT_TIME_ZONE) {
  const todayKey = now ? dayAt(zonedParts(now, timeZone), 0).weekday : null;
  return DAY_ORDER.map((key) => {
    const day = normalizeDay(weekly?.[key]);
    return { key, label: DAY_LABELS[key], state: day.state, text: describeDay(day), isToday: key === todayKey };
  });
}

// Schedule changes from today onwards, soonest first.
export function upcomingExceptions(exceptions, now, timeZone = DEFAULT_TIME_ZONE, limit = 5) {
  if (!now) return [];
  const todayKey = dayAt(zonedParts(now, timeZone), 0).key;
  return (exceptions || [])
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e?.date || '') && e.date >= todayKey)
    .map((e) => ({ e, day: normalizeDay(e.closed ? { closed: true } : e.hours) }))
    .filter(({ day }) => day.state !== 'unset')
    .sort((a, b) => a.e.date.localeCompare(b.e.date))
    .slice(0, limit)
    .map(({ e, day }) => ({ date: e.date, text: describeDay(day), note: e.note || '' }));
}

// Schema.org OpeningHoursSpecification list, or null unless the full schedule is verified/configured.
export function buildOpeningHoursSpec(weekly) {
  if (!isScheduleConfigured(weekly)) return null;
  const hhmm = (t) => {
    const m = toMinutes(t);
    return m === 1440 ? '23:59' : `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  };
  const spec = [];
  DAY_ORDER.forEach((key) => {
    normalizeDay(weekly[key]).intervals.forEach((i) =>
      spec.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAY_LABELS[key], opens: hhmm(i.open), closes: hhmm(i.close) })
    );
  });
  return spec;
}
