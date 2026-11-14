import { useState, type ReactNode } from 'react';
import {
  Accordion,
  AreaChart,
  Avatar,
  BarChart,
  Button,
  Card,
  InsurerChip,
  Logo,
  MoneyDisplay,
  MoneyInput,
  PolicyCard,
  SegmentedControl,
  Select,
  StageProgress,
  StatusPill,
  SummaryCard,
  Tabs,
  formatMoneyShort,
} from '../index';
import {
  AccountingIcon,
  AgricIcon,
  ArrowRightIcon,
  AviationIcon,
  BrandingIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  ClaimIcon,
  CloudIcon,
  CoinsIcon,
  CustomersIcon,
  FacebookIcon,
  FireIcon,
  GiftIcon,
  HealthIcon,
  HumanResourcesIcon,
  IncomeIcon,
  InstagramIcon,
  InsuranceIcon,
  LeadsIcon,
  LocationIcon,
  MailIcon,
  MarineIcon,
  MotorIcon,
  PhoneIcon,
  PremiumIcon,
  QuoteIcon,
  RemittanceIcon,
  ReportsIcon,
  StarIcon,
  SupportIcon,
  TransitIcon,
  XSocialIcon,
} from '../icons';
import { cx } from '../lib/cx';
import { Container, Eyebrow, Heading, IconBadge, Lead, Section } from './Layout';

/* ------------------------------------------------------------------ data */

/** Sample rates for the hero calculator. Illustrative only, not tariff advice. */
const CLASSES = [
  { value: 'motor', label: 'Motor comprehensive', rate: 5, commission: 10 },
  { value: 'fire', label: 'Fire & special perils', rate: 0.25, commission: 20 },
  { value: 'transit', label: 'Goods in transit', rate: 0.5, commission: 15 },
  { value: 'life', label: 'Group life', rate: 0.35, commission: 9 },
  { value: 'agric', label: 'Agric insurance', rate: 2.5, commission: 12.5 },
];

const REMITTANCE = {
  week: [
    { insurer: 'Harbor General Assurance', amount: 3560500, due: 'Due Fri', tone: 'warning' as const },
    { insurer: 'Lagoon Mutual', amount: 1240000, due: 'Due Mon', tone: 'info' as const },
    { insurer: 'Savannah Life', amount: 864000, due: 'Due Tue', tone: 'info' as const },
    { insurer: 'Crestline Re', amount: 412300, due: 'Paid', tone: 'success' as const },
  ],
  month: [
    { insurer: 'Harbor General Assurance', amount: 12480000, due: '3 due', tone: 'warning' as const },
    { insurer: 'Lagoon Mutual', amount: 7915500, due: '2 due', tone: 'warning' as const },
    { insurer: 'Savannah Life', amount: 4120000, due: '1 due', tone: 'info' as const },
    { insurer: 'Crestline Re', amount: 2602300, due: 'Paid', tone: 'success' as const },
  ],
};

const CLASS_STRIP = [
  { label: 'Motor', icon: <MotorIcon /> },
  { label: 'Fire & special perils', icon: <FireIcon /> },
  { label: 'Aviation', icon: <AviationIcon /> },
  { label: 'Marine', icon: <MarineIcon /> },
  { label: 'Goods in transit', icon: <TransitIcon /> },
  { label: 'Group life', icon: <HealthIcon /> },
  { label: 'Health', icon: <HealthIcon /> },
  { label: 'Agric', icon: <AgricIcon /> },
  { label: 'All risk', icon: <InsuranceIcon /> },
];

const premiumWeek = [
  { day: 'Mon', premium: 1900000, commission: 380000 },
  { day: 'Tue', premium: 3050000, commission: 610000 },
  { day: 'Wed', premium: 2300000, commission: 460000 },
  { day: 'Thu', premium: 750000, commission: 150000 },
  { day: 'Fri', premium: 2080000, commission: 416000 },
  { day: 'Sat', premium: 2120000, commission: 424000 },
];
const incomeMonths = [
  { month: 'May', income: 8200000, expense: 5100000 },
  { month: 'Jun', income: 9400000, expense: 6300000 },
  { month: 'Jul', income: 7800000, expense: 5900000 },
  { month: 'Aug', income: 11200000, expense: 6800000 },
  { month: 'Sep', income: 10100000, expense: 7200000 },
  { month: 'Oct', income: 12600000, expense: 7000000 },
];
const staffByDept = [
  { name: 'Broking', staff: 6 },
  { name: 'Claims', staff: 3 },
  { name: 'Accounts', staff: 2 },
  { name: 'Admin', staff: 2 },
];

