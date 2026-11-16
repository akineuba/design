import { useLayoutEffect, useRef, useState } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { cn } from '@ds';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PlanCards } from '../components/PlanCards';
import { PLANS, type Billing } from '../data/plans';
import checkRed from '../assets/shared/check-red.svg';
import chevronDown from '../assets/shared/chevron-down-sm.svg';
import ribbon from '../assets/pricing/ribbon.png';

/** Monthly / Annual pill switch (Figma `Toggle-Container`, 231:657). The red pill slides to the chosen option. */
function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const refs = useRef<Record<Billing, HTMLButtonElement | null>>({ monthly: null, annual: null });
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const el = refs.current[value];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [value]);

  const option = (b: Billing, label: string) => (
    <button
      ref={(el) => (refs.current[b] = el)}
      type="button"
      role="radio"
      aria-checked={value === b}
      onClick={() => onChange(b)}
      className={cn(
        'relative z-10 rounded-full px-4 py-2 font-instrument text-body focus-visible:outline-none focus-visible:shadow-focus',
        value === b ? 'font-semibold text-text-inverse' : 'font-medium text-text-tertiary hover:text-text-strong',
      )}
    >
      {label}
    </button>
  );
  return (
    <div role="radiogroup" aria-label="Billing period" className="relative flex items-center gap-2 rounded-full border border-border-default bg-surface-subtle p-1">
      {pill && (
        <span
          aria-hidden="true"
          className="absolute bottom-1 top-1 rounded-full bg-brand-primary transition-all duration-site-slow ease-standard"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {option('monthly', 'Monthly')}
      {option('annual', 'Annual')}
    </div>
  );
}

/** Every feature with the plans that include it. Pro includes everything in Standard. */
const COMPARISON = (() => {
  const [standard, pro, custom] = PLANS;
  const rows = new Map<string, Set<string>>();
  const add = (feature: string, ...plans: string[]) => {
    const set = rows.get(feature) ?? new Set<string>();
    plans.forEach((p) => set.add(p));
    rows.set(feature, set);
  };
  standard.features.forEach((f) => add(f, 'standard', 'pro', 'custom'));
  pro.features.filter((f) => f !== 'Everything in Standard').forEach((f) => add(f, 'pro', 'custom'));
  custom.features.forEach((f) => add(f, 'custom'));
  return [...rows.entries()];
})();

/** "Compare every included feature" bar (Figma `CompareHeaderBar`, 364:10073); opens a feature table. */
function CompareSection() {
  return (
    <section className="relative flex flex-col items-center px-25 py-5">
      <RadixAccordion.Root type="single" collapsible className="w-site-compare">
        <RadixAccordion.Item value="compare" className="group rounded-md border border-border-default bg-surface-subtle">
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex w-full items-center justify-between rounded-md p-5 text-left focus-visible:outline-none focus-visible:shadow-focus">
              <span className="flex flex-col gap-1">
                <span className="text-heading-3 text-text-strong">Compare every included feature</span>
                <span className="text-body-sm text-text-tertiary">Open the full high-level comparison</span>
              </span>
              <img src={chevronDown} alt="" className="size-4 transition-transform group-data-[state=open]:rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <table className="w-full border-t border-border-default text-body-sm">
              <thead>
                <tr className="text-left text-text-tertiary">
                  <th scope="col" className="px-5 py-3 font-semibold">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className="w-50 px-5 py-3 text-center font-semibold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, plans]) => (
                  <tr key={feature} className="border-t border-border-default bg-surface-default">
                    <th scope="row" className="px-5 py-3 text-left font-regular text-text-strong">{feature}</th>
                    {PLANS.map((p) => (
                      <td key={p.id} className="px-5 py-3 text-center">
                        {plans.has(p.id) ? <img src={checkRed} alt="Included" className="mx-auto size-4" /> : <span className="text-text-faint" aria-label="Not included">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      </RadixAccordion.Root>
    </section>
  );
}

/** Pricing page (Figma `crm-pricing-page`, 231:636). */
export function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual');
  return (
    <>
      <SiteHeader />
      <main className="animate-page-in relative overflow-hidden">
        <img src={ribbon} alt="" className="site-ribbon-pricing" />
        <section className="relative flex flex-col items-center gap-6 px-30 pb-15 pt-20">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="font-display text-site-title leading-site-44 text-text-strong">Choose the right plan for your team</h1>
            <p className="font-display text-site-lead leading-site-24 text-text-tertiary">
              Simple, transparent pricing that grows with you. All plans include a 14-day free trial.
            </p>
          </div>
          <BillingToggle value={billing} onChange={setBilling} />
        </section>
        <section aria-label="Plans" className="relative px-25 py-20">
          <PlanCards billing={billing} />
        </section>
        <CompareSection />
      </main>
      <div className="relative">
        <SiteFooter />
      </div>
    </>
  );
}
