import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Spinner } from '../../icons';
import { cn } from '../../utils/cn';

/**
 * Visual style, named by where Figma uses it.
 * - primary: solid #EE1F2F ("Create Contact", "New Post", "Send Now")
 * - submit: solid #EF2D38 full-width drawer submit ("Create", "Apply", "Save")
 * - secondary: navy outline #2B3674 ("Save as Draft", "Save Draft", modal "Cancel")
 * - accent-outline: #3D5A98 outline ("Connection History", fields "Preview")
 * - navy: solid #2B3674 ("Select Excluded List (Optional)")
 * - outline: neutral #E2E8F0 outline, Semi Bold #1E2238 ("Discard draft", "Cancel", "Clear all")
 * - outline-strong: #CBD5E1 outline (mobile V2-sections)
 * - toolbar: #E2E8F0 outline, Medium #3B414D ("Upload")
 * - toolbar-muted: #E2E8F0 outline, Medium #64748B ("Export")
 * - neutral: #E2E8F0 outline, Semi Bold #667085 ("Remove", Insert Smart Field "Cancel")
 * - brand-outline: #EE1F2F outline ("Rewrite with AI", "Use Template", "Reset Password", post "Delete")
 * - danger: kept for existing callers; same as `brand-outline`
 * - danger-outline: #FFF0F1 fill + #EE1F2F outline (mobile sections "Delete workspace permanently")
 * - warning: solid #DF9B17 (mobile Audience "Edit") · warning-bright: solid #E9BB2B (Profile "Edit")
 * - purple-outline: #9747FF outline ("Clone")
 * - ai: #EE1F2F → #F172FF gradient ("Compose with AI")
 * - ghost: text-only brand red ("Save as draft", "Back to list")
 * - link: inline text action without a box ("Back", "Add choice")
 * - mobile-primary / mobile-outline / mobile-ghost: Mobile V2-flow (#F32135, #DDE3ED, #151A33)
 */
export type ButtonVariant =
  | 'primary'
  | 'submit'
  | 'secondary'
  | 'accent-outline'
  | 'navy'
  | 'outline'
  | 'outline-strong'
  | 'toolbar'
  | 'toolbar-muted'
  | 'neutral'
  | 'brand-outline'
  | 'danger'
  | 'danger-outline'
  | 'warning'
  | 'warning-bright'
  | 'purple-outline'
  | 'ai'
  | 'ghost'
  | 'link'
  | 'mobile-primary'
  | 'mobile-outline'
  | 'mobile-ghost';

/**
 * Height + inset + label type, named by where Figma uses it.
 * xs 30 (Reset, 12/600) · settings-xs 31 (Upload New Image / Remove, Roboto 13) · compact 36 r6 (post details Clone / Delete, 13/500)
 * sm 36 (modal footers) · toolbar 37 (toolbar Create / Connection History) · builder 37 p10/18 (email builder Save Draft / Review & Send)
 * profile 37 13/600 (Profile Reset Password / Edit, use family="geist") · template 38 (Use Template, gap 5) · banner 39 (Draft banner) · md 40 · settings 40 p12/20 (Save changes, Roboto)
 * drawer 41 p12/24 (drawer submit, Save as Draft / Send Now) · lg 44 · ai 48 p12/24
 * mobile 44 (Roboto Semi Bold 13, V2 / V1) · mobile-sections 44 (Roboto Semi Bold 14)
 */
export type ButtonSize =
  | 'xs'
  | 'settings-xs'
  | 'compact'
  | 'sm'
  | 'toolbar'
  | 'builder'
  | 'profile'
  | 'template'
  | 'banner'
  | 'md'
  | 'settings'
  | 'drawer'
  | 'lg'
  | 'ai'
  | 'mobile'
  | 'mobile-sections';

/** Icon box size in px (Figma: plus 12, menu glyphs 14, default 16, mobile 17, Use Template 18, Export 20, AI 24). */
export type ButtonIconSize = 12 | 14 | 16 | 17 | 18 | 20 | 24;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Font family override. Figma uses Roboto on settings and mobile buttons and Geist on Profile. */
  family?: 'inter' | 'roboto' | 'geist';
  /** Shows a spinner, keeps the label for width stability and blocks interaction. */
  loading?: boolean;
  /** Icon rendered before the label, sized by `iconSize`. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Icon box size; defaults per size (16, 14 on compact/xs, 17 on mobile, 24 on ai). */
  iconSize?: ButtonIconSize;
  /** Stretches to the parent width (mobile sticky actions, drawers). */
  fullWidth?: boolean;
}

const base =
  'relative inline-flex select-none items-center justify-center whitespace-nowrap border ' +
  'transition-colors duration-fast ease-standard ' +
  'focus-visible:outline-none focus-visible:shadow-focus ' +
  'disabled:cursor-not-allowed aria-busy:cursor-progress';

const brandOutline = 'border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary-subtle';

