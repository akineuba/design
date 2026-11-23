import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  Buildings2Icon,
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
function Placeholder({ kind, title, size, className, radius = 'rounded-lg' }: { kind: PlaceholderKind; title?: string; size?: string; className?: string; radius?: string }) {
  const k = PLACEHOLDER_STYLE[kind];
  return (
    <div role="img" aria-label={`${k.label} placeholder${title ? `: ${title}` : ''}`} className={cn('relative flex items-center justify-center overflow-hidden border border-dashed', radius, k.box, className)}>
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
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-site-midnight via-site-midnight to-transparent opacity-90" />
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
            <Placeholder kind="screenshot" title="Deals register, cropped to the KPI row and first rows" size="1400 × 680, shown at about 440 wide" className="aspect-video" />
          </div>
        </div>
      )}
    </section>
  );
}

/* 3 · Overlapping "What wCRM does" card ------------------------------------------------------------------- */

/*
 * The seven Business Development modules, in the order of the product's sidebar, with its icons
 * (design system NavMenu.fixtures `businessSections`). Modules with a feature page link to it.
 */
const MODULES: { title: string; body: string; icon: DsIcon; to?: string }[] = [
  { title: 'Budgets', body: 'Plan sales budgets by period and department, split targets across teams, and measure achievement against closed deals.', icon: { Icon: LucideChartLineIcon, stroke: 1 }, to: '/features/budget-targets' },
  { title: 'Reports', body: 'Performance, activity, collaboration and task reports, with breakdowns you can export for reviews.', icon: { Icon: LucideInboxIcon, stroke: 1 }, to: '/features/activities-reporting' },
  { title: 'Deals', body: 'Track every opportunity from qualification to closure with pipelines, deal stages and ownership controls.', icon: { Icon: PeopleIcon, stroke: 1.5 }, to: '/features/deal-management' },
  { title: 'Companies', body: 'Keep every account you sell to on one record, with its contacts, owners and deals.', icon: { Icon: Buildings2Icon, stroke: 1.5 } },
  { title: 'Contacts', body: 'Store and search customer profiles, import contact lists, and keep every relationship detail to hand.', icon: { Icon: Profile2UserIcon, stroke: 1.5 }, to: '/features/contact-management' },
  { title: 'Activity', body: 'Log calls, meetings, emails and tasks in one timeline, synced from Microsoft 365 or Google.', icon: { Icon: LucideCalendarIcon, stroke: 1 } },
  { title: 'Orbit AI', body: 'An assistant built into wCRM that helps your team find answers in its pipeline, contacts and activity.', icon: { Icon: SolarPlanetLinearIcon, stroke: 1.25 } },
];

function Modules() {
  return (
    <section aria-labelledby="modules" className="relative -mt-30 px-50">
      <div className="flex flex-col items-center gap-14 rounded-xl border border-border-default bg-surface-default px-14 py-16 shadow-lg">
        <SectionHead id="modules" title="What wCRM does" lead="Seven Business Development modules, all working from the same customer record." />
        {/* Four modules on the first row, three centred on the second. */}
        <ul className="flex w-full flex-wrap justify-center gap-y-12">
          {MODULES.map((m) => (
            <li key={m.title} className="group flex basis-1/4 flex-col items-start gap-4 px-5">
              <IconTile icon={m.icon} />
              <h3 className="font-outfit text-heading-2 text-text-ink">{m.title}</h3>
              <p className="text-body-sm leading-150 text-text-slate">{m.body}</p>
              {m.to && (
                <Link to={m.to} aria-label={`Learn more about ${m.title}`} className="mt-auto flex items-center gap-1 rounded-xs text-label-sm text-site-red hover:text-brand-primary-hover focus-visible:outline-none focus-visible:shadow-focus">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
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

const SCREENS: { id: string; label: string; screen: string; points: string[] }[] = [
  { id: 'deals', label: 'Deals', screen: 'Deals register: KPI row (total, open, won, lost, profit) and the deals table', points: ['Open, won and lost totals above the register', 'Profit and expected profit on every deal', 'Stage changes in one click'] },
  { id: 'contacts', label: 'Contacts', screen: 'Contacts register: search, owners and company columns', points: ['Import the lists you already keep', 'An owner on every contact', 'Search by name, email or company'] },
  { id: 'reports', label: 'Reports', screen: 'Reports: goal realization, revenue contribution, target vs achievement', points: ['Goal realization at a glance', 'Revenue by business stream', 'Export for reviews and board packs'] },
  { id: 'budget', label: 'Budget & Targets', screen: 'Budget allocations: target, achieved, variance by practice area', points: ['Targets split by team and practice area', 'Achieved from closed deals', 'Variance per allocation'] },
];

function ProductTour({ suggest }: { suggest: boolean }) {
  return (
    <section aria-labelledby="tour" className="flex flex-col items-center gap-10 px-50 pb-20 pt-25">
      <SectionHead id="tour" title="See it at work" lead="The same screens your team will use on day one." />
      {suggest && (
        <Note n={3} title="Keep real screenshots here, and frame them">
          Stock photos can’t show the product, so this is the one place screenshots must stay. Put them in a browser frame and add three short callouts beside each, so a tab reads without zooming in.
        </Note>
      )}
      <Tabs defaultValue="deals" className="w-full items-center">
        <TabsList className="self-center">
          {SCREENS.map((s) => (
            <TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>
          ))}
        </TabsList>
        {SCREENS.map((s) => (
          <TabsContent key={s.id} value={s.id} className="w-full">
            {suggest ? (
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
                  <Placeholder kind="screenshot" title={s.screen} size="1400 × 680" className="aspect-video border-0" radius="rounded-none" />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-border-default bg-surface-subtle p-3 shadow-md">
                <Placeholder kind="screenshot" title={s.screen} size="1400 × 680, cropped to the top" className="h-site-split-media-h w-full" />
              </div>
            )}
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
          <Note n={4} title="Give the values band a photo">
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
        <Note n={5} title="Use stock photos here, not screenshots or 3D icons">
          A customer story is about people, so lead with a photo of a sales team rather than a product screen. The glossy red 3D icons clash with the photographic hero; one photo per article (or a single consistent illustration set) reads as editorial content.
        </Note>
      )}
      <div className="grid w-full grid-cols-2 gap-12">
        <article className="group flex flex-col gap-5">
          {suggest ? (
            <Placeholder kind="stock" title="Sales team reviewing results together around a laptop" size="16:9" className="h-site-need-card w-full" radius="rounded-xl" />
          ) : (
            <Placeholder kind="screenshot" title="Reports: goal realization and target vs achievement" size="1400 × 725, cropped to the top" className="h-site-need-card w-full" radius="rounded-xl" />
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
        <Note n={6} title="Put a face next to the button">
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
        <ProductTour suggest={suggest} />
        <Foundation suggest={suggest} />
        <Updates suggest={suggest} />
        <Pricing />
        <CtaBand suggest={suggest} />
      </main>
      <SiteFooter />
    </>
  );
}
