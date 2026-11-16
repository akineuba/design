import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@ds';
import payCard from '../../assets/checkout/pay-card.svg';
import payWallet from '../../assets/checkout/pay-wallet.svg';
import payBank from '../../assets/checkout/pay-bank.svg';
import payQr from '../../assets/checkout/pay-qr.svg';
import payUssd from '../../assets/checkout/pay-ussd.svg';
import payShield from '../../assets/checkout/pay-shield.svg';
import chevronRight from '../../assets/checkout/chevron-right.svg';
import arrowLeftGreen from '../../assets/checkout/arrow-left-green.svg';
import lock from '../../assets/checkout/lock.svg';
import info from '../../assets/checkout/info.svg';
import copy from '../../assets/checkout/copy.svg';
import successTick from '../../assets/checkout/success-tick.svg';
import { CheckoutLayout } from '../../checkout/CheckoutLayout';
import { OrderSummary } from '../../checkout/OrderSummary';
import { EditOrganisationsDialog } from '../../checkout/EditOrganisationsDialog';
import { formatNaira, formatNgn, mainPlanOf, useCheckout } from '../../checkout/CheckoutContext';
import { SiteDialogContent, SiteDialogRoot, SiteDialogTitle } from '../../checkout/SiteDialog';
import { SiteButton } from '../../components/SiteButton';

type Method = 'card' | 'quickteller' | 'transfer' | 'qr' | 'ussd' | 'wallet';

/** Payment options (Figma `methods-list`, 372:2825). Card is drawn highlighted as the default choice. */
const METHODS: { id: Method; title: string; body: string; icon: string }[] = [
  { id: 'card', title: 'Pay with Card', body: 'Verve, Visa, Mastercard, Discover and Amex cards are all accepted', icon: payCard },
  { id: 'quickteller', title: 'Pay with Quickteller', body: 'Login to your quickteller wallet to get access to your saved cards', icon: payWallet },
  { id: 'transfer', title: 'Pay with Bank Transfer', body: 'Make a transfer directly from your bank account to complete a transaction', icon: payBank },
  { id: 'qr', title: 'Pay with QR', body: 'Generate a QR code you can scan with your bank app to pay', icon: payQr },
  { id: 'ussd', title: 'Pay with USSD', body: 'Dial a USSD string from any of 17+ banks to complete a transaction', icon: payUssd },
  { id: 'wallet', title: 'Pay with Wallet', body: 'Make secure payments using third-party payment solutions', icon: payShield },
];

/** Every payment view slides in as the buyer moves between the method list and a method. */
const paymentCard = 'flex min-w-0 flex-1 animate-swap-in flex-col rounded-site-24 bg-surface-default p-8 shadow-site-payment';

function Headline({ title, children }: { title: string; children: ReactNode }) {
  return (
    <header className="flex flex-col gap-1.5">
      <h1 className="text-kpi-value text-text-charcoal">{title}</h1>
      <p className="text-body-sm text-text-secondary">{children}</p>
    </header>
  );
}

function BackToMethods({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" onClick={onBack} className="flex items-center gap-2 self-start rounded-xs text-label text-status-connected hover:underline focus-visible:outline-none focus-visible:shadow-focus">
      <img src={arrowLeftGreen} alt="" className="size-4" />
      Change payment method
    </button>
  );
}

