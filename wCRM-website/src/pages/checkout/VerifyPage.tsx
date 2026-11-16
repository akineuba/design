import { useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@ds';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { CheckoutFormCard, FormHeader } from '../../checkout/CheckoutForm';
import { useCheckout } from '../../checkout/CheckoutContext';
import { SiteButton } from '../../components/SiteButton';

const LENGTH = 6;

/** Step 3 (Figma `otp-verification`, 372:3189): six one-digit cells with paste and backspace support. */
export function VerifyPage() {
  const navigate = useNavigate();
  const { email, completeStep } = useCheckout();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const cells = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (i: number) => cells.current[Math.max(0, Math.min(LENGTH - 1, i))]?.focus();

  const fill = (start: number, value: string) => {
    const chars = value.replace(/\D/g, '').slice(0, LENGTH - start).split('');
    if (!chars.length) return;
    setDigits((d) => d.map((v, i) => (i >= start && i < start + chars.length ? chars[i - start] : v)));
    setError('');
    focus(start + chars.length);
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i]) {
      e.preventDefault();
      setDigits((d) => d.map((v, j) => (j === i - 1 ? '' : v)));
      focus(i - 1);
    } else if (e.key === 'ArrowLeft') focus(i - 1);
    else if (e.key === 'ArrowRight') focus(i + 1);
  };

  const onPaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fill(i, e.clipboardData.getData('text'));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (digits.join('').length < LENGTH) {
      setError('Enter all 6 digits of the code.');
      focus(digits.findIndex((d) => !d));
      return;
    }
    completeStep(3);
    navigate('/checkout/company');
  };

  return (
    <CheckoutLayout step={3} backTo="/checkout/account">
      <CheckoutFormCard gap="gap-8" onSubmit={submit}>
        <FormHeader eyebrow="Verify your email" title="Enter verification code">
          We sent a 6-digit code to {email ? <strong className="font-semibold text-site-heading">{email}</strong> : 'your email address'}. Enter it below to verify your account.
        </FormHeader>
        <div className="flex flex-col items-center gap-4">
          <fieldset className="flex w-full justify-center gap-3">
            <legend className="sr-only">Verification code</legend>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (cells.current[i] = el)}
                value={d}
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                aria-invalid={!!error && !d}
                autoFocus={i === 0}
                onChange={(e) => (e.target.value ? fill(i, e.target.value.slice(-1)) : setDigits((v) => v.map((x, j) => (j === i ? '' : x))))}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={(e) => onPaste(i, e)}
                className={cn(
                  'size-16 rounded-md border bg-surface-default text-center text-heading-xl text-site-heading caret-text-muted',
                  'border-border-default focus:border-2 focus:border-site-heading focus:outline-none aria-[invalid=true]:border-status-danger',
                )}
              />
            ))}
          </fieldset>
          {error && <p role="alert" className="text-caption text-status-danger">{error}</p>}
          <p className="flex gap-1 pt-2 text-body" aria-live="polite">
            {resent ? (
              <span className="text-site-discount">A new code is on its way.</span>
            ) : (
              <>
                <span className="text-text-tertiary">Didn&apos;t receive the code?</span>
                <button type="button" onClick={() => setResent(true)} className="rounded-xs font-semibold text-text-link-blue underline focus-visible:outline-none focus-visible:shadow-focus">
                  Resend
                </button>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <SiteButton type="submit" variant="checkout">
            Verify <span aria-hidden="true">→</span>
          </SiteButton>
          <p className="text-center text-caption-sm text-text-tertiary">Your checkout will be linked to this account.</p>
        </div>
      </CheckoutFormCard>
    </CheckoutLayout>
  );
}
