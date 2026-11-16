import type { CSSProperties } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteButtonLink } from '../components/SiteButton';
import { CheckChip } from '../components/CheckChip';
import { PlanCards } from '../components/PlanCards';
import { Faq } from '../components/Faq';
import heroPhoto from '../assets/home/hero-photo.png';
import partnerMicrosoft from '../assets/home/partner-microsoft.png';
import partnerAws from '../assets/home/partner-aws.png';
import partnerHuawei from '../assets/home/partner-huawei.png';
import partnerSap from '../assets/home/partner-sap.png';
import arrowUpRight from '../assets/home/arrow-up-right.svg';
import leaderAvatar from '../assets/home/leader-avatar.svg';
import sparkline from '../assets/home/sparkline.svg';
import indicatorDot from '../assets/home/indicator-dot.svg';
import indicatorLine from '../assets/home/indicator-line.png';
import featureContacts from '../assets/home/feature-contacts.png';
import featureDeals from '../assets/home/feature-deals.png';
import featureActivities from '../assets/home/feature-activities.png';
import featureBudget from '../assets/home/feature-budget.png';
import needPipeline from '../assets/home/need-pipeline.png';
import needTracking from '../assets/home/need-tracking.png';
import needLogging from '../assets/home/need-logging.png';
import whyHandshake from '../assets/home/why-handshake.png';
import ribbon from '../assets/shared/ribbon.png';

const PARTNERS = [
  { name: 'Microsoft', src: partnerMicrosoft },
  { name: 'AWS', src: partnerAws },
  { name: 'Huawei', src: partnerHuawei },
  { name: 'SAP', src: partnerSap },
];

/*
 * Positions of the floating dashboard cards around the hero photo, in px from the photo's top-left
 * (Figma 691:4920, 691:4928, 691:4936, 691:4976, 691:5002). Illustration geometry, so kept with the artwork.
 */
const HERO_CARDS: Record<'customer' | 'revenue' | 'leaderboard' | 'statistic' | 'acquisition', CSSProperties> = {
  customer: { left: 407, top: -57.64 },
  revenue: { left: 497, top: 18.36 },
  leaderboard: { left: -69, bottom: -36.27 },
  statistic: { left: 353, top: 170.36 },
  acquisition: { left: -53, top: 7 },
};
/** Sparkline annotation geometry inside the statistic card (Figma 691:4990, 691:4995, 691:4996). */
const SPARK = { tooltip: { left: 110, top: 10 }, dot: { left: 158, top: 48 }, line: { left: 162, top: 54, width: 52, height: 1, transform: 'rotate(90deg)', transformOrigin: 'top left' } } satisfies Record<string, CSSProperties>;

const LEADERS = [
  { name: 'Sarah Connor', messages: 420 },
  { name: 'Jane Doe', messages: 395 },
  { name: 'Yhandi Singh', messages: 395 },
  { name: 'John Doe', messages: 395 },
  { name: 'Timi Turner', messages: 395 },
];

const cardLabel = 'text-badge uppercase leading-120 tracking-wide text-chip-date-icon';

/** Customer / Revenue cards: the acquisition-card layout drawn at 64.3% (180px wide in Figma). */
function MiniMetricCard({ label, value, trend, style }: { label: string; value: string; trend: string; style: CSSProperties }) {
  return (
    <div style={style} className="absolute flex w-site-acq-card origin-top-left scale-site-mini-card flex-col gap-3 rounded-xl bg-surface-default p-5 shadow-site-float">
      <p className={cardLabel}>{label}</p>
      <p className="text-heading-xl leading-120 text-site-metric">{value}</p>
      <p className="flex items-center gap-1 text-caption-xs font-medium leading-120 text-status-connected">
        <img src={arrowUpRight} alt="" className="size-2.5" />
        {trend}
      </p>
    </div>
  );
}

