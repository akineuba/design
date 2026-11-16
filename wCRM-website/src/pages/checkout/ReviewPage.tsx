import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@ds';
import arrowLeft from '../../assets/checkout/arrow-left.svg';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { OrderSummary } from '../../checkout/OrderSummary';
import { EditOrganisationsDialog } from '../../checkout/EditOrganisationsDialog';
import { useCheckout } from '../../checkout/CheckoutContext';

/** Step 5 (Figma `wcrm-review`, 372:2692). */
export function ReviewPage() {
  const navigate = useNavigate();
  const { completeStep } = useCheckout();
  const [editing, setEditing] = useState(false);
  return (
    <CheckoutLayout step={5} backTo="/checkout/company">
      <div className="flex items-stretch gap-6 px-50 pb-20 pt-4">
        <section className="flex h-site-review-h min-w-0 flex-1 flex-col justify-between rounded-xl border border-border-default bg-surface-default p-10 shadow-site-checkout">
          <header className="flex flex-col gap-2">
            <p className="text-label-sm font-bold uppercase text-brand-primary">Configuration review</p>
            <h1 className="text-site-price text-site-heading">Review your configurations</h1>
            <p className="text-site-body-lg leading-site-22 text-text-tertiary">
              Please review the configurations for your legal entities before proceeding to the final payment setup. Additional organizations copy the primary setup unless customized.
            </p>
          </header>
          <footer className="flex items-center justify-between border-t border-border-default pt-6">
            <Link to="/checkout/company" className="flex items-center gap-1.5 rounded-xs text-label text-text-tertiary hover:text-text-strong focus-visible:outline-none focus-visible:shadow-focus">
              <img src={arrowLeft} alt="" className="size-3.5" />
              Back to company details
            </Link>
            <Button
              size="drawer"
              trailingIcon={<span aria-hidden="true">→</span>}
              onClick={() => {
                completeStep(5);
                navigate('/checkout/payment');
              }}
            >
              Proceed to payment
            </Button>
          </footer>
        </section>
        <OrderSummary variant="review" onEdit={() => setEditing(true)} />
      </div>
      <EditOrganisationsDialog open={editing} onOpenChange={setEditing} />
    </CheckoutLayout>
  );
}
