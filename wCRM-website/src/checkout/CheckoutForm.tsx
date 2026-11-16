import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@ds';
import chevron from '../assets/checkout/select-chevron.svg';

/** Centered form card (Figma `Form-Centering-Container` › `Form-Card`, 372:2581). */
export function CheckoutFormCard({ children, gap = 'gap-6', onSubmit }: { children: ReactNode; gap?: 'gap-6' | 'gap-8'; onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="flex flex-col items-center pb-20 pt-4">
      <form noValidate onSubmit={onSubmit} className={cn('flex w-site-checkout-main flex-col rounded-xl border border-border-default bg-surface-default p-10 shadow-site-checkout', gap)}>
        {children}
      </form>
    </div>
  );
}

export function FormHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-label-sm font-bold uppercase text-brand-primary">{eyebrow}</p>
      <h1 className="font-display text-site-title text-site-heading">{title}</h1>
      <p className="text-site-body-lg leading-site-22 text-text-tertiary">{children}</p>
    </header>
  );
}

const box =
  'w-full rounded-sm border border-border-default bg-surface-default px-3.5 text-body text-site-heading ' +
  'focus-visible:border-accent-navy focus-visible:outline-none focus-visible:shadow-focus aria-[invalid=true]:border-status-danger';

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="flex gap-1.5 text-label text-site-heading">
        {label}
        {required && <span aria-hidden="true" className="text-brand-primary">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-caption text-status-danger">{error}</p>}
    </div>
  );
}

type Common = { label: string; error?: string; required?: boolean; placeholderTone?: 'muted' | 'tertiary' | 'on-dark' };
const placeholderTone = { muted: 'placeholder:text-text-muted', tertiary: 'placeholder:text-text-tertiary', 'on-dark': 'placeholder:text-site-on-dark-muted' };
const aria = (id: string, error?: string) => ({ 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-error` : undefined });

export function CheckoutInput({ label, error, required, placeholderTone: tone = 'tertiary', className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} required={required} error={error}>
      <input id={id} {...aria(id, error)} className={cn(box, 'h-control-md', placeholderTone[tone], className)} {...rest} />
    </Field>
  );
}

export function CheckoutSelect({ label, error, required, children, ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} required={required} error={error}>
      <div className="relative">
        <select id={id} {...aria(id, error)} className={cn(box, 'h-control-md appearance-none pr-8')} {...rest}>
          {children}
        </select>
        <img src={chevron} alt="" className="pointer-events-none absolute right-3.5 top-1/2 size-3 -translate-y-1/2" />
      </div>
    </Field>
  );
}

export function CheckoutTextarea({ label, error, required, placeholderTone: tone = 'on-dark', ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} required={required} error={error}>
      <textarea id={id} {...aria(id, error)} className={cn(box, 'h-site-textarea resize-none p-3', placeholderTone[tone])} {...rest} />
    </Field>
  );
}
