import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  /** Visible label. Omit only when the checkbox is labelled elsewhere (pass `aria-label`). */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
}

/** 16px brand-red checkbox used in filter lists, table selection and notification settings. Supports `checked="indeterminate"`. */
export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(function Checkbox(
  { label, description, id, className, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const boxId = id ?? `checkbox-${autoId}`;
  const box = (
    <RadixCheckbox.Root
      ref={ref}
      id={boxId}
      disabled={disabled}
      className={cn(
        'peer inline-flex size-checkbox shrink-0 items-center justify-center rounded-xs border-2 border-border-strong bg-surface-default text-text-inverse',
        'transition-colors duration-fast ease-standard hover:border-text-muted',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary',
        'data-[state=indeterminate]:border-brand-primary data-[state=indeterminate]:bg-brand-primary',
        'disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-sunken disabled:data-[state=checked]:bg-text-muted disabled:data-[state=checked]:border-text-muted',
        !label && className,
      )}
      {...rest}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center">
        {rest.checked === 'indeterminate' ? (
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true"><path d="M3.5 8h9" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label) return box;

  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <span className="flex h-5 items-center">{box}</span>
      <span className="flex flex-col gap-0.5">
        <label htmlFor={boxId} className={cn('text-body-sm', disabled ? 'cursor-not-allowed text-text-muted' : 'cursor-pointer text-text-primary')}>
          {label}
        </label>
        {description && <span className="text-caption text-text-secondary">{description}</span>}
      </span>
    </div>
  );
});
