import { cn } from '@ds';
import { SEAT_PLANS, SEAT_PRICE, costOf, formatNaira, seatsOf, useCheckout, type Organisation } from './CheckoutContext';
import { SeatStepper } from './SeatStepper';

/** One legal entity's seat allocation (Figma `PricingCard-Org1`, 698:2419). */
export function OrgAllocationCard({ org, index }: { org: Organisation; index: number }) {
  const { setSeats } = useCheckout();
  const total = seatsOf(org);
  return (
    <section aria-labelledby={`${org.id}-name`} className="flex w-full animate-page-in flex-col gap-6 rounded-xl border border-border-default bg-surface-default p-8 shadow-site-checkout">
      <header className="flex flex-col gap-2 whitespace-nowrap">
        <p className="text-badge uppercase text-brand-primary">Organisation {index + 1}</p>
        <h2 id={`${org.id}-name`} className="text-heading-1 text-text-strong">{org.name}</h2>
      </header>
      <div className="flex flex-col gap-2.5">
        <p className="flex items-center justify-between whitespace-nowrap font-semibold">
          <span className="text-body text-text-strong">{total} seats total</span>
          <span className="text-body-sm font-semibold text-text-tertiary">{total} allocated</span>
        </p>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-sunken" role="img" aria-label={SEAT_PLANS.map((p) => `${p.label} ${org.allocations[p.id]}`).join(', ')}>
          {total > 0 &&
            SEAT_PLANS.map((p) => (
              <span key={p.id} className={cn('h-full transition-[width] duration-base', p.bar)} style={{ width: `${(org.allocations[p.id] / total) * 100}%` }} />
            ))}
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {SEAT_PLANS.map((p) => (
          <li key={p.id} className="flex items-center justify-between border-b border-border-default py-3">
            <span className="flex flex-1 items-center gap-3">
              <span aria-hidden="true" className={cn('size-2.5 rounded-full', p.dot)} />
              <span className="text-label text-text-strong">{p.label}</span>
            </span>
            <span className="flex items-center gap-4">
              <SeatStepper label={`${p.label} seats for ${org.name}`} value={org.allocations[p.id]} onChange={(v) => setSeats(org.id, p.id, v)} />
              <span className="w-20 text-right text-label font-bold text-text-strong" title={`${formatNaira(SEAT_PRICE[p.id])} per seat per year`}>
                <span key={org.allocations[p.id]} className="inline-block animate-value-in">{formatNaira(org.allocations[p.id] * SEAT_PRICE[p.id])}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <hr className="border-t border-border-default" />
      <p className="flex items-center justify-between whitespace-nowrap text-body text-text-strong">
        <span className="font-semibold">Total cost</span>
        <span key={costOf(org)} className="animate-value-in font-bold">{formatNaira(costOf(org))}</span>
      </p>
    </section>
  );
}
