import { useId, type ReactNode } from 'react';
import { cn } from '@ds';
import pencil from '../assets/checkout/pencil.svg';
import { costOf, formatNaira, mainPlanOf, seatsOf, useCheckout } from './CheckoutContext';

interface OrderSummaryProps {
  /**
   * - configure: discount below the organisations with a footer action (Figma `Sidebar` 231:1023)
   * - review: Edit button, discount with helper, "taxes calculated at checkout" (372:2747)
   * - payment: as review, with the discount and 7.5% tax lines under the total (367:16690)
   */
  variant: 'configure' | 'review' | 'payment';
  onEdit?: () => void;
  footer?: ReactNode;
}

const rule = <hr className="w-full border-t border-border-default" />;

/** Order summary card shown beside every two-column checkout step. */
export function OrderSummary({ variant, onEdit, footer }: OrderSummaryProps) {
  const { orgs, discountCode, setDiscountCode, totals } = useCheckout();
  const discountId = useId();
  const compact = variant !== 'configure';
  const due = variant === 'payment' ? totals.total : totals.subtotal - totals.discount;
  const helper = compact ? 'Apply discount code to plan payment' : 'Auto discount auto/discount payment';

  return (
    <aside
      aria-label="Order summary"
      className={cn(
        'relative flex w-site-summary shrink-0 flex-col gap-6 rounded-xl border border-border-default bg-surface-default p-6 shadow-site-checkout',
        !compact && 'justify-between gap-0',
      )}
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-heading-2 text-site-heading">Order summary</h2>
        <ul className={cn('flex flex-col', compact ? 'gap-4' : 'gap-4')}>
          {orgs.map((org) => (
            <li key={org.id} className="flex animate-value-in flex-col gap-1 whitespace-nowrap">
              <span className="flex items-center justify-between text-label-sm text-text-strong">
                <span>{org.name}</span>
                <span key={costOf(org)} className="animate-value-in">{formatNaira(costOf(org))}</span>
              </span>
              <span className="text-caption-sm text-text-tertiary">
                {mainPlanOf(org).label} · {seatsOf(org)} seats
              </span>
            </li>
          ))}
        </ul>
        {!compact && rule}
        <div className={cn('flex flex-col', compact ? 'gap-1' : 'gap-2')}>
          <label htmlFor={discountId} className={cn('font-semibold text-text-link-bright', compact ? 'text-caption' : 'text-body-sm')}>
            Discount code
          </label>
          {compact && <p id={`${discountId}-help`} className="text-caption-sm text-text-tertiary">{helper}</p>}
          <input
            id={discountId}
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            placeholder="XXX-XXXX-XXXX-XXXX"
            aria-describedby={`${discountId}-help`}
            autoComplete="off"
            className={cn(
              'h-control-md w-full rounded-sm border border-border-default bg-surface-default text-caption-sm text-text-strong placeholder:text-text-tertiary',
              'focus-visible:border-accent-navy focus-visible:outline-none focus-visible:shadow-focus',
              compact ? 'px-5' : 'px-3.5',
            )}
          />
          {!compact && <p id={`${discountId}-help`} className="text-caption-sm text-text-tertiary">{helper}</p>}
          {totals.discountValid && variant !== 'payment' && (
            <p className="animate-value-in text-caption-sm text-site-discount">Code applied: 10% off</p>
          )}
        </div>
        {rule}
        <div className="flex flex-col gap-1 whitespace-nowrap">
          <p className={cn('text-text-tertiary', compact ? 'text-caption' : 'text-body-sm')}>Total due</p>
          <p className="flex items-end gap-1 text-site-heading">
            <span key={due} className={cn('animate-value-in', compact ? 'text-heading-xl' : 'text-display')}>{formatNaira(due)}</span>
            <span className="text-body">per year</span>
          </p>
          {variant === 'review' && <p className="text-caption-sm text-text-tertiary">taxes calculated at checkout</p>}
          {variant === 'payment' && (
            <>
              {totals.discountValid && (
                <p className="flex gap-1 text-caption-sm text-site-discount">
                  <span>Discount applied</span>
                  <span>-{formatNaira(totals.discount)}</span>
                </p>
              )}
              <p className="flex gap-1 text-caption-sm text-text-tertiary">
                <span>Tax (7.5%)</span>
                <span>{formatNaira(totals.tax)}</span>
              </p>
            </>
          )}
        </div>
      </div>
      {footer && <div className="flex flex-col gap-4 pt-6">{footer}</div>}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="group absolute right-5.5 top-5.5 flex items-center gap-1 rounded-sm bg-brand-primary px-3 py-1.5 text-label-sm text-text-inverse hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:shadow-focus"
        >
          <img src={pencil} alt="" className="size-3 transition-transform duration-base ease-standard group-hover:-rotate-12" />
          Edit
        </button>
      )}
    </aside>
  );
}
