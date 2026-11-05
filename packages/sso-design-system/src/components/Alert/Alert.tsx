import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title: ReactNode;
  children?: ReactNode;
  /** Buttons on the right. */
  actions?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const ICONS = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: XCircle };

/** Page-level message (ERP Alert): coloured border + tint, 8px radius, title Semibold 14. */
export function Alert({ tone = 'info', title, children, actions, onDismiss, className }: AlertProps) {
  const Icon = ICONS[tone];
  return (
    <div className={cx('sso-alert', `sso-alert--${tone}`, className)} role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}>
      <span className="sso-alert__icon" aria-hidden><Icon /></span>
      <div className="sso-alert__body">
        <p className="sso-alert__title">{title}</p>
        {children && <div className="sso-alert__text">{children}</div>}
      </div>
      {actions && <div className="sso-alert__actions">{actions}</div>}
      {onDismiss && (
        <button type="button" className="sso-alert__dismiss" onClick={onDismiss} aria-label="Dismiss"><X /></button>
      )}
    </div>
  );
}
