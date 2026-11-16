import { cn } from '@ds';
import plus from '../assets/checkout/plus.svg';

interface SeatStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  /**
   * - plan: bordered pill with the red plus glyph (Configure plan rows, 698:2437)
   * - field: full-width 40px box with "-" / "+" text buttons (Add organisations 372:2344, Edit modal 367:16495)
   */
  appearance?: 'plan' | 'field';
}

const textButton =
  'flex h-full w-10 items-center justify-center text-heading-2 font-semibold text-text-tertiary hover:text-text-strong disabled:cursor-not-allowed disabled:text-text-faint focus-visible:outline-none focus-visible:shadow-focus rounded-sm';

/** Number stepper used for seats and organisation counts. Values can also be typed. */
export function SeatStepper({ value, onChange, label, min = 0, max = 9999, appearance = 'plan' }: SeatStepperProps) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, Number.isFinite(v) ? v : min)));
  const input = (
    <input
      type="number"
      inputMode="numeric"
      aria-label={label}
      value={value}
      min={min}
      max={max}
      onChange={(e) => set(parseInt(e.target.value || '0', 10))}
      className={cn(
        'min-w-0 bg-transparent text-center text-label text-text-strong focus-visible:outline-none',
        appearance === 'plan' ? 'w-8' : 'flex-1',
      )}
    />
  );

  if (appearance === 'field') {
    return (
      <div className="flex h-control-md w-full items-center justify-between rounded-sm border border-border-default bg-surface-default focus-within:border-accent-navy focus-within:shadow-focus">
        <button type="button" className={textButton} aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => set(value - 1)}>
          -
        </button>
        {input}
        <button type="button" className={textButton} aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => set(value + 1)}>
          +
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-control-md items-center gap-2 rounded-md border border-border-default bg-surface-default px-3 focus-within:border-accent-navy focus-within:shadow-focus">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => set(value - 1)}
        className="flex size-4 items-center justify-center rounded-xs text-heading-3 leading-none text-text-tertiary hover:text-text-strong disabled:text-text-faint focus-visible:outline-none focus-visible:shadow-focus"
      >
        −
      </button>
      {input}
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className="flex size-4 items-center justify-center rounded-xs focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-50"
      >
        <img src={plus} alt="" className="size-4" />
      </button>
    </div>
  );
}
