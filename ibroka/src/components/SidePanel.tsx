import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon } from '../icons';
import { FieldSizeContext } from './Field';

export interface SidePanelContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Sticky action row at the bottom right: Cancel (outline) then Save (primary). */
  footer?: ReactNode;
  /** sm 435px (single-column forms), md 541px (clients, contacts), lg 562px (two-column forms, policies). */
  size?: 'sm' | 'md' | 'lg';
  onClose?: () => void;
  /** Right of the title: status pill or Edit button in view mode. */
  headerAddon?: ReactNode;
  titleId?: string;
}

export function SidePanelContent({ title, description, footer, size = 'md', onClose, headerAddon, titleId, className, children, ...rest }: SidePanelContentProps) {
  const w = { sm: 'w-panel-sm', md: 'w-panel-md', lg: 'w-panel-lg' }[size];
  return (
    <FieldSizeContext.Provider value="form">
      <div className={cx('flex h-full max-w-full flex-col bg-surface', w, className)} {...rest}>
        <div className="flex items-start justify-between gap-4 border-b border-line-subtle px-7.5 pb-5 pt-7.5">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 id={titleId} className="text-20 font-bold text-fg-strong">
                {title}
              </h2>
              {headerAddon}
            </div>
            {description && <p className="text-13 text-fg-muted">{description}</p>}
          </div>
          {onClose && (
            <button type="button" aria-label="Close" onClick={onClose} className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted ib-focus">
              <span className="size-icon">
                <CloseIcon />
              </span>
            </button>
          )}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-7.5 py-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2.5 border-t border-line-subtle px-7.5 py-5">{footer}</div>}
      </div>
    </FieldSizeContext.Provider>
  );
}

export interface SidePanelProps extends SidePanelContentProps {
  open: boolean;
  onClose: () => void;
  closeOnBackdrop?: boolean;
}

/**
 * Right-hand panel for creating, viewing and editing a record over its list (UI rules 2, 3, 6).
 * Native <dialog>: focus trapped, Escape closes, focus returns to the trigger.
 */
export function SidePanel({ open, onClose, closeOnBackdrop = true, ...content }: SidePanelProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-t`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => closeOnBackdrop && e.target === e.currentTarget && onClose()}
      className="m-0 ml-auto h-full max-h-full max-w-full bg-transparent p-0 open:animate-slide-in-right"
    >
      <SidePanelContent {...content} onClose={onClose} titleId={`${id}-t`} className={cx('shadow-dialog', content.className)} />
    </dialog>
  );
}
