import * as RadixSelect from '@radix-ui/react-select';
import { forwardRef, useId, type ReactNode } from 'react';
import { ArrowBottomIcon, LucideChevronDownIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { FieldLabel, FieldMessage, fieldAppearances, labelStyleGap, type FieldAppearance, type FieldLabelStyle } from '../Input/field';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

/**
 * Trigger heights and insets, named by where Figma uses them.
 * - xs 26: inline table select (Social accounts "Post visibility", p6/10, r6, Roboto 12 #111827, chevron #4B5563)
 * - sm 36: Insert Smart Field modal selects (p10/14)
 * - compact 37: Publishing card "Attach to Campaign", fields toolbar "Source:" (p10/14)
 * - md 40: desktop toolbar selects (p10/16)
 * - form 41: email config, composer "Selector Dropdown", inline-label toolbar selects (p12/16)
 * - lg 44: drawer and Filters popover selects (p12/16)
 * - mobile 44: mobile form selects (p0/12)
 */
export type SelectSize = 'xs' | 'sm' | 'compact' | 'md' | 'form' | 'lg' | 'mobile';

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
   * Muted inline prefix inside the trigger, as in the fields toolbar ("Source: All", Inter 14 #64748B).
   * When set, the trigger is sized to its content instead of the full width.
   */
  prefix?: string;
  /** Inline label in text colour, as in the Emails / Social toolbars ("Campaign: All", "Accounts: All"; Inter 14 #1E2238, gap 10). */
  inlineLabel?: string;
  /** Shown when nothing is selected. Figma draws "Select an option" in the value colour (#1E2238), not grey. */
  placeholder?: string;
  helperText?: ReactNode;
  error?: ReactNode;
  size?: SelectSize;
  /** Colour/type dialect, shared with `Input`. Mobile V2 draws no chevron; V1 uses the vuesax arrow-bottom. */
  appearance?: FieldAppearance;
  labelStyle?: FieldLabelStyle;
  /** Option list spacing: `default` 10px rows gap (option list 1446:34877), `relaxed` 15px (Selector Dropdown panel 1147:17013). */
  menuSpacing?: 'default' | 'relaxed';
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

const sizes: Record<SelectSize, string> = {
  xs: 'h-control-26 rounded-sm px-2.5 gap-2',
  sm: 'h-control-sm rounded-md px-3.5 gap-3',
  compact: 'h-control-37 rounded-md px-3.5 gap-3',
  md: 'h-control-md rounded-md px-4 gap-3',
  form: 'h-control-41 rounded-md px-4 gap-7.5',
  lg: 'h-control-lg rounded-md px-4 gap-3',
  mobile: 'h-control-lg rounded-md px-3 gap-2',
};

// Desktop selects draw the placeholder in the value colour; mobile dialects grey it out.
const mobilePlaceholder: Record<FieldAppearance, string | undefined> = {
  default: undefined,
  toolbar: undefined,
  settings: undefined,
  email: 'group-data-[placeholder]:text-text-muted',
  composer: 'group-data-[placeholder]:text-text-muted',
  mobile: 'group-data-[placeholder]:text-text-placeholder',
  'mobile-v1': 'group-data-[placeholder]:text-text-muted',
  'mobile-sections': 'group-data-[placeholder]:text-mobile-caption',
};

/** Single-choice dropdown: Figma `Selector Dropdown` and form selects ("Select an option"). */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    label,
    hideLabel,
    prefix,
    inlineLabel,
    placeholder = 'Select an option',
    helperText,
    error,
    size = 'lg',
    appearance = 'default',
    labelStyle,
    menuSpacing = 'default',
    disabled,
    required,
    name,
    id,
    className,
  },
  ref,
) {
  const autoId = useId();
  const triggerId = id ?? `select-${autoId}`;
  const messageId = `${triggerId}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;
  const inline = Boolean(prefix || inlineLabel);
  const a = fieldAppearances[appearance];
  const isTable = size === 'xs';
  const valueType = isTable ? 'font-data text-caption' : a.value;
  const valueColor = disabled ? 'text-text-muted' : isTable ? 'text-text-strong' : a.valueColor;
  const showChevron = appearance !== 'mobile';

  return (
    <div className={cn('flex flex-col', labelStyle ? labelStyleGap[labelStyle] : a.gap, inline ? 'w-auto' : 'w-full', className)}>
      {label && (
        <FieldLabel htmlFor={triggerId} appearance={appearance} labelStyle={labelStyle} required={required} disabled={disabled} hidden={hideLabel}>
          {label}
        </FieldLabel>
      )}
      <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} required={required} name={name}>
        <RadixSelect.Trigger
          ref={ref}
          id={triggerId}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'group flex items-center justify-between border text-left',
            'transition-[border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none',
            sizes[size],
            valueType,
            valueColor,
            inline ? 'w-auto' : 'w-full',
            disabled
              ? cn('cursor-not-allowed bg-surface-sunken', a.border)
              : hasError
                ? cn('bg-surface-default', a.error)
                : a.mobile
                  ? cn('bg-surface-default', a.border, 'focus-visible:border-1.5 data-[state=open]:border-1.5', appearance === 'mobile' ? 'focus-visible:border-mobile-brand data-[state=open]:border-mobile-brand' : 'focus-visible:border-brand-primary data-[state=open]:border-brand-primary')
                  : cn('bg-surface-default', a.border, 'hover:border-border-strong focus-visible:border-accent-navy focus-visible:shadow-focus data-[state=open]:border-accent-navy'),
          )}
        >
          <span className={cn('flex min-w-0 items-center', inlineLabel ? 'gap-2.5' : 'gap-3')}>
            {prefix && <span className="shrink-0 text-text-secondary">{prefix}</span>}
            {inlineLabel && <span className="shrink-0">{inlineLabel}</span>}
            <span className={cn('truncate', mobilePlaceholder[appearance])}>
              <RadixSelect.Value placeholder={placeholder} />
            </span>
          </span>
          {showChevron && (
            <RadixSelect.Icon asChild>
              {appearance === 'mobile-v1' ? (
                <ArrowBottomIcon className="size-4 shrink-0 text-mobile-icon transition-transform duration-fast group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              ) : (
                <LucideChevronDownIcon
                  className={cn('size-3 shrink-0 transition-transform duration-fast group-data-[state=open]:rotate-180', isTable ? 'text-text-icon-strong' : 'text-text-primary')}
                  strokeWidth={2.67}
                />
              )}
            </RadixSelect.Icon>
          )}
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border-default bg-surface-default',
              'data-[state=open]:animate-pop-in',
            )}
          >
            <RadixSelect.Viewport className={cn('flex max-h-menu-max-height flex-col px-4 py-3', menuSpacing === 'relaxed' ? 'gap-3.75' : 'gap-2.5')}>
              {options.map((o) => (
                <RadixSelect.Item
                  key={o.value}
                  value={o.value}
                  disabled={o.disabled}
                  className={cn(
                    'relative -mx-2 cursor-pointer select-none rounded-xs px-2 text-body text-text-primary outline-none',
                    // Figma draws plain text rows; highlight and checked colours are derived.
                    'data-[highlighted]:bg-surface-subtle data-[state=checked]:text-brand-primary',
                    'data-[disabled]:cursor-not-allowed data-[disabled]:text-text-muted',
                  )}
                >
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {message && (
        <FieldMessage id={messageId} appearance={appearance} error={hasError}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
});
