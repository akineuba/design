import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Buildings2Icon,
  LucideSearchIcon,
  LucideAwardIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideInboxIcon,
  LucideKeyIcon,
  LucideMailIcon,
  LucidePhoneIcon,
  PeopleIcon,
  Profile2UserIcon,
  SolarPlanetLinearIcon,
  cn,
} from '@ds';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteButtonLink } from '../components/SiteButton';
import { InsetShot } from '../components/MarketingShots';
import { HeroDeals } from '../components/concept/HeroDeals';
import { MeetingCloseUp, StageCloseUp, TargetCloseUp } from '../components/concept/DealStory';
import { ConceptPlans } from '../components/concept/ConceptPlans';
import streamlineHandshake from '../assets/concept/streamline-handshake.webp';
import icon3dGear from '../assets/concept/icon3d-gear.png';
import icon3dHandshake from '../assets/concept/icon3d-handshake.png';
import icon3dNotepad from '../assets/concept/icon3d-notepad.png';
import partnerMicrosoft from '../assets/home/partner-microsoft.png';
import partnerAws from '../assets/home/partner-aws.png';
import partnerHuawei from '../assets/home/partner-huawei.png';

/*
 * Concept homepage. Not in Figma: it takes the section order of a classic corporate site
 * (utility bar → hero → overlapping modules card → values band → resources → closing band → footer)
 * and fills it with wCRM's own copy, design-system tokens and the site's existing components.
 *
 * - /concept: the page. Mobile-first: one column on phones, the desktop layout from the `lg` breakpoint.
 * - /concept/suggestions: the same page with proposed changes (stock photos, social proof, map, …), each marked
 *   with a numbered note.
 * Icons are the design-system glyphs used in the product's Business Development sidebar.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** A design-system icon with the stroke that evens out its source grid at the display size (see SiteHeader FEATURE_LINKS). */
type DsIcon = { Icon: Icon; stroke: number };

/**
 * Icon in a square tile. Glyphs are the design-system icons the Business Development sidebar uses
 * (NavMenu.fixtures `businessSections`), drawn as outlines in navy.
 */
function IconTile({ icon, tone = 'subtle' }: { icon: DsIcon; tone?: 'subtle' | 'surface' }) {
  return (
    <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-tile border text-accent-navy transition-transform duration-base ease-standard group-hover:-translate-y-1', tone === 'subtle' ? 'border-accent-navy-subtle bg-accent-navy-subtle' : 'border-border-default bg-surface-default')}>
      <icon.Icon aria-hidden="true" strokeWidth={icon.stroke} className="size-6" />
    </span>
  );
}

type PlaceholderKind = 'screenshot' | 'icon' | 'stock' | 'map' | 'logo';

const PLACEHOLDER_STYLE: Record<PlaceholderKind, { label: string; box: string }> = {
  screenshot: { label: 'Product screenshot', box: 'border-accent-navy bg-accent-navy-subtle text-accent-navy' },
  icon: { label: '3D icon', box: 'border-brand-primary bg-brand-primary-subtle text-brand-primary' },
  stock: { label: 'Stock photo', box: 'border-status-success-strong bg-status-success-subtle text-status-success-text' },
  map: { label: 'Map', box: 'border-border-muted bg-surface-sunken text-text-secondary' },
  logo: { label: 'Logo', box: 'border-border-muted bg-surface-sunken text-text-muted' },
};

/** Wireframe placeholder: dashed box with a cross, the kind of asset and what it should show. */
function Placeholder({ kind, title, size, className, radius = 'rounded-lg', align = 'center' }: { kind: PlaceholderKind; title?: string; size?: string; className?: string; radius?: string; align?: 'center' | 'top' }) {
  const k = PLACEHOLDER_STYLE[kind];
  return (
    <div role="img" aria-label={`${k.label} placeholder${title ? `: ${title}` : ''}`} className={cn('relative flex justify-center overflow-hidden border border-dashed', align === 'top' ? 'items-start pt-8' : 'items-center', radius, k.box, className)}>
      <svg aria-hidden="true" className="absolute inset-0 size-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative flex flex-col items-center gap-1 rounded-md bg-surface-default px-3 py-2 text-center shadow-sm">
        <span className="text-badge uppercase tracking-wide">{k.label}</span>
        {title && <span className="text-caption text-text-primary">{title}</span>}
        {size && <span className="text-caption-xs text-text-muted">{size}</span>}
      </div>
    </div>
  );
}

