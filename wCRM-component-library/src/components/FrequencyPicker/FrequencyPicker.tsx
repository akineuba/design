import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Checkbox } from '../Checkbox';
import { DateTimePicker, TimeField, UnitInput, type TimeValue } from '../DateTimePicker';

/* ------------------------------------------------------------------ DayPicker */

export interface DayOption {
  value: string;
  /** Visible letter ("M") or weekday ("Mon"). */
  label: ReactNode;
  /** Full name for screen readers ("Monday"). */
  name: string;
  /** Mobile calendar strip: date number under the weekday. */
  date?: ReactNode;
}

export const WEEK_DAYS: DayOption[] = [
  { value: 'mon', label: 'M', name: 'Monday' },
  { value: 'tue', label: 'T', name: 'Tuesday' },
  { value: 'wed', label: 'W', name: 'Wednesday' },
  { value: 'thu', label: 'T', name: 'Thursday' },
  { value: 'fri', label: 'F', name: 'Friday' },
  { value: 'sat', label: 'S', name: 'Saturday' },
  { value: 'sun', label: 'S', name: 'Sunday' },
];

export interface DayPickerProps {
  /** Group name ("Weekly delivery days"). */
  'aria-label': string;
  days?: DayOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Allow one day only (mobile calendar strip). */
  single?: boolean;
  /**
   * - pill: weekly delivery `day-pill` (1590:5635) — p6/10, r4, 1px #E2E8F0, Inter Semi Bold 12 #64748B; selected #EE1F2F fill, white text
   * - calendar: mobile Social calendar day pill (1931:22554) — 42×54, r8, weekday Inter 10 #8F9BBA over date Inter Bold 14; selected red fill
   */
  appearance?: 'pill' | 'calendar';
  disabled?: boolean;
  className?: string;
}

