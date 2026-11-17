import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { LucideCheckIcon } from '../../icons';
import { cn } from '../../utils/cn';

/**
 * Box style, named by where Figma draws it.
 * - table: 14px, r3, 1px #CBD5E1 (audience list selection column)
 * - form: 16px, r3, 1px #CBD5E1 (drawer `Component 16`, title Medium 13 + description)
 * - settings: 16px, r4, 2px #E2E8F0; checked #E53E3E (notification pref rows, frequency checklist, email config)
 * - list: 18px, r4, 1.5px #64748B (new-audience drawer pick-list)
 * - drawer: 20px, r5, 1px #A3AED0; checked #EE1F2F (fields drawer option rows)
 * - success: 20px, green #059669 when checked (YouTube "Made for kids?")
 */
export type CheckboxAppearance = 'table' | 'form' | 'settings' | 'list' | 'drawer' | 'success';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  /** Visible label. Omit only when the checkbox is labelled elsewhere (pass `aria-label`). */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Box style. Default `settings`. */
  appearance?: CheckboxAppearance;
  /** Wrap the row in the 32px pref-row frame (p8/12, gap 12, r8) used in notification settings. */
  framed?: boolean;
}

interface AppearanceStyle {
  box: string;
  checked: string;
  disabled: string;
  disabledChecked: string;
  glyph: string;
  stroke: number;
  gap: string;
  label: string;
  description: string;
  textGap: string;
  /** Height of the label line, so the box centres on the first line. */
  line: string;
}

const appearances: Record<CheckboxAppearance, AppearanceStyle> = {
  table: {
    box: 'size-checkbox-sm rounded-checkbox border border-border-strong',
    checked: 'data-[state=checked]:border-status-danger-alt data-[state=checked]:bg-status-danger-alt data-[state=indeterminate]:border-status-danger-alt data-[state=indeterminate]:bg-status-danger-alt',
    disabled: 'disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:border-checkbox-disabled-checked disabled:data-[state=checked]:bg-checkbox-disabled-checked',
    glyph: 'size-2.5',
    stroke: 3.2,
    gap: 'gap-2.5',
    label: 'text-body-sm text-text-primary',
    description: 'text-caption text-text-secondary',
    textGap: 'gap-0.5',
    line: 'h-4',
  },
  form: {
    box: 'size-checkbox rounded-checkbox border border-border-strong',
    checked: 'data-[state=checked]:border-status-danger-alt data-[state=checked]:bg-status-danger-alt data-[state=indeterminate]:border-status-danger-alt data-[state=indeterminate]:bg-status-danger-alt',
    disabled: 'disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:border-checkbox-disabled-checked disabled:data-[state=checked]:bg-checkbox-disabled-checked',
    glyph: 'size-2.5',
    stroke: 3.2,
    gap: 'gap-2.5',
    label: 'text-stat-label text-text-primary',
    description: 'text-caption text-text-secondary',
    textGap: 'gap-0.5',
    line: 'h-4',
  },
  settings: {
    box: 'size-checkbox rounded-xs border-2 border-border-default',
    checked: 'data-[state=checked]:border-0 data-[state=checked]:bg-status-danger-alt data-[state=indeterminate]:border-0 data-[state=indeterminate]:bg-status-danger-alt',
    disabled: 'disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:bg-checkbox-disabled-checked',
    glyph: 'size-2.5',
    stroke: 3.2,
    gap: 'gap-2',
    label: 'text-body-sm text-text-strong',
    description: 'text-caption text-text-secondary',
    textGap: 'gap-1',
    line: 'h-4',
  },
  list: {
    box: 'size-checkbox-list rounded-xs border-1.5 border-text-secondary',
    checked: 'data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary data-[state=indeterminate]:border-brand-primary data-[state=indeterminate]:bg-brand-primary',
    disabled: 'disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:border-checkbox-disabled-checked disabled:data-[state=checked]:bg-checkbox-disabled-checked',
    glyph: 'size-3',
    stroke: 2.67,
    gap: 'gap-2.5',
    label: 'text-label text-text-primary',
    description: 'text-caption text-text-secondary',
    textGap: 'gap-0.5',
    line: 'h-4.5',
  },
  drawer: {
    box: 'size-checkbox-lg rounded-nav border border-text-muted',
    checked: 'data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary data-[state=indeterminate]:border-brand-primary data-[state=indeterminate]:bg-brand-primary',
    disabled: 'disabled:border-1.5 disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:border-0 disabled:data-[state=checked]:bg-checkbox-disabled-checked',
    glyph: 'size-3.5',
    stroke: 2.3,
    gap: 'gap-3',
    label: 'text-label text-text-primary',
    description: 'text-body-sm text-text-secondary',
    textGap: 'gap-1',
    line: 'h-5',
  },
  success: {
    box: 'size-checkbox-lg rounded-nav border border-text-muted',
    checked: 'data-[state=checked]:border-status-success-strong data-[state=checked]:bg-status-success-strong data-[state=indeterminate]:border-status-success-strong data-[state=indeterminate]:bg-status-success-strong',
    disabled: 'disabled:border-border-strong disabled:bg-surface-sunken',
    disabledChecked: 'disabled:data-[state=checked]:opacity-50',
    glyph: 'size-3.5',
    stroke: 2.3,
    gap: 'gap-3',
    label: 'text-label text-accent-navy-hover',
    description: 'text-caption text-text-muted',
    textGap: 'gap-1',
    line: 'h-5',
  },
};

/** Checkbox in every size Figma draws (tables, forms, settings, pick-lists, fields drawer). Supports `checked="indeterminate"`. */
export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(function Checkbox(
  { label, description, appearance = 'settings', framed = false, id, className, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const boxId = id ?? `checkbox-${autoId}`;
  const a = appearances[appearance];
  const box = (
    <RadixCheckbox.Root
      ref={ref}
      id={boxId}
      disabled={disabled}
      data-appearance={appearance}
      className={cn(
        'peer inline-flex shrink-0 items-center justify-center bg-surface-default text-text-inverse',
        'transition-colors duration-fast ease-standard',
        'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed',
        a.box,
        a.checked,
        a.disabled,
        a.disabledChecked,
        !label && className,
      )}
      {...rest}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center">
        {rest.checked === 'indeterminate' ? (
          <svg viewBox="0 0 16 16" className={a.glyph} aria-hidden="true">
            <path d="M3.5 8h9" stroke="currentColor" strokeWidth={a.stroke} strokeLinecap="round" />
          </svg>
        ) : (
          <LucideCheckIcon className={a.glyph} strokeWidth={a.stroke} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label) return box;

  return (
    <div className={cn('flex', framed ? 'h-8 items-center gap-3 rounded-md px-3 py-2' : cn('items-start', a.gap), className)}>
      <span className={cn('flex shrink-0 items-center', a.line)}>{box}</span>
      <span className={cn('flex flex-col', a.textGap)}>
        <label htmlFor={boxId} className={cn(
            disabled && appearance === 'drawer' ? 'text-label text-text-secondary' : a.label,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            disabled && appearance !== 'drawer' && 'opacity-60',
          )}>
          {label}
        </label>
        {description && <span className={a.description}>{description}</span>}
      </span>
    </div>
  );
});
