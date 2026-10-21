import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CheckIcon, CloseIcon } from '../../icons';

export type StageStatus = 'complete' | 'current' | 'upcoming' | 'rejected';

export interface Stage {
  id: string;
  label: string;
  /** Who acted and when, e.g. "Approved by Ada Obi · 12 Aug 2025". Shown under completed stages. */
  description?: ReactNode;
  /** Overrides the status worked out from `currentId`. Use `rejected` for a stage sent back. */
  status?: StageStatus;
}

export interface StageProgressProps {
  stages: Stage[];
  /** The stage the record is at now. Stages before it are complete, after it upcoming. */
  currentId?: string;
  /** horizontal: record header. vertical: approval trail in a side panel, with descriptions. */
  orientation?: 'horizontal' | 'vertical';
  /** Accessible name, e.g. "Approval progress". */
  label?: string;
  className?: string;
}

const statusOf = (stages: Stage[], i: number, currentId?: string): StageStatus => {
  if (stages[i].status) return stages[i].status!;
  const cur = stages.findIndex((s) => s.id === currentId);
  if (cur === -1) return 'upcoming';
  return i < cur ? 'complete' : i === cur ? 'current' : 'upcoming';
};

const dot: Record<StageStatus, string> = {
  complete: 'border-success bg-success text-fg-inverse',
  current: 'border-primary bg-primary-muted text-primary',
  upcoming: 'border-line bg-surface text-fg-placeholder',
  rejected: 'border-error bg-error text-fg-inverse',
};

const text: Record<StageStatus, string> = {
  complete: 'text-fg-ink',
  current: 'font-semibold text-primary',
  upcoming: 'text-fg-muted',
  rejected: 'font-medium text-error',
};

const srStatus: Record<StageStatus, string> = { complete: 'completed', current: 'current stage', upcoming: 'not started', rejected: 'sent back' };

/**
 * Stage progression for records that move through steps: approvals (Step 1 → Step 2), recruitment
 * (Applied → Interview → Offer), documents (Draft → Submitted → Approved → Posted).
 * Derived: Figma has no stage component, so it is built from existing tokens: success for done,
 * primary for the current stage, line for upcoming, error for a stage that sent the record back.
 */
export function StageProgress({ stages, currentId, orientation = 'horizontal', label = 'Progress', className }: StageProgressProps) {
  const vertical = orientation === 'vertical';
  return (
    <ol aria-label={label} className={cx('flex', vertical ? 'flex-col' : 'w-full items-start', className)}>
      {stages.map((s, i) => {
        const st = statusOf(stages, i, currentId);
        const last = i === stages.length - 1;
        const lineDone = st === 'complete';
        return (
          <li
            key={s.id}
            aria-current={st === 'current' ? 'step' : undefined}
            className={cx('relative flex min-w-0', vertical ? 'gap-3 pb-5 last:pb-0' : 'flex-1 flex-col items-center gap-2 text-center')}
          >
            {!last && (
              <span
                aria-hidden
                className={cx(
                  'absolute',
                  vertical ? 'bottom-0 left-3 top-6 w-0.5 -translate-x-1/2' : 'left-1/2 top-3 h-0.5 w-full',
                  lineDone ? 'bg-success' : 'bg-line',
                )}
              />
            )}
            <span className={cx('relative z-0 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 font-sans text-xs font-semibold', dot[st])}>
              {st === 'complete' ? <span className="size-icon-xs"><CheckIcon /></span> : st === 'rejected' ? <span className="size-icon-xs"><CloseIcon /></span> : i + 1}
            </span>
            <span className={cx('flex min-w-0 flex-col gap-0.5', !vertical && 'px-2')}>
              <span className={cx('font-sans text-sm', text[st])}>
                {s.label}
                <span className="sr-only">, {srStatus[st]}</span>
              </span>
              {s.description && <span className="font-sans text-xs text-fg-muted">{s.description}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