type ModuleId = 'payments' | 'remittance' | 'accounting' | 'reports' | 'hr';
const MODULES: Record<ModuleId, { title: string; body: string; points: string[]; cards: Array<{ label: string; value: ReactNode; icon: ReactNode; color: 'teal' | 'green' | 'blue' | 'amber' | 'purple' | 'ink' }>; chart: ReactNode }> = {
  payments: {
    title: 'Collect premium and see what is outstanding',
    body: 'Raise debit notes and invoices, receipt premium against the policy and take part payments.',
    points: ['Debit notes and invoices', 'Part payments and receipts', 'Receivables aging by client'],
    cards: [
      { label: 'Premium received', value: <MoneyDisplay amount={12180000} format="short" />, icon: <IncomeIcon />, color: 'green' },
      { label: 'Outstanding', value: <MoneyDisplay amount={4320000} format="short" />, icon: <PremiumIcon />, color: 'amber' },
    ],
    chart: <AreaChart data={premiumWeek} xKey="day" series={[{ key: 'premium', label: 'Premium', color: 0 }]} format={formatMoneyShort} height={220} aria-label="Premium received each day this week" />,
  },
  remittance: {
    title: 'Pay every insurer, net of commission',
    body: 'Premium you collect builds a remittance due to each insurer, with your commission worked out for you.',
    points: ['Remittance schedule per insurer', 'Commission calculated automatically', 'Full remittance history'],
    cards: [
      { label: 'Due to insurers', value: <MoneyDisplay amount={6076800} format="short" />, icon: <RemittanceIcon />, color: 'teal' },
      { label: 'Commission earned', value: <MoneyDisplay amount={2440000} format="short" />, icon: <CoinsIcon />, color: 'purple' },
    ],
    chart: <BarChart data={premiumWeek} xKey="day" series={[{ key: 'premium', label: 'Premium', color: 0 }, { key: 'commission', label: 'Commission', color: 1 }]} format={formatMoneyShort} height={220} aria-label="Premium and commission each day this week" />,
  },
  accounting: {
    title: 'Books that match the broking',
    body: 'Receipts, remittances and cancellations post straight to your chart of accounts. No re-keying.',
    points: ['Chart of accounts and journals', 'Bank reconciliation', 'Opening balances'],
    cards: [
      { label: 'Income · Oct', value: <MoneyDisplay amount={12600000} format="short" />, icon: <IncomeIcon />, color: 'green' },
      { label: 'Expense · Oct', value: <MoneyDisplay amount={7000000} format="short" />, icon: <AccountingIcon />, color: 'ink' },
    ],
    chart: <BarChart data={incomeMonths} xKey="month" series={[{ key: 'income', label: 'Income', color: 0 }, { key: 'expense', label: 'Expense', color: 2 }]} format={formatMoneyShort} height={220} aria-label="Income and expense by month" />,
  },
  reports: {
    title: 'The information you need, when you need it',
    body: 'Production, profit and loss, receivables aging and remittance exposure, built from the records your team already keeps.',
    points: ['Insurance and production reports', 'Profit & loss and balance sheet', 'Remittance exposure'],
    cards: [
      { label: 'Premium YTD', value: <MoneyDisplay amount={412000000} format="short" />, icon: <ReportsIcon />, color: 'teal' },
      { label: 'Claims YTD', value: <MoneyDisplay amount={31000000} format="short" />, icon: <ClaimIcon />, color: 'amber' },
    ],
    chart: <AreaChart data={incomeMonths} xKey="month" series={[{ key: 'income', label: 'Income', color: 0 }, { key: 'expense', label: 'Expense', color: 2 }]} format={formatMoneyShort} height={220} aria-label="Income and expense trend" />,
  },
  hr: {
    title: 'Your team, organised',
    body: 'Employee records, leave, recruitment, appraisals and payroll in the same system as your clients.',
    points: ['Employees and leave', 'Payroll runs and payslips', 'Appraisals and recruitment'],
    cards: [
      { label: 'Employees', value: '13', icon: <HumanResourcesIcon />, color: 'blue' },
      { label: 'On leave', value: '2', icon: <CustomersIcon />, color: 'purple' },
    ],
    chart: <BarChart data={staffByDept} xKey="name" series={[{ key: 'staff', label: 'Staff', color: 0 }]} height={220} aria-label="Staff by department" />,
  },
};

