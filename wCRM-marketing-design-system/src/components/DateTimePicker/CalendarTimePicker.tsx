import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { LucideArrowDownIcon, LucideArrowUpIcon, LucideChevronDownIcon, LucideClockIcon } from '../../icons';
import { cn } from '../../utils/cn';

export interface TimeValue {
  /** 1–12 */
  hours: number;
  /** 0–59 */
  minutes: number;
  period: 'AM' | 'PM';
}

const pad = (n: number) => String(n).padStart(2, '0');

export interface TimeSpinnerProps {
  value?: TimeValue | null;
  onChange?: (value: TimeValue) => void;
  /** Row label ("Time"). */
  label?: string;
  className?: string;
}

/** Light, full-scale build of `TimePickerSection` (461:4702): clock + "Time", hh : mm spinners and an AM / PM column. */
export function TimeSpinner({ value, onChange, label = 'Time', className }: TimeSpinnerProps) {
  const [inner, setInner] = useState<TimeValue | null>(value ?? null);
  const current = value !== undefined ? value : inner;
  const set = (next: TimeValue) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const base: TimeValue = current ?? { hours: 12, minutes: 0, period: 'AM' };
  const empty = current == null;

  const spin = (part: 'hours' | 'minutes') => (e: KeyboardEvent) => {
    const step = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    if (part === 'hours') set({ ...base, hours: ((base.hours - 1 + step + 12) % 12) + 1 });
    else set({ ...base, minutes: (base.minutes + step + 60) % 60 });
  };

  const field = (part: 'hours' | 'minutes', max: number, min: number) => (
    <input
      role="spinbutton"
      aria-label={part === 'hours' ? 'Hours' : 'Minutes'}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={empty ? undefined : base[part]}
      inputMode="numeric"
      maxLength={2}
      size={2}
      value={empty ? '' : pad(base[part])}
      placeholder="00"
      onKeyDown={spin(part)}
      onChange={(e) => {
        const n = Number(e.target.value.replace(/\D/g, ''));
        if (Number.isNaN(n)) return;
        set({ ...base, [part]: Math.min(max, Math.max(min, n)) });
      }}
      className={cn(
        'h-6.5 w-12.5 rounded-sm bg-surface-sunken py-1 text-center text-body text-text-ink outline-none placeholder:text-text-ink focus-visible:shadow-focus',
        !empty && 'font-semibold',
      )}
    />
  );

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <span className="flex items-center gap-2 text-mobile-title-sm font-semibold text-text-ink">
        <LucideClockIcon className="size-4.5" />
        {label}
      </span>
      <span className="flex items-start gap-1.5">
        {field('hours', 12, 1)}
        <span aria-hidden="true" className="text-heading-3 text-text-ink">:</span>
        {field('minutes', 59, 0)}
        <span role="radiogroup" aria-label="AM or PM" className="flex flex-col items-center rounded-sm bg-surface-sunken px-2.5 py-1">
          {(['AM', 'PM'] as const).map((p) => {
            const on = base.period === p;
            return (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set({ ...base, period: p })}
                className={cn('rounded-xs outline-none focus-visible:shadow-focus', on ? 'text-mobile-title-sm font-semibold text-text-ink' : 'text-body text-text-ink opacity-40')}
              >
                {p}
              </button>
            );
          })}
        </span>
      </span>
    </div>
  );
}

