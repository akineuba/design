import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/** Seat plans a legal entity can allocate (Figma `plan-allocations`, 698:2431). */
export type SeatPlan = 'pro' | 'starter' | 'enterprise';

export const SEAT_PLANS: { id: SeatPlan; label: string; dot: string; bar: string }[] = [
  { id: 'pro', label: 'Pro', dot: 'bg-brand-primary', bar: 'bg-brand-primary' },
  { id: 'starter', label: 'Starter', dot: 'bg-site-amber', bar: 'bg-site-amber' },
  { id: 'enterprise', label: 'Enterprise', dot: 'bg-text-link-blue', bar: 'bg-text-link-blue' },
];

/**
 * Yearly price per seat, in naira. Chosen so the default configuration reproduces the Figma rows
 * (30 Pro seats = ₦180,000, 20 Starter seats = ₦162,000).
 */
export const SEAT_PRICE: Record<SeatPlan, number> = { pro: 6_000, starter: 8_100, enterprise: 10_800 };

/** VAT shown at the payment step (Figma "Tax (7.5%)", 367:16777). */
export const TAX_RATE = 0.075;
/** Share taken off by a valid discount code. */
export const DISCOUNT_RATE = 0.1;
/** Discount codes follow the placeholder format XXX-XXXX-XXXX-XXXX. */
export const DISCOUNT_PATTERN = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

export type Allocations = Record<SeatPlan, number>;

export interface Organisation {
  id: string;
  name: string;
  allocations: Allocations;
}

export interface CompanyDetails {
  companyName: string;
  country: string;
  currency: string;
  taxId: string;
  address: string;
}

interface CheckoutState {
  orgs: Organisation[];
  email: string;
  company: CompanyDetails;
  discountCode: string;
  /** Highest step the buyer has completed, so the stepper can mark earlier steps done. */
  completed: number;
}

export const formatNaira = (n: number) => `₦${Math.round(n).toLocaleString('en-NG')}`;
export const formatNgn = (n: number) => `NGN ${Math.round(n).toLocaleString('en-NG')}`;

export const seatsOf = (org: Organisation) => SEAT_PLANS.reduce((sum, p) => sum + org.allocations[p.id], 0);
export const costOf = (org: Organisation) => SEAT_PLANS.reduce((sum, p) => sum + org.allocations[p.id] * SEAT_PRICE[p.id], 0);
/** The plan holding most seats, used for the summary line ("Pro · 40 seats"). */
export const mainPlanOf = (org: Organisation) =>
  SEAT_PLANS.reduce((best, p) => (org.allocations[p.id] > org.allocations[best.id] ? p : best), SEAT_PLANS[0]);

const primaryOrg: Organisation = { id: 'org-1', name: 'Primary organisation', allocations: { pro: 30, starter: 20, enterprise: 0 } };

const initialState: CheckoutState = {
  orgs: [primaryOrg],
  email: '',
  company: { companyName: 'Acme Holdings Limited', country: 'Nigeria', currency: 'Nigerian Naira (NGN)', taxId: '', address: '' },
  discountCode: '',
  completed: 0,
};

interface CheckoutContextValue extends CheckoutState {
  setSeats: (orgId: string, plan: SeatPlan, seats: number) => void;
  /** Adds `count` organisations that copy the primary organisation's allocations. */
  addOrganisations: (count: number) => void;
  replaceOrganisations: (orgs: Organisation[]) => void;
  setEmail: (email: string) => void;
  setCompany: (company: CompanyDetails) => void;
  setDiscountCode: (code: string) => void;
  completeStep: (step: number) => void;
  totals: { subtotal: number; discount: number; tax: number; total: number; discountValid: boolean };
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(initialState);

  const setSeats = useCallback((orgId: string, plan: SeatPlan, seats: number) => {
    setState((s) => ({
      ...s,
      orgs: s.orgs.map((o) => (o.id === orgId ? { ...o, allocations: { ...o.allocations, [plan]: Math.max(0, seats) } } : o)),
    }));
  }, []);

  const addOrganisations = useCallback((count: number) => {
    setState((s) => {
      const start = s.orgs.length;
      const copies = Array.from({ length: count }, (_, i) => ({
        id: `org-${Date.now()}-${i}`,
        name: `Organisation ${start + i + 1}`,
        allocations: { ...s.orgs[0].allocations },
      }));
      return { ...s, orgs: [...s.orgs, ...copies] };
    });
  }, []);

  const value = useMemo<CheckoutContextValue>(() => {
    const subtotal = state.orgs.reduce((sum, o) => sum + costOf(o), 0);
    const discountValid = DISCOUNT_PATTERN.test(state.discountCode.trim());
    const discount = discountValid ? subtotal * DISCOUNT_RATE : 0;
    const tax = (subtotal - discount) * TAX_RATE;
    return {
      ...state,
      setSeats,
      addOrganisations,
      replaceOrganisations: (orgs) => setState((s) => ({ ...s, orgs })),
      setEmail: (email) => setState((s) => ({ ...s, email })),
      setCompany: (company) => setState((s) => ({ ...s, company })),
      setDiscountCode: (discountCode) => setState((s) => ({ ...s, discountCode })),
      completeStep: (step) => setState((s) => ({ ...s, completed: Math.max(s.completed, step) })),
      totals: { subtotal, discount, tax, total: subtotal - discount + tax, discountValid },
    };
  }, [state, setSeats, addOrganisations]);

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used inside <CheckoutProvider>');
  return ctx;
}
