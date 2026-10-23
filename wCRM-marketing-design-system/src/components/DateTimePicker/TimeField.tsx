import { forwardRef, useId, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Input, type InputProps } from '../Input';

export interface UnitInputProps extends Omit<InputProps, 'suffix' | 'size'> {
  /** Unit drawn after the value: "Hrs", "Mins", "Times" (Inter 14 #A3AED0, pushed to the end of the field). */
  unit: ReactNode;
}

/**
 * Number field with a unit suffix: Figma `Selector Dropdown` in `time-picker-row` (1268:28450) and the frequency
 * checklist "Every 00 Hrs / 00 Mins / 00 Times" row. 41px, p12/16, r8, value Inter 14 #1E2238.
 */
export const UnitInput = forwardRef<HTMLInputElement, UnitInputProps>(function UnitInput({ unit, hideLabel = true, inputMode = 'numeric', placeholder = '00', ...rest }, ref) {
  return <Input ref={ref} size="form" suffix={unit} hideLabel={hideLabel} inputMode={inputMode} placeholder={placeholder} {...rest} />;
});

export interface TimeFieldProps {
  /** Accessible name of the field, e.g. "Deliver at". */
  label: string;
  hours?: string;
  minutes?: string;
  defaultHours?: string;
  defaultMinutes?: string;
  onHoursChange?: (value: string) => void;
  onMinutesChange?: (value: string) => void;
  /** Unit after the time ("Hrs"). */
  unit?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const segment =
  'min-w-0 bg-transparent text-center text-body text-text-primary outline-none placeholder:text-text-primary disabled:cursor-not-allowed';

/**
 * "00 : 00 Hrs" time field from the weekly frequency row (1590:5571 "Deliver at:"): one 41px bordered box,
 * hours, colon, minutes and unit spread evenly (Figma space-between).
 */
export function TimeField({ label, hours, minutes, defaultHours, defaultMinutes, onHoursChange, onMinutesChange, unit = 'Hrs', disabled, className }: TimeFieldProps) {
  const id = useId();
  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      className={cn(
        'flex h-control-41 items-center justify-between rounded-md border border-border-default bg-surface-default px-4',
        'focus-within:border-accent-navy focus-within:shadow-focus',
        disabled && 'cursor-not-allowed bg-surface-sunken',
        className,
      )}
    >
      <span id={`${id}-label`} className="sr-only">{label}</span>
      <input
        aria-label="Hours"
        inputMode="numeric"
        maxLength={2}
        size={2}
        placeholder="00"
        value={hours}
        defaultValue={defaultHours}
        onChange={(e) => onHoursChange?.(e.target.value.replace(/\D/g, ''))}
        disabled={disabled}
        className={segment}
      />
      <span aria-hidden="true" className="text-body text-text-primary">:</span>
      <input
        aria-label="Minutes"
        inputMode="numeric"
        maxLength={2}
        size={2}
        placeholder="00"
        value={minutes}
        defaultValue={defaultMinutes}
        onChange={(e) => onMinutesChange?.(e.target.value.replace(/\D/g, ''))}
        disabled={disabled}
        className={segment}
      />
      <span className="text-body text-text-muted">{unit}</span>
    </div>
  );
}
