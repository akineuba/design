import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../../utils/cx';

interface BaseOverlayProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons in the footer, right-aligned. */
  footer?: ReactNode;
  children?: ReactNode;
}

function useOverlay(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const focusables = () => Array.from(node?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? []).filter((el) => !el.hasAttribute('disabled'));
    (focusables()[1] ?? focusables()[0])?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0]!, last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [open, onClose]);
  return ref;
}

function Header({ id, title, description, onClose }: { id: string; title: ReactNode; description?: ReactNode; onClose: () => void }) {
  return (
    <div className="sso-overlay__header">
      <div>
        <h2 className="sso-overlay__title" id={`${id}-title`}>{title}</h2>
        {description && <p className="sso-overlay__desc">{description}</p>}
      </div>
      <button type="button" className="sso-overlay__close" onClick={onClose} aria-label="Close">
        <X />
      </button>
    </div>
  );
}

/** Right-hand drawer for create/edit forms (Add user, Add tenant). */
export function SidePanel({ open, onClose, title, description, footer, children, width }: BaseOverlayProps & { width?: number }) {
  const ref = useOverlay(open, onClose);
  const id = useId();
  if (!open) return null;
  return (
    <div className="sso-overlay sso-overlay--panel">
      <div className="sso-overlay__scrim" onClick={onClose} />
      <div ref={ref} className="sso-panel" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} style={{ width }}>
        <Header id={id} title={title} description={description} onClose={onClose} />
        <div className="sso-overlay__body">{children}</div>
        {footer && <div className="sso-overlay__footer">{footer}</div>}
      </div>
    </div>
  );
}

/** Centred dialog for short confirmations and small edits. */
export function Modal({ open, onClose, title, description, footer, children, size = 'md' }: BaseOverlayProps & { size?: 'sm' | 'md' | 'lg' }) {
  const ref = useOverlay(open, onClose);
  const id = useId();
  if (!open) return null;
  return (
    <div className="sso-overlay sso-overlay--modal">
      <div className="sso-overlay__scrim" onClick={onClose} />
      <div ref={ref} className={cx('sso-modal', `sso-modal--${size}`)} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        <Header id={id} title={title} description={description} onClose={onClose} />
        {children && <div className="sso-overlay__body">{children}</div>}
        {footer && <div className="sso-overlay__footer">{footer}</div>}
      </div>
    </div>
  );
}

export interface ResultCardProps {
  tone: 'success' | 'error';
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

/** Outcome card for the end of a flow (plan changed, payment failed). */
export function ResultCard({ tone, title, description, actions }: ResultCardProps) {
  return (
    <div className={cx('sso-result', `sso-result--${tone}`)} role="status">
      <span className="sso-result__icon" aria-hidden>
        {tone === 'success' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <X strokeWidth={3} />
        )}
      </span>
      <h2 className="sso-result__title">{title}</h2>
      {description && <p className="sso-result__desc">{description}</p>}
      {actions && <div className="sso-result__actions">{actions}</div>}
    </div>
  );
}