const PLANS = [
  { name: 'Trial', desc: 'Try iBroka with your own clients and policies.', m: 0, y: 0, per: '/30 days', users: '1 user', split: 'Every feature to explore', cta: 'Try for free', variant: 'outline' as const },
  { name: 'Plus', desc: 'Small brokerages getting off spreadsheets.', m: 14607.33, y: 160680.63, users: '3-user bundle', split: '1 admin, 2 users', cta: 'Get started', variant: 'outline' as const },
  { name: 'Premium', desc: 'Growing teams handling a busy book.', m: 23128.28, y: 254411.08, users: '5-user bundle', split: '1 admin, 4 users', cta: 'Get started', variant: 'primary' as const, popular: true },
  { name: 'Platinum', desc: 'Established firms with several teams.', m: 43822, y: 482042, users: '10-user bundle', split: '2 admins, 8 users', cta: 'Get started', variant: 'outline' as const },
];

/** Placeholders until real broker quotes are supplied. */
const QUOTES = [
  { name: '[Broker name]', role: '[Role, Brokerage]', text: '[Placeholder quote about renewals: how iBroka keeps every renewal on time.]' },
  { name: '[Broker name]', role: '[Role, Brokerage]', text: '[Placeholder quote about remittance: how much faster insurers are paid.]' },
  { name: '[Broker name]', role: '[Role, Brokerage]', text: '[Placeholder quote about onboarding: how the team moved their book across.]' },
  { name: '[Broker name]', role: '[Role, Brokerage]', text: '[Placeholder quote about support: what the in-country team is like.]' },
];

const FAQS = [
  ['What is iBroka?', 'Easy-to-manage, fully integrated software for insurance brokers. It runs clients, leads, policies, approvals, claims, payments, remittance, accounting, reports and HR in one system.'],
  ['Can we track leads before they become clients?', 'Yes. Capture leads one by one or in bulk, follow them through quoting, and convert a lead into a client and a policy without retyping anything.'],
  ['Does iBroka handle remittance to insurers?', 'Yes. Premium you receive is matched to the policy, your commission is worked out, and what you owe each insurer shows until you pay it.'],
  ['Can it remind us about renewals?', 'Yes. Policies due for renewal are flagged ahead of their end date, and renewal notices go to clients from the policy itself.'],
  ['Can we bring our existing book over?', 'Yes. Our onboarding team imports your clients, open policies and opening balances, so you start with your full book in place.'],
  ['Where is our data kept?', 'iBroka runs on Microsoft Azure cloud services, with in-country experts available 24/7, every day of the year.'],
];

const NAV = [
  ['Features', '#features'],
  ["Who it's for", '#classes'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
];

/* -------------------------------------------------------------- sections */

function Header() {
  return (
    <header className="relative z-10">
      <Container className="flex h-20 items-center gap-8">
        <a href="#top" aria-label="iBroka home" className="rounded ib-focus">
          <Logo height={28} />
        </a>
        <nav aria-label="Main" className="ml-4 hidden items-center gap-7 text-15 font-medium text-fg-strong md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="rounded hover:text-primary ib-focus">
              {l}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="tertiary">Log in</Button>
          <Button>Get started</Button>
        </div>
      </Container>
    </header>
  );
}

function Calculator() {
  const [cls, setCls] = useState('motor');
  const [sum, setSum] = useState<number | null>(12500000);
  const c = CLASSES.find((x) => x.value === cls)!;
  const premium = ((sum ?? 0) * c.rate) / 100;
  const commission = (premium * c.commission) / 100;
  const rows: Array<[string, number, boolean?]> = [
    [`Premium at ${c.rate}%`, premium],
    [`Your commission (${c.commission}%)`, commission, true],
    ['Remit to insurer', premium - commission],
  ];
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface p-5 text-fg-strong shadow-dialog">
      <div className="flex flex-col gap-3">
        <Select label="Class of business" options={CLASSES.map(({ value, label }) => ({ value, label }))} value={cls} onChange={setCls} searchable={false} />
        <MoneyInput label="Sum insured" value={sum} onChange={setSum} />
      </div>
      <dl className="flex flex-col divide-y divide-line-row rounded-lg border border-line-subtle px-4">
        {rows.map(([label, amount, accent]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 py-2.5 text-13">
            <dt className={accent ? 'font-medium text-primary' : 'text-fg-muted'}>{label}</dt>
            <dd className={cx('tabular-nums', accent ? 'font-semibold text-primary' : 'font-semibold text-fg-strong')}>
              <MoneyDisplay amount={amount} />
            </dd>
          </div>
        ))}
      </dl>
      <Button fullWidth trailingIcon={<ArrowRightIcon />}>
        Quote this in iBroka
      </Button>
      <p className="text-center text-12 text-fg-muted">Sample rates for illustration. VAT not included.</p>
    </div>
  );
}