/** Numbered design suggestion, shown only on /concept/suggestions. */
function Note({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <aside className="flex w-full items-start gap-3 rounded-md border border-alert-warning-border bg-alert-warning-bg p-4 text-left">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-alert-warning-icon text-badge text-text-inverse">{n}</span>
      <div className="flex flex-col gap-1">
        <p className="text-label text-alert-warning-title">Suggestion {n}: {title}</p>
        <p className="text-body-sm leading-150 text-alert-warning-body">{children}</p>
      </div>
    </aside>
  );
}

/** Section heading with the short red rule under it (the screenshot's teal rule, in wCRM red). */
function SectionHead({ id, title, lead, align = 'center' }: { id: string; title: string; lead?: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'flex w-full flex-col items-center gap-4 text-center lg:w-site-section-head' : 'flex flex-col gap-4'}>
      <h2 id={id} className="font-display text-display leading-120 text-site-ink lg:text-site-section">{title}</h2>
      <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-primary" />
      {lead && <p className="text-site-lead leading-150 text-text-slate">{lead}</p>}
    </div>
  );
}

/** Round arrow link on a card (the "see more" of that card). */
function ArrowLink({ to, label, className }: { to: string; label: string; className?: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={cn('group/arrow flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-text-inverse transition-colors hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:shadow-focus', className)}
    >
      <span aria-hidden="true" className="transition-transform duration-base group-hover/arrow:-translate-y-px group-hover/arrow:translate-x-px">↗</span>
    </Link>
  );
}

/* 1 · Utility bar ------------------------------------------------------------------------------------------- */

function UtilityBar() {
  return (
    <div className="hidden items-center justify-between bg-site-midnight px-50 py-2 text-caption text-site-on-dark-muted lg:flex">
      <p className="flex items-center gap-2">
        <span className="rounded-full bg-brand-primary px-2 py-0.5 text-badge uppercase text-text-inverse">New</span>
        Email and calendar sync for Microsoft 365 and Google
      </p>
      <p className="flex items-center gap-6">
        <a href="mailto:info@wragbysolutions.com" className="flex items-center gap-1.5 hover:text-text-inverse">
          <LucideMailIcon aria-hidden="true" className="size-3.5" />
          info@wragbysolutions.com
        </a>
        <a href="tel:+2342017006320" className="flex items-center gap-1.5 hover:text-text-inverse">
          <LucidePhoneIcon aria-hidden="true" className="size-3.5" />
          +234 201 700 6320
        </a>
      </p>
    </div>
  );
}

/* 2 · Hero ------------------------------------------------------------------------------------------------- */

const PARTNERS = [
  { name: 'Microsoft', src: partnerMicrosoft },
  { name: 'AWS', src: partnerAws },
  { name: 'Huawei', src: partnerHuawei },
];

/*
 * Hero: the promise on the left and, beside it, the Deals view with the open pipeline (HeroDeals), drawn on theme
 * tokens so it is light or dark with the page. Phones stack the copy above the view.
 */
