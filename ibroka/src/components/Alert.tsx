import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons';

export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title?: ReactNode;
  children?: ReactNode;
  /** Link-style action on the right, e.g. "Renew now". */
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const tones = {
  info: { box: 'bg-info-subtle', icon: <InfoIcon />, ic: 'text-info' },
  success: { box: 'bg-success-subtle', icon: <SuccessIcon />, ic: 'text-success' },
  warning: { box: 'bg-warning-subtle', icon: <WarningIcon />, ic: 'text-warning' },
  error: { box: 'bg-danger-subtle', icon: <ErrorIcon />, ic: 'text-danger' },
};

/** Inline message that stays on the page (unlike Toast). Error summaries at the top of a form; policy warnings. */
export function Alert({ tone = 'info', title, children, action, onDismiss, className }: AlertProps) {
  const t = tones[tone];
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cx('flex items-start gap-3 rounded-lg p-4', t.box, className)}>
      <span className={cx('size-icon shrink-0', t.ic)} aria-hidden>
        {t.icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-13 text-fg-strong">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-fg-strong">{children}</div>}
      </div>
      {action && <div className="shrink-0 text-13 font-semibold">{action}</div>}
      {onDismiss && (
        <button type="button" aria-label="Dismiss" onClick={onDismiss} className="inline-flex size-6 shrink-0 items-center justify-center rounded text-fg-muted hover:bg-surface ib-focus">
          <span className="size-icon-sm">
            <CloseIcon />
          </span>
        </button>
      )}
    </div>
  );
}
