import { useState } from 'react';
import { LucideCheckIcon, cn } from '@ds';
import { formatNaira } from '../../checkout/CheckoutContext';
import { SiteButtonLink } from '../SiteButton';

/*
 * Pricing cards for the concept page. Each card says what the team pays (price, billing unit, how often), who it
 * covers (users included), whether the 14-day trial applies, and what the yearly saving is in naira; features are in
 * plain words. Prices are the site's (data/plans.ts). User counts, the per-user figure and the feature wording are
 * proposals to confirm with the product team; the homepage and /pricing still use PlanCards.
 */

type Billing = 'annual' | 'monthly';

interface Plan {
  id: 'standard' | 'pro' | 'custom';
  name: string;
  audience: string;
  users: number | null;
  price: Record<Billing, number> | null;
  /** Months of the monthly price that the yearly price saves (rounded). */
  freeMonths?: number;
  intro: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    audience: 'For small teams putting their sales process in one CRM.',
    users: 10,
    price: { annual: 400_000, monthly: 44_500 },
    freeMonths: 3,
    intro: 'Includes',
    features: [
      'Contacts and companies in one place',
      'Deal pipelines with your own stages',
      'Products and programmes on each deal',
      'Social media accounts connected',
      'A personal dashboard for each salesperson',
      '10 bulk email sends per user each month',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    audience: 'For growing teams that need projects, automation and higher limits.',
    users: 25,
    price: { annual: 750_000, monthly: 75_000 },
    freeMonths: 2,
    intro: 'Everything in Standard, plus',
    features: [
      'Project and rollout tracking',
      'Lead generation and contact enrichment',
      'Email templates and signatures',
      'Up to 300 emails a day',
      'Link any contact, company and deal to each other',
      '10 shared work queues',
      'Priority support',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    audience: 'For organisations that need their own workflows and integrations.',
    users: null,
    price: null,
    intro: 'Everything in Pro, plus',
    features: [
      'CRM workflows designed around your process',
      'Custom configuration',
      'Custom integrations and automations',
      'Industry-specific reports',
      'Hands-on setup and onboarding',
      'Orbit AI deal prioritisation',
    ],
  },
];

function Tick({ dark }: { dark: boolean }) {
  return <LucideCheckIcon aria-hidden="true" strokeWidth={2.5} className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-text-inverse' : 'text-site-red')} />;
}

function PriceBlock({ plan, billing, dark }: { plan: Plan; billing: Billing; dark: boolean }) {
  const muted = dark ? 'text-site-on-dark-muted' : 'text-text-tertiary';
  if (!plan.price) {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-site-price text-text-strong">Let&apos;s talk</p>
        <p className={cn('text-body-sm leading-150', muted)}>Priced for your organisation · any number of users</p>
      </div>
    );
  }
  const annual = billing === 'annual';
  const amount = plan.price[billing];
  const yearlyIfMonthly = plan.price.monthly * 12;
  const perUser = Math.round(plan.price.annual / (plan.users ?? 1));
  return (
    <div className="flex flex-col gap-1.5">
      <p className={cn('flex items-baseline gap-1.5 whitespace-nowrap font-display', dark ? 'text-text-inverse' : 'text-text-strong')}>
        <span key={billing} className="inline-block animate-value-in text-site-price">{formatNaira(amount)}</span>
        <span className={cn('text-body', muted)}>{annual ? 'per year' : 'per month'}</span>
      </p>
      <p className={cn('text-body-sm leading-150', muted)}>
        {annual ? 'Billed once a year' : 'Billed every month'} for up to <b className={dark ? 'text-text-inverse' : 'text-text-strong'}>{plan.users} users</b>
        {annual && ` (${formatNaira(perUser)} per user a year)`} · plus 7.5% VAT
      </p>
      {annual && plan.freeMonths ? (
        <p className={cn('rounded-md px-2.5 py-1.5 text-caption leading-150', dark ? 'bg-site-divider-on-dark text-text-inverse' : 'bg-site-red-tint text-site-red')}>
          <b>{plan.freeMonths} months free:</b> {formatNaira(plan.price.annual)} a year instead of {formatNaira(yearlyIfMonthly)} paying monthly. You save {formatNaira(yearlyIfMonthly - plan.price.annual)}.
        </p>
      ) : (
        <p className={cn('text-caption', muted)}>Switch to yearly billing to get {plan.freeMonths} months free.</p>
      )}
    </div>
  );
}

export function ConceptPlans() {
  const [billing, setBilling] = useState<Billing>('annual');
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div role="radiogroup" aria-label="Billing period" className="flex rounded-full border border-border-default bg-surface-subtle p-1">
        {(['annual', 'monthly'] as Billing[]).map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-label transition-colors duration-base ease-standard focus-visible:outline-none focus-visible:shadow-focus',
              billing === b ? 'bg-site-ink text-text-inverse' : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {b === 'annual' ? 'Yearly' : 'Monthly'}
            {b === 'annual' && <span className={cn('rounded-full px-2 py-0.5 text-caption-sm font-semibold', billing === b ? 'bg-brand-primary text-text-inverse' : 'bg-site-red-tint text-site-red')}>Up to 3 months free</span>}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
        {PLANS.map((plan) => {
          const dark = plan.id === 'pro';
          return (
            <article
              key={plan.id}
              aria-labelledby={`concept-plan-${plan.id}`}
              className={cn(
                'relative flex min-w-0 flex-1 flex-col gap-5 rounded-xl px-6 py-8',
                dark ? 'bg-site-midnight shadow-site-plan-pro' : 'border border-border-default bg-surface-default shadow-site-plan',
              )}
            >
              {dark && <span className="absolute -top-3.25 left-6.5 rounded-pill bg-site-red px-3 py-1.5 text-badge uppercase text-text-inverse">Most popular</span>}
              <div className="flex flex-col gap-2">
                <h3 id={`concept-plan-${plan.id}`} className={cn('font-display text-kpi-value', dark ? 'text-text-inverse' : 'text-text-strong')}>{plan.name}</h3>
                <p className={cn('text-body-sm leading-150', dark ? 'text-site-on-dark-muted' : 'text-text-tertiary')}>{plan.audience}</p>
              </div>
              <PriceBlock plan={plan} billing={billing} dark={dark} />
              <p className={cn('flex items-center gap-2 text-label-sm', dark ? 'text-text-inverse' : 'text-text-strong')}>
                <Tick dark={dark} />
                {plan.price ? '14-day free trial included' : '14-day free trial on request'}
              </p>
              {plan.price ? (
                <SiteButtonLink to={`/checkout/configure?plan=${plan.id}`} variant={dark ? 'plan' : 'plan-outline'}>Start 14-day free trial</SiteButtonLink>
              ) : (
                <SiteButtonLink to="/contact?topic=Custom%20plan" variant="plan-outline">Contact sales</SiteButtonLink>
              )}
              <hr className={cn('border-t', dark ? 'border-site-divider-on-dark' : 'border-border-default')} />
              <div className="flex flex-col gap-3">
                <p className={cn('text-label-sm', dark ? 'text-text-inverse' : 'text-text-strong')}>{plan.intro}:</p>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className={cn('flex items-start gap-2.5 text-body-sm', dark ? 'text-text-inverse' : 'text-text-strong')}>
                      <Tick dark={dark} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
