import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CheckIcon, CloseIcon } from '../icons';

export type StageState = 'done' | 'current' | 'upcoming' | 'sent-back';

export interface Stage {
  id: string;
  label: string;
  state: StageState;
  /** Who acted and when (UI rule 35): "Ada Obi · 12 Oct 2026". */
  meta?: ReactNode;
  /** Why it was sent back (UI rule 34). */
  reason?: ReactNode;
}

export interface StageProgressProps {
  stages: Stage[];
  /** horizontal for record headers; vertical for a claim or approval trail. */
  orientation?: 'horizontal' | 'vertical';
  'aria-label'?: string;
  className?: string;
}

const dot: Record<StageState, string> = {
  done: 'bg-primary text-fg-inverse border-primary',
  current: 'bg-surface text-primary border-brand ring-4 ring-[var(--ib-color-brand-subtle)]',
  upcoming: 'bg-surface text-fg-muted border-line-strong',
  'sent-back': 'bg-danger text-fg-inverse border-danger',
};

/**
 * Stages of a record: policy (Draft → Quoted → Approved → Active), claim (Reported → Under review →
 * Approved → Settled), approval chains. Read-only: stages move through the current stage's action (UI rule 33).
 */
export function StageProgress({ stages, orientation = 'horizontal', className, ...aria }: StageProgressProps) {
  const vertical = orientation === 'vertical';
  return (
    <ol aria-label={aria['aria-label'] ?? 'Progress'} className={cx('flex', vertical ? 'flex-col' : 'flex-wrap items-start gap-y-4', className)}>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        return (
          <li key={s.id} aria-current={s.state === 'current' ? 'step' : undefined} className={cx('relative flex', vertical ? 'gap-3.5 pb-6 last:pb-0' : 'min-w-[120px] flex-1 flex-col gap-2 pr-4')}>
            {!last && (
              <span
                aria-hidden
                className={cx(
                  'absolute',
                  vertical ? 'left-[13px] top-7 h-[calc(100%-28px)] w-0.5' : 'left-8 right-0 top-[13px] h-0.5',
                  s.state === 'done' ? 'bg-primary' : 'bg-line-subtle',
                )}
              />
            )}
            <span className={cx('relative z-[1] inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-12 font-bold', dot[s.state])}>
              {s.state === 'done' ? <span className="size-3.5"><CheckIcon /></span> : s.state === 'sent-back' ? <span className="size-3.5"><CloseIcon /></span> : i + 1}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className={cx('text-13 font-semibold', s.state === 'upcoming' ? 'text-fg-muted' : s.state === 'sent-back' ? 'text-danger' : 'text-fg-strong')}>
                {s.label}
                <span className="sr-only">
                  {' '}
                  ({s.state === 'done' ? 'completed' : s.state === 'current' ? 'current stage' : s.state === 'sent-back' ? 'sent back' : 'not started'})
                </span>
              </span>
              {s.meta && <span className="text-12 text-fg-muted">{s.meta}</span>}
              {s.reason && <span className="text-12 text-danger">{s.reason}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
