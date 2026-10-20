import type { ReactNode } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { tokens } from '../tokens/tokens';
import { cn } from '../utils/cn';

/*
 * Foundations overview. Every value on this page is read from tokens/tokens.json,
 * so it stays in sync with the CSS variables and Tailwind preset.
 */

type ColorGroup = keyof typeof tokens.color;

const swatches: { group: ColorGroup; key: string; label: string }[] = [
  { group: 'brand', key: 'primary', label: 'Brand' },
  { group: 'brand', key: 'primary-subtle', label: 'Brand subtle' },
  { group: 'accent', key: 'navy', label: 'Navy' },
  { group: 'text', key: 'primary', label: 'Text' },
  { group: 'text', key: 'secondary', label: 'Text secondary' },
  { group: 'text', key: 'muted', label: 'Text muted' },
  { group: 'surface', key: 'default', label: 'Surface' },
  { group: 'surface', key: 'canvas', label: 'Canvas' },
  { group: 'border', key: 'default', label: 'Border' },
  { group: 'status', key: 'success', label: 'Success' },
  { group: 'status', key: 'warning', label: 'Warning' },
  { group: 'status', key: 'danger', label: 'Danger' },
];

const typeRows: { key: keyof typeof tokens.typography; label: string; sample: string; className: string }[] = [
  { key: 'display', label: 'Display', sample: 'Connected marketing', className: 'text-display' },
  { key: 'heading-1', label: 'Heading 1', sample: 'Settings - Social Media', className: 'text-heading-1' },
  { key: 'heading-2', label: 'Heading 2', sample: 'Campaign performance', className: 'text-heading-2' },
  { key: 'heading-3', label: 'Heading 3', sample: 'Audience overview', className: 'text-heading-3' },
  { key: 'body', label: 'Body', sample: 'Manage contacts, campaigns and emails in one place.', className: 'text-body' },
  { key: 'body-sm', label: 'Body small', sample: 'olumideb@wragbybiz.com · Technologia', className: 'text-body-sm' },
  { key: 'label', label: 'Label', sample: 'Email address', className: 'text-label' },
  { key: 'caption', label: 'Caption', sample: 'Last synced 2 minutes ago', className: 'text-caption text-text-secondary' },
  { key: 'overline', label: 'Overline', sample: 'Contact owner', className: 'text-overline text-text-secondary' },
];

const spaceSteps = ['1', '2', '3', '4', '5', '6', '8', '10', '12'] as const;
const spaceBar: Record<(typeof spaceSteps)[number], string> = {
  '1': 'h-1', '2': 'h-2', '3': 'h-3', '4': 'h-4', '5': 'h-5', '6': 'h-6', '8': 'h-8', '10': 'h-10', '12': 'h-12',
};
const radiusSamples: { key: keyof typeof tokens.radius; className: string; use: string }[] = [
  { key: 'sm', className: 'rounded-sm', use: 'Menus' },
  { key: 'md', className: 'rounded-md', use: 'Controls' },
  { key: 'lg', className: 'rounded-lg', use: 'Cards' },
  { key: 'xl', className: 'rounded-xl', use: 'Modals' },
  { key: 'full', className: 'rounded-full', use: 'Badges' },
];

