import { createContext, forwardRef, useContext, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { CarbonRadioButtonCheckedIcon, CarbonRadioButtonIcon, LucideCheckIcon } from '../../icons';
import { cn } from '../../utils/cn';

/**
 * Radio style, named by where Figma draws it.
 * - default: email config `Component 19` (1555:13398 / 1555:13402) — 16px; checked #EE1F2F with a 6px white dot, unchecked 2px #E2E8F0 ring
 * - carbon: new-audience drawer (1533:9598 / 1533:9613) — carbon radio glyphs 16px, unchecked #000000, checked #EE1F2F
 * - sheet: mobile select sheet (1933:13998 / 1933:14003) — 18px white with 1px #DDE3ED; checked solid #F32135
 * - check: mobile Emails / Social selection (1931:23598) — 22px circle; checked #EE1F2F with a white check, unchecked #E2E8F0 ring
 */
export type RadioAppearance = 'default' | 'carbon' | 'sheet' | 'check';

interface GroupContext {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  appearance: RadioAppearance;
  emphasizeSelected: boolean;
  disabled?: boolean;
}

const RadioGroupContext = createContext<GroupContext | null>(null);

export interface RadioGroupProps {
  /** Group title, e.g. "Scope" (Inter Semi Bold 14 #111827, 12px above the options). Also the accessible name. */
  label?: ReactNode;
  /** Accessible name when there is no visible label. */
  'aria-label'?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  appearance?: RadioAppearance;
  /** Options stack vertically (16px gap, email config) or sit in a row. */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Show unselected option labels in Regular 13 #64748B and the selected one in Medium 13 #111827,
   * as in the email config "From Name" group.
   */
  emphasizeSelected?: boolean;
  /** Helper under the options (Inter Regular 12 #64748B). */
  helperText?: ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const optionGap: Record<RadioAppearance, string> = {
  default: 'gap-4',
  carbon: 'gap-4',
  sheet: 'gap-2',
  check: 'gap-3',
};

/**
 * Single choice from a short list. Native radio inputs give the arrow-key and Tab behaviour; the
 * group is a `fieldset` with a `legend` so screen readers announce the question.
 */
export function RadioGroup({
  label,
  value,
  defaultValue,
  onValueChange,
  name,
  appearance = 'default',
  orientation = 'vertical',
  emphasizeSelected = false,
  helperText,
  disabled,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? `radio-${autoName}`;
  // Uncontrolled groups keep their own value so every option (and `emphasizeSelected`) knows the selection.
  const [inner, setInner] = useState(defaultValue);
  const current = value !== undefined ? value : inner;
  const ctx: GroupContext = {
    name: groupName,
    value: current ?? '',
    onChange: (v) => {
      if (value === undefined) setInner(v);
      onValueChange?.(v);
    },
    appearance,
    emphasizeSelected,
    disabled,
  };
  return (
    <RadioGroupContext.Provider value={ctx}>
      <fieldset aria-label={rest['aria-label']} disabled={disabled} className={cn('m-0 flex min-w-0 flex-col gap-3 border-0 p-0', className)}>
        {label && <legend className="mb-3 p-0 text-label text-text-strong">{label}</legend>}
        <div className={cn('flex', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap', optionGap[appearance])}>{children}</div>
        {helperText && <p className="text-caption text-text-secondary">{helperText}</p>}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  appearance?: RadioAppearance;
}

const labelStyles: Record<RadioAppearance, { gap: string; label: string; muted: string; description: string }> = {
  default: { gap: 'gap-3', label: 'text-stat-label text-text-strong', muted: 'text-body-sm text-text-secondary', description: 'text-caption text-text-secondary' },
  carbon: { gap: 'gap-2.5', label: 'text-body text-text-primary', muted: 'text-body text-text-secondary', description: 'text-caption text-text-secondary' },
  sheet: { gap: 'gap-2.5', label: 'font-data text-label-sm text-mobile-text', muted: 'font-data text-caption text-mobile-text-secondary', description: 'font-data text-caption-xs text-mobile-text-secondary' },
  check: { gap: 'gap-3', label: 'text-body font-medium text-text-primary', muted: 'text-body text-text-secondary', description: 'text-caption-sm text-mobile-caption' },
};

const boxSize: Record<RadioAppearance, string> = {
  default: 'size-radio',
  carbon: 'size-radio',
  sheet: 'size-radio-sheet',
  check: 'size-check-circle',
};

/** The drawn circle, kept separate so `OptionCard` can reuse it. */
export function RadioMark({ appearance, checked }: { appearance: RadioAppearance; checked: boolean }) {
  if (appearance === 'carbon') {
    return checked ? <CarbonRadioButtonCheckedIcon className="size-radio text-brand-primary" /> : <CarbonRadioButtonIcon className="size-radio text-text-black" />;
  }
  if (appearance === 'default') {
    return (
      <span className={cn('flex size-radio items-center justify-center rounded-full', checked ? 'bg-brand-primary' : 'border-2 border-border-default bg-surface-default')}>
        {checked && <span className="size-1.5 rounded-full bg-surface-default" />}
      </span>
    );
  }
  if (appearance === 'sheet') {
    return <span className={cn('block size-radio-sheet rounded-full', checked ? 'bg-mobile-brand' : 'border border-mobile-border bg-surface-default')} />;
  }
  return (
    <span className={cn('flex size-check-circle items-center justify-center rounded-full', checked ? 'bg-brand-primary text-text-inverse' : 'border-1.5 border-border-default bg-surface-default')}>
      {checked && <LucideCheckIcon className="size-3.25" strokeWidth={2.5} />}
    </span>
  );
}

/** One option. Use inside `RadioGroup` (inherits name, value and appearance) or on its own with `name`/`checked`. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, appearance: appearanceProp, id, className, disabled, checked: checkedProp, defaultChecked, onChange, name, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? `radio-${autoId}`;
  const appearance = appearanceProp ?? group?.appearance ?? 'default';
  const controlled = group?.value !== undefined || checkedProp !== undefined;
  const checked = group?.value !== undefined ? group.value === value : checkedProp;
  const l = labelStyles[appearance];
  const isDisabled = disabled ?? group?.disabled;

  return (
    <label htmlFor={inputId} className={cn('group/radio relative inline-flex', description ? 'items-start' : 'items-center', l.gap, isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer', className)}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        value={value}
        name={name ?? group?.name}
        disabled={isDisabled}
        {...(controlled ? { checked: Boolean(checked) } : { defaultChecked })}
        onChange={(e) => {
          onChange?.(e);
          if (e.target.checked) group?.onChange?.(value);
        }}
        className="peer sr-only"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full peer-focus-visible:shadow-focus',
          boxSize[appearance],
        )}
      >
        {/* Uncontrolled: both marks render and CSS shows the one matching :checked. */}
        {controlled ? (
          <RadioMark appearance={appearance} checked={Boolean(checked)} />
        ) : (
          <>
            <span className="hidden group-has-[:checked]/radio:contents"><RadioMark appearance={appearance} checked /></span>
            <span className="contents group-has-[:checked]/radio:hidden"><RadioMark appearance={appearance} checked={false} /></span>
          </>
        )}
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className={group?.emphasizeSelected && !checked ? l.muted : l.label}>{label}</span>}
          {description && <span className={l.description}>{description}</span>}
        </span>
      )}
    </label>
  );
});
