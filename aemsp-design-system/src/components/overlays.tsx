import React, { createContext, useCallback, useContext, useEffect, useId, useState } from 'react';
import { Icon, IconName } from './Icon';
import { Button, ButtonVariant, cx } from './primitives';
import { Tabs } from './layout';

/* =============== Overlay header (dark navy, per the reference) =============== */
function OverlayHeader({ title, subtitle, onClose, icon, iconTone, titleId }: { title: string; subtitle?: string; onClose?: () => void; icon?: IconName; iconTone?: 'danger' | 'warning'; titleId: string }) {
  return (
    <div className="ae-ovh">
      {icon && <span className={cx('ae-ovh__icon', iconTone && `ae-ovh__icon--${iconTone}`)}><Icon name={icon} size={22} /></span>}
      <div className="ae-ovh__text">
        <h2 id={titleId} className="ae-ovh__title">{title}</h2>
        {subtitle && <p className="ae-ovh__sub">{subtitle}</p>}
      </div>
      {onClose && <button type="button" className="ae-ovh__x" onClick={onClose} aria-label="Close"><Icon name="close" size={24} /></button>}
    </div>
  );
}

function useEsc(open: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!open || !onClose) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);
}

/* =============== Modal =============== */
export interface ModalProps {
  open?: boolean;
  title: string;
  subtitle?: string;
  icon?: IconName;
  iconTone?: 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onClose?: () => void;
  primary?: { label: string; onClick?: () => void; variant?: ButtonVariant; loading?: boolean; icon?: IconName; disabled?: boolean };
  secondary?: { label: string; onClick?: () => void };
  /** split = two equal-width buttons (reference style); end = right-aligned buttons */
  footer?: 'split' | 'end' | 'none';
  inline?: boolean;
}
export function Modal({ open = true, title, subtitle, icon, iconTone, size = 'md', children, onClose, primary, secondary = { label: 'Cancel' }, footer = 'split', inline }: ModalProps) {
  const titleId = useId();
  useEsc(open, onClose);
  if (!open) return null;
  return (
    <div className={cx('ae-scrim ae-root', inline && 'ae-scrim--inline')} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={cx('ae-modal', size !== 'md' && `ae-modal--${size}`)} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <OverlayHeader title={title} subtitle={subtitle} onClose={onClose} icon={icon} iconTone={iconTone} titleId={titleId} />
        {children && <div className="ae-ovb">{children}</div>}
        {footer !== 'none' && primary && (
          <div className={cx('ae-ovf', footer === 'end' && 'ae-ovf--end')} style={!children ? { paddingTop: 24 } : undefined}>
            <Button variant="cancel" size="lg" block={footer === 'split'} onClick={secondary.onClick ?? onClose}>{secondary.label}</Button>
            <Button variant={primary.variant ?? 'confirm'} size="lg" block={footer === 'split'} onClick={primary.onClick} loading={primary.loading} icon={primary.icon} disabled={primary.disabled}>{primary.label}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =============== Side panel =============== */
export interface SidePanelProps {
  open?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  primary?: { label: string; onClick?: () => void; loading?: boolean; variant?: ButtonVariant };
  secondary?: { label: string; onClick?: () => void };
  tabs?: { id: string; label: string }[];
  wide?: boolean;
  inline?: boolean;
  extraActions?: React.ReactNode;
}
export function SidePanel({ open = true, title, subtitle, children, onClose, primary, secondary = { label: 'Cancel' }, tabs, wide, inline, extraActions }: SidePanelProps) {
  const titleId = useId();
  useEsc(open, onClose);
  if (!open) return null;
  return (
    <div className={cx('ae-scrim ae-scrim--panel ae-root', inline && 'ae-scrim--inline')} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <aside className={cx('ae-panel', wide && 'ae-panel--wide')} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <OverlayHeader title={title} subtitle={subtitle} onClose={onClose} titleId={titleId} />
        {tabs && <div className="ae-panel__tabs"><Tabs items={tabs} /></div>}
        <div className="ae-ovb">{children}</div>
        {(primary || extraActions) && (
          <div className="ae-ovf ae-ovf--bar" style={{ display: 'flex', gap: 12 }}>
            {extraActions && <div style={{ marginRight: 'auto', display: 'flex', gap: 10 }}>{extraActions}</div>}
            <Button variant="cancel" size="lg" onClick={secondary.onClick ?? onClose} style={!extraActions ? { flex: 1 } : undefined}>{secondary.label}</Button>
            {primary && <Button variant={primary.variant ?? 'confirm'} size="lg" onClick={primary.onClick} loading={primary.loading} style={!extraActions ? { flex: 1 } : undefined}>{primary.label}</Button>}
          </div>
        )}
      </aside>
    </div>
  );
}

/* =============== Alert =============== */
export type AlertTone = 'info' | 'success' | 'warning' | 'error';
const TONE_ICON: Record<AlertTone, IconName> = { info: 'info', success: 'check-circle', warning: 'warning', error: 'error' };
export function Alert({ tone = 'info', title, children, onDismiss, actions }: { tone?: AlertTone; title?: string; children?: React.ReactNode; onDismiss?: () => void; actions?: React.ReactNode }) {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div className={`ae-alert ae-alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon name={TONE_ICON[tone]} size={20} />
      <div className="ae-alert__body">
        {title && <div className="ae-alert__title">{title}</div>}
        {children}
        {actions && <div className="ae-alert__actions">{actions}</div>}
      </div>
      {onDismiss && <button type="button" className="ae-alert__x" aria-label="Dismiss" onClick={() => { setShown(false); onDismiss(); }}><Icon name="close" size={16} /></button>}
    </div>
  );
}

/* =============== Toast =============== */
export interface ToastData { id?: string; tone?: AlertTone; title: string; message?: string; action?: { label: string; onClick?: () => void }; }
export function Toast({ tone = 'success', title, message, action, onClose }: ToastData & { onClose?: () => void }) {
  return (
    <div className={`ae-toast ae-toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon name={TONE_ICON[tone]} size={20} className={`ae-toast__icon--${tone}`} />
      <div className="ae-toast__body">
        <div className="ae-toast__title">{title}</div>
        {message && <div className="ae-toast__msg">{message}</div>}
      </div>
      {action && <button type="button" className="ae-linkbtn" onClick={action.onClick} style={{ alignSelf: 'center' }}>{action.label}</button>}
      {onClose && <button type="button" className="ae-alert__x" style={{ color: 'var(--text-muted)' }} onClick={onClose} aria-label="Dismiss"><Icon name="close" size={16} /></button>}
    </div>
  );
}

const ToastCtx = createContext<(t: ToastData) => void>(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<(ToastData & { id: string })[]>([]);
  const push = useCallback((t: ToastData) => {
    const id = Math.random().toString(36).slice(2);
    setList((l) => [...l, { ...t, id }]);
    setTimeout(() => setList((l) => l.filter((x) => x.id !== id)), 5000);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="ae-toast-stack ae-root" aria-live="polite">
        {list.map((t) => <Toast key={t.id} {...t} onClose={() => setList((l) => l.filter((x) => x.id !== t.id))} />)}
      </div>
    </ToastCtx.Provider>
  );
}