/** Toggle pills for picking weekdays. Each pill is a toggle button (`aria-pressed`). */
export function DayPicker({ days = WEEK_DAYS, value, defaultValue = [], onValueChange, single = false, appearance = 'pill', disabled, className, ...rest }: DayPickerProps) {
  const [inner, setInner] = useState<string[]>(defaultValue);
  const current = value ?? inner;
  const toggle = (v: string) => {
    const next = single ? [v] : current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div role="group" aria-label={rest['aria-label']} className={cn('flex', appearance === 'pill' ? 'gap-1.5' : 'gap-2', className)}>
      {days.map((d) => {
        const on = current.includes(d.value);
        return (
          <button
            key={d.value}
            type="button"
            aria-pressed={on}
            aria-label={d.name}
            disabled={disabled}
            onClick={() => toggle(d.value)}
            className={cn(
              'outline-none transition-colors duration-fast ease-standard focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-60',
              appearance === 'pill'
                ? cn('rounded-xs border border-border-default px-2.25 py-1.25 text-caption font-semibold', on ? 'bg-brand-primary text-text-inverse' : 'bg-surface-default text-text-secondary')
                : cn(
                    'flex h-day-pill-h w-control-42 flex-col items-center justify-center gap-0.5 rounded-md border',
                    on ? 'border-brand-primary bg-brand-primary text-text-inverse' : 'border-border-default bg-surface-default',
                  ),
            )}
          >
            {appearance === 'pill' ? (
              d.label
            ) : (
              <>
                <span className={cn('text-caption-xs', on ? 'text-text-inverse' : 'text-mobile-caption')}>{d.label}</span>
                <span className={cn('text-body font-bold', on ? 'text-text-inverse' : 'text-text-primary')}>{d.date}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- FrequencyPicker */

export type Frequency = 'none' | 'daily' | 'weekly' | 'monthly';

export interface FrequencyValue {
  frequencies: Frequency[];
  /** Daily: every N hours / minutes / times. */
  daily?: { hours: string; minutes: string; times: string };
  /** Weekly: selected days and delivery time. */
  weekly?: { days: string[]; hours: string; minutes: string };
  /** Monthly: date and time. */
  monthly?: { date: Date | null; time: TimeValue | null };
}

export interface FrequencyPickerProps {
  /** Group title. Figma: "Notification Frequency (Select multiple as needed)". */
  title?: ReactNode;
  value?: FrequencyValue;
  defaultValue?: FrequencyValue;
  onValueChange?: (value: FrequencyValue) => void;
  className?: string;
}

const OPTIONS: { value: Frequency; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const rowLabel = 'shrink-0 text-field-label text-text-primary';

/**
 * Notification frequency checklist (`frequency-checklist-container` 1594:7192): a horizontal checkbox row
 * (gap 20) followed by the detail row for each selected frequency — Daily "Every 00 Hrs / 00 Mins / 00 Times",
 * Weekly day pills + "Deliver at: 00 : 00 Hrs", Monthly "Every DD/MM/YYYY By 00:00". "None" clears the others.
 */
export function FrequencyPicker({ title = 'Notification Frequency (Select multiple as needed)', value, defaultValue = { frequencies: ['daily'] }, onValueChange, className }: FrequencyPickerProps) {
  const id = useId();
  const [inner, setInner] = useState<FrequencyValue>(defaultValue);
  const v = value ?? inner;
  const update = (patch: Partial<FrequencyValue>) => {
    const next = { ...v, ...patch };
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  const toggle = (f: Frequency, on: boolean) => {
    if (f === 'none') return update({ frequencies: on ? ['none'] : [] });
    const others = v.frequencies.filter((x) => x !== 'none' && x !== f);
    update({ frequencies: on ? [...others, f] : others });
  };
  const daily = v.daily ?? { hours: '', minutes: '', times: '' };
  const weekly = v.weekly ?? { days: [], hours: '', minutes: '' };
  const monthly = v.monthly ?? { date: null, time: null };
  const has = (f: Frequency) => v.frequencies.includes(f);

  return (
    <div role="group" aria-labelledby={`${id}-title`} className={cn('flex flex-col gap-3', className)}>
      <span id={`${id}-title`} className="text-label text-text-strong">{title}</span>
      <div className="flex h-8 items-center gap-5">
        {OPTIONS.map((o) => (
          <Checkbox key={o.value} appearance="settings" label={o.label} checked={has(o.value)} onCheckedChange={(c) => toggle(o.value, c === true)} />
        ))}
      </div>

      {has('daily') && (
        <div className="flex flex-col gap-2">
          <span id={`${id}-daily`} className={rowLabel}>Frequency Time</span>
          {/* Figma rows are 343px wide; w-field-sm (320) until a `size.frequency-row` token exists. */}
          <div className="flex w-field-sm items-center gap-2" role="group" aria-labelledby={`${id}-daily`}>
            <span className={rowLabel}>Every</span>
            <UnitInput label="Hours" unit="Hrs" wrapperClassName="min-w-0 flex-1" value={daily.hours} onChange={(e) => update({ daily: { ...daily, hours: e.target.value } })} />
            <UnitInput label="Minutes" unit="Mins" wrapperClassName="min-w-0 flex-1" value={daily.minutes} onChange={(e) => update({ daily: { ...daily, minutes: e.target.value } })} />
            <UnitInput label="Times" unit="Times" wrapperClassName="min-w-0 flex-1" value={daily.times} onChange={(e) => update({ daily: { ...daily, times: e.target.value } })} />
          </div>
        </div>
      )}

      {has('weekly') && (
        <div className="flex flex-col gap-2">
          <span className={rowLabel}>Weekly Delivery</span>
          <DayPicker aria-label="Weekly delivery days" value={weekly.days} onValueChange={(days) => update({ weekly: { ...weekly, days } })} />
          <div className="flex items-center gap-2">
            <span className={rowLabel}>Deliver at:</span>
            <TimeField
              label="Deliver at"
              hours={weekly.hours}
              minutes={weekly.minutes}
              onHoursChange={(hours) => update({ weekly: { ...weekly, hours } })}
              onMinutesChange={(minutes) => update({ weekly: { ...weekly, minutes } })}
            />
          </div>
        </div>
      )}

      {has('monthly') && (
        <div className="flex w-field-sm items-center gap-2">
          <span className={rowLabel}>Every</span>
          <DateTimePicker
            label="Monthly delivery date and time"
            className="min-w-0 flex-1"
            date={monthly.date}
            time={monthly.time}
            onDateChange={(date) => update({ monthly: { ...monthly, date } })}
            onTimeChange={(time) => update({ monthly: { ...monthly, time } })}
          />
        </div>
      )}
    </div>
  );
}
