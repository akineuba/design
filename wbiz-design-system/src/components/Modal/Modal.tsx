import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CloseIcon } from '../../icons';

export interface ModalPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Action row, right-aligned. Put the primary action last. */
  footer?: ReactNode;
  /** Shows a close (×) button in the header. */
  onClose?: () => void;
  titleId?: string;
  descriptionId?: string;
}

/**
 * Dialog layout without the overlay, for embedding or documenting. Figma: tax popup (accounting,
 * 3564:23503): white, 8px radius, 20/24 padding, 20px gaps, title Inter Semibold 24, actions on the right.
 */
export function ModalPanel({ title, description, footer, onClose, titleId, descriptionId, className, children, ...rest }: ModalPanelProps) {
  return (
    <div className={cx('flex w-dialog max-w-full flex-col gap-5 rounded-lg bg-surface px-6 py-5 shadow-dialog', className)} {...rest}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={titleId} className="font-sans text-xl font-semibold text-fg-strong">{title}</h2>
          {description && <p id={descriptionId} className="font-sans text-sm text-fg-muted">{description}</p>}
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-control-xs shrink-0 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-muted focus-visible:outline-none focus-visible:shadow-focus"
          >
            <span className="size-icon"><CloseIcon /></span>
          </button>
        )}
      </div>
      {children && <div className="flex flex-col gap-4">{children}</div>}
      {footer && <div className="flex flex-wrap justify-end gap-3">{footer}</div>}
    </div>
  );
}

export interface ModalProps extends Omit<ModalPanelProps, 'titleId' | 'descriptionId' | 'onClose'> {
  open: boolean;
  /** Called on Escape, backdrop click and the close button. */
  onClose: () => void;
  /** Set false for flows that must be finished or cancelled explicitly. */
  closeOnBackdrop?: boolean;
}

/**
 * Modal dialog on the native <dialog> element: focus is trapped, Escape closes it and focus returns to
 * the trigger. The backdrop is derived; Figma shows the dialog without one.
 */
export function Modal({ open, onClose, closeOnBackdrop = true, ...panel }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      // Start in the first form field (quick-add) rather than on the close button.
      el.querySelector<HTMLElement>('input:not([type=hidden]):not([disabled]), textarea, [role=combobox]')?.focus();
    }
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={panel.description ? `${id}-desc` : undefined}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}
      className="m-auto max-w-full bg-transparent p-4 backdrop:bg-overlay"
    >
      <ModalPanel {...panel} onClose={onClose} titleId={`${id}-title`} descriptionId={`${id}-desc`} />
    </dialog>
  );
}
