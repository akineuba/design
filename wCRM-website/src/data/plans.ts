export type Billing = 'annual' | 'monthly';

export interface PlanCard {
  id: 'standard' | 'pro' | 'custom';
  name: string;
  description: string;
  /** Naira price per billing period; `null` for "Let's talk". */
  price: Record<Billing, number> | null;
  features: string[];
  cta: string;
}

/** Plan cards (Figma `Pricing-Cards-Row`, 691:5114 / 231:664). Monthly prices are not drawn in Figma. */
export const PLANS: PlanCard[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'For growing teams that need a powerful CRM foundation',
    price: { annual: 400_000, monthly: 44_500 },
    features: ['Contacts & accounts in one CRM', 'Pipeline management', 'Product & Program', 'Social integration', 'Individual focus', '10 M/SER per/mth'],
    cta: 'Choose Standard',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For all plans, from the pro plan, scale easily',
    price: { annual: 750_000, monthly: 75_000 },
    features: ['Project & Rollout', 'Everything in Standard', 'Generating & Contacts', 'Course & Signature', '300 email/send/day', 'All-on-all affiliations', '10 Queues', 'Priority support'],
    cta: 'Choose Pro',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'For organizations that require the most exhaustive plan',
    price: null,
    features: ['Tailored CRM process flows', 'Custom Configurations', 'Custom Integrations/Automations', 'Industry reporting', 'CRM setup help operation', 'AI-Prioritized module'],
    cta: 'Contact Sales',
  },
];
