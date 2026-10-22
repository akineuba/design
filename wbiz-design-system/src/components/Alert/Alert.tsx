import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CloseIcon, ErrorIcon, InfoIcon, TickCircleIcon, WarningIcon } from '../../icons';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title: ReactNode;
  /** Details: a sentence or a short list. */
  children?: ReactNode;
  /** Buttons on the right, e.g. "Record payment". */
  actions?: ReactNode;
  onDismiss?: () => void;
}

const tones: Record<AlertTone, string> = {
  info: 'border-primary bg-primary-subtle',
  success: 'border-success bg-success-subtle',
  warning: 'border-warning bg-status-warning-bg',
  error: 'border-error bg-error-subtle',
};
const icons: Record<AlertTone, ReactNode> = { info: <InfoIcon />, success: <TickCircleIcon />, warning: <WarningIcon />, error: <ErrorIcon /> };
const iconTone: Record<AlertTone, string> = { info: 'text-primary', success: 'text-success-strong', warning: 'text-warning', error: 'text-error' };

/**
 * Page-level message: validation summary before saving, confirmation after issuing, warnings about
 * the record. Derived from the status colours; Figma has no banner. Errors and warnings are announced
 * to screen readers (role="alert"); info and success use role="status".
 */
export function Alert({ tone = 'info', title, children, actions, onDismiss, className, ...rest }: AlertProps) {
  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      className={cx('flex flex-wrap items-start gap-3 rounded-lg border px-4 py-3', tones[tone], className)}
      {...rest}
    >
      <span className={cx('mt-0.5 size-icon shrink-0', iconTone[tone])} aria-hidden>{icons[tone]}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-sans text-sm font-semibold text-fg-ink">{title}</p>
        {children && <div className="font-sans text-sm text-fg">{children}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      {onDismiss && (
        <button type="button" aria-label="Dismiss" onClick={onDismiss} className="inline-flex size-6 items-center justify-center rounded-md text-fg-muted hover:bg-surface focus-visible:outline-none focus-visible:shadow-focus">
          <span className="size-icon-sm"><CloseIcon /></span>
        </button>
      )}
    </div>
  );
}