function Hero() {
  return (
    <div id="top" className="bg-brand-subtle">
      <Header />
      <Container className="flex flex-col items-center gap-6 pb-60 pt-16 text-center md:pt-20">
        <Heading as="h1" size="hero" className="max-w-4xl tracking-tighter text-fg-strong">
          The operating system for insurance brokers
        </Heading>
        <Lead className="max-w-xl">Clients, policies, claims, premium and insurer remittance, on one platform built for brokerages in Nigeria.</Lead>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            Try for free
          </Button>
        </div>
      </Container>
    </div>
  );
}

/** One of the three equal cards that straddle the hero band. */
function HeroCard({ tone, title, body, link, children }: { tone: 'teal' | 'ink'; title: string; body: string; link: string; children: ReactNode }) {
  return (
    <article className={cx('flex min-h-96 flex-col gap-3 rounded-2xl p-6 text-fg-inverse md:p-7.5', tone === 'teal' ? 'bg-primary' : 'bg-secondary')}>
      <h2 className="text-20 font-bold">{title}</h2>
      <p className="text-13 opacity-85">{body}</p>
      <a href="#features" className="inline-flex items-center gap-1.5 self-start rounded text-13 font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white ib-focus">
        {link}
        <span className="size-icon-sm" aria-hidden>
          <ArrowRightIcon />
        </span>
      </a>
      <div className="mt-auto pt-6">{children}</div>
    </article>
  );
}

