import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Buildings2Icon,
  LucideSearchIcon,
  LucideAwardIcon,
  LucideCalendarIcon,
  LucideChartLineIcon,
  LucideCheckIcon,
  LucideInboxIcon,
  LucideKeyIcon,
  LucideMailIcon,
  LucidePhoneIcon,
  PeopleIcon,
  Profile2UserIcon,
  SolarPlanetLinearIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from '@ds';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteButtonLink } from '../components/SiteButton';
import { PlanCards } from '../components/PlanCards';
import { CropShot, FullShot, SkewShot, type ShotId } from '../components/MarketingShots';
import whyHandshake from '../assets/home/why-handshake.png';
import partnerMicrosoft from '../assets/home/partner-microsoft.png';
import partnerAws from '../assets/home/partner-aws.png';
import partnerHuawei from '../assets/home/partner-huawei.png';

/*
 * Concept homepage. Not in Figma: it takes the section order of a classic corporate site
 * (utility bar → photo hero → overlapping modules card → values band → resources → closing band → footer)
 * and fills it with wCRM's own copy, design-system tokens and the site's existing components.
 *
 * - /concept: the layout with a labelled placeholder wherever a product screenshot or 3D icon will go
 *   (the hero photo stays).
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

/** Check mark for short benefit lists, from the design-system icon set. */
function Check() {
  return (
    <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-navy-subtle text-accent-navy">
      <LucideCheckIcon strokeWidth={2} className="size-3.5" />
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
    <div className={align === 'center' ? 'flex w-site-section-head flex-col items-center gap-4 text-center' : 'flex flex-col gap-4'}>
      <h2 id={id} className="font-display text-site-section leading-120 text-site-ink">{title}</h2>
      <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-primary" />
      {lead && <p className="text-site-lead leading-150 text-text-slate">{lead}</p>}
    </div>
  );
}

/* 1 · Utility bar ------------------------------------------------------------------------------------------- */