function HeroArtwork() {
  return (
    <div className="relative flex w-site-hero-media shrink-0 rounded-pill" aria-hidden="true">
      <img src={heroPhoto} alt="" className="h-auto w-full" />
      <MiniMetricCard label="Customer" value="27,394" trend="+11% This Month" style={HERO_CARDS.customer} />
      <MiniMetricCard label="Revenue" value="₦3,302,490" trend="+2.7% This Month" style={HERO_CARDS.revenue} />

      <div style={HERO_CARDS.leaderboard} className="absolute flex w-popover flex-col gap-3 rounded-xl bg-surface-default p-4 shadow-site-leaderboard">
        <div className="flex items-start justify-between whitespace-nowrap">
          <p className="text-badge-lg text-site-ink">Leaderboard</p>
          <p className="text-caption-xs text-text-icon-strong">7 members active</p>
        </div>
        <ul className="flex flex-col gap-2">
          {LEADERS.map((l, i) => (
            <li key={l.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <img src={leaderAvatar} alt="" className="size-6" />
                <span className="flex flex-col whitespace-nowrap">
                  <span className="text-caption-sm font-semibold text-site-ink">{l.name}</span>
                  <span className="text-micro text-text-icon-strong">{l.messages} Messages</span>
                </span>
              </span>
              <span className="text-micro font-semibold text-text-link-bright">#{i + 1} Active</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={HERO_CARDS.statistic} className="absolute flex w-site-stat-card flex-col gap-5 rounded-xl bg-surface-default p-6 shadow-site-float">
        <p className={cardLabel}>Statistic</p>
        <p className="text-heading-xl leading-120 text-site-metric">₦52,978.90</p>
        <div className="relative flex h-site-spark-area flex-col">
          <img src={sparkline} alt="" className="h-site-spark-h w-site-spark" />
          <div style={SPARK.tooltip} className="absolute flex flex-col gap-1 whitespace-nowrap rounded-md border border-border-default bg-surface-default p-2 shadow-site-tooltip">
            <p className="text-caption-xs font-medium leading-120 text-chip-date-icon">29 July 2024</p>
            <p className="flex items-center gap-2">
              <span className="text-label leading-140 text-site-metric">₦2257.40</span>
              <span className="text-caption-xs font-medium leading-120 text-status-connected">+1.7%</span>
            </p>
          </div>
          <img src={indicatorDot} alt="" style={SPARK.dot} className="absolute size-2" />
          <img src={indicatorLine} alt="" style={SPARK.line} className="absolute max-w-none" />
        </div>
        <div className="flex justify-between text-caption-xs font-medium leading-120 text-text-hint">
          <span>$1000</span>
          <span>$1000</span>
          <span>$1000</span>
          <span>$1000</span>
        </div>
      </div>

      <div style={HERO_CARDS.acquisition} className="absolute flex w-site-acq-card flex-col gap-4 rounded-xl bg-surface-default p-5 shadow-site-float-soft">
        <p className={cardLabel}>Customer Acquisition</p>
        <p className="text-heading-xl leading-120 text-site-metric">346</p>
        <div className="flex h-2 overflow-hidden rounded-xs bg-border-default">
          <div className="h-full w-site-progress-fill rounded-xs bg-status-connected" />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="flex h-site-hero-h items-center justify-between py-20 pl-50 pr-27.5">
      <div className="flex w-site-hero-copy flex-col gap-2.5">
        <h1 className="font-display text-site-hero text-site-ink">
          Close Deals Faster with <span className="text-brand-primary">Intelligent Pipeline Management.</span>
        </h1>
        <p className="text-site-lead leading-150 text-text-icon-strong">
          Manage contacts, track deals, and hit revenue targets with wCRM&apos;s Business Development module.
        </p>
        <div className="flex items-center gap-4">
          <SiteButtonLink to="/pricing" variant="header">Get Started</SiteButtonLink>
          <SiteButtonLink to="/#features" variant="header-outline">Learn More</SiteButtonLink>
        </div>
        <div className="flex flex-col gap-4 pt-6">
          <p className="text-caption font-semibold uppercase text-text-icon-strong">Our supported partners</p>
          <ul className="flex items-center">
            {PARTNERS.map((p) => (
              <li key={p.name} className="h-site-partner-h w-site-partner">
                <img src={p.src} alt={p.name} className="site-invert-dark size-full object-bottom" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeroArtwork />
    </section>
  );
}

const FEATURES = [
  { id: 'contact-management', title: 'Contact Management', body: 'Store and search customer profiles, import contact lists, and keep every relationship detail at your fingertips.', img: featureContacts, fit: 'object-cover', wide: false },
  { id: 'deal-management', title: 'Deal Management', body: 'Track every opportunity from qualification to closure with pipelines, deal stages, and ownership controls.', img: featureDeals, fit: 'object-cover object-top', wide: true },
  { id: 'activities-reporting', title: 'Activities & Reporting', body: 'Log emails, calls, meetings, and tasks in a unified timeline with performance trends and exportable reports.', img: featureActivities, fit: 'object-cover object-top', wide: true },
  { id: 'budget-targets', title: 'Budget & Targets', body: 'Plan sales budgets, distribute targets across teams, and measure achievement against closed deals.', img: featureBudget, fit: 'object-cover object-left', wide: false },
] as const;

function FeatureCard({ f, height }: { f: (typeof FEATURES)[number]; height: string }) {
  return (
    <article id={f.id} className={`flex scroll-mt-20 flex-col items-center gap-4 rounded-xl border border-border-default bg-surface-subtle p-6 ${height} ${f.wide ? 'w-site-feature-wide shrink-0' : 'min-w-0 flex-1'}`}>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-t-lg">
        <img src={f.img} alt={`${f.title} screen in wCRM`} className={`absolute inset-0 size-full ${f.fit}`} />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="font-outfit text-heading-2 text-text-ink">{f.title}</h3>
        <p className="text-body leading-150 text-text-slate">{f.body}</p>
      </div>
    </article>
  );
}

function Features() {
  return (
    <section id="features" className="flex scroll-mt-16 flex-col items-center gap-12 bg-surface-default px-50 py-20">
      <div className="flex w-site-section-head flex-col gap-3 text-center">
        <h2 className="font-display text-site-section text-text-ink">Built for Business Development</h2>
        <p className="text-site-lead leading-150 text-text-slate">
          Every feature is designed to help your sales team manage relationships, close deals, and grow revenue.
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full gap-6">
          <FeatureCard f={FEATURES[0]} height="h-site-feature-h" />
          <FeatureCard f={FEATURES[1]} height="h-site-feature-h" />
        </div>
        <div className="flex w-full gap-6">
          <FeatureCard f={FEATURES[2]} height="h-site-feature-h-lg" />
          <FeatureCard f={FEATURES[3]} height="h-site-feature-h-lg" />
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: '150+', label: 'Supported partner' },
  { value: '4.9+', label: 'Starts rating' },
  { value: '20K+', label: 'Satisfied customer' },
  { value: '10+', label: 'Years experiences' },
];

function StatsBar() {
  return (
    <section aria-label="wCRM in numbers" className="border-y border-border-default bg-site-stats px-50 py-20 text-text-inverse">
      <dl className="flex items-start justify-between whitespace-nowrap">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse items-center gap-2">
            <dt className="text-body font-medium">{s.label}</dt>
            <dd className="font-onest text-site-stat">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const NEEDS = [
  { title: 'Pipeline visibility', body: 'Monitor deals across every stage with clear pipeline views and conversion insights.', img: needPipeline },
  { title: 'Smart deal tracking', body: "Capture deal value, stage, contacts, and closure outcomes to focus your team's efforts.", img: needTracking },
  { title: 'Integrated activity logging', body: 'Sync emails and calendar events from Microsoft 365 or Google directly into CRM records.', img: needLogging },
];

function Needs() {
  return (
    <section className="flex flex-col items-center gap-10 bg-surface-subtle px-50 py-20">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <h2 className="font-onest text-site-section leading-120 text-site-ink">Streamline Your Sales Workflow</h2>
        <p className="w-site-lead text-site-lead leading-150 text-text-icon-strong">
          Discover how wCRM&apos;s Business Development tools help your team manage pipelines, track deals, and hit targets.
        </p>
      </div>
      <div className="flex w-full items-stretch justify-between">
        {NEEDS.map((n) => (
          <article key={n.title} className="flex w-site-need-card flex-col items-center gap-4 rounded-xl border border-border-default bg-surface-default p-8 text-center">
            <img src={n.img} alt="" className="h-site-need-img-h w-site-need-img object-cover" />
            <h3 className="font-outfit text-heading-2 text-text-ink">{n.title}</h3>
            <p className="text-body leading-140 text-text-slate">{n.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const REASONS = [
  { title: 'Complete Deal Profiles', body: 'Capture every opportunity with its company, contacts, owner, pipeline stage, value, and commercial details in one place.' },
  { title: 'Real-Time Analytics', body: 'Summarise deal volume, pipeline value, and conversion rates with live dashboards and performance trends.' },
  { title: 'Smarter Growth', body: 'Define sales pipelines, reusable deal stages, and business streams to guide opportunities from qualification to closure.' },
  { title: 'Enterprise-Grade Security', body: 'Protect your data with role-based access controls, end-to-end encryption, and compliance-ready audit trails.' },
  { title: 'Budget & Target Tracking', body: 'Plan budgets by period and department, distribute targets across teams, and measure achievement against closed deals.' },
  { title: 'Deal Collaboration', body: 'Record contributors and departments on every deal, review collaboration patterns, and export insights for reporting.' },
];

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="flex scroll-mt-16 items-center justify-center gap-20 px-50 py-20">
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <h2 className="font-display text-site-section leading-120 text-site-ink">Why Choose Us</h2>
        <ul className="flex flex-col gap-2.5">
          {REASONS.map((r) => (
            <li key={r.title} className="flex items-start gap-1.25">
              <CheckChip />
              <div className="flex flex-1 flex-col gap-1.25 text-site-lead">
                <h3 className="font-semibold text-site-ink">{r.title}</h3>
                <p className="leading-150 text-text-icon-strong">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-site-split-media-h w-site-split-media shrink-0 overflow-hidden rounded-pill bg-surface-default">
        <img src={whyHandshake} alt="Two colleagues shaking hands outside an office building" className="size-full object-cover" />
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative flex scroll-mt-16 flex-col items-center justify-center gap-10 overflow-hidden px-50 py-20">
      <img src={ribbon} alt="" className="site-ribbon-home object-cover" />
      <div className="relative flex w-full flex-col gap-4 text-center">
        <h2 className="font-display text-site-title leading-site-44 text-text-strong">Choose the right plan for your team</h2>
        <p className="font-display text-site-lead leading-site-24 text-text-tertiary">
          Simple, transparent pricing that grows with you. All plans include a 14-day free trial.
        </p>
      </div>
      <PlanCards />
    </section>
  );
}

/** Homepage (Figma `wCRM business dev home page`, 691:4900). */
export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <StatsBar />
        <Needs />
        <WhyChooseUs />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
