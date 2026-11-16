import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@ds';
import selectArrow from '../assets/contact/select-arrow.svg';

/** Contact-form field box (Figma 231:1110): #CBD5E1 outline, radius 8, 14/10 inset. */
const box =
  'w-full rounded-md border border-border-strong bg-surface-default px-3.5 py-2.5 text-body text-text-strong placeholder:text-text-tertiary ' +
  'focus-visible:border-accent-navy focus-visible:outline-none focus-visible:shadow-focus aria-[invalid=true]:border-status-danger';

function Wrapper({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-label-sm text-site-label">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="animate-value-in text-caption text-status-danger">{error}</p>}
    </div>
  );
}

type Common = { label: string; error?: string };

export function ContactInput({ label, error, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error}>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={cn(box, className)} {...rest} />
    </Wrapper>
  );
}

export function ContactSelect({ label, error, children, ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error}>
      <div className="relative">
        <select id={id} aria-invalid={!!error} className={cn(box, 'appearance-none pr-10 invalid:text-text-tertiary')} {...rest}>
          {children}
        </select>
        <img src={selectArrow} alt="" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2" />
      </div>
    </Wrapper>
  );
}

export function ContactTextarea({ label, error, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error}>
      <textarea id={id} aria-invalid={!!error} className={cn(box, 'h-site-textarea resize-none py-3 leading-site-20')} {...rest} />
    </Wrapper>
  );
}
