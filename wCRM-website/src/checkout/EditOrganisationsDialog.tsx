import { useEffect, useState } from 'react';
import { Button } from '@ds';
import chevron from '../assets/checkout/select-chevron-dark.svg';
import trash from '../assets/checkout/trash.svg';
import { SEAT_PLANS, costOf, formatNaira, mainPlanOf, useCheckout, type Organisation, type SeatPlan } from './CheckoutContext';
import { SeatStepper } from './SeatStepper';
import { DialogCloseButton, SiteDialogClose, SiteDialogContent, SiteDialogRoot, SiteDialogTitle } from './SiteDialog';
import { siteButtonClass } from '../components/SiteButton';

function EditOrgCard({ org, index, onChange, onRemove }: { org: Organisation; index: number; onChange: (o: Organisation) => void; onRemove?: () => void }) {
  const [plan, setPlan] = useState<SeatPlan>(mainPlanOf(org).id);
  const planId = `${org.id}-plan`;
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl border border-border-default bg-surface-default p-8 shadow-site-checkout">
      <div className="flex items-center justify-between">
        <p className="text-badge uppercase text-brand-primary">Organisation {index + 1}</p>
        {onRemove && (
          <button type="button" onClick={onRemove} aria-label={`Remove ${org.name}`} className="rounded-xs focus-visible:outline-none focus-visible:shadow-focus">
            <img src={trash} alt="" className="size-4" />
          </button>
        )}
      </div>
      <h3 className="text-heading-1 text-text-strong">{org.name}</h3>
      <div className="flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <label htmlFor={planId} className="text-label text-text-strong">Plan</label>
          <div className="relative">
            <select
              id={planId}
              value={plan}
              onChange={(e) => setPlan(e.target.value as SeatPlan)}
              className="h-control-md w-full appearance-none rounded-sm border border-border-default bg-surface-default px-3.5 text-body font-medium text-text-strong focus-visible:border-accent-navy focus-visible:outline-none focus-visible:shadow-focus"
            >
              {SEAT_PLANS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <img src={chevron} alt="" className="pointer-events-none absolute right-3.5 top-1/2 size-3 -translate-y-1/2" />
          </div>
          <p className="text-caption-sm leading-site-16 text-text-tertiary">For UNLIMITED read-only/view-only email exports (p/c fill)</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <p className="text-label text-text-strong">Full seats</p>
          <SeatStepper
            appearance="field"
            label={`${SEAT_PLANS.find((p) => p.id === plan)!.label} seats for ${org.name}`}
            value={org.allocations[plan]}
            onChange={(v) => onChange({ ...org, allocations: { ...org.allocations, [plan]: v } })}
          />
          <p className="text-caption-sm text-text-tertiary">Effective at: {formatNaira(costOf(org))} (Price: Year plan)</p>
        </div>
      </div>
    </section>
  );
}

/** Edit every organisation before payment (Figma `edit-modal`, 372:3262). Changes apply on Save. */
export function EditOrganisationsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { orgs, replaceOrganisations } = useCheckout();
  const [draft, setDraft] = useState(orgs);
  useEffect(() => {
    if (open) setDraft(orgs);
  }, [open, orgs]);

  return (
    <SiteDialogRoot open={open} onOpenChange={onOpenChange}>
      <SiteDialogContent className="w-site-modal-edit gap-6 p-8 shadow-site-modal" description="Change the plan and seats of each organisation.">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 whitespace-nowrap">
            <p className="text-badge uppercase text-brand-primary">Edit organisation</p>
            <SiteDialogTitle className="font-display text-heading-xl text-site-heading">{draft[0]?.name ?? 'Organisations'}</SiteDialogTitle>
          </div>
          <DialogCloseButton />
        </div>
        <hr className="border-t border-border-default" />
        <div className="flex h-site-modal-edit-list flex-col gap-6 overflow-y-auto pr-1">
          {draft.map((org, i) => (
            <EditOrgCard
              key={org.id}
              org={org}
              index={i}
              onChange={(o) => setDraft((d) => d.map((x) => (x.id === o.id ? o : x)))}
              onRemove={i === 0 ? undefined : () => setDraft((d) => d.filter((x) => x.id !== org.id))}
            />
          ))}
        </div>
        <hr className="border-t border-border-default" />
        <div className="flex items-center justify-between">
          <SiteDialogClose className={siteButtonClass('quiet')}>Cancel</SiteDialogClose>
          <Button
            size="drawer"
            onClick={() => {
              replaceOrganisations(draft);
              onOpenChange(false);
            }}
          >
            Save changes
          </Button>
        </div>
      </SiteDialogContent>
    </SiteDialogRoot>
  );
}
