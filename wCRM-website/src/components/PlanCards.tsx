import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@ds';
import checkRed from '../assets/shared/check-red.svg';
import checkWhite from '../assets/shared/check-white.svg';
import { PLANS, type Billing, type PlanCard } from '../data/plans';
import { formatNaira } from '../checkout/CheckoutContext';
import { SiteButton, SiteButtonLink } from './SiteButton';

function Features({ items, dark, gap }: { items: string[]; dark: boolean; gap: 'gap-3' | 'gap-2.5' }) {
  return (
    <ul className={cn('flex flex-col', gap)}>
      {items.map((f) => (
        <li key={f} className={cn('flex items-center gap-2.5 text-body-sm', dark ? 'text-text-inverse' : 'text-text-strong')}>
          <img src={dark ? checkWhite : checkRed} alt="" className="size-4 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Price({ plan, billing, dark }: { plan: PlanCard; billing: Billing; dark: boolean }) {
  if (!plan.price) return <p className="font-display text-site-price text-text-strong">Let&apos;s talk</p>;
  return (
    <p className={cn('whitespace-nowrap font-display', dark ? 'text-text-inverse' : 'text-text-strong')}>
      {/* Keyed on the billing period so the new price eases in when the toggle changes. */}
      <span key={billing} className="inline-block animate-value-in">
        <span className="text-site-price">{formatNaira(plan.price[billing])}</span>
        <span className={cn('text-body', dark ? 'text-site-on-dark-muted' : 'text-text-tertiary')}> /{billing === 'annual' ? 'year' : 'month'}</span>
      </span>
    </p>
  );
}

function CustomContact() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/contact${email ? `?email=${encodeURIComponent(email)}` : ''}`);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label className="sr-only" htmlFor="custom-plan-email">Work email</label>
      <input
        id="custom-plan-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        className="rounded-md border border-border-strong bg-surface-default px-3.5 py-2.5 text-body text-text-strong placeholder:text-text-tertiary focus-visible:border-accent-navy focus-visible:outline-none focus-visible:shadow-focus"
      />
      <SiteButton type="submit" variant="plan-outline">Contact Sales</SiteButton>
    </form>
  );
}

/** Standard / Pro / Custom cards. `billing` switches the Standard and Pro prices. */
export function PlanCards({ billing = 'annual' }: { billing?: Billing }) {
  return (
    <div className="relative flex w-full items-center gap-6">
      {PLANS.map((plan) => {
        const dark = plan.id === 'pro';
        return (
          <article
            key={plan.id}
            aria-labelledby={`plan-${plan.id}`}
            className={cn(
              'relative flex h-site-plan-card-h min-w-0 flex-1 flex-col justify-between rounded-xl px-6 py-8',
              'transition duration-base ease-standard hover:-translate-y-1 hover:shadow-lg',
              dark ? 'bg-site-midnight shadow-site-plan-pro' : 'border border-border-default bg-surface-default shadow-site-plan',
            )}
          >
            {dark && (
              <span className="absolute -top-3.25 left-6.5 rounded-pill bg-site-red px-3 py-1.5 text-badge uppercase text-text-inverse">Most Popular</span>
            )}
            <div className="flex flex-col gap-4">
              <h3 id={`plan-${plan.id}`} className={cn('font-display text-kpi-value', dark ? 'text-text-inverse' : 'text-text-strong')}>
                {plan.name}
              </h3>
              <p className={cn('text-body-sm leading-site-18', dark ? 'text-site-on-dark-muted' : 'text-text-tertiary')}>{plan.description}</p>
              <div className="flex flex-col gap-1">
                <Price plan={plan} billing={billing} dark={dark} />
                {plan.id === 'standard' && billing === 'annual' && (
                  <span className="animate-pop-bounce self-start rounded-full bg-site-red-tint px-2 py-0.5 text-caption-sm font-semibold text-site-red">3 months free</span>
                )}
              </div>
              <hr className={cn('border-t', dark ? 'border-site-divider-on-dark' : 'border-border-default')} />
              <Features items={plan.features} dark={dark} gap={plan.id === 'custom' ? 'gap-2.5' : 'gap-3'} />
            </div>
            {plan.id === 'custom' ? (
              <CustomContact />
            ) : (
              <SiteButtonLink to={`/checkout/configure?plan=${plan.id}`} variant={dark ? 'plan' : 'plan-outline'}>
                {plan.cta}
              </SiteButtonLink>
            )}
          </article>
        );
      })}
    </div>
  );
}
