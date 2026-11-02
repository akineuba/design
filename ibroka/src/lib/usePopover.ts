import { useCallback, useEffect, useRef, useState } from 'react';

/** Open/close state for dropdowns: closes on outside click and Escape, and returns focus to the trigger. */
export function usePopover<T extends HTMLElement = HTMLDivElement>(initial = false) {
  const [open, setOpen] = useState(initial);
  const rootRef = useRef<T | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return { open, setOpen, close, rootRef, triggerRef, toggle: () => setOpen((o) => !o) };
}
