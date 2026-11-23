import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SiteHeader, FEATURE_LINKS } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteButtonLink } from '../components/SiteButton';
import { CheckChip } from '../components/CheckChip';
import { ActivitiesScreen, BudgetScreen, ContactsScreen, DealsScreen, ScaledScreen } from '../components/app-screens';
import { FEATURE_DETAILS, type FeatureDetail } from '../data/features';

/** Product screen for each feature, at its native 1400px layout size (see components/app-screens). */
const SCREENS: Record<FeatureDetail['id'], { node: ReactNode; height: number }> = {
  'contact-management': { node: <ContactsScreen />, height: 659 },
  'deal-management': { node: <DealsScreen />, height: 681 },
  'activities-reporting': { node: <ActivitiesScreen />, height: 725 },
  'budget-targets': { node: <BudgetScreen />, height: 382 },
};

function Hero({ f }: { f: FeatureDetail }) {
  const link = FEATURE_LINKS.find((l) => l.id === f.id)!;
  const screen = SCREENS[f.id];
  return (
    <section className="bg-surface-subtle px-50 pt-16">
      <nav aria-label="Breadcrumb" className="text-caption text-text-tertiary">
        <Link to="/#features" className="rounded-xs hover:text-site-red focus-visible:outline-none focus-visible:shadow-focus">Features</Link>
        <span aria-hidden="true" className="px-2">/</span>
        <span aria-current="page" className="text-text-strong">{f.title}</span>
      </nav>
      <div className="mt-6 flex items-end justify-between gap-16">
        <div className="flex w-site-split-media flex-col gap-4">
          <p className="flex items-center gap-2 self-start rounded-full bg-site-red-tint px-3 py-1 text-label-sm text-site-red">
            <link.Icon aria-hidden="true" strokeWidth={link.stroke} className="size-4" />
            {f.title}
          </p>
          <h1 className="font-display text-site-hero text-site-ink">
            {f.headline[0]}
            <span className="text-brand-primary">{f.headline[1]}</span>
          </h1>
          <p className="text-site-lead leading-150 text-text-icon-strong">{f.lead}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
            {f.proof.map((p) => (
              <li key={p} className="flex items-center gap-2 whitespace-nowrap text-body-sm text-text-slate">
                <CheckChip />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 gap-4 pb-2">
          <SiteButtonLink to="/pricing" variant="header">Get Started</SiteButtonLink>
          <SiteButtonLink to="/pricing#compare" variant="header-outline">Compare plans</SiteButtonLink>
        </div>
      </div>
      {/* The product screen sits on the band and overlaps into the next section. */}
      <div className="relative -mb-20 mt-12 rounded-xl border border-border-default bg-surface-default p-3 shadow-lg">
        <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: `1400 / ${screen.height}` }}>
          <ScaledScreen width={1400} height={screen.height} fit="top" label={`${f.title} screen in wCRM`}>
            {screen.node}
          </ScaledScreen>
        </div>
      </div>
    </section>
  );
}

function Capabilities({ f }: { f: FeatureDetail }) {
  return (
    <section className="flex flex-col items-center gap-12 px-50 pb-20 pt-40" aria-labelledby="capabilities">
      <div className="flex w-site-section-head flex-col gap-3 text-center">
        <h2 id="capabilities" className="font-display text-site-section text-text-ink">What you can do</h2>
        <p className="text-site-lead leading-150 text-text-slate">Everything {f.title.toLowerCase()} needs, built into the same CRM your team already uses.</p>
      </div>
      <ul className="grid w-full grid-cols-3 gap-6">
        {f.capabilities.map((c) => (
          <li key={c.title} className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface-default p-6 transition duration-base ease-standard hover:-translate-y-1 hover:shadow-md">
            <span className="flex size-10 items-center justify-center rounded-callout bg-site-red-tint text-site-red">
              <c.icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </span>
            <h3 className="font-outfit text-heading-2 text-text-ink">{c.title}</h3>
            <p className="text-body leading-150 text-text-slate">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowItWorks({ f }: { f: FeatureDetail }) {
  return (
    <section className="flex flex-col gap-12 bg-surface-subtle px-50 py-20" aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="font-display text-site-section leading-120 text-site-ink">How it works</h2>
      <ol className="relative grid grid-cols-3 gap-10">
        <span aria-hidden="true" className="absolute left-5 right-5 top-5 h-px bg-border-strong" />
        {f.steps.map((s, i) => (
          <li key={s.title} className="relative flex flex-col gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-label text-text-inverse ring-8 ring-surface-subtle">{i + 1}</span>
            <h3 className="text-heading-3 text-site-ink">{s.title}</h3>
            <p className="text-body leading-150 text-text-slate">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Related({ f }: { f: FeatureDetail }) {
  return (
    <section className="flex flex-col gap-10 px-50 py-20" aria-labelledby="related">
      <h2 id="related" className="font-display text-site-section leading-120 text-site-ink">Works with the rest of wCRM</h2>
      <ul className="grid grid-cols-3 gap-6">
        {FEATURE_LINKS.filter((l) => l.id !== f.id).map((l) => (
          <li key={l.id}>
            <Link
              to={`/features/${l.id}`}
              className="group flex h-full flex-col gap-3 rounded-xl border border-border-default bg-surface-default p-6 transition duration-base ease-standard hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:shadow-focus"
            >
              <l.Icon aria-hidden="true" strokeWidth={l.stroke} className="size-6 text-site-menu-title" />
              <span className="font-outfit text-heading-2 text-text-ink">{l.title}</span>
              <span className="text-body text-text-slate">{l.body}</span>
              <span className="mt-auto flex items-center gap-1 text-label-sm text-site-red">
                Learn more <span aria-hidden="true" className="transition-transform duration-base group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CtaBand({ f }: { f: FeatureDetail }) {
  return (
    <section className="flex items-center justify-between bg-site-stats px-50 py-16 text-text-inverse">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-site-title">{f.cta}</h2>
        <p className="text-site-lead">All plans include a 14-day free trial.</p>
      </div>
      <div className="flex gap-4">
        <Link to="/pricing" className="rounded-callout bg-surface-default px-6 py-3 text-label text-site-red hover:bg-surface-subtle focus-visible:outline-none focus-visible:shadow-focus">
          Get Started
        </Link>
        <Link to={`/contact?topic=${encodeURIComponent(f.title)}`} className="rounded-callout border border-text-inverse px-6 py-3 text-label text-text-inverse hover:bg-site-divider-on-dark focus-visible:outline-none focus-visible:shadow-focus">
          Talk to sales
        </Link>
      </div>
    </section>
  );
}

/** Feature detail page (preview, not in Figma): /features/:id. */
export function FeaturePage() {
  const { id } = useParams();
  const f = FEATURE_DETAILS.find((d) => d.id === id);
  if (!f) return <Navigate to="/#features" replace />;
  return (
    <>
      <SiteHeader />
      <main className="animate-page-in">
        <Hero f={f} />
        <Capabilities f={f} />
        <HowItWorks f={f} />
        <Related f={f} />
        <CtaBand f={f} />
      </main>
      <SiteFooter />
    </>
  );
}
