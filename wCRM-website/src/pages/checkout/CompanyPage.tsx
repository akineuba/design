import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { CheckoutFormCard, CheckoutInput, CheckoutSelect, CheckoutTextarea, FormHeader } from '../../checkout/CheckoutForm';
import { useCheckout, type CompanyDetails } from '../../checkout/CheckoutContext';
import { SiteButton } from '../../components/SiteButton';

const COUNTRIES = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'United States'];
const CURRENCIES = ['Nigerian Naira (NGN)', 'Ghanaian Cedi (GHS)', 'Kenyan Shilling (KES)', 'South African Rand (ZAR)', 'British Pound (GBP)', 'US Dollar (USD)'];

type Errors = Partial<Record<keyof CompanyDetails, string>>;

/** Step 4 (Figma `wcrm-company-details`, 372:2618). The tax ID may be added after payment. */
export function CompanyPage() {
  const navigate = useNavigate();
  const { company, setCompany, completeStep } = useCheckout();
  const [form, setForm] = useState<CompanyDetails>(company);
  const [errors, setErrors] = useState<Errors>({});
  const set = (k: keyof CompanyDetails) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.companyName.trim()) next.companyName = 'Enter the registered company name.';
    if (!form.address.trim()) next.address = 'Enter the address shown on invoices.';
    setErrors(next);
    if (Object.keys(next).length) return e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    setCompany(form);
    completeStep(4);
    navigate('/checkout/review');
  };

  return (
    <CheckoutLayout step={4} backTo="/checkout/verify">
      <CheckoutFormCard onSubmit={submit}>
        <FormHeader eyebrow="Company details" title="Tell us about your primary organisation">
          You can complete tax, address and branding information after payment.
        </FormHeader>
        <div className="flex gap-4">
          <CheckoutInput label="Company name" required autoComplete="organization" value={form.companyName} onChange={set('companyName')} error={errors.companyName} />
          <CheckoutSelect label="Country" required autoComplete="country-name" value={form.country} onChange={set('country')}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </CheckoutSelect>
        </div>
        <div className="flex gap-4">
          <CheckoutSelect label="Billing currency" required value={form.currency} onChange={set('currency')}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </CheckoutSelect>
          <CheckoutInput label="Tax identification number" required placeholder="Add later if preferred" value={form.taxId} onChange={set('taxId')} />
        </div>
        <CheckoutTextarea label="Registered address" required autoComplete="street-address" placeholder="Add the address shown on invoices" value={form.address} onChange={set('address')} error={errors.address} />
        <SiteButton type="submit" variant="checkout">
          Continue to payment <span aria-hidden="true">→</span>
        </SiteButton>
      </CheckoutFormCard>
    </CheckoutLayout>
  );
}
