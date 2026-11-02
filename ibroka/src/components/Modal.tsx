import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon, AlertIcon } from '../icons';

export interface ModalPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned action row. Cancel (outline) first, primary action last (UI rule 12). */
  footer?: ReactNode;
  onClose?: () => void;
  /** md 515px (forms, confirmations), lg 820px (document previews). */
  size?: 'md' | 'lg';
  /** Red icon in the header, for destructive confirmations. */
  tone?: 'default' | 'danger';
  titleId?: string;
  descriptionId?: string;
}

/** Dialog body without the overlay, for embedding in docs. */
export function ModalPanel({ title, description, footer, onClose, size = 'md', tone = 'default', titleId, descriptionId, className, children, ...rest }: ModalPanelProps) {
  return (
    <div className={cx('flex max-w-full flex-col gap-5 rounded-xl bg-surface p-6 shadow-dialog', size === 'lg' ? 'w-dialog-lg' : 'w-dialog', className)} {...rest}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3.5">
          {tone === 'danger' && (
            <span className="inline-flex size-tile shrink-0 items-center justify-center rounded-full bg-danger-subtle text-danger" aria-hidden>
              <span className="size-icon">
                <AlertIcon />
              </span>
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id={titleId} className="text-20 font-bold text-fg-strong">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-13 text-fg-muted">
                {description}
              </p>
            )}
          </div>
        </div>
        {onClose && (
          <button type="button" aria-label="Close" onClick={onClose} className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-surface-muted ib-focus">
            <span className="size-icon">
              <CloseIcon />
            </span>
          </button>
        )}
      </div>
      {children && <div className="flex flex-col gap-4">{children}</div>}
      {footer && <div className="flex flex-wrap justify-end gap-2.5">{footer}</div>}
    </div>
  );
}

export interface ModalProps extends ModalPanelProps {
  open: boolean;
  onClose: () => void;
  /** Set false while a form has unsaved changes. */
  closeOnBackdrop?: boolean;
}

/**
 * Centred dialog on the native <dialog>: focus is trapped, Escape closes it and focus returns to the
 * trigger (UI rules 7 and 10). Use for quick-add, confirmations and previews; records open in SidePanel.
 */
export function Modal({ open, onClose, closeOnBackdrop = true, ...panel }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.querySelector<HTMLElement>('input:not([type=hidden]):not([disabled]), textarea, [role=combobox]')?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-t`}
      aria-describedby={panel.description ? `${id}-d` : undefined}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => closeOnBackdrop && e.target === e.currentTarget && onClose()}
      className="m-auto max-w-full bg-transparent p-4 open:animate-fade-in"
    >
      <ModalPanel {...panel} onClose={onClose} titleId={`${id}-t`} descriptionId={`${id}-d`} />
    </dialog>
  );
}
