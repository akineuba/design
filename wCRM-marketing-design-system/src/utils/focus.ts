/**
 * Radix focuses the first focusable element when a dialog or popover opens, which is usually the close
 * button and shows its focus ring. Move focus to the first form field instead, or to the panel itself.
 * Pass as `onOpenAutoFocus`.
 */
export function focusFirstField(event: Event): void {
  const panel = event.currentTarget as HTMLElement | null;
  if (!panel) return;
  event.preventDefault();
  const field = panel.querySelector<HTMLElement>(
    'input:not([type=hidden]):not([disabled]):not([aria-hidden=true]), textarea:not([disabled]), [role=combobox]:not([disabled])',
  );
  (field ?? panel).focus();
}