const variants: Record<ButtonVariant, string> = {
  primary: 'border-brand-primary bg-brand-primary text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  submit: 'border-brand-primary-alt bg-brand-primary-alt text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  secondary: 'border-accent-navy-hover bg-transparent text-accent-navy-hover hover:bg-accent-navy-subtle',
  'accent-outline': 'border-accent-navy bg-transparent text-accent-navy hover:bg-accent-navy-subtle',
  navy: 'border-accent-navy-hover bg-accent-navy-hover text-text-inverse hover:border-accent-navy hover:bg-accent-navy',
  outline: 'border-border-default bg-surface-default text-text-primary hover:border-border-strong hover:bg-surface-subtle',
  'outline-strong': 'border-border-strong bg-surface-default text-text-primary hover:bg-surface-subtle',
  toolbar: 'border-border-default bg-transparent text-text-button-outline hover:border-border-strong hover:bg-surface-subtle',
  'toolbar-muted': 'border-border-default bg-transparent text-text-secondary hover:border-border-strong hover:bg-surface-subtle',
  neutral: 'border-border-default bg-surface-default text-text-tertiary hover:border-border-strong hover:bg-surface-subtle',
  'brand-outline': brandOutline,
  danger: brandOutline,
  'danger-outline': 'border-brand-primary bg-mobile-brand-subtle text-brand-primary hover:bg-brand-primary-subtle',
  warning: 'border-status-warning bg-status-warning text-text-inverse',
  'warning-bright': 'border-status-warning-bright bg-status-warning-bright text-text-inverse',
  'purple-outline': 'border-action-clone bg-transparent text-action-clone',
  ai: 'border-transparent bg-ai text-text-inverse',
  ghost: 'border-transparent bg-transparent text-brand-primary hover:bg-brand-primary-subtle',
  link: 'border-transparent bg-transparent text-brand-primary hover:underline',
  'mobile-primary': 'border-mobile-brand bg-mobile-brand text-text-inverse',
  'mobile-outline': 'border-mobile-border bg-surface-default text-mobile-text',
  'mobile-ghost': 'border-transparent bg-transparent text-mobile-brand',
};

// Weight lives with the variant where Figma changes it on the same size (Upload/Export are Medium 14).
const mediumVariants: ButtonVariant[] = ['toolbar', 'toolbar-muted'];

const sizes: Record<ButtonSize, { box: string; gap: string; text: string; medium: string; icon: ButtonIconSize }> = {
  xs: { box: 'h-control-30 rounded-md px-3.5', gap: 'gap-2', text: 'text-caption font-semibold', medium: 'text-caption font-medium', icon: 14 },
  'settings-xs': { box: 'h-control-31 rounded-md px-3.5', gap: 'gap-2', text: 'text-label-sm', medium: 'text-stat-label', icon: 14 },
  compact: { box: 'h-control-sm rounded-sm px-3', gap: 'gap-2.5', text: 'text-stat-label', medium: 'text-stat-label', icon: 14 },
  sm: { box: 'h-control-sm rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  toolbar: { box: 'h-control-37 rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  builder: { box: 'h-control-37 rounded-md px-4.5', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  profile: { box: 'h-control-37 rounded-md px-4', gap: 'gap-2', text: 'text-label-sm', medium: 'text-stat-label', icon: 14 },
  template: { box: 'h-control-38 rounded-md px-4', gap: 'gap-1.25', text: 'text-body font-medium', medium: 'text-body font-medium', icon: 18 },
  banner: { box: 'h-control-39 rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  md: { box: 'h-control-md rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  settings: { box: 'h-control-md rounded-md px-5', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  drawer: { box: 'h-control-41 rounded-md px-6', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  lg: { box: 'h-control-lg rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
  ai: { box: 'h-control-48 rounded-md px-6', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 24 },
  mobile: { box: 'h-control-lg rounded-md px-4', gap: 'gap-2', text: 'text-label-sm', medium: 'text-stat-label', icon: 17 },
  'mobile-sections': { box: 'h-control-lg rounded-md px-4', gap: 'gap-2', text: 'text-label', medium: 'text-body font-medium', icon: 16 },
};

const families = { inter: 'font-sans', roboto: 'font-data', geist: 'font-geist' } as const;
const defaultFamily: Partial<Record<ButtonSize, keyof typeof families>> = {
  'settings-xs': 'roboto',
  settings: 'roboto',
  mobile: 'roboto',
  'mobile-sections': 'roboto',
};

const iconSizes: Record<ButtonIconSize, string> = {
  12: 'size-3 [&>svg]:size-3',
  14: 'size-3.5 [&>svg]:size-3.5',
  16: 'size-4 [&>svg]:size-4',
  17: 'size-4.25 [&>svg]:size-4.25',
  18: 'size-4.5 [&>svg]:size-4.5',
  20: 'size-5 [&>svg]:size-5',
  24: 'size-6 [&>svg]:size-6',
};

// Disabled is shared by every boxed variant so it always reads as unavailable (derived; not drawn in Figma).
const disabledStyle = 'disabled:border-border-default disabled:bg-surface-sunken disabled:bg-none disabled:text-text-muted';
const textOnlyDisabled = 'disabled:text-text-muted';
const textOnly: ButtonVariant[] = ['ghost', 'link', 'mobile-ghost'];

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    family,
    loading = false,
    disabled,
    leadingIcon,
    trailingIcon,
    iconSize,
    fullWidth = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const s = sizes[size];
  const isLink = variant === 'link';
  const fam = families[family ?? defaultFamily[size] ?? 'inter'];
  const icon = iconSizes[iconSize ?? s.icon];

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      className={cn(
        base,
        variants[variant],
        // The link variant has no box: it hugs its text like the Figma "Back" link.
        isLink ? 'h-auto gap-2 rounded-xs p-0 text-body' : cn(s.box, s.gap, mediumVariants.includes(variant) ? s.medium : s.text),
        fam,
        // Loading keeps the variant colours; only a true `disabled` greys out.
        disabled && (textOnly.includes(variant) ? textOnlyDisabled : disabledStyle),
        loading && !disabled && 'disabled:opacity-100',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
          <span className="sr-only">Loading</span>
        </span>
      )}
      <span className={cn('inline-flex items-center', isLink ? 'gap-2' : s.gap, loading && 'invisible')}>
        {leadingIcon && <span className={cn('inline-flex shrink-0 items-center justify-center', icon)}>{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className={cn('inline-flex shrink-0 items-center justify-center', icon)}>{trailingIcon}</span>}
      </span>
    </button>
  );
});
