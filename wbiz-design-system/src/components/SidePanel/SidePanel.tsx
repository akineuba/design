import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldLabelContext } from '../../utils/field-label';
import { CloseIcon } from '../../icons';

export type SidePanelSize = 'sm' | 'md' | 'lg';

const widths: Record<SidePanelSize, string> = { sm: 'w-panel-sm', md: 'w-panel-md', lg: 'w-panel-lg' };

export interface SidePanelContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Action row at the bottom right. Figma: Cancel (outline) then Save / Publish / Edit (primary). */
  footer?: ReactNode;
  /** sm 435px (New Account, Tax, Budget), md 541px (Customer, Project), lg 562px (Vendor, Employee). */
  size?: SidePanelSize;
  /** Shows a close (×) button by the title. Figma panels rely on Cancel, so this is off by default. */
  onClose?: () => void;
  titleId?: string;
}

/**
 * Panel layout without the overlay, for embedding or documenting. Figma: Create customer (accounting
 * 209:4142), Create COA (1871:19941), Create Vendor (254:5423), Create employee (hr 4306:39199):
 * white, full height, 30px padding, title Inter Semibold 24 black, 20px between sections, actions
 * right-aligned with 20px between them. Fields inside use the accounting form label style.
 */
export function SidePanelContent({ title, description, footer, size = 'md', onClose, titleId, className, children, ...rest }: SidePanelContentProps) {
  return (
    <FieldLabelContext.Provider value="form">
      <div className={cx('flex h-full max-w-full flex-col bg-surface', widths[size], className)} {...rest}>
        <div className="flex items-start justify-between gap-4 px-7.5 pb-5 pt-7.5">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id={titleId} className="font-sans text-xl font-semibold text-fg-black">{title}</h2>
            {description && <p className="font-sans text-sm text-fg-muted">{description}</p>}
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
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-7.5 pb-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-5 px-7.5 pb-7.5 pt-2.5">{footer}</div>}
      </div>
    </FieldLabelContext.Provider>
  );
}

export interface SidePanelProps extends Omit<SidePanelContentProps, 'titleId' | 'onClose'> {
  open: boolean;
  /** Called on Escape and backdrop click. Wire your Cancel button to it too. */
  onClose: () => void;
  /** Adds the × button by the title. */
  showClose?: boolean;
  /** Set false while a form has unsaved changes you want to protect. */
  closeOnBackdrop?: boolean;
}

/**
 * Right-hand panel for create, edit and view flows (New Customer, New Account, New Vendor, Edit
 * Employee…). Built on the native <dialog>: focus is trapped, Escape closes it and focus returns to
 * the trigger. Slides in from the right; the backdrop is derived.
 */
export function SidePanel({ open, onClose, showClose = false, closeOnBackdrop = true, ...content }: SidePanelProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}
      className="m-0 ml-auto h-full max-h-full max-w-full bg-transparent p-0 backdrop:bg-overlay open:animate-slide-in-right"
    >
      <SidePanelContent {...content} onClose={showClose ? onClose : undefined} titleId={`${id}-title`} className={cx('shadow-dialog', content.className)} />
    </dialog>
  );
}
