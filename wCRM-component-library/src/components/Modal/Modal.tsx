import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { focusFirstField } from '../../utils/focus';
import { Button } from '../Button';

export const Modal = RadixDialog.Root;
export const ModalTrigger = RadixDialog.Trigger;
export const ModalClose = RadixDialog.Close;

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

export interface ModalContentProps extends Omit<ComponentPropsWithoutRef<typeof RadixDialog.Content>, 'title'> {
  title: ReactNode;
  /** Optional sentence under the title; also used as the dialog's accessible description. */
  description?: ReactNode;
  /** sm 400 (confirm, pickers) · md 560 (forms) · lg 720 (previews). */
  size?: 'sm' | 'md' | 'lg';
  /** Footer actions, right-aligned on a top border. */
  footer?: ReactNode;
  hideClose?: boolean;
}

const widths = { sm: 'w-modal-sm', md: 'w-modal-md', lg: 'w-modal-lg' };

/** Centred dialog (Figma `Move To New Audience - Modal`, mobile "Delete 3 contacts?"). Traps focus, closes on Esc and overlay click. */
export const ModalContent = forwardRef<ElementRef<typeof RadixDialog.Content>, ModalContentProps>(function ModalContent(
  { title, description, size = 'sm', footer, hideClose, className, children, onOpenAutoFocus = focusFirstField, ...rest },
  ref,
) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-surface-overlay data-[state=open]:animate-fade-in" />
      <RadixDialog.Content
        ref={ref}
        onOpenAutoFocus={onOpenAutoFocus}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 flex max-h-screen max-w-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-border-default bg-surface-default shadow-modal',
          'focus-visible:outline-none data-[state=open]:animate-pop-in',
          widths[size],
          className,
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-default px-5 pb-4 pt-5">
          <div className="flex flex-col gap-1">
            <RadixDialog.Title className="text-heading-2 text-text-strong">{title}</RadixDialog.Title>
            {description ? (
              <RadixDialog.Description className="text-body-sm text-text-secondary">{description}</RadixDialog.Description>
            ) : (
              <RadixDialog.Description className="sr-only">{typeof title === 'string' ? title : 'Dialog'}</RadixDialog.Description>
            )}
          </div>
          {!hideClose && (
            <RadixDialog.Close aria-label="Close" className="-mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-text-strong hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus">
              <CloseIcon />
            </RadixDialog.Close>
          )}
        </div>
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-border-default px-5 py-4">{footer}</div>}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
}

/** Ready-made confirmation: "Delete 3 contacts?", "Mark task as complete?". */
export function ConfirmDialog({ open, onOpenChange, trigger, title, description, confirmLabel, cancelLabel = 'Cancel', loading, onConfirm }: ConfirmDialogProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent
        role="alertdialog"
        title={title}
        description={description}
        footer={
          <>
            <ModalClose asChild>
              <Button variant="outline">{cancelLabel}</Button>
            </ModalClose>
            <Button loading={loading} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </>
        }
      />
    </Modal>
  );
}
