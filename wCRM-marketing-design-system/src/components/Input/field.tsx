import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * Visual dialect of a form field. Figma draws fields in several passes that do not share values,
 * so pick the one that matches the frame you are building:
 * - default: desktop drawers and forms (label Inter 13/400 #1E2238, red Semi Bold asterisk, placeholder #64748B)
 * - toolbar: desktop table toolbars (13px value and placeholder #A3AED0, muted search icon)
 * - settings: Settings › Organisation / social links (Roboto, #111827)
 * - email: E-mail configuration drawer (label Inter Semi Bold 14 #111827, placeholder #A3AED0)
 * - composer: Create New Post settings cards (label Semi Bold 13 #A3AED0, value #2B3674)
 * - mobile: Mobile V2-flow (Roboto 11/600 label, #DDE3ED border, red 1.5px focus)
 * - mobile-v1: Mobile V1 (Roboto 12/600 label, separate red asterisk)
 * - mobile-sections: Mobile V2 · Settings / Emails / Social (Roboto Medium 12 #475569 label, #CBD5E1 border)
 */
export type FieldAppearance = 'default' | 'toolbar' | 'settings' | 'email' | 'composer' | 'mobile' | 'mobile-v1' | 'mobile-sections';

/** Desktop label styles seen in Figma; overrides the appearance's label. */
export type FieldLabelStyle = 'regular' | 'medium' | 'semibold' | 'caption' | 'section' | 'composer';

interface AppearanceStyle {
  label: string;
  /** Gap between label row and control. */
  gap: string;
  asterisk: 'separate' | 'inline';
  asteriskClass: string;
  border: string;
  focus: string;
  error: string;
  /** Value font family/size. */
  value: string;
  /** Value colour. */
  valueColor: string;
  placeholder: string;
  icon: string;
  helper: string;
  errorText: string;
  mobile: boolean;
}

const desktopFocus = 'focus-within:border-accent-navy focus-within:shadow-focus';
const desktopError = 'border-status-danger focus-within:shadow-focus-danger';

export const fieldAppearances: Record<FieldAppearance, AppearanceStyle> = {
  default: {
    label: 'text-field-label text-text-primary',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'text-label-sm text-status-danger',
    border: 'border-border-default',
    focus: desktopFocus,
    error: desktopError,
    value: 'font-sans text-body',
    valueColor: 'text-text-primary',
    placeholder: 'placeholder:text-text-secondary',
    icon: 'size-4 text-text-secondary',
    helper: 'text-caption text-text-secondary',
    errorText: 'text-caption text-status-danger',
    mobile: false,
  },
  toolbar: {
    label: 'text-field-label text-text-primary',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'text-label-sm text-status-danger',
    border: 'border-border-default',
    focus: desktopFocus,
    error: desktopError,
    value: 'font-sans text-body-sm',
    valueColor: 'text-text-primary',
    placeholder: 'placeholder:text-text-muted',
    icon: 'size-4 text-text-muted',
    helper: 'text-caption text-text-secondary',
    errorText: 'text-caption text-status-danger',
    mobile: false,
  },
  settings: {
    label: 'font-data text-field-label text-text-strong',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'font-data text-label-sm text-status-danger',
    border: 'border-border-default',
    focus: desktopFocus,
    error: desktopError,
    value: 'font-data text-body',
    valueColor: 'text-text-strong',
    placeholder: 'placeholder:text-text-hint',
    icon: 'size-4.5 text-text-secondary',
    helper: 'font-data text-caption text-text-hint',
    errorText: 'font-data text-caption text-status-danger',
    mobile: false,
  },
  email: {
    label: 'text-label text-text-strong',
    gap: 'gap-2',
    asterisk: 'separate',
    asteriskClass: 'text-label text-status-danger',
    border: 'border-border-default',
    focus: desktopFocus,
    error: desktopError,
    value: 'font-sans text-body',
    valueColor: 'text-text-strong',
    placeholder: 'placeholder:text-text-muted',
    icon: 'size-4 text-text-secondary',
    helper: 'text-caption text-text-secondary',
    errorText: 'text-caption text-status-danger',
    mobile: false,
  },
  composer: {
    label: 'text-label-sm text-text-muted',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'text-label-sm text-status-danger',
    border: 'border-border-default',
    focus: desktopFocus,
    error: desktopError,
    value: 'font-sans text-body',
    valueColor: 'text-accent-navy-hover',
    placeholder: 'placeholder:text-text-muted',
    icon: 'size-4 text-text-muted',
    helper: 'text-caption text-text-secondary',
    errorText: 'text-caption text-status-danger',
    mobile: false,
  },
  mobile: {
    label: 'font-data text-badge font-semibold text-mobile-text',
    gap: 'gap-1.5',
    asterisk: 'inline',
    asteriskClass: '',
    border: 'border-mobile-border',
    focus: 'focus-within:border-1.5 focus-within:border-mobile-brand',
    error: 'border-mobile-brand',
    value: 'font-data text-body-sm',
    valueColor: 'text-mobile-text',
    placeholder: 'placeholder:text-text-placeholder',
    icon: 'size-4.75 text-mobile-icon',
    helper: 'font-data text-caption-xs text-mobile-text-secondary',
    errorText: 'font-data text-caption-sm text-mobile-brand',
    mobile: true,
  },
  'mobile-v1': {
    label: 'font-data text-caption font-semibold text-text-primary',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'font-data text-caption font-semibold text-brand-primary',
    border: 'border-border-default',
    focus: 'focus-within:border-1.5 focus-within:border-brand-primary',
    error: 'border-brand-primary',
    value: 'font-data text-body-sm',
    valueColor: 'text-text-primary',
    placeholder: 'placeholder:text-text-muted',
    icon: 'size-5 text-mobile-icon',
    helper: 'font-data text-caption-sm text-text-secondary',
    errorText: 'font-data text-caption-sm text-brand-primary',
    mobile: true,
  },
  'mobile-sections': {
    label: 'font-data text-caption font-medium text-text-slate',
    gap: 'gap-1.5',
    asterisk: 'separate',
    asteriskClass: 'font-data text-caption font-medium text-brand-primary',
    border: 'border-border-strong',
    focus: 'focus-within:border-1.5 focus-within:border-brand-primary',
    error: 'border-brand-primary',
    value: 'font-data text-body leading-140',
    valueColor: 'text-text-primary',
    placeholder: 'placeholder:text-mobile-caption',
    icon: 'size-4.5 text-mobile-icon',
    helper: 'font-data text-caption-sm text-mobile-caption',
    errorText: 'font-data text-caption-sm text-brand-primary',
    mobile: true,
  },
};

export const labelStyles: Record<FieldLabelStyle, string> = {
  regular: 'text-field-label text-text-primary',
  medium: 'text-stat-label text-text-primary',
  semibold: 'text-label-sm text-text-primary',
  caption: 'text-caption text-text-primary',
  section: 'text-label text-text-strong',
  composer: 'text-label-sm text-text-muted',
};

/** Label-row gap that goes with each label style (section labels sit 8px above the control). */
export const labelStyleGap: Record<FieldLabelStyle, string> = {
  regular: 'gap-1.5',
  medium: 'gap-1.5',
  semibold: 'gap-1.5',
  caption: 'gap-2',
  section: 'gap-2',
  composer: 'gap-1.5',
};

export interface FieldLabelProps {
  htmlFor: string;
  appearance: FieldAppearance;
  labelStyle?: FieldLabelStyle;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  id?: string;
  children: ReactNode;
}

/** Label row: Figma draws the required asterisk as a separate Semi Bold #E11D48 text node 3px after the label. */
export function FieldLabel({ htmlFor, appearance, labelStyle, required, disabled, hidden, id, children }: FieldLabelProps) {
  const a = fieldAppearances[appearance];
  const text = disabled ? cn(labelStyle ? labelStyles[labelStyle] : a.label, 'opacity-60') : labelStyle ? labelStyles[labelStyle] : a.label;
  return (
    <label id={id} htmlFor={htmlFor} className={cn('flex items-center', a.asterisk === 'separate' && (appearance.startsWith('mobile') ? 'gap-1' : 'gap-0.75'), text, hidden && 'sr-only')}>
      <span>
        {children}
        {required && a.asterisk === 'inline' && <span aria-hidden="true"> *</span>}
      </span>
      {required && a.asterisk === 'separate' && (
        <span className={a.asteriskClass} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function FieldMessage({ id, appearance, error, children }: { id: string; appearance: FieldAppearance; error: boolean; children: ReactNode }) {
  const a = fieldAppearances[appearance];
  return (
    <p id={id} className={error ? a.errorText : a.helper} role={error ? 'alert' : undefined}>
      {children}
    </p>
  );
}