function HeroCards() {
  const due = REMITTANCE.week.filter((r) => r.due !== 'Paid');
  const total = due.reduce((s, r) => s + r.amount, 0);
  return (
    <Container className="relative -mt-44 grid gap-5 lg:grid-cols-3">
      <HeroCard tone="teal" title="Every class of business" body="Motor to aviation, placed and co-insured with the insurers you already use." link="See classes">
        <div className="flex flex-col gap-4 rounded-xl bg-surface p-5 text-fg-strong">
          <div className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-13 font-semibold">Aviation hull · 5N-BQK</span>
              <span className="text-12 text-fg-muted">Co-insured placement</span>
            </span>
            <StatusPill tone="success">Bound</StatusPill>
          </div>
          {[
            ['Crestline Re', 60, true],
            ['Harbor General Assurance', 40, false],
          ].map(([name, share, lead]) => (
            <div key={name as string} className="flex flex-col gap-2">
              <InsurerChip name={name as string} share={share as number} lead={lead as boolean} className="self-start" />
              <span className="h-1.5 overflow-hidden rounded-full bg-surface-track" aria-hidden>
                <span className="block h-full rounded-full bg-primary" style={{ width: `${share}%` }} />
              </span>
            </div>
          ))}
          <ul className="grid grid-cols-6 gap-2 border-t border-line-row pt-4" aria-label="Classes of business">
            {CLASS_STRIP.slice(0, 6).map((c) => (
              <li key={c.label} title={c.label} className="inline-flex aspect-square items-center justify-center rounded-lg bg-brand-subtle text-primary">
                <span className="size-icon" aria-hidden>
                  {c.icon}
                </span>
                <span className="sr-only">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </HeroCard>
      <HeroCard tone="ink" title="Know what a policy earns" body="Premium, commission and the amount due to the insurer, worked out as you quote." link="How quoting works">
        <Calculator />
      </HeroCard>
      <HeroCard tone="teal" title="Pay insurers on time" body="Every naira you collect is matched to a policy and queued for remittance." link="See remittance">
        <div className="flex flex-col gap-3 rounded-xl bg-surface p-5 text-fg-strong">
          <div className="flex items-center justify-between">
            <span className="text-13 text-fg-muted">Due this week</span>
            <StatusPill tone="warning">{due.length} insurers</StatusPill>
          </div>
          <span className="text-30 font-bold tracking-tight">
            <MoneyDisplay amount={total} format="short" />
          </span>
          <ul className="flex flex-col gap-2">
            {due.map((r) => (
              <li key={r.insurer} className="flex items-center gap-3 text-12">
                <span className="w-24 shrink-0 truncate text-fg-muted">{r.insurer.split(' ')[0]}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-track" aria-hidden>
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${(r.amount / due[0].amount) * 100}%` }} />
                </span>
                <span className="w-14 shrink-0 text-right font-semibold tabular-nums">
                  <MoneyDisplay amount={r.amount} format="short" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </HeroCard>
    </Container>
  );
}

function TrustRow() {
  const items = [
    { icon: <CloudIcon />, title: 'Hosted on Microsoft Azure', body: 'Secure, scalable cloud hosting.' },
    { icon: <SupportIcon />, title: '24/7 in-country support', body: 'Local experts, every day of the year.' },
    { icon: <CoinsIcon />, title: 'Zero CAPEX to set up', body: 'No servers, no installation.' },
  ];
  return (
    <Section className="!pb-0 !pt-16">
      <Container>
        <ul className="grid gap-6 border-b border-line-subtle pb-12 md:grid-cols-3">
          {items.map((i) => (
            <li key={i.title} className="flex items-center gap-4">
              <IconBadge icon={i.icon} />
              <span>
                <span className="block text-15 font-semibold text-fg-strong">{i.title}</span>
                <span className="text-13 text-fg-muted">{i.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function RemittancePanel() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const rows = REMITTANCE[period];
  const max = Math.max(...rows.map((r) => r.amount));
  return (
    <Section id="features" className="!pt-12">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-subtle px-5 py-12 text-center md:px-16 md:py-16">
          <Heading size="section" className="text-fg-strong">
            Know what you owe every insurer
          </Heading>
          <Lead className="max-w-2xl">Premium you collect is matched to the policy and your commission is taken off, so the amount due to each insurer is always up to date.</Lead>
          <SegmentedControl
            aria-label="Period"
            options={[
              { value: 'week', label: 'This week' },
              { value: 'month', label: 'This month' },
            ]}
            value={period}
            onChange={(v) => setPeriod(v as 'week' | 'month')}
          />
          <Card className="w-full max-w-3xl text-left" title="Remittance schedule" titleAddon={<StatusPill tone="info">{period === 'week' ? 'Week 46' : 'November'}</StatusPill>}>
            <ul className="flex flex-col gap-3">
              {rows.map((r, i) => (
                <li key={r.insurer} className="grid grid-cols-1 items-center gap-2 md:grid-cols-12 md:gap-4">
                  <InsurerChip name={r.insurer} className="md:col-span-4" />
                  <div className="h-2.5 overflow-hidden rounded-full bg-surface-track md:col-span-4" aria-hidden>
                    <div className={cx('h-full rounded-full', i === 0 ? 'bg-primary' : 'bg-brand')} style={{ width: `${(r.amount / max) * 100}%` }} />
                  </div>
                  <span className="text-15 font-semibold tabular-nums text-fg-strong md:col-span-2 md:text-right">
                    <MoneyDisplay amount={r.amount} format="short" />
                  </span>
                  <span className="md:col-span-2 md:justify-self-end">
                    <StatusPill tone={r.tone}>{r.due}</StatusPill>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

function ClassStrip() {
  const items = [...CLASS_STRIP, ...CLASS_STRIP];
  return (
    <Section id="classes" className="overflow-hidden pt-0">
      <Container className="mb-10 text-center">
        <Heading size="section" className="text-fg-strong">
          Every class of business, one book
        </Heading>
      </Container>
      <div className="group relative">
        <ul className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none" aria-label="Classes of business iBroka handles">
          {items.map((c, i) => (
            <li key={i} aria-hidden={i >= CLASS_STRIP.length} className="flex w-30 flex-col items-center gap-3 text-center">
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-brand-subtle text-primary">
                <span className="size-8">{c.icon}</span>
              </span>
              <span className="text-13 font-medium text-fg-strong">{c.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FeatureTrio() {
  const today = new Date(2026, 10, 14);
  return (
    <Section className="bg-surface">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Heading size="section" className="text-fg-strong">
            Every policy, start to finish
          </Heading>
          <Lead className="max-w-2xl">From the first enquiry to the claim settlement, each step lives on the same record.</Lead>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="flex flex-col gap-4">
            <div className="flex aspect-square flex-col justify-center gap-3 rounded-2xl bg-brand-subtle p-6">
              <Card radius="lg" className="gap-0" flush>
                <ul className="divide-y divide-line-row">
                  {[
                    ['Bamidele Farms', 'Agric enquiry', 'Lead', 'neutral'],
                    ['Northgate Technologies', 'Group life', 'Quoted', 'info'],
                    ['Kestrel Oil & Gas Ltd', 'Fire & special perils', 'Client', 'success'],
                  ].map(([n, s, l, t]) => (
                    <li key={n} className="flex items-center justify-between gap-3 px-4 py-3">
                      <Avatar name={n} label={n} sublabel={s} />
                      <StatusPill tone={t as 'neutral' | 'info' | 'success'}>{l}</StatusPill>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-18 font-bold text-fg-strong">
                <span className="size-icon text-primary" aria-hidden>
                  <LeadsIcon />
                </span>
                Leads and clients
              </h3>
              <p className="text-15 text-fg-muted">Capture leads in bulk, quote them and convert them into clients without retyping.</p>
            </div>
          </article>
          <article className="flex flex-col gap-4">
            <div className="flex aspect-square flex-col justify-center gap-3 rounded-2xl bg-primary p-6">
              <PolicyCard policyNo="POL-2026-00984" client="Ifeoma Bello" type="Fire & Special Perils" policyClass="fire" insurer="Lagoon Mutual" premium={3000000} start="2025-11-15" end="2026-11-15" status="Expiring" today={today} />

            </div>
            <div>
              <h3 className="flex items-center gap-2 text-18 font-bold text-fg-strong">
                <span className="size-icon text-primary" aria-hidden>
                  <InsuranceIcon />
                </span>
                Policies and renewals
              </h3>
              <p className="text-15 text-fg-muted">Every policy by class and insurer, with renewals flagged before they lapse.</p>
            </div>
          </article>
          <article className="flex flex-col gap-4">
            <div className="flex aspect-square flex-col justify-center rounded-2xl bg-secondary p-6">
              <Card radius="lg" title="CLM-0412 · Motor accident">
                <StageProgress
                  orientation="vertical"
                  aria-label="Claim progress"
                  stages={[
                    { id: 'n', label: 'Notified', state: 'done', meta: 'Chidi Okafor · 2 Nov' },
                    { id: 'd', label: 'Documents received', state: 'done', meta: 'Ada Obi · 4 Nov' },
                    { id: 'a', label: 'Approved by insurer', state: 'current', meta: 'Lagoon Mutual' },
                    { id: 's', label: 'Settled', state: 'upcoming' },
                  ]}
                />
              </Card>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-18 font-bold text-fg-strong">
                <span className="size-icon text-primary" aria-hidden>
                  <ClaimIcon />
                </span>
                Claims
              </h3>
              <p className="text-15 text-fg-muted">Follow each claim from notification to settlement, with every document attached.</p>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}

function ModuleExplorer() {
  const [tab, setTab] = useState<ModuleId>('payments');
  const m = MODULES[tab];
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Heading size="section" className="text-fg-strong">
            One platform, every part of the business
          </Heading>
          <Lead className="max-w-2xl">Payments, remittance, accounting, reports and people, all built on the same records.</Lead>
        </div>
        <Tabs
          aria-label="Modules"
          className="justify-center overflow-x-auto"
          value={tab}
          onChange={(id) => setTab(id as ModuleId)}
          items={[
            { id: 'payments', label: 'Payment & invoice' },
            { id: 'remittance', label: 'Remittance' },
            { id: 'accounting', label: 'Accounting' },
            { id: 'reports', label: 'Reports' },
            { id: 'hr', label: 'Human resources' },
          ]}
        />
        <div role="tabpanel" className="grid items-center gap-8 rounded-3xl bg-surface-muted p-6 md:p-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Heading as="h3" size="card" className="text-fg-strong">
              {m.title}
            </Heading>
            <p className="text-15 text-fg-muted">{m.body}</p>
            <ul className="flex flex-col gap-3">
              {m.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-15 text-fg-strong">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary text-fg-inverse" aria-hidden>
                    <span className="size-3.5">
                      <CheckIcon />
                    </span>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div>
              <Button variant="secondary" trailingIcon={<ArrowRightIcon />}>
                See how it works
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {m.cards.map((c) => (
                <SummaryCard key={c.label} label={c.label} value={c.value} icon={c.icon} color={c.color} />
              ))}
            </div>
            <Card radius="xl">{m.chart}</Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Facts() {
  const facts = [
    ['10', 'modules on one login'],
    ['30 days', 'free trial, no card'],
    ['24/7', 'in-country support'],
    ['₦0', 'setup cost'],
  ];
  return (
    <Section className="py-0 md:py-0">
      <Container>
        <dl className="grid grid-cols-2 gap-6 border-y border-line-subtle py-10 md:grid-cols-4">
          {facts.map(([v, l]) => (
            <div key={l} className="flex flex-col gap-1">
              <dt className="order-2 text-13 text-fg-muted">{l}</dt>
              <dd className="text-30 font-bold tracking-tight text-fg-strong md:text-40">{v}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

function Statement() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-secondary p-8 text-fg-inverse md:p-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Heading size="statement">Your clients. Your brand.</Heading>
            <p className="text-15 opacity-85 md:text-18">Put your brokerage's name on what clients see, and let iBroka do the work underneath.</p>
            <ul className="flex flex-col gap-4">
              {[
                [<BrandingIcon key="b" />, 'Branded solutions', 'Your brand builds client trust and loyalty.'],
                [<GiftIcon key="g" />, 'Onboarding services', 'Pay for a year and get two months free.'],
                [<PremiumIcon key="p" />, 'Financial increase', 'Reach more of the market with more customers.'],
              ].map(([icon, t, b]) => (
                <li key={t as string} className="flex items-center gap-4">
                  <IconBadge icon={icon} tone="white" />
                  <span>
                    <span className="block text-15 font-semibold">{t}</span>
                    <span className="text-13 opacity-80">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl bg-surface p-6 text-fg-strong" aria-label="Example of a branded client portal">
            <div className="flex items-center justify-between border-b border-line-row pb-4">
              <span className="flex items-center gap-3">
                <span className="inline-flex size-tile items-center justify-center rounded-lg bg-tile-purple-bg text-13 font-bold text-tile-purple-fg">YB</span>
                <span>
                  <span className="block text-15 font-semibold">Your Brokerage</span>
                  <span className="text-12 text-fg-muted">Client portal</span>
                </span>
              </span>
              <Avatar name="Ifeoma Bello" />
            </div>
            <p className="text-13 text-fg-muted">Welcome back, Ifeoma</p>
            {[
              ['Fire & special perils', 'Renews 15 Nov 2026', 'Expiring'],
              ['Motor comprehensive', 'Active to Jan 2027', 'Active'],
            ].map(([t, s, st]) => (
              <div key={t} className="flex items-center justify-between rounded-lg bg-surface-muted px-4 py-3">
                <span>
                  <span className="block text-13 font-semibold">{t}</span>
                  <span className="text-12 text-fg-muted">{s}</span>
                </span>
                <StatusPill tone={st === 'Active' ? 'success' : 'warning'}>{st}</StatusPill>
              </div>
            ))}
            <Button fullWidth>Renew my policy</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const max = QUOTES.length - 2;
  return (
    <Section className="overflow-hidden bg-surface">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <span className="inline-flex items-center gap-1 text-primary" aria-label="5 out of 5">
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className="size-icon" aria-hidden>
                <StarIcon />
              </span>
            ))}
          </span>
          <Heading size="statement" className="text-fg-strong">
            Loved by brokers
          </Heading>
          <p className="text-13 text-fg-muted">Quotes below are placeholders until we add real broker stories.</p>
          <div className="flex gap-2">
            <Button variant="outline" iconOnly aria-label="Previous" disabled={i === 0} onClick={() => setI(i - 1)} leadingIcon={<CaretLeftIcon />} />
            <Button iconOnly aria-label="Next" disabled={i >= max} onClick={() => setI(i + 1)} leadingIcon={<CaretRightIcon />} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="flex gap-5 transition-transform duration-300" style={{ transform: `translateX(calc(${-i} * (var(--ib-size-marketing-card) + var(--ib-space-5))))` }}>
            {QUOTES.map((q, k) => (
              <li key={k} className={cx('flex w-marketing-card shrink-0 flex-col justify-between gap-8 rounded-2xl p-7.5', k % 2 ? 'bg-secondary text-fg-inverse' : 'bg-brand-subtle text-fg-strong')}>
                <span className={cx('size-8', k % 2 ? 'text-brand' : 'text-primary')} aria-hidden>
                  <QuoteIcon />
                </span>
                <p className="text-18 font-medium">{q.text}</p>
                <Avatar name="A B" label={q.name} sublabel={q.role} className={k % 2 ? '[&_*]:text-fg-inverse' : ''} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function Pricing() {
  const [bill, setBill] = useState<'m' | 'y'>('m');
  return (
    <Section id="pricing">
      <Container className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Pricing</Eyebrow>
          <Heading size="section" className="text-fg-strong">
            Plans that fit your brokerage
          </Heading>
          <Lead>Every plan includes the full platform. Choose by team size.</Lead>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SegmentedControl
            aria-label="Billing period"
            options={[
              { value: 'm', label: 'Monthly' },
              { value: 'y', label: 'Yearly' },
            ]}
            value={bill}
            onChange={(v) => setBill(v as 'm' | 'y')}
          />
          <StatusPill tone="success">2 months free on yearly</StatusPill>
        </div>
        <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => {
            const amount = bill === 'm' ? p.m : p.y;
            return (
              <div key={p.name} className={cx('relative flex flex-col gap-5 rounded-2xl bg-surface p-6 shadow-card', p.popular && 'ring-2 ring-primary')}>
                {p.popular && (
                  <span className="absolute -top-3 left-6">
                    <StatusPill tone="info" dot={false}>
                      Most popular
                    </StatusPill>
                  </span>
                )}
                <div>
                  <h3 className="text-20 font-bold text-fg-strong">{p.name}</h3>
                  <p className="text-13 text-fg-muted">{p.desc}</p>
                </div>
                <div>
                  <span className="text-30 font-bold tracking-tight text-fg-strong">
                    {amount === 0 ? 'Free' : <MoneyDisplay amount={amount} />}
                  </span>
                  <span className="text-13 text-fg-muted"> {p.per ?? (bill === 'm' ? '/month' : '/year')}</span>
                  <p className="text-12 text-fg-muted">
                    {p.m === 0 ? 'No card required' : bill === 'm' ? <>or <MoneyDisplay amount={p.y} /> a year</> : 'Billed yearly, 2 months free'}
                  </p>
                </div>
                <ul className="flex flex-1 flex-col gap-2.5 border-t border-line-row pt-4 text-13 text-fg-strong">
                  {[p.users, p.split, 'The full iBroka platform'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="size-icon-sm text-primary" aria-hidden>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={p.variant} fullWidth>
                  {p.cta}
                </Button>
              </div>
            );
          })}
        </div>
        <p className="text-15 text-fg-muted">
          Need more users or several branches?{' '}
          <a href="#" className="rounded font-semibold text-primary hover:underline ib-focus">
            Talk to sales
          </a>
        </p>
      </Container>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" className="bg-surface">
      <Container className="flex max-w-dialog-lg flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>FAQ</Eyebrow>
          <Heading size="section" className="text-fg-strong">
            Questions, answered
          </Heading>
        </div>
        <div className="flex flex-col border-t border-line-subtle">
          {FAQS.map(([q, a], k) => (
            <Accordion key={q} title={q} variant="plain" defaultOpen={k === 0}>
              <p className="text-15 text-fg-muted">{a}</p>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="bg-surface pt-0 md:pt-0">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-subtle px-6 py-16 text-center">
          <Heading size="statement" className="max-w-3xl text-fg-strong">
            Let's talk about your brokerage
          </Heading>
          <Lead className="max-w-xl">See how iBroka runs your clients, policies, premiums and remittances from one platform.</Lead>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              Try for free
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Footer() {
  const cols: Array<[string, string[]]> = [
    ['Platform', ['Clients & leads', 'Policies', 'Claims', 'Payment & invoice', 'Reports']],
    ['Company', ['Why iBroka', 'Our promises', 'Pricing', 'FAQs']],
  ];
  return (
    <footer className="bg-secondary pb-8 pt-16 text-fg-inverse">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo height={28} inverse className="w-auto self-start" />
            <p className="text-13 opacity-80">Easy-to-manage, fully integrated software for insurance brokers.</p>
            <p className="text-13 font-semibold text-brand">iBroka by Wragby Solutions</p>
          </div>
          {cols.map(([h, items]) => (
            <div key={h} className="flex flex-col gap-3 text-13">
              <h2 className="text-15 font-semibold">{h}</h2>
              {items.map((it) => (
                <a key={it} href="#" className="rounded opacity-80 hover:opacity-100 ib-focus">
                  {it}
                </a>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3 text-13">
            <h2 className="text-15 font-semibold">Contact</h2>
            <span className="flex items-center gap-2.5 opacity-80">
              <span className="size-icon-sm text-brand" aria-hidden>
                <LocationIcon />
              </span>
              21, Olubunmi Rotimi Street, Lagos
            </span>
            <a href="mailto:info@wragbysolutions.com" className="flex items-center gap-2.5 rounded opacity-80 hover:opacity-100 ib-focus">
              <span className="size-icon-sm text-brand" aria-hidden>
                <MailIcon />
              </span>
              info@wragbysolutions.com
            </a>
            <a href="tel:+2349087733358" className="flex items-center gap-2.5 rounded opacity-80 hover:opacity-100 ib-focus">
              <span className="size-icon-sm text-brand" aria-hidden>
                <PhoneIcon />
              </span>
              +234 908 773 3358
            </a>
            <div className="mt-2 flex gap-2">
              {[
                ['Facebook', <FacebookIcon key="f" />],
                ['X', <XSocialIcon key="x" />],
                ['Instagram', <InstagramIcon key="i" />],
              ].map(([l, icon]) => (
                <a key={l as string} href="#" aria-label={`iBroka on ${l}`} className="inline-flex size-control-md items-center justify-center rounded-full border border-white/25 hover:bg-white/10 ib-focus">
                  <span className="size-icon-sm">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-12 opacity-70">
          <span>© 2026 iBroka. All rights reserved.</span>
          <span className="flex gap-5">
            <a href="#" className="rounded hover:underline ib-focus">
              Terms & conditions
            </a>
            <a href="#" className="rounded hover:underline ib-focus">
              Privacy policy
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

/** iBroka marketing home page, built from the design-system library. Layout after the Wise home page. */
export function HomePage() {
  return (
    <div className="bg-surface-page font-sans text-fg-strong">
      <Hero />
      <HeroCards />
      <TrustRow />
      <RemittancePanel />
      <ClassStrip />
      <FeatureTrio />
      <ModuleExplorer />
      <Facts />
      <Statement />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
