import { useState } from 'react';
import { Button } from '@ds';
import checkGreen from '../assets/checkout/check-green.svg';
import { useCheckout } from './CheckoutContext';
import { SeatStepper } from './SeatStepper';
import { SiteDialogClose, SiteDialogContent, SiteDialogRoot, SiteDialogTitle } from './SiteDialog';

/** "Add additional organisations" (Figma `wcrm-add-orgs-modal`, 372:2334). */
export function AddOrganisationsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { addOrganisations } = useCheckout();
  const [count, setCount] = useState(2);
  return (
    <SiteDialogRoot open={open} onOpenChange={onOpenChange}>
      <SiteDialogContent showClose className="w-site-modal-add gap-6 p-8" description="Each new organisation copies the first organisation's plan, users and employee records.">
        <SiteDialogTitle className="pr-10 font-display text-heading-xl text-site-heading">Add additional organisations</SiteDialogTitle>
        <p className="text-site-body-lg leading-site-22 text-text-tertiary">
          Choose how many legal entities to add. Each one will copy the first organisation&apos;s plan, users and employee records. You can edit any exception before checkout.
        </p>
        <div className="flex w-site-seat-stepper flex-col gap-1.5">
          <p className="text-caption font-semibold text-site-heading" id="org-count-label">Number of organisations</p>
          <SeatStepper appearance="field" label="Number of organisations" value={count} min={1} max={20} onChange={setCount} />
        </div>
        <p className="flex items-center gap-3 rounded-md bg-site-success-subtle p-4 text-label-sm text-site-heading">
          <img src={checkGreen} alt="" className="size-4" />
          Same configuration will be copied
        </p>
        <div className="flex justify-end gap-3">
          <SiteDialogClose asChild>
            <Button variant="secondary" size="drawer">Cancel</Button>
          </SiteDialogClose>
          <Button
            size="drawer"
            onClick={() => {
              addOrganisations(count);
              onOpenChange(false);
            }}
          >
            Create organisation cards
          </Button>
        </div>
      </SiteDialogContent>
    </SiteDialogRoot>
  );
}