function MethodList({ onPick }: { onPick: (m: Method) => void }) {
  return (
    <section className={cn(paymentCard, "self-start", 'gap-6')}>
      <Headline title="Select Payment Method">Choose an option below to complete your secure payment.</Headline>
      <ul className="flex flex-col gap-1">
        {METHODS.map((m) => {
          const featured = m.id === 'card';
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onPick(m.id)}
                className={cn(
                  'group flex w-full items-center gap-4 rounded-lg border p-4 text-left focus-visible:outline-none focus-visible:shadow-focus',
                  featured ? 'border-status-connected bg-badge-success-tint' : 'border-transparent hover:bg-surface-subtle',
                )}
              >
                <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-callout', featured ? 'bg-status-connected' : 'bg-badge-success-tint')}>
                  <img src={m.icon} alt="" className="size-5.5" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-site-body-lg font-semibold text-text-charcoal">{m.title}</span>
                  <span className="text-caption leading-140 text-text-secondary">{m.body}</span>
                </span>
                <img src={chevronRight} alt="" className="size-4 transition-transform duration-base ease-standard group-hover:translate-x-1" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const cardField = 'flex flex-col gap-1 rounded-lg border border-border-default bg-surface-subtle px-4 py-3 focus-within:border-status-connected focus-within:shadow-focus';
const cardLabel = 'text-caption-sm font-semibold uppercase text-text-secondary';
const cardInput = 'w-full min-w-0 bg-transparent text-site-lead font-medium text-text-charcoal placeholder:text-text-faint focus-visible:outline-none';

const groupDigits = (v: string) => v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

function CardForm({ onBack, onPaid }: { onBack: () => void; onPaid: (last4: string) => void }) {
  const { totals } = useCheckout();
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const digits = number.replace(/\D/g, '');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const [mm] = expiry.split(' / ');
    if (digits.length < 13) return setError('Enter the full card number.');
    if (!/^\d{2} \/ \d{2}$/.test(expiry) || Number(mm) < 1 || Number(mm) > 12) return setError('Enter the expiry date as MM / YY.');
    if (!/^\d{3,4}$/.test(cvv)) return setError('Enter the 3 or 4 digit CVV.');
    setError('');
    onPaid(digits.slice(-4));
  };

  return (
    <form noValidate onSubmit={submit} className={cn(paymentCard, "self-start", 'gap-7')}>
      <BackToMethods onBack={onBack} />
      <Headline title="Pay with card">Enter your card details below</Headline>
      <div className="flex flex-col gap-4">
        <label className={cardField}>
          <span className={cardLabel}>Card Number</span>
          <span className="flex items-center gap-2">
            <input className={cardInput} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={number} onChange={(e) => setNumber(groupDigits(e.target.value))} />
            {digits.startsWith('4') && (
              <span className="rounded-sm border border-border-default bg-surface-default px-2 py-1 text-caption font-extrabold italic text-site-visa">VISA</span>
            )}
          </span>
        </label>
        <div className="flex gap-4">
          <label className={cn(cardField, 'flex-1')}>
            <span className={cardLabel}>Expiry</span>
            <input className={cardInput} inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} />
          </label>
          <label className={cn(cardField, 'flex-1')}>
            <span className={cardLabel}>CVV</span>
            <input className={cardInput} inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} />
          </label>
        </div>
        {error && <p role="alert" className="text-caption text-status-danger">{error}</p>}
      </div>
      <p className="flex items-center justify-center gap-2 text-caption text-text-secondary">
        <img src={lock} alt="" className="size-3.5" />
        Your connection is encrypted and secured
      </p>
      <SiteButton type="submit" variant="pay">Pay {formatNgn(totals.total)}</SiteButton>
    </form>
  );
}

const BANK = { name: 'Wema Bank', account: '7610046046', beneficiary: 'Quickteller Business Payment' };

function TransferDetails({ onBack }: { onBack: () => void }) {
  const { totals } = useCheckout();
  const [copied, setCopied] = useState(false);
  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK.account);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  const row = (label: string, value: ReactNode) => (
    <div className="flex items-center justify-between border-b border-border-default py-3.5 text-body">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="flex items-center gap-1.5 font-semibold text-text-charcoal">{value}</dd>
    </div>
  );
  return (
    <section className={cn(paymentCard, "self-start", 'gap-6')}>
      <BackToMethods onBack={onBack} />
      <Headline title="Pay with Transfer">Make a bank transfer of {formatNgn(totals.total)} to the account below.</Headline>
      <p className="flex items-start gap-3 rounded-lg border border-site-notice-border bg-site-notice-bg p-4 text-caption font-medium leading-140 text-site-notice-text">
        <img src={info} alt="" className="size-4.5" />
        Account expires after 30 minutes and valid for this transaction only.
      </p>
      <dl className="flex flex-col">
        {row('Bank Name', BANK.name)}
        {row(
          'Account Number',
          <>
            {BANK.account}
            <button type="button" onClick={copyAccount} aria-label="Copy account number" className="rounded-xs focus-visible:outline-none focus-visible:shadow-focus">
              <img src={copy} alt="" className="size-4" />
            </button>
            <span aria-live="polite" className="text-caption font-medium text-status-connected">{copied && <span className="animate-value-in">Copied</span>}</span>
          </>,
        )}
        {row('Beneficiary Name', BANK.beneficiary)}
        {row('Amount', <span className="text-status-connected">{formatNgn(totals.total)}</span>)}
      </dl>
      <p role="status" className="flex items-center justify-center gap-2.5 pt-3 text-body-sm font-medium text-text-secondary">
        <span aria-hidden="true" className="size-4.5 animate-spin rounded-full border-2 border-dashed border-status-connected" />
        Confirming transaction status
      </p>
    </section>
  );
}