function UtilityBar() {
  return (
    <div className="flex items-center justify-between bg-site-midnight px-50 py-2 text-caption text-site-on-dark-muted">
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

/* 2 · Photo hero ------------------------------------------------------------------------------------------- */

/* SAP is left out here: its exported mark does not read on the dark photo. */
const PARTNERS = [
  { name: 'Microsoft', src: partnerMicrosoft },
  { name: 'AWS', src: partnerAws },
  { name: 'Huawei', src: partnerHuawei },
];

function Hero({ suggest }: { suggest: boolean }) {
  return (
    <section className="relative flex items-center gap-16 overflow-hidden bg-site-midnight px-50 pb-40 pt-25">
      <img src={whyHandshake} alt="" className="absolute inset-0 size-full object-cover opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-site-hero-scrim opacity-90" />
      <div className="relative flex w-site-split-media flex-col gap-6 text-text-inverse">
        <p className="text-overline uppercase tracking-wide text-site-on-dark-muted">wCRM · Business Development</p>
        <h1 className="font-display text-site-hero">
          What makes wCRM different: <span className="text-brand-primary">one CRM from first call to closed deal.</span>
        </h1>
        <p className="text-site-lead leading-150 text-site-on-dark-muted">
          Contacts, deals, activities, budgets and targets in one place, so your team spends its time selling instead of chasing spreadsheets.
        </p>
        <div className="flex items-center gap-4">
          <SiteButtonLink to="/pricing" variant="header">Start 14-day free trial</SiteButtonLink>
          <Link
            to="/contact"
            className="rounded-callout border border-text-inverse px-6 py-3 text-body font-medium text-text-inverse hover:bg-site-divider-on-dark focus-visible:outline-none focus-visible:shadow-focus"
          >
            Talk to sales
          </Link>
        </div>
        <div className="flex items-center gap-6 pt-6">
          <p className="text-caption font-semibold uppercase text-site-on-dark-muted">Works with</p>
          <ul className="flex items-center">
            {PARTNERS.map((p) => (
              <li key={p.name} className="h-site-partner-h w-site-partner">
                <img src={p.src} alt={p.name} className="size-full object-bottom opacity-80 brightness-0 invert" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {suggest && (
        <div className="relative flex flex-1 flex-col gap-4">
          <Note n={1} title="Show the product above the fold">
            Keep the photo, but float a cropped Deals screen over it so visitors see the software in the first view, not only a handshake.
          </Note>
          <div className="rounded-xl bg-surface-default p-2 shadow-lg">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <CropShot id="deals" name="hero-deals" focus={{ x: 0, y: 0, w: 1100 }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* 3 · Overlapping "What wCRM does" card ------------------------------------------------------------------- */

/*
 * The seven Business Development modules as a bento grid: each card holds a product widget (built on design-system
 * tokens, with sample data) or a screenshot placeholder, with the module's title and description over the bottom on
 * a soft vignette. Icons are the ones the product sidebar uses (NavMenu.fixtures `businessSections`).
 */
type Module = { title: string; body: string; icon: DsIcon; to?: string };

const M: Record<'budgets' | 'reports' | 'deals' | 'companies' | 'contacts' | 'activity' | 'orbit', Module> = {
  budgets: { title: 'Budgets', body: 'Plan budgets by period and department, and measure achievement against closed deals.', icon: { Icon: LucideChartLineIcon, stroke: 1 }, to: '/features/budget-targets' },
  reports: { title: 'Reports', body: 'Performance, activity, collaboration and task reports, with breakdowns you can export for reviews.', icon: { Icon: LucideInboxIcon, stroke: 1 }, to: '/features/activities-reporting' },
  deals: { title: 'Deals', body: 'Track every opportunity from qualification to closure with pipelines, deal stages and ownership controls.', icon: { Icon: PeopleIcon, stroke: 1.5 }, to: '/features/deal-management' },
  companies: { title: 'Companies', body: 'Every account you sell to on one record, with its contacts, owners and deals.', icon: { Icon: Buildings2Icon, stroke: 1.5 } },
  contacts: { title: 'Contacts', body: 'Search customer profiles, import lists and give every contact an owner.', icon: { Icon: Profile2UserIcon, stroke: 1.5 }, to: '/features/contact-management' },
  activity: { title: 'Activity', body: 'Calls, meetings, emails and tasks in one timeline, synced from Microsoft 365 or Google.', icon: { Icon: LucideCalendarIcon, stroke: 1 } },
  orbit: { title: 'Orbit AI', body: 'An assistant built into wCRM that finds answers in your pipeline, contacts and activity.', icon: { Icon: SolarPlanetLinearIcon, stroke: 1.25 } },
};

/** Bento card: visual fills the card; title and description sit over a bottom vignette. */
function BentoCard({ m, tone, span, children }: { m: Module; tone: 'light' | 'dark'; span: string; children: ReactNode }) {
  const dark = tone === 'dark';
  return (
    <article className={cn('group relative h-site-bento-row overflow-hidden rounded-xl transition duration-base ease-standard hover:-translate-y-1 hover:shadow-lg', span, dark ? 'bg-site-midnight' : 'border border-border-default bg-surface-subtle')}>
      <div className="absolute inset-0">{children}</div>
      <div aria-hidden="true" className={cn('absolute inset-x-0 bottom-0 h-3/5', dark ? 'bg-site-vignette-dark opacity-90' : 'bg-site-vignette-light')} />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className={cn('flex items-center gap-2 font-display text-heading-xl', dark ? 'text-text-inverse' : 'text-site-ink')}>
            <m.icon.Icon aria-hidden="true" strokeWidth={m.icon.stroke} className={cn('size-5', dark ? 'text-site-on-dark-muted' : 'text-accent-navy')} />
            {m.title}
          </h3>
          <p className={cn('text-body-sm leading-150', dark ? 'text-site-on-dark-muted' : 'text-text-slate')}>{m.body}</p>
        </div>
        {m.to && (
          <Link
            to={m.to}
            aria-label={`Learn more about ${m.title}`}
            className={cn('flex size-10 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:shadow-focus', dark ? 'bg-surface-default text-site-ink hover:bg-brand-primary hover:text-text-inverse' : 'bg-site-ink text-text-inverse hover:bg-brand-primary')}
          >
            <span aria-hidden="true" className="transition-transform duration-base group-hover:-translate-y-px group-hover:translate-x-px">↗</span>
          </Link>
        )}
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
          <span key={w.d} className={cn('flex flex-col items-center rounded-pill px-2.5 py-1.5', i === 1 ? 'bg-site-ink text-text-inverse' : 'text-text-secondary')}>
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
      <p className="self-end rounded-xl rounded-br-xs bg-surface-default px-3.5 py-2 text-body-sm text-site-ink">Which deals close this month?</p>
      <p className="flex items-start gap-2 self-start rounded-xl rounded-bl-xs border border-site-divider-on-dark px-3.5 py-2 text-body-sm text-text-inverse">
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
            <line key={y} x1="0" x2="600" y1={y} y2={y} strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-site-divider-on-dark" />
          ))}
          <line x1="380" x2="380" y1="0" y2="160" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-site-on-dark-muted" />
          <path d={CHART_PATH} fill="none" strokeWidth="2.5" vectorEffect="non-scaling-stroke" className="stroke-surface-default" />
        </svg>
        <span style={{ left: '63.3%', top: '60%' }} className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-brand-primary bg-surface-default" />
        <span style={{ left: '63.3%', top: '8%' }} className="absolute -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-default px-2.5 py-1 text-caption text-site-ink shadow-md">
          April, <b>₦75M</b>
        </span>
      </div>
      <div className="flex justify-between text-caption text-site-on-dark-muted">
        {MONTHS.map((m) => (
          <span key={m} className={m === 'Apr' ? 'text-text-inverse' : undefined}>{m}</span>
        ))}
      </div>
    </Widget>
  );
}

function Modules() {
  return (
    <section aria-labelledby="modules" className="relative -mt-30 px-50">
      <div className="flex flex-col items-center gap-12 rounded-xl border border-border-default bg-surface-default p-8 pt-14 shadow-lg">
        <SectionHead id="modules" title="What wCRM does" lead="Seven Business Development modules, all working from the same customer record." />
        <div className="grid w-full grid-cols-6 gap-4">
          <BentoCard m={M.deals} tone="dark" span="col-span-4">
            <SkewShot id="deals" />
          </BentoCard>
          <BentoCard m={M.activity} tone="light" span="col-span-2">
            <ActivityWidget />
          </BentoCard>
          <BentoCard m={M.budgets} tone="light" span="col-span-2">
            <BudgetWidget />
          </BentoCard>
          <BentoCard m={M.contacts} tone="light" span="col-span-2">
            <ContactsWidget />
          </BentoCard>
          <BentoCard m={M.orbit} tone="dark" span="col-span-2">
            <OrbitWidget />
          </BentoCard>
          <BentoCard m={M.companies} tone="dark" span="col-span-2">
            <CropShot id="companies" name="companies" focus={{ x: 233, y: 70, w: 640 }} />
          </BentoCard>
          <BentoCard m={M.reports} tone="dark" span="col-span-4">
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
    <section aria-label="Customers" className="flex flex-col gap-10 px-50 pt-20">
      <Note n={2} title="Add proof between “what it does” and “see it at work”">
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

/* 4 · Product tour (design-system Tabs) ------------------------------------------------------------------- */

const SCREENS: { id: ShotId; label: string; points: string[] }[] = [
  { id: 'deals', label: 'Deals', points: ['Open, won and lost totals above the register', 'Profit and expected profit on every deal', 'Stage changes in one click'] },
  { id: 'contacts', label: 'Contacts', points: ['Import the lists you already keep', 'An owner on every contact', 'Search by name, email or company'] },
  { id: 'reports', label: 'Reports', points: ['Goal realization at a glance', 'Revenue by business stream', 'Export for reviews and board packs'] },
  { id: 'budgets', label: 'Budgets', points: ['Targets split by team and practice area', 'Achieved from closed deals', 'Variance per allocation'] },
];

function ProductTour() {
  return (
    <section aria-labelledby="tour" className="flex flex-col items-center gap-10 px-50 pb-20 pt-25">
      <SectionHead id="tour" title="See it at work" lead="The same screens your team will use on day one." />
      <Tabs defaultValue="deals" className="w-full items-center">
        <TabsList className="self-center">
          {SCREENS.map((s) => (
            <TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>
          ))}
        </TabsList>
        {SCREENS.map((s) => (
          <TabsContent key={s.id} value={s.id} className="w-full">
            <div className="flex items-center gap-12">
              <ul className="flex w-site-footer-brand shrink-0 flex-col gap-6">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-site-lead leading-150 text-site-ink">
                    <Check />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-default shadow-lg">
                <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border-default bg-surface-subtle px-4 py-3">
                  <span className="size-2.5 rounded-full bg-status-danger" />
                  <span className="size-2.5 rounded-full bg-status-warning-bright" />
                  <span className="size-2.5 rounded-full bg-status-success" />
                  <span className="ml-4 flex-1 rounded-full bg-surface-sunken px-3 py-0.5 text-caption-xs text-text-muted">app.wcrm.com/{s.id}</span>
                </div>
                <FullShot id={s.id} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
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
    <ul className={suggest ? 'grid flex-1 grid-cols-2 gap-10' : 'grid w-full grid-cols-4 gap-10'}>
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
    <section aria-labelledby="foundation" className="flex flex-col items-center gap-14 bg-accent-navy-subtle px-50 py-20">
      <SectionHead id="foundation" title="Our solid foundation" />
      {suggest ? (
        <>
          <Note n={3} title="Give the values band a photo">
            Four icon columns in a row repeat the modules card above. A stock photo of a team working together, with the values in a 2 × 2 grid beside it, breaks up the icon-heavy middle of the page.
          </Note>
          <div className="flex w-full items-center gap-16">
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

/* 6 · Resources & updates ---------------------------------------------------------------------------------- */

/* Placeholder articles: titles show the kind of content the section is for; nothing here is published yet. */
const UPDATES = [
  { tag: 'Guide', title: 'Setting up stages that match how your team sells', body: 'Define reusable deal stages and pipelines that guide every opportunity from qualification to closure.', icon: 'Gear (pipeline setup)', stock: 'Whiteboard with a sales pipeline sketched on it' },
  { tag: 'Product', title: 'Bring Microsoft 365 and Google activity into wCRM', body: 'Emails and calendar events now land on the contact and deal they belong to.', icon: 'Notepad and pen (activity logging)', stock: 'Laptop with an inbox and calendar open' },
  { tag: 'Webinar', title: 'Planning next year’s sales budget by team', body: 'Allocate targets across practice areas and watch variance as deals close.', icon: 'Head with chart (targets)', stock: 'Presenter in front of a room, mid-talk' },
];

function Updates({ suggest }: { suggest: boolean }) {
  return (
    <section aria-labelledby="updates" className="flex flex-col items-center gap-14 px-50 py-20">
      <SectionHead id="updates" title="Resources & updates" />
      {suggest && (
        <Note n={4} title="Use stock photos here, not screenshots or 3D icons">
          A customer story is about people, so lead with a photo of a sales team rather than a product screen. The glossy red 3D icons clash with the photographic hero; one photo per article (or a single consistent illustration set) reads as editorial content.
        </Note>
      )}
      <div className="grid w-full grid-cols-2 gap-12">
        <article className="group flex flex-col gap-5">
          {suggest ? (
            <Placeholder kind="stock" title="Sales team reviewing results together around a laptop" size="16:9" className="h-site-need-card w-full" radius="rounded-xl" />
          ) : (
            <div className="relative h-site-need-card w-full overflow-hidden rounded-xl border border-border-default bg-surface-canvas">
              <CropShot id="reports" name="reports" focus={{ x: 217 + 12, y: 63 + 4, w: 1380 }} />
            </div>
          )}
          <span className="text-overline uppercase tracking-wide text-site-red">Customer story</span>
          <h3 className="font-display text-heading-xl text-site-ink group-hover:text-site-red">How a growing sales team replaced five spreadsheets with one pipeline</h3>
          <p className="text-body leading-150 text-text-slate">From scattered trackers to a single register of contacts, deals and targets, and a weekly report that builds itself.</p>
        </article>
        <ul className="flex flex-col divide-y divide-border-default">
          {UPDATES.map((u) => (
            <li key={u.title} className="group flex gap-6 py-6 first:pt-0">
              {suggest ? (
                <Placeholder kind="stock" title={u.stock} className="h-site-need-img-h w-site-need-card shrink-0" />
              ) : (
                <Placeholder kind="icon" title={u.icon} size="120 × 128" className="h-site-need-img-h w-site-need-img shrink-0" />
              )}
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-overline uppercase tracking-wide text-site-red">{u.tag}</span>
                <h3 className="text-heading-3 text-site-ink group-hover:text-site-red">{u.title}</h3>
                <p className="text-body-sm leading-150 text-text-slate">{u.body}</p>
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
    <section aria-labelledby="plans" className="flex flex-col items-center gap-12 border-t border-border-default px-50 py-20">
      <SectionHead id="plans" title="Simple, transparent pricing" lead="All plans include a 14-day free trial." />
      <PlanCards />
    </section>
  );
}

/* 8 · Closing band ---------------------------------------------------------------------------------------- */

function CtaBand({ suggest }: { suggest: boolean }) {
  return (
    <section className="flex flex-col gap-6 bg-site-stats px-50 py-16 text-text-inverse">
      {suggest && (
        <Note n={5} title="Put a face next to the button">
          With the contact section gone, this is the page’s last way to reach the team. A small photo of the sales rep who answers (stock for now, a real one later) makes “Contact us” feel like talking to a person.
        </Note>
      )}
      <div className="flex items-center justify-between gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-site-title">Close deals faster with wCRM</h2>
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
        <Hero suggest={suggest} />
        <Modules />
        {suggest && <SocialProof />}
        <ProductTour />
        <Foundation suggest={suggest} />
        <Updates suggest={suggest} />
        <Pricing />
        <CtaBand suggest={suggest} />
      </main>
      <SiteFooter />
    </>
  );
}
