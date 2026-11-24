import type { ReactNode } from 'react';
import { LucideCheckCircleIcon, LucideChevronDownIcon, LucideXCircleIcon, cn } from '@ds';

/*
 * Shared pieces of the concept page's close-up product views (hero Deals view, the deal story). They are drawn at
 * the size they are shown, on design-system tokens, so they stay readable and follow the page theme. Each view is an
 * illustration: inert, and announced as one image.
 */

/** Wraps a close-up: one image for assistive tech, inert inside. */
export function CloseUp({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={cn('overflow-hidden rounded-xl border border-border-default bg-surface-canvas shadow-lg', className)}>
      <div aria-hidden="true" {...({ inert: '' } as object)} className="pointer-events-none select-none">
        {children}
      </div>
    </div>
  );
}

export type Stage = 'Discovery' | 'Site Survey' | 'Site Quotation' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';

/** Deal-stage select, as in the Deals register: outlined, or green / red with an icon once closed. */
export function StagePill({ stage, open }: { stage: Stage; open?: boolean }) {
  const won = stage === 'Closed Won';
  const lost = stage === 'Closed Lost';
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-caption font-semibold',
        won ? 'border-status-success-subtle bg-status-success-subtle text-status-success-text' : lost ? 'border-status-danger-subtle bg-status-danger-subtle text-status-danger' : 'border-border-strong bg-surface-default text-text-primary',
        open && 'border-accent-navy shadow-focus',
      )}
    >
      {won && <LucideCheckCircleIcon className="size-3.5" />}
      {lost && <LucideXCircleIcon className="size-3.5" />}
      {stage}
      <LucideChevronDownIcon className={cn('size-3.5', open && 'rotate-180')} />
    </span>
  );
}

/** BANT qualification score pill (x / 4): green when complete, amber in progress, grey when not started. */
export function QualPill({ score }: { score: 0 | 1 | 2 | 3 | 4 }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-caption font-semibold',
        score === 4 ? 'bg-status-success-subtle text-status-success-text' : score > 0 ? 'bg-status-warning-subtle text-status-warning-text' : 'bg-surface-sunken text-text-secondary',
      )}
    >
      {score}/4
      <LucideChevronDownIcon className="size-3" />
    </span>
  );
}

/** Read-only form field as drawn in the app's drawers. */
export function Field({ label, children, icon }: { label: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-caption font-medium text-text-secondary">{label}</span>
      <span className="flex items-center gap-2 rounded-md border border-border-strong bg-surface-default px-3 py-2 text-body-sm text-text-primary">
        {icon && <span className="text-text-muted [&>svg]:size-4">{icon}</span>}
        {children}
      </span>
    </span>
  );
}
