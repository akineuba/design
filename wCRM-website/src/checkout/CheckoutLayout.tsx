import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@ds';
import stepCheck from '../assets/checkout/step-check.svg';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { useCheckout } from './CheckoutContext';

export const STEPS = [
  { label: 'Configure', path: '/checkout/configure' },
  { label: 'Your account', path: '/checkout/account' },
  { label: 'Verify', path: '/checkout/verify' },
  { label: 'Company details', path: '/checkout/company' },
  { label: 'Review', path: '/checkout/review' },
  { label: 'Payment', path: '/checkout/payment' },
] as const;

/**
 * Six-step progress (Figma `Stepper`). Step 1 is drawn compact (231:964: 20px gap, 24px rules before each step);
 * later steps are spread out (372:2550: 48px gap, 32px rules after steps 1–4). Completed steps link back.
 */
function Stepper({ current }: { current: number }) {
  const { completed } = useCheckout();
  const compact = current === 1;
  return (
    <nav aria-label="Checkout progress" className={cn('flex items-center justify-center pb-4 pt-8', compact ? 'gap-5' : 'gap-12')}>
      <ol className={cn('flex items-center', compact ? 'gap-5' : 'gap-12')}>
        {STEPS.map((step, i) => {
          const n = i + 1;
          const done = n < current || (n !== current && n <= completed);
          const active = n === current;
          const rule = <span aria-hidden="true" className={cn('h-px bg-border-default', compact ? 'w-6' : 'w-8')} />;
          const circle = (
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-lg text-badge-lg transition-colors duration-base',
                // The current step and the one just finished pop in as each page opens.
                (active || n === current - 1) && 'animate-pop-bounce',
                done ? 'bg-status-connected' : active ? 'bg-brand-primary text-text-inverse' : 'bg-border-default text-text-tertiary',
              )}
            >
              {done ? <img src={stepCheck} alt="" className="size-3" /> : n}
            </span>
          );
          const label = (
            <span className={cn('whitespace-nowrap text-body-sm', done || active ? 'font-semibold text-site-heading' : 'font-medium text-text-tertiary')}>
              {step.label}
            </span>
          );
          return (
            <li key={step.label} className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
              {compact && n > 1 && rule}
              {done ? (
                <Link to={step.path} className="flex items-center gap-2 rounded-xs focus-visible:outline-none focus-visible:shadow-focus">
                  {circle}
                  {label}
                  <span className="sr-only">(completed)</span>
                </Link>
              ) : (
                <>
                  {circle}
                  {label}
                </>
              )}
              {!compact && n <= 4 && rule}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Checkout page frame: header with Back, stepper and the canvas fill (Figma `crm-configure-plan` etc.). */
export function CheckoutLayout({ step, backTo, children }: { step: number; backTo?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <CheckoutHeader backTo={backTo} />
      <Stepper current={step} />
      <main className="animate-page-in">{children}</main>
    </div>
  );
}