export interface CalendarTimePickerProps {
  /** Selected date (time part ignored; use `time`). */
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  time?: TimeValue | null;
  onTimeChange?: (time: TimeValue) => void;
  /** First month shown. Defaults to the selected date or today. */
  defaultMonth?: Date;
  /** Hide the time row for date-only pickers. */
  showTime?: boolean;
  /** "Today" in the action row selects this date (tests pass a fixed one). */
  today?: Date;
  className?: string;
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Six Monday-first weeks covering the month, as in Figma (prev / next month days in #94A3B8). */
function monthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - offset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/**
 * `calendar-time-picker` (1594:7048) built at full scale with light tokens: month header with up/down month
 * arrows, Monday-first 6-week grid, the time row and Clear / Today actions (#3B82F6).
 * Figma draws it as a 0.5× mock (188px); every value here is the 2× equivalent.
 */
export function CalendarTimePicker({ value, onChange, time, onTimeChange, defaultMonth, showTime = true, today: todayProp, className }: CalendarTimePickerProps) {
  const today = todayProp ?? new Date();
  const [innerDate, setInnerDate] = useState<Date | null>(value ?? null);
  const selected = value !== undefined ? value : innerDate;
  const [month, setMonth] = useState(() => {
    const d = defaultMonth ?? selected ?? today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [focusDay, setFocusDay] = useState<Date>(selected ?? today);
  const gridRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => monthGrid(month), [month]);

  const select = (d: Date | null) => {
    if (value === undefined) setInnerDate(d);
    onChange?.(d);
  };
  const shiftMonth = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));

  const onGridKey = (e: KeyboardEvent) => {
    const delta = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 } as Record<string, number>)[e.key];
    if (delta === undefined) return;
    e.preventDefault();
    const next = new Date(focusDay);
    next.setDate(focusDay.getDate() + delta);
    setFocusDay(next);
    if (next.getMonth() !== month.getMonth() || next.getFullYear() !== month.getFullYear()) setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
    requestAnimationFrame(() => gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus());
  };

  const monthLabel = month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className={cn('inline-flex flex-col gap-8 border border-border-default bg-surface-default p-6', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-kpi-value text-text-ink" aria-live="polite">
            {monthLabel}
            <LucideChevronDownIcon className="size-4" strokeWidth={2.5} />
          </span>
          <span className="flex items-center gap-4">
            <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="flex size-7 items-center justify-center rounded-xs text-text-secondary outline-none focus-visible:shadow-focus">
              <LucideArrowUpIcon className="size-4" />
            </button>
            <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="flex size-7 items-center justify-center rounded-xs text-text-secondary outline-none focus-visible:shadow-focus">
              <LucideArrowDownIcon className="size-4" />
            </button>
          </span>
        </div>
        <div role="grid" aria-label={monthLabel} ref={gridRef} onKeyDown={onGridKey} className="flex flex-col gap-1">
          <div role="row" className="flex gap-1">
            {WEEKDAYS.map((w, i) => (
              <span key={i} role="columnheader" aria-label={WEEKDAY_NAMES[i]} className="flex h-7.5 w-control-lg items-center justify-center text-heading-3 font-semibold text-text-secondary">
                {w}
              </span>
            ))}
          </div>
          {Array.from({ length: 6 }, (_, week) => (
            <div role="row" key={week} className="flex gap-1">
              {days.slice(week * 7, week * 7 + 7).map((d) => {
                const outside = d.getMonth() !== month.getMonth();
                const isSelected = selected ? sameDay(d, selected) : false;
                const focusable = sameDay(d, focusDay) || (!days.some((x) => sameDay(x, focusDay)) && d.getDate() === 1 && !outside);
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-label={d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    tabIndex={focusable ? 0 : -1}
                    onClick={() => {
                      setFocusDay(d);
                      select(d);
                    }}
                    className={cn(
                      'flex h-control-42 w-control-lg items-center justify-center text-mobile-title-sm outline-none focus-visible:shadow-focus',
                      isSelected
                        ? 'border border-border-strong bg-text-ink font-bold text-text-inverse'
                        : cn('rounded-xs font-medium hover:bg-surface-sunken', outside ? 'text-text-faint' : 'text-text-ink'),
                    )}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {showTime && <TimeSpinner value={time} onChange={onTimeChange} />}
      </div>
      <div className="flex items-center justify-between pb-1 pt-2">
        <button type="button" onClick={() => select(null)} className="rounded-xs text-heading-2 font-semibold text-text-link-blue outline-none focus-visible:shadow-focus">
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
            setFocusDay(today);
            select(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          }}
          className="rounded-xs text-heading-2 font-semibold text-text-link-blue outline-none focus-visible:shadow-focus"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export { pad as padTime };
