import * as RadixSelect from '@radix-ui/react-select';
import { forwardRef, useId, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Field label above the trigger (form use). */
  label?: string;
  /** Hide the label visually but keep it for screen readers (toolbar filters). */
  hideLabel?: boolean;
  /**
   * Inline prefix inside the trigger, as in the table toolbar selectors: "Accounts: All", "Platforms: All".
   * When set, the trigger is sized to its content instead of the full width.
   */
  prefix?: string;
  placeholder?: string;
  helperText?: ReactNode;
  error?: ReactNode;
  size?: 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-text-primary transition-transform duration-fast group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Single-choice dropdown: Figma `Selector Dropdown` and form selects ("Select an option"). */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { options, value, defaultValue, onValueChange, label, hideLabel, prefix, placeholder = 'Select an option', helperText, error, size = 'lg', disabled, required, name, id, className },
  ref,
) {
  const autoId = useId();
  const triggerId = id ?? `select-${autoId}`;
  const messageId = `${triggerId}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;
  const inline = Boolean(prefix);

  return (
    <div className={cn('flex flex-col gap-2', inline ? 'w-auto' : 'w-full', className)}>
      {label && (
        <label htmlFor={triggerId} className={cn('text-label font-medium', disabled ? 'text-text-muted' : 'text-text-primary', hideLabel && 'sr-only')}>
          {label}
          {required && <span className="text-brand-primary" aria-hidden="true"> *</span>}
        </label>
      )}
      <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} required={required} name={name}>
        <RadixSelect.Trigger
          ref={ref}
          id={triggerId}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'group flex items-center justify-between gap-3 rounded-md border bg-surface-default px-4 text-left text-body text-text-primary',
            'transition-[border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none',
            size === 'lg' ? 'h-control-lg' : 'h-control-md',
            inline ? 'w-auto' : 'w-full',
            hasError
              ? 'border-status-danger focus-visible:shadow-focus-danger'
              : 'border-border-default hover:border-border-strong focus-visible:border-accent-navy focus-visible:shadow-focus data-[state=open]:border-accent-navy',
            'data-[placeholder]:text-text-placeholder disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-text-muted',
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {prefix && <span className="shrink-0 text-text-secondary">{prefix}</span>}
            <span className="truncate"><RadixSelect.Value placeholder={placeholder} /></span>
          </span>
          <RadixSelect.Icon asChild><Chevron /></RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border-default bg-surface-default shadow-menu',
              'data-[state=open]:animate-pop-in',
            )}
          >
            <RadixSelect.Viewport className="max-h-menu-max-height p-1">
              {options.map((o) => (
                <RadixSelect.Item
                  key={o.value}
                  value={o.value}
                  disabled={o.disabled}
                  className={cn(
                    'relative flex h-control-sm cursor-pointer select-none items-center justify-between gap-3 rounded-sm px-3 text-body text-text-primary outline-none',
                    'data-[highlighted]:bg-surface-subtle data-[state=checked]:font-medium data-[state=checked]:text-brand-primary',
                    'data-[disabled]:cursor-not-allowed data-[disabled]:text-text-muted',
                  )}
                >
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {message && (
        <p id={messageId} className={cn('text-caption', hasError ? 'text-status-danger' : 'text-text-secondary')} role={hasError ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  );
});
