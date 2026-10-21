import type { ReactNode } from 'react';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { StatCard, SummaryCard } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { FilterButton } from '../components/FilterButton';
import { Input } from '../components/Input';
import { Pagination } from '../components/Pagination';
import { RowActionLink, RowActionsMenu, TableLink } from '../components/RowActions';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Table, TableBody, TableCard, TableCell, TableCellStack, TableHead, TableHeader, TableRow } from '../components/Table';
import { Tabs, TabsList, TabsTrigger } from '../components/Tabs';
import { Tag } from '../components/Tag';
import { ViewToggle } from '../components/ViewToggle';
import { CalendarIcon, ListIcon, MailIcon, PlusIcon, SearchIcon, SendIcon, UsersIcon } from '../icons';
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

export interface FoundationsProps {
  /** URL of the Wragby logo. Storybook passes the bundled asset; the static export passes a data URI. */
  logoSrc: string;
}

export function Foundations({ logoSrc }: FoundationsProps) {
  const t = tokens.typography;
  return (
    <div data-page="foundations" className="min-h-screen bg-surface-canvas px-4 py-10 font-sans text-text-primary md:px-12 md:py-12">
      <div className="mx-auto flex max-w-page flex-col gap-6">
        {/* Masthead */}
        <header className="mb-4 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <img src={logoSrc} alt="Wragby" className="h-10 w-auto" />
            <span className="text-overline text-text-secondary">Foundations + UI kit / v{tokens.$meta.version}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-display text-text-primary">wCRM marketing design system</h1>
              <p className="text-body text-text-secondary">Tokens and components for wCRM marketing design</p>
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
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {([
              ['Primary', <Button key="p">Create contact</Button>],
              ['Secondary', <Button key="s" variant="secondary">Save as draft</Button>],
              ['Outline', <Button key="o" variant="outline">Clear all</Button>],
              ['Danger', <Button key="x" variant="danger">Delete</Button>],
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
          <div className="mt-8 grid gap-6 border-t border-border-default pt-8 md:grid-cols-2 lg:grid-cols-4">
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
            <div>
              <Eyebrow>Select</Eyebrow>
              <Select label="Reporting window" defaultValue="24h" options={[{ value: '24h', label: 'First 24 hours' }, { value: 'week', label: 'First week' }]} helperText="One choice from a short list." />
            </div>
          </div>
        </Section>

        {/* 05 Selection & status */}
        <Section index="05" title="Selection & status" aside="Badges, chips, checkboxes, switches, tabs">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow>Status badges</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="success">Active</Badge>
                  <Badge tone="info">Scheduled</Badge>
                  <Badge tone="warning">Spam report</Badge>
                  <Badge tone="danger">Failed</Badge>
                  <Badge tone="neutral">Inactive</Badge>
                </div>
              </div>
              <div>
                <Eyebrow>Filter chips</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  <Tag onRemove={() => {}}>Enterprise Account</Tag>
                  <Tag onRemove={() => {}}>Jan 2024</Tag>
                  <Tag selected>Microsoft Security</Tag>
                </div>
              </div>
              <div>
                <Eyebrow>Tabs</Eyebrow>
                <div className="flex flex-col gap-4">
                  <Tabs defaultValue="accounts">
                    <TabsList aria-label="Settings sections">
                      <TabsTrigger value="accounts">Accounts</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="publishing">Publishing</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Tabs variant="pill" defaultValue="all">
                    <TabsList aria-label="Record views">
                      <TabsTrigger value="all">All records</TabsTrigger>
                      <TabsTrigger value="mine">My records</TabsTrigger>
                      <TabsTrigger value="recent">Recently updated</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow>Checkboxes</Eyebrow>
                <div className="grid grid-cols-2 gap-3">
                  <Checkbox label="Facebook Page" defaultChecked />
                  <Checkbox label="All accounts" checked="indeterminate" />
                  <Checkbox label="X Account" />
                  <Checkbox label="YouTube (disabled)" disabled />
                </div>
              </div>
              <div>
                <Eyebrow>Preference row · accordion card with switch</Eyebrow>
                <Accordion type="single" collapsible variant="card">
                  <AccordionItem
                    value="social"
                    title="Social interactions"
                    description="Get notified about new conversations, interactions and follower changes."
                    actions={<Switch aria-label="Social interactions notifications" defaultChecked />}
                  >
                    <Checkbox label="Facebook Page" defaultChecked />
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Section>

        {/* 06 Table */}
        <Section index="06" title="Data tables" aside="Contacts, email and campaign table styles with row actions">
          <div className="flex flex-col gap-8">
            <div>
              <Eyebrow>Contacts table · toolbar, sortable header, row menu, pagination</Eyebrow>
              <TableCard
                toolbar={
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      <Input label="Search contacts" hideLabel size="md" placeholder="Search..." leadingIcon={<SearchIcon />} wrapperClassName="w-field-sm" />
                      <FilterButton count={1} />
                    </div>
                    <Button leadingIcon={<PlusIcon />}>Create contact</Button>
                  </>
                }
                footer={<Pagination page={1} pageSize={10} totalItems={49} onPageChange={() => {}} />}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead sort="asc" onSort={() => {}}>Name</TableHead>
                      <TableHead>Email address</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead align="right"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ['Olumide Balogun', 'olumideb@wragbybiz.com', 'Technologia', 'Active'],
                      ['Dean Liam', 'deen@yopmail.com', 'Carter', 'Active'],
                      ['Pam Mancha', 'emmanuell.mancha@gmail.com', 'Cash Drive', 'Inactive'],
                    ].map(([n, e, c, st], i) => (
                      <TableRow key={n} selected={i === 1}>
                        <TableCell emphasis><span className="flex items-center gap-2.5"><Avatar name={n} />{n}</span></TableCell>
                        <TableCell>{e}</TableCell>
                        <TableCell>{c}</TableCell>
                        <TableCell><Badge tone={st === 'Active' ? 'success' : 'neutral'}>{st}</Badge></TableCell>
                        <TableCell align="right"><RowActionsMenu recordName={n} onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </div>
            <div>
              <Eyebrow>Email table · dot status tabs, numeric columns, two-line cell, row menu</Eyebrow>
              <TableCard>
                <Tabs variant="dot" defaultValue="all" className="gap-0">
                  <TabsList aria-label="Email status" className="px-5 pt-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                    <TabsTrigger value="scheduled" tone="warning">Scheduled</TabsTrigger>
                    <TabsTrigger value="sent" tone="success">Sent</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email title</TableHead>
                      <TableHead align="right">Delivered</TableHead>
                      <TableHead align="right">Open rate</TableHead>
                      <TableHead>Last updated</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead align="right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ['Summer Sale: Up to 50% off', '12,450', '64.2%', 'Jan 14, 2025', 'Sarah K.', 'Scheduled'],
                      ['New Azure features are here!', '9,890', '42.1%', 'Jan 12, 2025', 'Alex T.', 'API'],
                    ].map(([title, d, o, u, by, s]) => (
                      <TableRow key={title}>
                        <TableCell emphasis>{title}</TableCell>
                        <TableCell align="right" className="tabular-nums">{d}</TableCell>
                        <TableCell align="right" className="font-medium tabular-nums">{o}</TableCell>
                        <TableCell className="whitespace-nowrap"><TableCellStack primary={u} secondary={by} /></TableCell>
                        <TableCell>{s}</TableCell>
                        <TableCell align="right"><RowActionsMenu recordName={title} onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </div>
            <div>
              <Eyebrow>Campaign table · record link and inline View action</Eyebrow>
              <TableCard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead><TableHead>Campaign</TableHead><TableHead>Status</TableHead><TableHead align="right"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[['60210', 'Q1 Lagos product launch', 'Active'], ['60211', 'Valentine’s promo', 'Scheduled']].map(([code, name, st]) => (
                      <TableRow key={code}>
                        <TableCell><TableLink numeric href="#">{code}</TableLink></TableCell>
                        <TableCell emphasis>{name}</TableCell>
                        <TableCell><Badge tone={st === 'Active' ? 'success' : 'info'}>{st}</Badge></TableCell>
                        <TableCell align="right"><RowActionLink>View<span className="sr-only"> {name}</span></RowActionLink></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </div>
          </div>
          <Note>Overlays (Menu, FilterPopover, Modal, ConfirmDialog, Drawer) and the loading, empty and expandable table states are documented interactively in Storybook.</Note>
        </Section>


        {/* 07 Cards, toolbar controls and more table styles */}
        <Section index="07" title="Cards & list toolbars" aside="Stat and summary cards, filter and swap buttons">
          <div className="flex flex-col gap-8">
            <div>
              <Eyebrow>Stats row · first card featured</Eyebrow>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard featured label="Total posts" value="127" />
                <StatCard label="Scheduled" value="24" />
                <StatCard icon={<SendIcon />} label="Emails sent" value="72,130" trend={{ value: '12%', direction: 'up', label: 'vs last month' }} />
                <StatCard icon={<UsersIcon />} label="Unsubscribes" value="184" trend={{ value: '8%', direction: 'down', invert: true }} />
              </div>
            </div>
            <div>
              <Eyebrow>Summary cards</Eyebrow>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <SummaryCard icon={<UsersIcon />} tone="brand" label="Total audiences" value="12" />
                <SummaryCard icon={<MailIcon />} tone="info" label="Subscribed contacts" value="8,420" />
                <SummaryCard icon={<SendIcon />} tone="success" label="Campaigns sent" value="36" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Eyebrow>Filter button · desktop, applied, mobile, mobile applied</Eyebrow>
                <div className="flex flex-wrap items-center gap-3">
                  <FilterButton />
                  <FilterButton count={2} />
                  <FilterButton display="icon" />
                  <FilterButton display="icon" count={2} />
                </div>
              </div>
              <div>
                <Eyebrow>Toolbar · filter, primary action, list / calendar swap</Eyebrow>
                <div className="flex flex-wrap items-center gap-5">
                  <FilterButton />
                  <Button leadingIcon={<PlusIcon />}>New post</Button>
                  <ViewToggle aria-label="Posts view" value="list" onValueChange={() => {}} options={[{ value: 'list', label: 'List view', icon: <ListIcon /> }, { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> }]} />
                </div>
              </div>
            </div>
          </div>
          <Note>Metric, progress, module and activity cards, hover-revealed row buttons and compact tables are in Storybook under Card, RowActions and Table.</Note>
        </Section>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-6">
          <p className="text-body-sm text-text-secondary">Red for actions, navy for support and focus, neutrals for structure, status colours only for status.</p>
          <p className="text-label-sm text-text-primary">wCRM Marketing / Design foundations</p>
        </footer>
      </div>
    </div>
  );
}
