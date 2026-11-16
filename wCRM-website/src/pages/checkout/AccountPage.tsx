import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import checkboxCheck from '../../assets/checkout/checkbox-check.svg';
import google from '../../assets/checkout/google.svg';
import microsoft from '../../assets/checkout/microsoft.svg';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { CheckoutFormCard, CheckoutInput, FormHeader } from '../../checkout/CheckoutForm';
import { EmailSentDialog } from '../../checkout/EmailSentDialog';
import { useCheckout } from '../../checkout/CheckoutContext';
import { SiteButton } from '../../components/SiteButton';

const ssoButton =
  'flex w-full items-center justify-center gap-2.5 rounded-md border border-border-default bg-surface-default py-3 text-label text-site-heading hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus';

/** Step 2 (Figma `wcrm-create-account`, 372:2542). */
export function AccountPage() {
  const navigate = useNavigate();
  const { email, setEmail, completeStep } = useCheckout();
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; terms?: string }>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const t = window.setTimeout(() => {
      completeStep(2);
      navigate('/checkout/verify');
    }, 1800);
    return () => window.clearTimeout(t);
  }, [sent, completeStep, navigate]);

  const termsError = agreed ? undefined : 'Agree to the terms to continue.';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      email: !email.trim() ? 'Enter your work email.' : /^\S+@\S+\.\S+$/.test(email) ? undefined : 'Enter an email address like admin@company.com.',
      terms: termsError,
    };
    setErrors(next);
    if (!next.email && !next.terms) setSent(true);
  };

  /** No identity provider is wired up yet: single sign-on skips straight past email verification. */
  const sso = () => {
    if (termsError) return setErrors({ terms: termsError });
    completeStep(3);
    navigate('/checkout/company');
  };

  return (
    <CheckoutLayout step={2} backTo="/checkout/configure">
      <CheckoutFormCard onSubmit={submit}>
        <FormHeader eyebrow="Your account" title="Create your account">
          We will email you a secure sign-in link. You can complete checkout now and set your password later.
        </FormHeader>
        <CheckoutInput
          label="Work email address"
          type="email"
          autoComplete="email"
          placeholder="admin@company.com"
          placeholderTone="muted"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <SiteButton type="submit" variant="checkout">
          Continue <span aria-hidden="true">→</span>
        </SiteButton>
        <div className="flex items-center gap-4" role="separator" aria-label="or">
          <span className="h-px flex-1 bg-border-default" />
          <span className="text-caption text-site-on-dark-muted">or</span>
          <span className="h-px flex-1 bg-border-default" />
        </div>
        <div className="flex flex-col gap-6">
          <button type="button" className={ssoButton} onClick={sso}>
            <img src={google} alt="" className="size-6" />
            Continue with Google
          </button>
          <button type="button" className={ssoButton} onClick={sso}>
            <img src={microsoft} alt="" className="size-4" />
            Continue with Microsoft
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-2 text-body-sm text-site-heading">
            <RadixCheckbox.Root
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              aria-invalid={!!errors.terms}
              className="flex size-4 shrink-0 items-center justify-center rounded-xs border border-border-strong bg-surface-default data-[state=checked]:border-status-connected data-[state=checked]:bg-status-connected focus-visible:outline-none focus-visible:shadow-focus"
            >
              <RadixCheckbox.Indicator>
                <img src={checkboxCheck} alt="" className="size-2.5" />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            I agree to the terms of service and privacy notice.
          </label>
          {errors.terms && <p className="text-caption text-status-danger">{errors.terms}</p>}
        </div>
        <p className="text-center text-caption-sm text-text-tertiary">Your checkout will be linked to this account.</p>
      </CheckoutFormCard>
      <EmailSentDialog open={sent} onOpenChange={setSent} />
    </CheckoutLayout>
  );
}
