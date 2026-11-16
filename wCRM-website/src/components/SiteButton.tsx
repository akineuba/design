import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@ds';

/**
 * Website buttons that the design-system Button does not draw (marketing radius, #EA001B pricing red).
 * - header: solid #EE1F2F, radius 10 (Header "Get Started", hero "Get Started")
 * - header-outline: navy #2B3674 outline, Medium, radius 10 ("Sign In", "Learn More")
 * - plan: solid #EA001B, radius 8, full width ("Choose Pro", "Submit request")
 * - plan-outline: #EA001B outline, radius 8, full width ("Choose Standard", "Contact Sales")
 * - checkout: solid #EE1F2F, radius 8, 14px block inset, full width ("Continue →", "Verify →")
 * - pay: solid #10B981, radius 14, 16px Bold ("Pay NGN 4,155,000")
 * - quiet: #F8FAFC fill, #667085 label (edit modal "Cancel")
 */
export type SiteButtonVariant = 'header' | 'header-outline' | 'plan' | 'plan-outline' | 'checkout' | 'pay' | 'quiet';

const base =
  'inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap border transition-colors duration-fast ease-standard ' +
  'focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-sunken disabled:text-text-muted';

const variants: Record<SiteButtonVariant, string> = {
  header: 'rounded-callout border-brand-primary bg-brand-primary px-6 py-3 text-label text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  'header-outline': 'rounded-callout border-accent-navy-hover bg-transparent px-6 py-3 text-body font-medium text-accent-navy-hover hover:bg-accent-navy-subtle',
  plan: 'w-full rounded-md border-site-red bg-site-red py-3 text-label text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  'plan-outline': 'w-full rounded-md border-site-red bg-transparent py-3 text-label text-site-red hover:bg-brand-primary-subtle',
  checkout: 'w-full rounded-md border-brand-primary bg-brand-primary py-3.5 text-label text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  pay: 'w-full rounded-tile border-status-connected bg-status-connected p-4 text-heading-3 text-text-inverse hover:border-status-success-strong hover:bg-status-success-strong',
  quiet: 'rounded-md border-surface-subtle bg-surface-subtle px-6 py-3 text-label text-text-tertiary hover:border-surface-sunken hover:bg-surface-sunken',
};

export const siteButtonClass = (variant: SiteButtonVariant, className?: string) => cn(base, variants[variant], className);

export interface SiteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: SiteButtonVariant;
}

export const SiteButton = forwardRef<HTMLButtonElement, SiteButtonProps>(function SiteButton({ variant, className, type = 'button', ...rest }, ref) {
  return <button ref={ref} type={type} className={siteButtonClass(variant, className)} {...rest} />;
});

/** Same styles on a router link, for buttons that navigate. */
export function SiteButtonLink({ variant, className, ...rest }: LinkProps & { variant: SiteButtonVariant }) {
  return <Link className={siteButtonClass(variant, className)} {...rest} />;
}

/** Same styles on a plain anchor (mailto:, tel:). */
export function SiteButtonAnchor({ variant, className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant: SiteButtonVariant }) {
  return <a className={siteButtonClass(variant, className)} {...rest} />;
}
