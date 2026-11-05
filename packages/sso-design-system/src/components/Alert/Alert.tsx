import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { cx } from '../../utils/cx';
import type { StatusTone } from '../StatusPill/StatusPill';

export interface AlertProps {
  tone?: Exclude<StatusTone, 'neutral'>;
  title: ReactNode;
  description?: ReactNode;
  /** Trailing link/button, e.g. "Manage seats". */
  action?: ReactNode;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const ICONS = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: XCircle };

/** Page-level banner. Seat limits, plan expiry, renewal warnings. */
export function Alert({ tone = 'info', title, description, action, icon, onDismiss, className }: AlertProps) {
  const Icon = ICONS[tone];
  return (
    <div className={cx('sso-alert', `sso-alert--${tone}`, className)} role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}>
      <span className="sso-alert__icon" aria-hidden>{icon ?? <Icon />}</span>
      <div className="sso-alert__body">
        <p className="sso-alert__title">{title}</p>
        {description && <p className="sso-alert__desc">{description}</p>}
      </div>
      {action && <div className="sso-alert__action">{action}</div>}
      {onDismiss && (
        <button type="button" className="sso-alert__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X />
        </button>
      )}
    </div>
  );
}
