import { cx } from '../lib/cx';
import { InsurerIcon } from '../icons';

export interface InsurerChipProps {
  name: string;
  /** Logo URL. Falls back to a building icon. */
  logo?: string;
  /** Lead insurer in a co-insurance placement. */
  lead?: boolean;
  /** Share of the risk, for co-insurance: 60 → "60%". */
  share?: number;
  className?: string;
}

/** Underwriter on a policy, quote or claim. Several chips in a row show a co-insurance placement. */
export function InsurerChip({ name, logo, lead, share, className }: InsurerChipProps) {
  return (
    <span className={cx('inline-flex h-control-sm max-w-full items-center gap-2 rounded-full border border-line-subtle bg-surface pl-1 pr-3 text-13 text-fg-strong', className)}>
      <span className="inline-flex size-[26px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-sunken text-fg-muted" aria-hidden>
        {logo ? <img src={logo} alt="" className="size-full object-contain" /> : <span className="size-icon-sm"><InsurerIcon /></span>}
      </span>
      <span className="truncate font-medium">{name}</span>
      {share !== undefined && <span className="shrink-0 tabular-nums text-fg-muted">{share}%</span>}
      {lead && <span className="shrink-0 rounded-full bg-brand-subtle px-1.5 text-11 font-semibold text-primary">Lead</span>}
    </span>
  );
}