function Hero() {
  return (
    <section className="flex flex-col gap-10 bg-surface-canvas px-5 pb-40 pt-12 lg:flex-row lg:items-center lg:gap-16 lg:px-50 lg:pt-20">
      <div className="flex flex-col gap-6 lg:w-site-hero-copy lg:shrink-0">
        <p className="text-overline uppercase tracking-wide text-text-secondary">wCRM · Business Development</p>
        <h1 className="font-display text-site-section leading-120 text-site-ink lg:text-site-hero">
          Track deals, profit and sales targets <span className="text-brand-primary">in one CRM</span>
        </h1>
        <p className="text-site-lead leading-150 text-text-slate">
          See your open pipeline, log every call and meeting, and watch each won deal count towards your team&apos;s target.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <SiteButtonLink to="/pricing" variant="header">Start 14-day free trial</SiteButtonLink>
          <SiteButtonLink to="/contact" variant="header-outline">Talk to sales</SiteButtonLink>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
          <p className="text-caption font-semibold uppercase text-text-secondary">Works with</p>
          <ul className="flex items-center">
            {PARTNERS.map((p) => (
              <li key={p.name} className="h-site-partner-h w-site-partner">
                <img src={p.src} alt={p.name} className="site-invert-dark size-full object-bottom" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <HeroDeals />
      </div>
    </section>
  );
}

/* 3 · Overlapping "What wCRM does" card ------------------------------------------------------------------- */

/*
 * The seven Business Development modules as a bento grid: each card holds a product widget (built on design-system
 * tokens, with sample data) or a screenshot placeholder, with the module's title and description over the bottom on
 * a soft vignette. Icons are the ones the product sidebar uses (NavMenu.fixtures `businessSections`).
 */
type Module = { title: string; body: string; icon: DsIcon; to: string };

const M: Record<'budgets' | 'reports' | 'deals' | 'companies' | 'contacts' | 'activity' | 'orbit', Module> = {
  budgets: { title: 'Budgets', body: 'Plan budgets by period and department, and measure achievement against closed deals.', icon: { Icon: LucideChartLineIcon, stroke: 1 }, to: '/features/budget-targets' },
  reports: { title: 'Reports', body: 'Performance, activity, collaboration and task reports, with breakdowns you can export for reviews.', icon: { Icon: LucideInboxIcon, stroke: 1 }, to: '/features/activities-reporting' },
  deals: { title: 'Deals', body: 'Track every opportunity from qualification to closure with pipelines, deal stages and ownership controls.', icon: { Icon: PeopleIcon, stroke: 1.5 }, to: '/features/deal-management' },
  companies: { title: 'Companies', body: 'Every account you sell to on one record, with its contacts, owners and deals.', icon: { Icon: Buildings2Icon, stroke: 1.5 }, to: '/features/contact-management' },
  contacts: { title: 'Contacts', body: 'Search customer profiles, import lists and give every contact an owner.', icon: { Icon: Profile2UserIcon, stroke: 1.5 }, to: '/features/contact-management' },
  activity: { title: 'Activity', body: 'Calls, meetings, emails and tasks in one timeline, synced from Microsoft 365 or Google.', icon: { Icon: LucideCalendarIcon, stroke: 1 }, to: '/features/activities-reporting' },
  orbit: { title: 'Orbit AI', body: 'An assistant built into wCRM that finds answers in your pipeline, contacts and activity.', icon: { Icon: SolarPlanetLinearIcon, stroke: 1.25 }, to: '/contact?topic=Orbit%20AI' },
};

/**
 * Bento card: visual fills the card; title and description sit over a bottom vignette. Card, vignette and text are
 * theme tokens, so the card is light on the light theme and dark on the dark theme.
 */
function BentoCard({ m, span, children }: { m: Module; span: string; children: ReactNode }) {
  return (
    <article className={cn('group relative h-site-bento-row overflow-hidden rounded-xl border border-border-default bg-surface-subtle transition duration-base ease-standard hover:-translate-y-1 hover:shadow-lg', span)}>
      {/* `span` is the desktop column span (lg:col-span-*); phones show one card per row. */}
      <div className="absolute inset-0">{children}</div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-site-vignette" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="flex items-center gap-2 font-display text-heading-xl text-site-ink">
            <m.icon.Icon aria-hidden="true" strokeWidth={m.icon.stroke} className="size-5 text-accent-navy" />
            {m.title}
          </h3>
          <p className="text-body-sm leading-150 text-text-slate">{m.body}</p>
        </div>
        <ArrowLink to={m.to} label={`See more about ${m.title}`} />
      </div>
    </article>
  );
}

/* Widgets (illustrations, sample data). Each is inert and labelled as one image. */

function Widget({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={cn('absolute inset-x-6 top-6', className)}>
      <div aria-hidden="true" className="contents">{children}</div>
    </div>
  );
}

const WEEK = [
  { d: 17, day: 'Mon' }, { d: 18, day: 'Tue' }, { d: 19, day: 'Wed' }, { d: 20, day: 'Thu' }, { d: 21, day: 'Fri' },
];

function ActivityWidget() {
  return (
    <Widget label="Activity widget: this week's calls and meetings against plan" className="flex flex-col gap-3">
      <div className="flex justify-between rounded-pill bg-surface-default p-1 shadow-sm">
        {WEEK.map((w, i) => (
          <span key={w.d} className={cn('flex flex-col items-center rounded-pill px-2.5 py-1.5', i === 1 ? 'bg-brand-primary text-text-inverse' : 'text-text-secondary')}>
            <span className="text-label-sm">{w.d}</span>
            <span className="text-caption-xs">{w.day}</span>
          </span>
        ))}
      </div>
      {[{ k: 'Calls', v: '12 / 15', pct: 'w-4/5' }, { k: 'Meetings', v: '4 / 6', pct: 'w-2/3' }].map((r) => (
        <div key={r.k} className="flex flex-col gap-1.5 rounded-lg bg-surface-default px-3 py-2 shadow-sm">
          <span className="flex justify-between text-caption"><span className="text-text-secondary">{r.k}</span><span className="font-semibold text-site-ink">{r.v}</span></span>
          <span className="h-1.5 rounded-full bg-surface-sunken"><span className={cn('block h-full rounded-full bg-brand-primary', r.pct)} /></span>
        </div>
      ))}
    </Widget>
  );
}

function BudgetWidget() {
  // Ring geometry: r = 42 in a 100-unit box; 82% of the circumference is drawn.
  const c = 2 * Math.PI * 42;
  return (
    <Widget label="Budget widget: 82% of the quarter's target achieved" className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="size-30 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" className="stroke-border-default" />
        <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * 0.82} ${c}`} className="stroke-brand-primary" />
      </svg>
      <div className="flex flex-col gap-1">
        <span className="font-onest text-heading-xl text-site-ink">82%</span>
        <span className="text-caption text-text-secondary">of Q3 target</span>
        <span className="text-caption font-semibold text-status-success-strong">₦45.2M achieved</span>
      </div>
    </Widget>
  );
}

const PEOPLE = ['Sarah Connor', 'Jane Doe', 'Yhandi Singh', 'Timi Turner'];

function ContactsWidget() {
  return (
    <Widget label="Contacts widget: contact search and owners" className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-full border border-border-default bg-surface-default px-4 py-2.5 text-body-sm text-text-placeholder shadow-sm">
        <LucideSearchIcon strokeWidth={1.5} className="size-4" />
        Search contacts…
      </div>
      <div className="flex items-center justify-between">
        <span className="flex gap-1">
          {PEOPLE.map((n) => (
            <Avatar key={n} name={n} size="md" />
          ))}
        </span>
        <span className="flex flex-col items-end">
          <span className="font-onest text-heading-xl text-site-ink">2,418</span>
          <span className="text-caption text-text-secondary">contacts</span>
        </span>
      </div>
    </Widget>
  );
}

function OrbitWidget() {
  return (
    <Widget label="Orbit AI widget: a question about this month's deals and the answer" className="flex flex-col gap-2.5">
      <p className="self-end rounded-xl rounded-br-xs bg-brand-primary px-3.5 py-2 text-body-sm text-text-inverse">Which deals close this month?</p>
      <p className="flex items-start gap-2 self-start rounded-xl rounded-bl-xs border border-border-default bg-surface-default px-3.5 py-2 text-body-sm text-text-primary shadow-sm">
        <SolarPlanetLinearIcon strokeWidth={1.25} className="mt-0.5 size-4 shrink-0 text-brand-primary" />
        6 deals, ₦38.4M expected. 2 need a follow-up this week.
      </p>
    </Widget>
  );
}

/*
 * Reports chart: achieved revenue by month (sample). Path and point positions are illustration geometry in a
 * 600 × 160 box; the highlighted point is placed by percentage so it tracks the stretched SVG.
 */
const CHART_PATH = 'M0,120 C60,120 70,40 120,40 S180,120 220,110 S280,60 320,70 S370,95 380,96 S440,50 480,55 S540,130 560,120 S590,90 600,92';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

function ReportsWidget() {
  return (
    <Widget label="Reports widget: achieved revenue by month, April highlighted at ₦75M" className="flex flex-col gap-2">
      <div className="relative h-40">
        <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {[20, 60, 100, 140].map((y) => (
            <line key={y} x1="0" x2="600" y1={y} y2={y} strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-border-default" />
          ))}
          <line x1="380" x2="380" y1="0" y2="160" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-border-strong" />
          <path d={CHART_PATH} fill="none" strokeWidth="2.5" vectorEffect="non-scaling-stroke" className="stroke-accent-navy-hover" />
        </svg>
        <span style={{ left: '63.3%', top: '60%' }} className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-brand-primary bg-surface-default" />
        <span style={{ left: '63.3%', top: '8%' }} className="absolute -translate-x-1/2 whitespace-nowrap rounded-md border border-border-default bg-surface-default px-2.5 py-1 text-caption text-site-ink shadow-md">
          April, <b>₦75M</b>
        </span>
      </div>
      <div className="flex justify-between text-caption text-text-secondary">
        {MONTHS.map((m) => (
          <span key={m} className={m === 'Apr' ? 'font-semibold text-site-ink' : undefined}>{m}</span>
        ))}
      </div>
    </Widget>
  );
}

function Modules() {
  return (
    <section aria-labelledby="modules" className="relative -mt-30 px-5 lg:px-50">
      <div className="flex flex-col items-center gap-10 rounded-xl border border-border-default bg-surface-default p-4 pt-10 shadow-lg lg:gap-12 lg:p-8 lg:pt-14">
        <SectionHead id="modules" title="What wCRM does" lead="Seven Business Development modules, all working from the same customer record." />
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6">
          <BentoCard m={M.deals} span="lg:col-span-4">
            <InsetShot id="deals" />
          </BentoCard>
          <BentoCard m={M.activity} span="lg:col-span-2">
            <ActivityWidget />
          </BentoCard>
          <BentoCard m={M.budgets} span="lg:col-span-2">
            <BudgetWidget />
          </BentoCard>
          <BentoCard m={M.contacts} span="lg:col-span-2">
            <ContactsWidget />
          </BentoCard>
          <BentoCard m={M.orbit} span="lg:col-span-2">
            <OrbitWidget />
          </BentoCard>
          <BentoCard m={M.companies} span="lg:col-span-2">
            <InsetShot id="companies" />
          </BentoCard>
          <BentoCard m={M.reports} span="lg:col-span-4">
            <ReportsWidget />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

/* 3b · Social proof (suggestion only) -------------------------------------------------------------------- */

const STATS = [
  { value: '150+', label: 'Supported partners' },
  { value: '20K+', label: 'Satisfied customers' },
  { value: '10+', label: 'Years of experience' },
];

function SocialProof() {
  return (
    <section aria-label="Customers" className="flex flex-col gap-10 px-5 pt-20 lg:px-50">
      <Note n={1} title="Add proof between “what it does” and “see it at work”">
        The screenshot has no trust signals. A logo row, the homepage figures (once confirmed) and one named quote with a portrait answer “who uses this?” before the product tour.
      </Note>
      <div className="flex flex-col items-center gap-6">
        <p className="text-caption font-semibold uppercase text-text-icon-strong">Trusted by business development teams at</p>
        <ul className="grid w-full grid-cols-6 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}><Placeholder kind="logo" title={`Customer ${i + 1}`} className="h-12" /></li>
          ))}
        </ul>
      </div>
      <div className="flex items-stretch gap-10 rounded-xl border border-border-default bg-surface-subtle p-8">
        <Placeholder kind="stock" title="Portrait of the quoted customer (or a real photo they supply)" size="1:1" className="size-40 shrink-0" radius="rounded-full" />
        <figure className="flex flex-1 flex-col justify-center gap-4">
          <blockquote className="font-display text-heading-xl leading-140 text-site-ink">“Quote from a named customer about the result they got with wCRM.”</blockquote>
          <figcaption className="text-body text-text-slate">Name, role · Company</figcaption>
        </figure>
        <dl className="flex shrink-0 flex-col justify-center gap-4 border-l border-border-default pl-10">
          {STATS.map((st) => (
            <div key={st.label} className="flex flex-col">
              <dd className="font-onest text-heading-xl text-site-red">{st.value}</dd>
              <dt className="text-body-sm text-text-slate">{st.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 4 · See it at work: one deal, three steps -------------------------------------------------------------- */

const STORY = [
  {
    title: 'Log the meeting',
    body: 'Ifeoma records her proposal walkthrough with Bluewave on the deal itself: who was there, when, and what was agreed. The whole team sees it on the deal’s timeline.',
    view: <MeetingCloseUp />,
  },
  {
    title: 'Move the deal forward',
    body: 'Finance signs off, so she moves Cloud Backup Partnership from Proposal Sent to Closed Won in one click. The qualification score and stage stay in step with the conversation.',
    view: <StageCloseUp />,
  },
  {
    title: 'See it count towards the target',
    body: 'The ₦5,400,000 lands on the Managed Services Q4 target straight away: 78% achieved, up from 69%, with the win at the top of the list.',
    view: <TargetCloseUp />,
  },
];

function DealStorySection() {
  return (
    <section aria-labelledby="tour" className="flex flex-col items-center gap-12 px-5 py-16 lg:gap-16 lg:px-50 lg:pb-20 lg:pt-25">
      <SectionHead id="tour" title="See it at work" lead="Follow one deal, Cloud Backup Partnership for Bluewave Telecoms, from the first meeting to the sales target." />
      <ol className="flex w-full flex-col gap-14 lg:gap-20">
        {STORY.map((step, i) => (
          <li key={step.title} className={cn('flex flex-col gap-6 lg:items-center lg:gap-16', i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row')}>
            <div className="flex flex-col gap-3 lg:w-site-hero-copy lg:shrink-0">
              <span className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-primary text-label text-text-inverse">{i + 1}</span>
                <span className="text-overline uppercase tracking-wide text-site-red">Step {i + 1} of 3</span>
              </span>
              <h3 className="font-display text-heading-xl leading-140 text-site-ink lg:text-site-title lg:leading-120">{step.title}</h3>
              <p className="text-site-lead leading-150 text-text-slate">{step.body}</p>
            </div>
            <div className="min-w-0 flex-1">{step.view}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* 5 · Foundation band ------------------------------------------------------------------------------------- */

const FOUNDATION: { title: string; body: string; icon: DsIcon }[] = [
  { title: 'Customer first', body: 'Every opportunity carries its company, contacts, owner, stage and value, so nobody starts a call cold.', icon: { Icon: Profile2UserIcon, stroke: 1.5 } },
  { title: 'Integrity', body: 'Role-based access and audit trails decide who can see and change each record.', icon: { Icon: LucideKeyIcon, stroke: 1 } },
  { title: 'Insight', body: 'Live dashboards summarise deal volume, pipeline value and conversion as the work happens.', icon: { Icon: LucideChartLineIcon, stroke: 1 } },
  { title: 'Results', body: 'Targets are measured against closed deals, so achievement is a number, not an estimate.', icon: { Icon: LucideAwardIcon, stroke: 1 } },
];

function Foundation({ suggest }: { suggest: boolean }) {
  const values = (
    <ul className={suggest ? 'grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2' : 'grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'}>
        {FOUNDATION.map((f) => (
          <li key={f.title} className={suggest ? 'flex flex-col items-start gap-3' : 'flex flex-col items-center gap-3 text-center'}>
            <IconTile icon={f.icon} tone="surface" />
            <h3 className="text-label uppercase tracking-wide text-site-ink">{f.title}</h3>
            <p className="text-body-sm leading-150 text-text-slate">{f.body}</p>
          </li>
        ))}
    </ul>
  );
  return (
    <section aria-labelledby="foundation" className="flex flex-col items-center gap-10 bg-accent-navy-subtle px-5 py-16 lg:gap-14 lg:px-50 lg:py-20">
      <SectionHead id="foundation" title="Our solid foundation" />
      {suggest ? (
        <>
          <Note n={2} title="Give the values band a photo">
            Four icon columns in a row repeat the modules card above. A stock photo of a team working together, with the values in a 2 × 2 grid beside it, breaks up the icon-heavy middle of the page.
          </Note>
          <div className="flex w-full flex-col items-center gap-16 lg:flex-row">
            <Placeholder kind="stock" title="Sales team working together in a modern office (West African team, natural light)" size="4:3" className="h-site-split-media-h w-site-split-media shrink-0" radius="rounded-pill" />
            {values}
          </div>
        </>
      ) : (
        values
      )}
    </section>
  );
}

/* 6 · Streamline your sales workflow --------------------------------------------------------------------- */

/* Copy from the homepage "Streamline Your Sales Workflow" section (Figma 691:5050); 3D icons supplied for this page. */
const NEEDS = [
  { title: 'Pipeline visibility', body: 'Monitor deals across every stage with clear pipeline views and conversion insights.', img: icon3dGear },
  { title: 'Smart deal tracking', body: "Capture deal value, stage, contacts, and closure outcomes to focus your team's efforts.", img: icon3dHandshake },
  { title: 'Integrated activity logging', body: 'Sync emails and calendar events from Microsoft 365 or Google directly into CRM records.', img: icon3dNotepad },
];

function Streamline() {
  return (
    <section aria-labelledby="streamline" className="flex flex-col items-center gap-10 px-5 py-16 lg:gap-14 lg:px-50 lg:py-20">
      <SectionHead id="streamline" title="Streamline Your Sales Workflow" lead="Discover how wCRM's Business Development tools help your team manage pipelines, track deals, and hit targets." />
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
        <img src={streamlineHandshake} alt="Two colleagues shaking hands" className="aspect-video size-full rounded-xl object-cover lg:aspect-auto" />
        <ul className="flex flex-col gap-4">
          {NEEDS.map((n) => (
            <li key={n.title} className="group flex items-center gap-4 rounded-xl border border-border-default bg-surface-subtle p-4 lg:gap-5 lg:p-5 transition duration-base ease-standard hover:-translate-y-1 hover:shadow-md">
              <img src={n.img} alt="" className="size-16 shrink-0 lg:size-20 object-contain transition-transform duration-site-slow ease-standard group-hover:scale-105" />
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-outfit text-heading-2 text-site-ink">{n.title}</h3>
                <p className="text-body-sm leading-150 text-text-slate">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 7 · Pricing --------------------------------------------------------------------------------------------- */

function Pricing() {
  return (
    <section aria-labelledby="plans" className="flex flex-col items-center gap-10 border-t border-border-default px-5 py-16 lg:gap-12 lg:px-50 lg:py-20">
      <SectionHead id="plans" title="Plans and pricing" lead="Prices are for your whole team, not per seat. Standard and Pro start with a 14-day free trial; you only pay if you keep using wCRM." />
      <ConceptPlans />
    </section>
  );
}

/* 8 · Closing band ---------------------------------------------------------------------------------------- */

function CtaBand({ suggest }: { suggest: boolean }) {
  return (
    <section className="flex flex-col gap-6 bg-site-stats px-5 py-12 text-text-inverse lg:px-50 lg:py-16">
      {suggest && (
        <Note n={3} title="Put a face next to the button">
          With the contact section gone, this is the page’s last way to reach the team. A small photo of the sales rep who answers (stock for now, a real one later) makes “Contact us” feel like talking to a person.
        </Note>
      )}
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-display lg:text-site-title">Close deals faster with wCRM</h2>
        <p className="text-site-lead">Talk to our team about setting up wCRM for your business development team.</p>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/contact" className="rounded-callout bg-surface-default px-6 py-3 text-label text-site-red hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus">
          Contact us
        </Link>
        {suggest && <Placeholder kind="stock" size="Sales rep, 1:1" className="size-25 shrink-0" radius="rounded-full" />}
      </div>
      </div>
    </section>
  );
}

/** Concept homepage: a corporate-site layout applied to wCRM (/concept, /concept/suggestions). */
export function ConceptPage({ suggest = false }: { suggest?: boolean }) {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <main className="animate-page-in">
        <Hero />
        <Modules />
        {suggest && <SocialProof />}
        <DealStorySection />
        <Foundation suggest={suggest} />
        <Streamline />
        <Pricing />
        <CtaBand suggest={suggest} />
      </main>
      <SiteFooter />
    </>
  );
}
