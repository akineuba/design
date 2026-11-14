import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id?: string;
  tone?: ToastTone;
  /** Short past-tense message: "Client saved", "Policy deleted". */
  title: string;
  description?: ReactNode;
  /** One follow-up, usually Undo or View. */
  action?: { label: string; onClick: () => void };
  /** ms before it hides. Errors stay until closed. Default 5000. */
  duration?: number;
}

const toneCls: Record<ToastTone, { icon: ReactNode; cls: string }> = {
  success: { icon: <SuccessIcon />, cls: 'text-success' },
  error: { icon: <ErrorIcon />, cls: 'text-danger' },
  warning: { icon: <WarningIcon />, cls: 'text-warning' },
  info: { icon: <InfoIcon />, cls: 'text-info' },
};

/** One toast. Use `useToast()` in screens; render this directly only for documentation. */
export function Toast({ tone = 'success', title, description, action, onClose }: ToastData & { onClose?: () => void }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className="pointer-events-auto flex w-[360px] max-w-[calc(100vw-32px)] animate-fade-in items-start gap-3 rounded-lg border border-line-subtle bg-surface p-4 shadow-pop"
    >
      <span className={cx('size-icon shrink-0', toneCls[tone].cls)} aria-hidden>
        {toneCls[tone].icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-13 font-semibold text-fg-strong">{title}</p>
        {description && <p className="text-13 text-fg-muted">{description}</p>}
        {action && (
          <button type="button" onClick={action.onClick} className="mt-1 w-fit rounded text-13 font-semibold text-primary hover:underline ib-focus">
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose} className="inline-flex size-6 shrink-0 items-center justify-center rounded text-fg-muted hover:bg-surface-muted ib-focus">
          <span className="size-icon-sm">
            <CloseIcon />
          </span>
        </button>
      )}
    </div>
  );
}

const ToastCtx = createContext<(t: ToastData) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

function AutoHide({ t, remove }: { t: Required<Pick<ToastData, 'id'>> & ToastData; remove: (id: string) => void }) {
  useEffect(() => {
    if (t.tone === 'error') return;
    const h = setTimeout(() => remove(t.id), t.duration ?? 5000);
    return () => clearTimeout(h);
  }, [t, remove]);
  return <Toast {...t} onClose={() => remove(t.id)} />;
}

/** Wrap the app once. Toasts stack bottom-right, newest at the bottom (wBiz proposal B4, now a rule). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Array<ToastData & { id: string }>>([]);
  const remove = useCallback((id: string) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const push = useCallback((t: ToastData) => setItems((xs) => [...xs.slice(-2), { ...t, id: t.id ?? Math.random().toString(36).slice(2) }]), []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2.5">
        {items.map((t) => (
          <AutoHide key={t.id} t={t} remove={remove} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
