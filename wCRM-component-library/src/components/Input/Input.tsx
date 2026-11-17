import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { AlertCircle, LucideXCircleIcon } from '../../icons';
import { cn } from '../../utils/cn';
import { FieldLabel, FieldMessage, fieldAppearances, labelStyleGap, type FieldAppearance, type FieldLabelStyle } from './field';

/**
 * Field heights and insets as drawn in Figma, named by where they are used.
 * - xs 26 (inline table edit) · search-sm 32 (connect-social search) · toolbar 36 (table toolbar search, p8/12)
 * - settings 36 (Organisation form, p10/14) · compact 37 (read-only detail fields, composer inputs)
 * - social 38 (social links, profile read-only) · md 40 (fields / mobile-sections search, p0/12)
 * - search 40 (User management search, p10/16, gap 12) · form 41 (email config, unit inputs, p12/16)
 * - lg 44 (drawer forms, p12/16) · mobile 44 (V2 / sections fields, p0/12) · mobile-search 44 (V2 search, p0/13 gap 9)
 * - mobile-v1 44 (V1 fields and search, p11/13 gap 10)
 */
export type InputSize =
  | 'xs'
  | 'search-sm'
  | 'toolbar'
  | 'settings'
  | 'compact'
  | 'social'
  | 'md'
  | 'search'
  | 'form'
  | 'lg'
  | 'mobile'
  | 'mobile-search'
  | 'mobile-v1';

export type InputReadOnlyFill = 'none' | 'canvas' | 'table-header';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Required for accessibility; use `hideLabel` to keep it for screen readers only. */
  label: string;
  hideLabel?: boolean;
  /** Supporting text under the field. Replaced by `error` when both are set. */
  helperText?: ReactNode;
  /** Error message. Turns the field red and sets `aria-invalid`. */
  error?: ReactNode;
  /** Height and inset, named by where Figma uses it. Default `lg` (44px drawer field). */
  size?: InputSize;
  /** Colour/type dialect of the frame you are building. Default `default` (desktop drawers). */
  appearance?: FieldAppearance;
  /** Override the label style (Figma uses Regular, Medium and Semi Bold 13, Regular 12 and Semi Bold 14 labels). */
  labelStyle?: FieldLabelStyle;
  /** Icon inside the field before the text, e.g. search. */
  leadingIcon?: ReactNode;
  /** Icon or control inside the field after the text, e.g. a calendar glyph. */
  trailingIcon?: ReactNode;
  /** Unit after the value, e.g. "Hrs" / "Mins" in the frequency time row (Inter 14 #A3AED0, pushed to the end). */
  suffix?: ReactNode;
  /** Shows an x-circle clear button while the field has a value (mobile search). */
  onClear?: () => void;
  /** Accessible name of the clear button. */
  clearLabel?: string;
  /** Read-only fill: white (campaign details), #F4F6FA (email config) or #F8F9FC (spec drawer, value #64748B). */
  readOnlyFill?: InputReadOnlyFill;
  /** Native `size` attribute (character width), since `size` selects the Figma height. */
  htmlSize?: number;
  /** Class for the outer wrapper (label + field + message). */
  wrapperClassName?: string;
}

const sizes: Record<InputSize, string> = {
  xs: 'h-control-26 rounded-sm px-2.5 gap-1.5',
  'search-sm': 'h-8 rounded-md px-3.5 gap-2',
  toolbar: 'h-control-sm rounded-md px-3 gap-2',
  settings: 'h-control-sm rounded-md px-3.5 gap-2.5',
  compact: 'h-control-37 rounded-md px-3.5 gap-2',
  social: 'h-control-38 rounded-md px-3.5 gap-2.5',
  md: 'h-control-md rounded-md px-3 gap-2',
  search: 'h-control-md rounded-md px-4 gap-3',
  form: 'h-control-41 rounded-md px-4 gap-2',
  lg: 'h-control-lg rounded-md px-4 gap-2',
  mobile: 'h-control-lg rounded-md px-3 gap-2',
  'mobile-search': 'h-control-lg rounded-md px-3.25 gap-2.25',
  'mobile-v1': 'h-control-lg rounded-md px-3.25 gap-2.5',
};

const readOnlyFills: Record<InputReadOnlyFill, string> = {
  none: 'bg-surface-default',
  canvas: 'bg-surface-canvas',
  'table-header': 'bg-surface-table-header',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hideLabel = false,
    helperText,
    error,
    size = 'lg',
    appearance = 'default',
    labelStyle,
    leadingIcon,
    trailingIcon,
    suffix,
    onClear,
    clearLabel = 'Clear',
    readOnlyFill = 'none',
    htmlSize,
    required,
    disabled,
    readOnly,
    id,
    className,
    wrapperClassName,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const messageId = `${inputId}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;
  const a = fieldAppearances[appearance];

  const state = disabled ? 'disabled' : hasError ? 'error' : readOnly ? 'readOnly' : 'default';
  const fieldState =
    state === 'disabled'
      ? cn('cursor-not-allowed bg-surface-sunken', a.border)
      : state === 'error'
        ? cn('bg-surface-default', a.error)
        : state === 'readOnly'
          ? cn(readOnlyFills[readOnlyFill], a.border)
          : cn('bg-surface-default', a.border, a.focus, !a.mobile && 'hover:border-border-strong focus-within:hover:border-accent-navy');

  const valueClass = cn(
    a.value,
    state === 'disabled' ? 'text-text-muted' : readOnly && readOnlyFill === 'table-header' ? 'text-text-secondary' : a.valueColor,
  );

  const showClear = Boolean(onClear) && !disabled && !readOnly && (rest.value === undefined || String(rest.value) !== '');

  return (
    <div className={cn('flex flex-col', labelStyle ? labelStyleGap[labelStyle] : a.gap, wrapperClassName ?? 'w-full')} data-state={state}>
      <FieldLabel htmlFor={inputId} appearance={appearance} labelStyle={labelStyle} required={required} disabled={disabled} hidden={hideLabel}>
        {label}
      </FieldLabel>

      <div className={cn('flex w-full items-center border transition-[border-color,box-shadow] duration-fast ease-standard', sizes[size], fieldState)}>
        {leadingIcon && <span className={cn('inline-flex shrink-0 [&>svg]:size-full', a.icon)}>{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          size={htmlSize}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed',
            valueClass,
            a.placeholder,
            className,
          )}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label={clearLabel}
            className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-text-placeholder focus-visible:outline-none focus-visible:shadow-focus"
          >
            <LucideXCircleIcon className="size-4" />
          </button>
        )}
        {suffix && <span className={cn('shrink-0', a.mobile ? 'font-data text-body-sm' : 'text-body', 'text-text-muted')}>{suffix}</span>}
        {hasError && !trailingIcon && !a.mobile && !suffix && <AlertCircle className="shrink-0 text-status-danger" />}
        {trailingIcon && <span className="inline-flex size-4 shrink-0 text-text-secondary [&>svg]:size-4">{trailingIcon}</span>}
      </div>

      {message && (
        <FieldMessage id={messageId} appearance={appearance} error={hasError}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
});
