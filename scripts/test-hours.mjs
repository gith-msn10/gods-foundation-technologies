// Run with: npm test   (plain Node, no dependencies)
import assert from 'node:assert/strict';
import { computeStatus, describeStatus, getWeekRows, upcomingExceptions, buildOpeningHoursSpec, isScheduleConfigured } from '../src/utils/hours.js';

const std = { open: '07:00', close: '21:00' };
const weekly = { monday: std, tuesday: std, wednesday: std, thursday: std, friday: std, saturday: std, sunday: { closed: true } };
// Africa/Lagos is UTC+1 all year. 2026-10-26 is a Monday.
const at = (iso) => new Date(iso);
const say = (w, ex, iso) => describeStatus(computeStatus(w, ex, at(iso)));
let passed = 0;
const test = (name, fn) => { fn(); passed += 1; console.log(`ok  ${name}`); };

test('open now + closing time', () => {
  const r = say(weekly, [], '2026-10-26T11:00:00Z'); // Mon 12:00 Lagos
  assert.deepEqual(r, { headline: 'Open Now', message: 'Closes at 6:00 PM' });
});
test('closed before opening: opens today', () => {
  assert.equal(say(weekly, [], '2026-10-26T05:00:00Z').message, 'Opens today at 7:00 AM'); // Mon 06:00
});
test('closed after closing: opens tomorrow', () => {
  const r = say(weekly, [], '2026-10-26T18:00:00Z'); // Mon 19:00
  assert.deepEqual(r, { headline: 'Closed Now', message: 'Opens tomorrow at 7:00 AM' });
});
test('closed all day (Sunday): next opening day and time', () => {
  assert.equal(say(weekly, [], '2026-10-25T11:00:00Z').message, 'Opens tomorrow at 7:00 AM'); // Sun 12:00
});
test('Saturday evening skips closed Sunday', () => {
  assert.equal(say(weekly, [], '2026-10-31T18:00:00Z').message, 'Opens Monday at 7:00 AM'); // Sat 19:00
});
test('uses Lagos time, not UTC (Mon 23:30Z is already Tuesday in Lagos)', () => {
  const now = at('2026-10-26T23:30:00Z');
  assert.equal(getWeekRows(weekly, now).find((r) => r.isToday).key, 'tuesday');
  assert.equal(describeStatus(computeStatus(weekly, [], now)).message, 'Opens today at 7:00 AM');
});
test('hours crossing midnight (Fri 18:00 to 02:00)', () => {
  const w = { ...weekly, friday: { open: '18:00', close: '02:00' } };
  assert.equal(say(w, [], '2026-10-30T22:00:00Z').message, 'Closes at 2:00 AM tomorrow'); // Fri 23:00
  assert.equal(say(w, [], '2026-10-31T00:00:00Z').message, 'Closes at 2:00 AM'); // Sat 01:00 (Friday shift continues)
  assert.equal(say(w, [], '2026-10-31T02:00:00Z').headline, 'Closed Now'); // Sat 03:00
});
test('temporary closure overrides a normal day', () => {
  const ex = [{ date: '2026-10-26', closed: true, note: 'Public holiday' }];
  const r = computeStatus(weekly, ex, at('2026-10-26T11:00:00Z'));
  assert.equal(r.status, 'closed');
  assert.equal(r.todayNote, 'Public holiday');
  assert.equal(describeStatus(r).message, 'Opens tomorrow at 8:00 AM');
});
test('temporary shorter hours override a normal day', () => {
  const ex = [{ date: '2026-10-26', hours: { open: '10:00', close: '14:00' } }];
  assert.equal(computeStatus(weekly, ex, at('2026-10-26T14:00:00Z')).status, 'closed'); // 15:00
  assert.equal(computeStatus(weekly, ex, at('2026-10-26T10:00:00Z')).status, 'open'); // 11:00
});
test('split shifts', () => {
  const w = { ...weekly, monday: [{ open: '08:00', close: '12:00' }, { open: '14:00', close: '18:00' }] };
  assert.equal(say(w, [], '2026-10-26T12:00:00Z').message, 'Opens today at 2:00 PM'); // 13:00
});
test('open 24 hours', () => {
  const all = Object.fromEntries(Object.keys(weekly).map((d) => [d, { open: '00:00', close: '24:00' }]));
  assert.deepEqual(say(all, [], '2026-10-26T11:00:00Z'), { headline: 'Open Now', message: 'Open 24 hours' });
});
test('missing or incomplete schedule never shows a status', () => {
  assert.equal(computeStatus(undefined, [], new Date()).status, 'unconfigured');
  const incomplete = { ...weekly, wednesday: null };
  assert.equal(isScheduleConfigured(incomplete), false);
  assert.equal(describeStatus(computeStatus(incomplete, [], new Date())).headline, 'Opening hours not yet available');
  assert.equal(buildOpeningHoursSpec(incomplete), null);
  assert.equal(getWeekRows(incomplete).find((r) => r.key === 'wednesday').state, 'unset');
});
test('invalid times are treated as not configured', () => {
  assert.equal(isScheduleConfigured({ ...weekly, monday: { open: '7am', close: '9pm' } }), false);
});
test('schema.org spec matches schedule and skips closed days', () => {
  const spec = buildOpeningHoursSpec(weekly);
  assert.equal(spec.length, 6);
  assert.deepEqual(spec[0], { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '07:00', closes: '21:00' });
  assert.ok(!spec.some((s) => s.dayOfWeek === 'Sunday'));
});
test('upcoming schedule changes are listed from today, past ones dropped', () => {
  const ex = [{ date: '2026-10-20', closed: true }, { date: '2026-12-25', closed: true, note: 'Christmas Day' }];
  const list = upcomingExceptions(ex, at('2026-10-26T11:00:00Z'));
  assert.deepEqual(list, [{ date: '2026-12-25', text: 'Closed', note: 'Christmas Day' }]);
});

console.log(`\n${passed} tests passed`);
