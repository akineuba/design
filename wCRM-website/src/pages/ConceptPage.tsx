import { useState, type ComponentType, type FormEvent, type ReactNode, type SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  LucideActivityIcon,
  LucideAwardIcon,
  LucideChartLineIcon,
  LucideCheckCircleIcon,
  LucideClockIcon,
  LucideCloudSyncIcon,
  LucideLockIcon,
  LucideMailIcon,
  LucidePhoneIcon,
  LucideUserIcon,
  PeopleIcon,
  StatusUpBoldIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ds';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteButtonLink, siteButtonClass } from '../components/SiteButton';
import { CheckChip } from '../components/CheckChip';
import { PlanCards } from '../components/PlanCards';
import { ContactInput, ContactTextarea } from '../components/ContactField';
import { ActivitiesScreen, BudgetScreen, ContactsScreen, DealsScreen, ScaledScreen } from '../components/app-screens';
import whyHandshake from '../assets/home/why-handshake.png';
import needPipeline from '../assets/home/need-pipeline.png';
import needTracking from '../assets/home/need-tracking.png';
import needLogging from '../assets/home/need-logging.png';
import location from '../assets/shared/location.svg';
import partnerMicrosoft from '../assets/home/partner-microsoft.png';
import partnerAws from '../assets/home/partner-aws.png';
import partnerHuawei from '../assets/home/partner-huawei.png';

/*
 * Concept homepage (/concept). Not in Figma: it takes the section order of a classic corporate site
 * (utility bar → photo hero → overlapping services card → values band → news → contact with form → footer)
 * and fills it with wCRM's own copy, design-system tokens and the site's existing components.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-site-midnight px-50 pb-40 pt-25">
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
    </section>
  );
}

/* 3 · Overlapping "What wCRM does" card ------------------------------------------------------------------- */

const SERVICES: { title: string; body: string; icon: Icon; to?: string }[] = [
  { title: 'Contact Management', body: 'Store and search customer profiles, import contact lists, and keep every relationship detail at your fingertips.', icon: PeopleIcon, to: '/features/contact-management' },
  { title: 'Deal Management', body: 'Track every opportunity from qualification to closure with pipelines, deal stages, and ownership controls.', icon: LucideChartLineIcon, to: '/features/deal-management' },
  { title: 'Activities & Reporting', body: 'Log emails, calls, meetings, and tasks in a unified timeline with performance trends and exportable reports.', icon: LucideActivityIcon, to: '/features/activities-reporting' },
  { title: 'Budget & Targets', body: 'Plan sales budgets, distribute targets across teams, and measure achievement against closed deals.', icon: LucideAwardIcon, to: '/features/budget-targets' },
  { title: 'Email & Calendar Sync', body: 'Sync emails and calendar events from Microsoft 365 or Google directly into CRM records.', icon: LucideCloudSyncIcon },
  { title: 'Enterprise-Grade Security', body: 'Role-based access controls, end-to-end encryption, and compliance-ready audit trails.', icon: LucideLockIcon },
];

function Services() {
  return (
    <section aria-labelledby="services" className="relative -mt-30 px-50">
      <div className="flex flex-col items-center gap-14 rounded-xl border border-border-default bg-surface-default px-14 py-16 shadow-lg">
        <SectionHead id="services" title="What wCRM does" lead="Every module is built for business development teams, and they all share one customer record." />
        <ul className="grid w-full grid-cols-3 gap-x-10 gap-y-12">
          {SERVICES.map((s) => (
            <li key={s.title} className="group flex flex-col items-center gap-4 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-site-red-tint text-site-red transition-transform duration-base ease-standard group-hover:-translate-y-1">
                <s.icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
              </span>
              <h3 className="font-outfit text-heading-2 text-text-ink">{s.title}</h3>
              <p className="text-body leading-150 text-text-slate">{s.body}</p>
              {s.to && (
                <Link to={s.to} className="flex items-center gap-1 rounded-xs text-label-sm text-site-red hover:text-brand-primary-hover focus-visible:outline-none focus-visible:shadow-focus">
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

/* 4 · Product tour (design-system Tabs) ------------------------------------------------------------------- */

const SCREENS: { id: string; label: string; node: ReactNode; height: number }[] = [
  { id: 'deals', label: 'Deals', node: <DealsScreen />, height: 681 },
  { id: 'contacts', label: 'Contacts', node: <ContactsScreen />, height: 659 },
  { id: 'reports', label: 'Reports', node: <ActivitiesScreen />, height: 725 },
  { id: 'budget', label: 'Budget & Targets', node: <BudgetScreen />, height: 382 },
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
            <div className="rounded-xl border border-border-default bg-surface-subtle p-3 shadow-md">
              <div className="relative h-site-split-media-h w-full overflow-hidden rounded-lg">
                <ScaledScreen width={1400} height={s.height} fit="top" label={`${s.label} screen in wCRM`}>
                  {s.node}
                </ScaledScreen>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/* 5 · Foundation band ------------------------------------------------------------------------------------- */

const FOUNDATION: { title: string; body: string; icon: Icon }[] = [
  { title: 'Customer first', body: 'Every opportunity carries its company, contacts, owner, stage and value, so nobody starts a call cold.', icon: LucideUserIcon },
  { title: 'Integrity', body: 'Role-based access and audit trails decide who can see and change each record.', icon: LucideCheckCircleIcon },
  { title: 'Insight', body: 'Live dashboards summarise deal volume, pipeline value and conversion as the work happens.', icon: LucideChartLineIcon },
  { title: 'Results', body: 'Targets are measured against closed deals, so achievement is a number, not an estimate.', icon: StatusUpBoldIcon },
];

function Foundation() {
  return (
    <section aria-labelledby="foundation" className="flex flex-col items-center gap-14 bg-accent-navy-subtle px-50 py-20">
      <SectionHead id="foundation" title="Our solid foundation" />
      <ul className="grid w-full grid-cols-4 gap-10">
        {FOUNDATION.map((f) => (
          <li key={f.title} className="flex flex-col items-center gap-3 text-center">
            <f.icon aria-hidden="true" strokeWidth={1.5} className="size-9 text-accent-navy-hover" />
            <h3 className="text-label uppercase tracking-wide text-site-ink">{f.title}</h3>
            <p className="text-body-sm leading-150 text-text-slate">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* 6 · Resources & updates ---------------------------------------------------------------------------------- */

/* Placeholder articles: titles show the kind of content the section is for; nothing here is published yet. */
const UPDATES = [
  { tag: 'Guide', title: 'Setting up stages that match how your team sells', body: 'Define reusable deal stages and pipelines that guide every opportunity from qualification to closure.', img: needPipeline },
  { tag: 'Product', title: 'Bring Microsoft 365 and Google activity into wCRM', body: 'Emails and calendar events now land on the contact and deal they belong to.', img: needLogging },
  { tag: 'Webinar', title: 'Planning next year’s sales budget by team', body: 'Allocate targets across practice areas and watch variance as deals close.', img: needTracking },
];

function Updates() {
  return (
    <section aria-labelledby="updates" className="flex flex-col items-center gap-14 px-50 py-20">
      <SectionHead id="updates" title="Resources & updates" />
      <div className="grid w-full grid-cols-2 gap-12">
        <article className="group flex flex-col gap-5">
          <div className="relative h-site-need-card w-full overflow-hidden rounded-xl border border-border-default">
            <ScaledScreen width={1400} height={725} fit="top" label="Reports screen in wCRM">
              <ActivitiesScreen />
            </ScaledScreen>
          </div>
          <span className="text-overline uppercase tracking-wide text-site-red">Customer story</span>
          <h3 className="font-display text-heading-xl text-site-ink group-hover:text-site-red">How a growing sales team replaced five spreadsheets with one pipeline</h3>
          <p className="text-body leading-150 text-text-slate">From scattered trackers to a single register of contacts, deals and targets, and a weekly report that builds itself.</p>
        </article>
        <ul className="flex flex-col divide-y divide-border-default">
          {UPDATES.map((u) => (
            <li key={u.title} className="group flex gap-6 py-6 first:pt-0">
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-overline uppercase tracking-wide text-site-red">{u.tag}</span>
                <h3 className="text-heading-3 text-site-ink group-hover:text-site-red">{u.title}</h3>
                <p className="text-body-sm leading-150 text-text-slate">{u.body}</p>
              </div>
              <span className="flex h-site-need-img-h w-site-need-img shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-subtle">
                <img src={u.img} alt="" className="size-full object-cover transition-transform duration-site-slow ease-standard group-hover:scale-105" />
              </span>
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

/* 8 · Contact --------------------------------------------------------------------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section aria-labelledby="contact" className="flex flex-col items-center gap-14 bg-accent-navy-subtle px-50 py-20">
      <SectionHead id="contact" title="Contact us" />
      <div className="flex w-full items-start gap-16">
        <div className="flex flex-1 flex-col gap-6">
          <h3 className="text-heading-3 uppercase tracking-wide text-site-ink">Wragby Business Solutions and Technologies Limited</h3>
          <ul className="flex flex-col gap-4 text-body text-text-slate">
            <li className="flex items-start gap-3">
              <img src={location} alt="" className="size-5 shrink-0" />
              Plot 21A Olubunmi Rotimi Street, off Abike Sulaiman St, Lekki Phase 1, Lagos 106104, Nigeria
            </li>
            <li className="flex items-center gap-3">
              <LucidePhoneIcon aria-hidden="true" className="size-5 text-site-red" />
              +234 201 700 6320
            </li>
            <li className="flex items-center gap-3">
              <LucideMailIcon aria-hidden="true" className="size-5 text-site-red" />
              <a href="mailto:info@wragbysolutions.com" className="text-accent-navy hover:text-site-red">info@wragbysolutions.com</a>
            </li>
            <li className="flex items-center gap-3">
              <LucideClockIcon aria-hidden="true" className="size-5 text-site-red" />
              Typically responds within 1 business day
            </li>
          </ul>
          <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface-default p-6">
            <p className="text-label text-site-ink">Need a tailored setup?</p>
            {['Tailored CRM workflows adapted to your processes', 'Custom integrations with your existing tools', 'Dedicated account manager and SLA-backed support'].map((b) => (
              <p key={b} className="flex items-center gap-3 text-body-sm text-site-label">
                <CheckChip />
                {b}
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="flex w-site-contact-form shrink-0 flex-col gap-5 rounded-xl border border-border-default bg-surface-default p-10 shadow-site-plan">
          {sent ? (
            <p role="status" className="py-20 text-center font-display text-heading-xl text-site-red">Thanks! We&apos;ll be in touch shortly.</p>
          ) : (
            <>
              <div className="flex gap-4">
                <ContactInput label="Name" name="name" placeholder="Jane Doe" autoComplete="name" required />
                <ContactInput label="Work email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
              </div>
              <ContactInput label="Company" name="company" placeholder="Acme Corporation" autoComplete="organization" />
              <ContactTextarea label="Message" name="message" placeholder="Tell us about your team and what you'd like wCRM to do." />
              <button type="submit" className={siteButtonClass('plan', 'text-site-body-lg font-semibold')}>Send message →</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* 9 · Closing band ---------------------------------------------------------------------------------------- */

function CtaBand() {
  return (
    <section className="flex items-center justify-between bg-site-stats px-50 py-16 text-text-inverse">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-site-title">Close deals faster with wCRM</h2>
        <p className="text-site-lead">Start free for 14 days. No card needed to look around.</p>
      </div>
      <div className="flex gap-4">
        <Link to="/pricing" className="rounded-callout bg-surface-default px-6 py-3 text-label text-site-red hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus">
          Get Started
        </Link>
        <Link to="/contact" className="rounded-callout border border-text-inverse px-6 py-3 text-label text-text-inverse hover:bg-site-divider-on-dark focus-visible:outline-none focus-visible:shadow-focus">
          Book a demo
        </Link>
      </div>
    </section>
  );
}

/** Concept homepage: a corporate-site layout applied to wCRM (/concept). */
export function ConceptPage() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <main className="animate-page-in">
        <Hero />
        <Services />
        <ProductTour />
        <Foundation />
        <Updates />
        <Pricing />
        <Contact />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
