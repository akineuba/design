import * as Popover from '@radix-ui/react-popover';
import { useId, useState } from 'react';
import { FluentCalendarIcon, LucideChevronDownIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { CalendarTimePicker, TimeSpinner, padTime, type TimeValue } from './CalendarTimePicker';

const formatDate = (d: Date) => `${padTime(d.getDate())}/${padTime(d.getMonth() + 1)}/${d.getFullYear()}`;
const formatTime = (t: TimeValue) => `${padTime(t.hours)}:${padTime(t.minutes)}`;

const trigger =
  'flex w-full items-center justify-between gap-7.5 rounded-md border border-border-default bg-surface-default px-4 text-left ' +
  'outline-none transition-[border-color,box-shadow] duration-fast ease-standard hover:border-border-strong ' +
  'focus-visible:border-accent-navy focus-visible:shadow-focus data-[state=open]:border-accent-navy disabled:cursor-not-allowed disabled:bg-surface-sunken';

export interface DateTimePickerProps {
  /** Accessible name ("Monthly delivery date"). */
  label: string;
  /** Show the label above the field (Inter 13 #1E2238). Hidden by default because Figma labels the row ("Every"). */
  showLabel?: boolean;
  date?: Date | null;
  defaultDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  time?: TimeValue | null;
  defaultTime?: TimeValue | null;
  onTimeChange?: (time: TimeValue) => void;
  /** Start with the calendar open (stories, review). */
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Date + time field from the monthly frequency row (1590:5601): 41px, p12/16, r8; "DD/MM/YYYY  By  00:00"
 * (Inter 14 #A3AED0 placeholders, gap 10) and the 16px fluent calendar icon. Opens `CalendarTimePicker`.
 */
export function DateTimePicker({ label, showLabel = false, date, defaultDate = null, onDateChange, time, defaultTime = null, onTimeChange, defaultOpen, disabled, className }: DateTimePickerProps) {
  const id = useId();
  const [innerDate, setInnerDate] = useState<Date | null>(defaultDate);
  const [innerTime, setInnerTime] = useState<TimeValue | null>(defaultTime);
  const d = date !== undefined ? date : innerDate;
  const t = time !== undefined ? time : innerTime;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span id={`${id}-label`} className={showLabel ? 'text-field-label text-text-primary' : 'sr-only'}>{label}</span>
      <Popover.Root defaultOpen={defaultOpen}>
        <Popover.Trigger disabled={disabled} aria-labelledby={`${id}-label ${id}-value`} className={cn(trigger, 'h-control-41')}>
          <span id={`${id}-value`} className={cn('flex items-center gap-2.5 text-body', d ? 'text-text-primary' : 'text-text-muted')}>
            <span>{d ? formatDate(d) : 'DD/MM/YYYY'}</span>
            <span className={t || d ? 'text-text-muted' : undefined}>By</span>
            <span className={t ? 'text-text-primary' : 'text-text-muted'}>{t ? `${formatTime(t)} ${t.period}` : '00:00'}</span>
          </span>
          <FluentCalendarIcon className="size-4 shrink-0 text-text-secondary" />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="end" sideOffset={4} className="z-50 data-[state=open]:animate-pop-in">
            <CalendarTimePicker
              value={d}
              onChange={(v) => {
                if (date === undefined) setInnerDate(v);
                onDateChange?.(v);
              }}
              time={t}
              onTimeChange={(v) => {
                if (time === undefined) setInnerTime(v);
                onTimeChange?.(v);
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export interface TimePickerProps {
  label: string;
  /** Show the label above the field (Publishing card "Time", Inter 13 #1E2238, gap 6). */
  showLabel?: boolean;
  value?: TimeValue | null;
  defaultValue?: TimeValue | null;
  onValueChange?: (value: TimeValue) => void;
  /** Field height: `lg` 44 (Publishing card schedule grid) or `form` 41. */
  size?: 'form' | 'lg';
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Time trigger from the Publishing Card schedule grid (1066:9141): "8:45" Inter 14 #1E2238 + "AM" Inter 14 #64748B
 * (gap 10) and a 12px chevron; opens a `TimeSpinner` popover.
 */
export function TimePicker({ label, showLabel = true, value, defaultValue = null, onValueChange, size = 'lg', defaultOpen, disabled, className }: TimePickerProps) {
  const id = useId();
  const [inner, setInner] = useState<TimeValue | null>(defaultValue);
  const t = value !== undefined ? value : inner;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span id={`${id}-label`} className={showLabel ? 'text-field-label text-text-primary' : 'sr-only'}>{label}</span>
      <Popover.Root defaultOpen={defaultOpen}>
        <Popover.Trigger
          disabled={disabled}
          aria-labelledby={`${id}-label ${id}-value`}
          className={cn(trigger, size === 'lg' ? 'h-control-lg' : 'h-control-41')}
        >
          <span id={`${id}-value`} className="flex items-center gap-2.5 text-body">
            <span className="text-text-primary">{t ? `${t.hours}:${padTime(t.minutes)}` : '--:--'}</span>
            <span className="text-text-secondary">{t?.period ?? 'AM'}</span>
          </span>
          <LucideChevronDownIcon className="size-3 shrink-0 text-text-primary" strokeWidth={2.67} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="start" sideOffset={4} className="z-50 w-schedule-popover rounded-md border border-border-default bg-surface-default p-4 shadow-menu data-[state=open]:animate-pop-in">
            <TimeSpinner
              value={t}
              onChange={(v) => {
                if (value === undefined) setInner(v);
                onValueChange?.(v);
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
