import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { CheckChip } from '../components/CheckChip';
import { ContactInput, ContactSelect, ContactTextarea } from '../components/ContactField';
import { siteButtonClass } from '../components/SiteButton';
import clock from '../assets/contact/clock.svg';
import thumbsUp from '../assets/contact/thumbs-up.png';

const BENEFITS = [
  'Tailored CRM workflows adapted to your processes',
  'Custom integrations with your existing tools',
  'Dedicated account manager and SLA-backed support',
];

const USER_RANGES = ['1–10 users', '11–50 users', '51–200 users', '201–500 users', '500+ users'];

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'company', string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get('firstName') ?? '').trim()) errors.firstName = 'Enter your first name.';
  if (!String(data.get('lastName') ?? '').trim()) errors.lastName = 'Enter your last name.';
  const email = String(data.get('email') ?? '').trim();
  if (!email) errors.email = 'Enter your work email.';
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter an email address like jane@company.com.';
  if (!String(data.get('company') ?? '').trim()) errors.company = 'Enter your company name.';
  return errors;
}

function ContactForm({ onSent }: { onSent: () => void }) {
  const [params] = useSearchParams();
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(new FormData(e.currentTarget));
    setErrors(found);
    if (Object.keys(found).length === 0) onSent();
    else e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  };

  return (
    <form noValidate onSubmit={submit} className="flex h-site-contact-form-h w-site-contact-form shrink-0 flex-col gap-7 rounded-xl border border-border-default bg-surface-default p-10 shadow-site-plan">
      <h2 className="font-display text-heading-xl text-text-strong">Get in touch</h2>
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto border-b border-border-strong pb-5 pr-2">
        <div className="flex gap-4">
          <ContactInput label="First name" name="firstName" placeholder="Jane" autoComplete="given-name" error={errors.firstName} />
          <ContactInput label="Last name" name="lastName" placeholder="Doe" autoComplete="family-name" error={errors.lastName} />
        </div>
        <ContactInput label="Work email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" defaultValue={params.get('email') ?? ''} error={errors.email} />
        <ContactInput label="Company name" name="company" placeholder="Acme Corporation" autoComplete="organization" error={errors.company} />
        <ContactInput label="Job title" name="jobTitle" placeholder="e.g. Director of Operations" autoComplete="organization-title" />
        <ContactInput label="Phone number" name="phone" type="tel" placeholder="+234 (0) ___ ___ ____" autoComplete="tel" />
        <ContactSelect label="Number of users" name="users" defaultValue="" required>
          <option value="" disabled>Select range</option>
          {USER_RANGES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </ContactSelect>
        <ContactTextarea label="Tell us about your needs" name="needs" placeholder="What processes or tools would you like to integrate? Let us know here..." />
      </div>
      <div className="flex flex-col items-center gap-4">
        <button type="submit" className={siteButtonClass('plan', 'px-6 text-site-body-lg font-semibold')}>
          Submit request
        </button>
        <p className="text-caption text-text-tertiary">By submitting, you agree to our Privacy Policy</p>
      </div>
    </form>
  );
}

function RequestSent() {
  return (
    <div role="status" className="flex h-site-contact-form-h w-site-contact-form shrink-0 flex-col items-center gap-7 rounded-xl border border-border-default bg-surface-default p-10 shadow-site-plan">
      <img src={thumbsUp} alt="" className="size-site-thumbs-up object-cover" />
      <p className="w-full text-center font-display text-site-title leading-site-52 text-site-red">Request sent!</p>
      <p className="text-site-lead leading-site-24 text-text-tertiary">
        Keep an eye on your inbox — our team will review your submission and follow up with tailored feedback shortly.
      </p>
    </div>
  );
}

/** Contact sales (Figma `crm-contact-sales` 231:1058, sent state 367:10351). */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <SiteHeader />
      <main className="flex items-start justify-between bg-surface-subtle px-50 py-20">
        <div className="flex w-site-contact-copy flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-site-title leading-site-52 text-text-strong">Let&apos;s build your perfect CRM</h1>
            <p className="text-site-lead leading-site-24 text-text-tertiary">
              Tell us about your organisation and work flows. Our team will design a CRM configuration tailored to your processes, integrations and scale.
            </p>
          </div>
          <ul className="flex flex-col gap-4.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckChip />
                <span className="flex-1 text-site-body-lg leading-site-22 text-site-label">{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 border-t border-border-default pt-4">
            <p className="flex items-center gap-2 text-body-sm text-text-tertiary">
              <img src={clock} alt="" className="size-4" />
              Typically responded to within 1 business day
            </p>
          </div>
        </div>
        {sent ? <RequestSent /> : <ContactForm onSent={() => setSent(true)} />}
      </main>
      <SiteFooter />
    </>
  );
}
