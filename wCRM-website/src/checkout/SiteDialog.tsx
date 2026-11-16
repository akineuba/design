import * as RadixDialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { Modal, ModalClose, cn } from '@ds';
import { focusFirstField } from '@ds/utils/focus';
import closeX from '../assets/checkout/close-x.svg';

export { Modal as SiteDialogRoot, ModalClose as SiteDialogClose };

/**
 * Dialog surface for the checkout modals. Behaviour (focus trap, Esc, overlay click) comes from the
 * design-system Modal (Radix Dialog); the layout follows the website frames, which the DS ModalContent does not draw.
 */
export function SiteDialogContent({
  children,
  className,
  label,
  description,
  showClose = false,
}: {
  children: ReactNode;
  className?: string;
  /** Accessible name when the visible title is not a RadixDialog.Title. */
  label?: string;
  description?: string;
  showClose?: boolean;
}) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-surface-overlay data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      {/*
        Content is a transparent full-screen layer that centres the card with flexbox, so the card's scale animation
        never fights a centring transform. Clicks pass through it to the overlay, which still closes the dialog.
      */}
      <RadixDialog.Content
        aria-label={label}
        {...(description ? {} : { 'aria-describedby': undefined })}
        onOpenAutoFocus={focusFirstField}
        className="group pointer-events-none fixed inset-0 z-50 flex items-center justify-center focus-visible:outline-none data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
      >
        <div
          className={cn(
            'pointer-events-auto relative flex max-h-screen max-w-full flex-col overflow-y-auto rounded-xl border border-border-default bg-surface-default',
            'group-data-[state=closed]:animate-pop-out group-data-[state=open]:animate-pop-in',
            className,
          )}
        >
          {description && <RadixDialog.Description className="sr-only">{description}</RadixDialog.Description>}
          {children}
          {showClose && <DialogCloseButton className="absolute right-5.75 top-5.75" />}
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export function DialogCloseButton({ className }: { className?: string }) {
  return (
    <RadixDialog.Close
      aria-label="Close"
      className={cn('flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus', className)}
    >
      <img src={closeX} alt="" className="size-4" />
    </RadixDialog.Close>
  );
}

export const SiteDialogTitle = RadixDialog.Title;
