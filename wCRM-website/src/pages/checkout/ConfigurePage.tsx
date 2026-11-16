import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { OrderSummary } from '../../checkout/OrderSummary';
import { OrgAllocationCard } from '../../checkout/OrgAllocationCard';
import { AddOrganisationsDialog } from '../../checkout/AddOrganisationsDialog';
import { useCheckout } from '../../checkout/CheckoutContext';
import { SiteButton } from '../../components/SiteButton';

/** Step 1 (Figma `crm-configure-plan` 231:956; with several organisations 367:10622). */
export function ConfigurePage() {
  const navigate = useNavigate();
  const { orgs, completeStep } = useCheckout();
  const [adding, setAdding] = useState(false);
  const proceed = () => {
    completeStep(1);
    navigate('/checkout/account');
  };
  return (
    <CheckoutLayout step={1} backTo="/pricing">
      <div className="flex items-start gap-10 px-50 py-20">
        <div className="flex w-site-checkout-main flex-col gap-8">
          <header className="flex flex-col gap-2">
            <p className="text-label-sm font-bold uppercase text-brand-primary">Configure your plan</p>
            <h1 className="whitespace-nowrap font-display text-site-title text-text-strong">Set up the organisations you need</h1>
            <p className="text-site-body-lg leading-site-22 text-text-tertiary">
              Each legal entity has its own plan and allowances. Additional organisations copy the first configuration so you only edit the exceptions.
            </p>
          </header>
          {orgs.map((org, i) => (
            <OrgAllocationCard key={org.id} org={org} index={i} />
          ))}
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="self-start rounded-md border border-border-default bg-surface-default px-6 py-3 text-label text-brand-primary hover:bg-brand-primary-subtle focus-visible:outline-none focus-visible:shadow-focus"
          >
            + Add additional organisations
          </button>
        </div>
        <div className="sticky top-20">
          <OrderSummary
            variant="configure"
            footer={
              <>
                <SiteButton variant="checkout" onClick={proceed}>Continue →</SiteButton>
                <p className="text-center text-caption-sm text-text-tertiary">Your configuration is saved as you configure.</p>
              </>
            }
          />
        </div>
      </div>
      <AddOrganisationsDialog open={adding} onOpenChange={setAdding} />
    </CheckoutLayout>
  );
}