function UnavailableMethod({ method, onBack }: { method: Method; onBack: () => void }) {
  const m = METHODS.find((x) => x.id === method)!;
  return (
    <section className={cn(paymentCard, "self-start", 'gap-6')}>
      <BackToMethods onBack={onBack} />
      <Headline title={m.title}>{m.body}</Headline>
      <p className="rounded-lg border border-border-default bg-surface-subtle p-4 text-body text-text-secondary">
        This option is not available for wCRM subscriptions yet. Pay with card or bank transfer to finish your order.
      </p>
    </section>
  );
}

/** Plan upgrade receipt (Figma `Success-Card`, 372:3555). */
function SuccessDialog({ receipt }: { receipt: { last4: string; reference: string } | null }) {
  const navigate = useNavigate();
  const { orgs, totals } = useCheckout();
  const renewal = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }, []);
  const rows: [string, string, string?][] = [
    ['Next renewal date', renewal],
    ['Total amount charged', formatNaira(totals.total)],
    ['Payment method', `Debit Card ****${receipt?.last4 ?? ''}`],
    ['Transaction Reference', receipt?.reference ?? '', 'text-text-link-bright'],
  ];
  return (
    <SiteDialogRoot open={receipt !== null}>
      <SiteDialogContent
        className="w-site-success-card items-center gap-6 p-12 font-instrument shadow-site-success"
        description="Your payment was received and your plan is active."
      >
        <img src={successTick} alt="" style={{ animationDelay: '80ms' }} className="size-site-success-icon animate-pop-bounce" />
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <SiteDialogTitle className="text-heading-xl text-text-ink">Plan Upgrade Successful!</SiteDialogTitle>
          <p className="text-body text-text-slate">
            Your subscription to wCRM is successful. Your teams now have full access to high-tier ERP tools, advanced workflows, and expanded capacities.
          </p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-site-plan-bg p-4">
          <div className="flex flex-col gap-1 whitespace-nowrap font-bold">
            <p className="text-caption text-text-faint">CURRENT ACTIVE PLAN</p>
            <p className="text-heading-2 text-text-ink">{mainPlanOf(orgs[0]).label}</p>
          </div>
          <span className="rounded-full bg-site-success-subtle px-3 py-1 text-badge-lg text-status-connected">ACTIVE</span>
        </div>
        <dl className="flex w-full flex-col gap-3 whitespace-nowrap text-body-sm">
          {rows.map(([k, v, tone]) => (
            <div key={k} className="flex items-start justify-between">
              <dt className="text-text-slate">{k}</dt>
              <dd className={cn('font-semibold', tone ?? 'text-text-ink')}>{v}</dd>
            </div>
          ))}
        </dl>
        <hr className="w-full border-t border-border-default" />
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-site-dashboard-btn rounded-md bg-text-link-bright px-6 py-3 text-label text-text-inverse transition-colors hover:bg-text-link focus-visible:outline-none focus-visible:shadow-focus"
        >
          Go to Dashboard
        </button>
      </SiteDialogContent>
    </SiteDialogRoot>
  );
}

/** Step 6 (Figma `wcrm-payment`: methods 372:2780, card 372:2925, transfer 372:3444). */
export function PaymentPage() {
  const { completeStep } = useCheckout();
  const [method, setMethod] = useState<Method | null>(null);
  const [editing, setEditing] = useState(false);
  const [receipt, setReceipt] = useState<{ last4: string; reference: string } | null>(null);
  const back = () => setMethod(null);

  return (
    <CheckoutLayout step={6} backTo="/checkout/review">
      <div className="flex items-stretch gap-6 px-50 pb-20 pt-4">
        {method === null && <MethodList onPick={setMethod} />}
        {method === 'card' && (
          <CardForm
            onBack={back}
            onPaid={(last4) => {
              completeStep(6);
              setReceipt({ last4, reference: `TXN-${Math.floor(10_000_000 + Math.random() * 89_999_999)}` });
            }}
          />
        )}
        {method === 'transfer' && <TransferDetails onBack={back} />}
        {method && method !== 'card' && method !== 'transfer' && <UnavailableMethod method={method} onBack={back} />}
        <OrderSummary variant={method === null ? 'review' : 'payment'} onEdit={() => setEditing(true)} />
      </div>
      <EditOrganisationsDialog open={editing} onOpenChange={setEditing} />
      <SuccessDialog receipt={receipt} />
    </CheckoutLayout>
  );
}