function Section({ index, title, aside, children, className }: { index: string; title: string; aside?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-xl border border-border-default bg-surface-default p-6 md:p-8', className)}>
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="flex items-baseline gap-3 text-heading-2 text-text-primary">
          <span className="text-label-sm text-brand-primary">{index}</span>
          {title}
        </h2>
        {aside && <p className="text-body-sm text-text-secondary">{aside}</p>}
      </header>
      {children}
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-body-sm text-text-secondary">{children}</p>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-label-sm text-text-secondary">{children}</p>;
}

function Badge({ tone, children }: { tone: 'success' | 'warning' | 'danger' | 'neutral' | 'info'; children: ReactNode }) {
  const tones = {
    success: 'bg-status-success-subtle text-status-success-text',
    warning: 'bg-status-warning-subtle text-status-warning-text',
    danger: 'bg-status-danger-subtle text-status-danger',
    info: 'bg-status-info-subtle text-accent-navy',
    neutral: 'bg-surface-sunken text-text-secondary',
  };
  const dots = { success: 'bg-status-success', warning: 'bg-status-warning', danger: 'bg-status-danger', info: 'bg-status-info', neutral: 'bg-text-muted' };
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-3 text-label-sm', tones[tone])}>
      <span className={cn('size-1.5 rounded-full', dots[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

export function Foundations() {
  const t = tokens.typography;
  return (
    <div data-page="foundations" className="min-h-screen bg-surface-canvas px-4 py-10 font-sans text-text-primary md:px-12 md:py-12">
      <div className="mx-auto flex max-w-page flex-col gap-6">
        {/* Masthead */}
        <header className="mb-4 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-md bg-brand-primary text-label text-text-inverse">W</span>
              <span className="text-label text-text-primary">Wragby <span className="text-text-secondary">wCRM Marketing</span></span>
            </div>
            <span className="text-overline text-text-secondary">Foundations + UI kit / v{tokens.$meta.version}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-display text-text-primary">A connected design language.</h1>
              <p className="text-body text-text-secondary">Tokens and components extracted from the Figma “marketing design updates” page.</p>
            </div>
            <span className="inline-flex h-8 items-center rounded-full bg-accent-navy-subtle px-3 text-label-sm text-accent-navy">Marketing · Light</span>
          </div>
        </header>

        {/* 01 Colour */}
        <Section index="01" title="Color palette" aside="One accent. A quiet neutral foundation.">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map(({ group, key, label }) => {
              const tk = (tokens.color[group] as Record<string, { value: string; usage: string }>)[key];
              return (
                <div key={`${group}-${key}`} className="flex flex-col gap-2">
                  <div className="h-12 rounded-md border border-border-default" style={{ backgroundColor: `var(--color-${group}-${key})` }} />
                  <div>
                    <p className="text-label-sm text-text-primary">{label}</p>
                    <p className="font-mono text-caption text-text-secondary">{tk.value}</p>
                    <p className="text-caption text-text-secondary">{tk.usage.split(',')[0]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Note>Red #EE1F2F is the single brand accent; navy carries secondary actions and focus. #F32135 in older mobile frames is the same colour drawn inconsistently. Use brand-primary.</Note>
        </Section>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* 02 Typography */}
          <Section index="02" title="Typography" aside="Size / line height · weight" className="lg:col-span-3">
            <p className="-mt-2 mb-6 text-body-sm text-text-secondary">Inter for interface text. Roboto for dense tables and mobile; Fira Code for keys and timestamps.</p>
            <dl className="flex flex-col gap-5">
              {typeRows.map((r) => (
                <div key={r.key} className="grid grid-cols-3 items-baseline gap-4">
                  <dt>
                    <p className="text-label-sm text-text-primary">{r.label}</p>
                    <p className="text-caption text-text-secondary">
                      {t[r.key].size.replace('px', '')} / {t[r.key].lineHeight.replace('px', '')} · {t[r.key].weight}
                    </p>
                  </dt>
                  <dd className={cn('col-span-2 truncate text-text-primary', r.className)}>{r.sample}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* 03 Spacing & radius */}
          <Section index="03" title="Spacing & radius" className="lg:col-span-2">
            <p className="-mt-2 mb-6 text-body-sm text-text-secondary">4px base. 8–16px inside controls, 24–40px between groups.</p>
            <div className="flex items-end justify-between gap-2 border-b border-border-default pb-6">
              {spaceSteps.map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={cn('w-6 rounded-xs border-t-2 border-accent-navy bg-accent-navy-subtle', spaceBar[s])} />
                  <span className="text-caption text-text-secondary">{tokens.space[s].value.replace('px', '')}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-5 gap-3">
              {radiusSamples.map((r) => (
                <div key={r.key} className="flex flex-col items-center gap-2">
                  <div className={cn('size-12 border border-border-default bg-surface-subtle', r.className)} />
                  <p className="text-label-sm text-text-primary">{tokens.radius[r.key].value === '999px' ? 'Full' : tokens.radius[r.key].value}</p>
                  <p className="text-caption text-text-secondary">{r.use}</p>
                </div>
              ))}
            </div>
            <Note>Default border is 1px border-default. Surfaces stay flat; shadow-lg is reserved for drawers and modals.</Note>
          </Section>
        </div>

        {/* 04 Buttons & text fields */}
        <Section index="04" title="Buttons & text fields" aside="Practical defaults for everyday tasks">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {([
              ['Primary', <Button key="p">Create contact</Button>],
              ['Secondary', <Button key="s" variant="secondary">Save as draft</Button>],
              ['Outline', <Button key="o" variant="outline">Clear all</Button>],
              ['Disabled', <Button key="d" disabled>Create contact</Button>],
              ['Loading', <Button key="l" loading>Create contact</Button>],
            ] as const).map(([label, el]) => (
              <div key={label}>
                <Eyebrow>{label}</Eyebrow>
                {el}
              </div>
            ))}
          </div>
          <p className="mt-6 text-body-sm text-text-secondary">40px desktop / 44px form height · 8px radius · 16px inset · 14/600 label · one primary action per view</p>
          <div className="mt-8 grid gap-6 border-t border-border-default pt-8 md:grid-cols-3">
            <div>
              <Eyebrow>Default</Eyebrow>
              <Input label="Work email" placeholder="you@company.com" helperText="Use your business email address." />
            </div>
            <div>
              <Eyebrow>Error</Eyebrow>
              <Input label="Work email" defaultValue="alex@" error="Enter a valid email address." />
            </div>
            <div>
              <Eyebrow>Disabled</Eyebrow>
              <Input label="Work email" defaultValue="alex@company.com" disabled helperText="Managed by your administrator." />
            </div>
          </div>
        </Section>

        {/* 05 Patterns */}
        <Section index="05" title="Badges & card" aside="Patterns in Figma, not yet components">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Eyebrow>Status badges</Eyebrow>
              <div className="flex flex-wrap gap-2">
                <Badge tone="success">Active</Badge>
                <Badge tone="info">Scheduled</Badge>
                <Badge tone="warning">Pending</Badge>
                <Badge tone="danger">Failed</Badge>
                <Badge tone="neutral">Inactive</Badge>
              </div>
              <p className="mt-4 text-body-sm text-text-secondary">24px height · 12px inset · full radius · 6px status dot. Always pair status colour with a readable label.</p>
              <p className="mt-6 border-t border-border-default pt-6 text-body-sm text-text-secondary">
                Card recipe: surface-default, 1px border-default, radius-lg (12px), 20–24px padding. Keep content left-aligned and give the action a clear purpose.
              </p>
            </div>
            <div className="rounded-lg border border-border-default bg-surface-default p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-heading-3 text-text-primary">Q4 enterprise campaign</h3>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="mt-2 text-body text-text-secondary">2,480 recipients across 3 audiences. Next send on 24 Oct, 09:00.</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline">View report</Button>
                <Button>Open campaign</Button>
              </div>
            </div>
          </div>
        </Section>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-6">
          <p className="text-body-sm text-text-secondary">Red for actions, navy for support and focus, neutrals for structure, status colours only for status.</p>
          <p className="text-label-sm text-text-primary">wCRM Marketing / Design foundations</p>
        </footer>
      </div>
    </div>
  );
}
