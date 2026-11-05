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

function Header({ id, title, description, onClose, className }: { id: string; title: ReactNode; description?: ReactNode; onClose?: () => void; className: string }) {
  return (
    <div className={className}>
      <div className="sso-overlay__titles">
        <h2 className="sso-overlay__title" id={`${id}-title`}>{title}</h2>
        {description && <p className="sso-overlay__desc">{description}</p>}
      </div>
      {onClose && (
        <button type="button" className="sso-overlay__close" onClick={onClose} aria-label="Close">
          <X />
        </button>
      )}
    </div>
  );
}

/**
 * Right-hand drawer for create/edit forms (ERP SidePanel): 541px, 30px padding,
 * title Semibold 24, labels switch to the 14px form style, footer right-aligned.
 */
export function SidePanel({ open, onClose, title, description, footer, children, size = 'md', showClose = false }: BaseOverlayProps & { size?: 'sm' | 'md' | 'lg'; showClose?: boolean }) {
  const ref = useOverlay(open, onClose);
  const id = useId();
  if (!open) return null;
  return (
    <div className="sso-overlay sso-overlay--panel">
      <div className="sso-overlay__scrim" onClick={onClose} />
      <div ref={ref} className={cx('sso-panel', `sso-panel--${size}`)} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        <Header id={id} title={title} description={description} onClose={showClose ? onClose : undefined} className="sso-panel__header" />
        <div className="sso-panel__body">{children}</div>
        {footer && <div className="sso-panel__footer">{footer}</div>}
      </div>
    </div>
  );
}

/** Centred dialog (ERP Modal): 515px (820 large), 8px radius, title Semibold 24. */
export function Modal({ open, onClose, title, description, footer, children, size = 'md' }: BaseOverlayProps & { size?: 'md' | 'lg' }) {
  const ref = useOverlay(open, onClose);
  const id = useId();
  if (!open) return null;
  return (
    <div className="sso-overlay sso-overlay--modal">
      <div className="sso-overlay__scrim" onClick={onClose} />
      <div ref={ref} className={cx('sso-modal', `sso-modal--${size}`)} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        <Header id={id} title={title} description={description} onClose={onClose} className="sso-modal__header" />
        {children && <div className="sso-modal__body">{children}</div>}
        {footer && <div className="sso-modal__footer">{footer}</div>}
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

/** Outcome card at the end of a flow (Figma: Success-Card / payment failed). */
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
