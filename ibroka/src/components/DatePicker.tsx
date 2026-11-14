import { useId, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { formatDate } from '../lib/money';
import { Field, controlBase, controlBorder, controlHeight, useFieldSize } from './Field';
import { CalendarIcon, CaretLeftIcon, CaretRightIcon } from '../icons';
import { Button } from './Button';

export type DateRange = { from?: Date; to?: Date };

interface BaseProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: Date;
  max?: Date;
  size?: 'form' | 'filter';
  className?: string;
  defaultOpen?: boolean;
  /** Month shown first when nothing is selected (docs and tests). */
  initialMonth?: Date;
}

export interface DatePickerProps extends BaseProps {
  mode?: 'single';
  value?: Date;
  onChange: (d: Date | undefined) => void;
}

export interface DateRangePickerProps extends BaseProps {
  mode: 'range';
  value?: DateRange;
  onChange: (r: DateRange) => void;
  /** Shortcuts under the calendar. Defaults to This month, Last 30 days, This year. */
  presets?: Array<{ label: string; range: () => DateRange }>;
}

const sameDay = (a?: Date, b?: Date) => !!a && !!b && a.toDateString() === b.toDateString();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function monthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - offset + 1));
}

const defaultPresets = (): DateRangePickerProps['presets'] => {
  const t = startOfDay(new Date());
  return [
    { label: 'This month', range: () => ({ from: new Date(t.getFullYear(), t.getMonth(), 1), to: t }) },
    { label: 'Last 30 days', range: () => ({ from: new Date(t.getTime() - 29 * 864e5), to: t }) },
    { label: 'This year', range: () => ({ from: new Date(t.getFullYear(), 0, 1), to: t }) },
  ];
};

/** Date field with a calendar. `mode="range"` picks a from-to range (report filters, policy periods). */
export function DatePicker(props: DatePickerProps | DateRangePickerProps) {
  const { label, hint, error, required, disabled, placeholder, min, max, size, className, defaultOpen, initialMonth } = props;
  const ctx = useFieldSize();
  const s = size ?? ctx;
  const range = props.mode === 'range';
  const sel: DateRange = range ? props.value ?? {} : { from: (props as DatePickerProps).value };
  const { open, setOpen, close, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultOpen);
  const [month, setMonth] = useState(() => {
    const d = sel.from ?? initialMonth ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [focus, setFocus] = useState<Date>(() => sel.from ?? initialMonth ?? new Date());
  const [hover, setHover] = useState<Date>();
  const gridId = useId();
  const days = useMemo(() => monthGrid(month), [month]);
  const today = startOfDay(new Date());

  const text = range
    ? sel.from
      ? `${formatDate(sel.from)} – ${sel.to ? formatDate(sel.to) : '…'}`
      : ''
    : sel.from
      ? formatDate(sel.from)
      : '';

  const outOfBounds = (d: Date) => (min && d < startOfDay(min)) || (max && d > startOfDay(max));

  const pick = (d: Date) => {
    if (outOfBounds(d)) return;
    if (!range) {
      (props as DatePickerProps).onChange(d);
      close();
      return;
    }
    const p = props as DateRangePickerProps;
    if (!sel.from || sel.to) p.onChange({ from: d, to: undefined });
    else if (d < sel.from) p.onChange({ from: d, to: sel.from });
    else {
      p.onChange({ from: sel.from, to: d });
      close();
    }
  };

  const move = (delta: number) => {
    const n = new Date(focus.getFullYear(), focus.getMonth(), focus.getDate() + delta);
    setFocus(n);
    if (n.getMonth() !== month.getMonth() || n.getFullYear() !== month.getFullYear()) setMonth(new Date(n.getFullYear(), n.getMonth(), 1));
    setTimeout(() => document.getElementById(`${gridId}-${n.toDateString()}`)?.focus(), 0);
  };
  const onGridKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(focus);
    }
  };

  const inRange = (d: Date) => {
    const end = sel.to ?? (sel.from && hover && hover > sel.from ? hover : undefined);
    return range && sel.from && end && d > sel.from && d < end;
  };

  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <div ref={rootRef} className="relative">
          <button
            ref={triggerRef}
            id={id}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            disabled={disabled}
            onClick={() => setOpen(!open)}
            className={cx(controlBase, controlHeight(s), controlBorder(invalid), 'flex items-center justify-between gap-2 text-left', open && 'border-brand')}
          >
            <span className={cx('truncate', !text && 'text-fg-placeholder')}>{text || placeholder || (range ? 'Select dates' : 'Select date')}</span>
            <span className="size-icon shrink-0 text-fg-strong" aria-hidden>
              <CalendarIcon />
            </span>
          </button>
          {open && (
            <div role="dialog" aria-label={range ? 'Choose dates' : 'Choose date'} className="absolute left-0 z-30 mt-1 w-[296px] animate-fade-in rounded-lg border border-line-subtle bg-surface p-3.5 shadow-pop">
              <div className="mb-2 flex items-center justify-between">
                <button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted ib-focus">
                  <span className="size-icon-sm">
                    <CaretLeftIcon />
                  </span>
                </button>
                <p className="text-13 font-semibold text-fg-strong" aria-live="polite">
                  {month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </p>
                <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted ib-focus">
                  <span className="size-icon-sm">
                    <CaretRightIcon />
                  </span>
                </button>
              </div>
              <div role="grid" aria-label="Calendar" onKeyDown={onGridKey} className="flex flex-col gap-y-0.5">
                <div role="row" className="grid grid-cols-7">
                  {WEEK.map((w) => (
                    <span key={w} role="columnheader" className="py-1 text-center text-11 font-semibold text-fg-muted">
                      {w}
                    </span>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, wk) => days.slice(wk * 7, wk * 7 + 7)).map((week) => (
                  <div key={week[0].toISOString()} role="row" className="grid grid-cols-7">
                    {week.map((d) => {
                      const other = d.getMonth() !== month.getMonth();
                      const isStart = sameDay(d, sel.from);
                      const isEnd = sameDay(d, sel.to);
                      const selected = isStart || isEnd;
                      const off = outOfBounds(d);
                      return (
                        <span key={d.toISOString()} role="gridcell" aria-selected={selected} className="flex justify-center">
                          <button
                            id={`${gridId}-${d.toDateString()}`}
                            type="button"
                            aria-label={d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            aria-pressed={selected}
                            tabIndex={sameDay(d, focus) ? 0 : -1}
                            disabled={off}
                            onClick={() => {
                              setFocus(d);
                              pick(d);
                            }}
                            onMouseEnter={() => setHover(d)}
                            className={cx(
                              'inline-flex size-9 items-center justify-center rounded-md text-13 tabular-nums ib-focus disabled:cursor-not-allowed disabled:text-fg-disabled',
                              selected ? 'bg-primary font-semibold text-fg-inverse' : inRange(d) ? 'rounded-none bg-brand-subtle text-fg-strong' : 'hover:bg-surface-muted',
                              !selected && (other ? 'text-fg-placeholder' : 'text-fg-strong'),
                              !selected && sameDay(d, today) && 'font-bold text-primary underline underline-offset-4',
                            )}
                          >
                            {d.getDate()}
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
              {range && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line-subtle pt-3">
                  {((props as DateRangePickerProps).presets ?? defaultPresets())!.map((p) => (
                    <Button
                      key={p.label}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        (props as DateRangePickerProps).onChange(p.range());
                        close();
                      }}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Field>
  );
}
