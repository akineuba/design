import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalendarIcon, MailIcon, PencilIcon, SendIcon, UsersIcon } from '../../icons';
import { Button } from '../Button';
import { ActivityFeed, Card, CardHeader, MetricCard, ModuleCard, ProgressBar, StatCard, SummaryCard } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    docs: {
      description: {
        component:
          'Card surfaces from the marketing dashboards. Base: white, 1px `border-default`, radius `lg`, 20px inset. ' +
          'Figma: `stats-row` / `stat-card-*` (Social posts, Email marketing), audience summary tiles, email performance metrics, module picker cards and the activity panel.',
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Card className="max-w-modal-sm">
      <CardHeader title="Upcoming posts" count="4 scheduled" action={<Button variant="ghost" size="sm">View all</Button>} />
      <p className="mt-3 text-body-sm text-text-secondary">Cards hold one topic. Use `CardHeader` for the title row and keep actions on the right.</p>
    </Card>
  ),
};

/** Figma `stats-row`: four 274px cards, 16px gap; the first is featured. Collapses to 2 then 1 column. */
export const StatsRow: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard featured label="Total posts" value="127" />
      <StatCard label="Scheduled" value="24" />
      <StatCard label="Published" value="89" />
      <StatCard label="Drafts" value="8" />
    </div>
  ),
};

export const StatWithIconAndTrend: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard featured icon={<SendIcon />} label="Emails sent" value="72,130" trend={{ value: '12%', direction: 'up', label: 'vs last month' }} />
      <StatCard icon={<MailIcon />} label="Open rate" value="51.4%" trend={{ value: '3.2%', direction: 'up', label: 'vs last month' }} />
      <StatCard icon={<UsersIcon />} label="Unsubscribes" value="184" trend={{ value: '8%', direction: 'down', label: 'vs last month', invert: true }} />
      <StatCard icon={<CalendarIcon />} label="Bounce rate" value="2.9%" trend={{ value: '0.4%', direction: 'up', label: 'vs last month', invert: true }} />
    </div>
  ),
};

export const Summary: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard icon={<UsersIcon />} tone="brand" label="Total audiences" value="12" hint="3 added this week" />
      <SummaryCard icon={<MailIcon />} tone="info" label="Subscribed contacts" value="8,420" />
      <SummaryCard icon={<SendIcon />} tone="success" label="Campaigns sent" value="36" />
      <SummaryCard icon={<PencilIcon />} tone="warning" label="Drafts" value="5" />
    </div>
  ),
};

export const Metric: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <MetricCard label="Opens" value="7,994" qualifier="opens" subValue="64.2% of 12,450 delivered" details={[{ label: 'Desktop', value: '4,212' }, { label: 'Mobile', value: '3,402' }, { label: 'Tablet', value: '380' }]} />
      <MetricCard label="Clicks" value="1,594" qualifier="clicks" subValue="12.8% click rate" details={[{ label: 'Unique clicks', value: '1,203' }, { label: 'Click-to-open', value: '19.9%' }]} />
      <MetricCard label="Device breakdown" value="3" qualifier="devices">
        <div className="flex flex-col gap-3">
          <ProgressBar label="Desktop" value={53} tone="navy" />
          <ProgressBar label="Mobile" value={42} tone="brand" />
          <ProgressBar label="Tablet" value={5} tone="info" />
        </div>
      </MetricCard>
    </div>
  ),
};

export const Progress: Story = {
  render: () => (
    <Card className="flex max-w-modal-sm flex-col gap-4">
      <CardHeader title="Budget allocation" count="Q1" />
      <ProgressBar label="Paid social" value={72} valueLabel="₦720k / ₦1m" />
      <ProgressBar label="Email" value={45} tone="navy" />
      <ProgressBar label="Events" value={100} tone="success" valueLabel="Complete" />
      <ProgressBar label="Content" value={18} tone="warning" />
    </Card>
  ),
};

const Glyph = ({ label }: { label: string }) => (
  <span className="inline-flex size-12 items-center justify-center rounded-lg bg-accent-navy-subtle text-heading-2 text-accent-navy">{label}</span>
);

function ModulePicker() {
  const [selected, setSelected] = useState('email');
  const modules = [
    { id: 'email', title: 'Email', description: 'Newsletters and campaigns' },
    { id: 'sms', title: 'SMS', description: 'Text blasts' },
    { id: 'social', title: 'Social', description: 'Posts and scheduling' },
  ];
  return (
    <div role="group" aria-label="Choose a channel" className="flex flex-wrap gap-4">
      {modules.map((m) => (
        <ModuleCard key={m.id} title={m.title} description={m.description} media={<Glyph label={m.title[0]} />} selected={selected === m.id} onClick={() => setSelected(m.id)} />
      ))}
      <ModuleCard title="WhatsApp" description="Coming soon" media={<Glyph label="W" />} disabled />
    </div>
  );
}

export const Modules: Story = { render: () => <ModulePicker /> };

export const Activity: Story = {
  render: () => (
    <Card className="max-w-modal-md">
      <CardHeader title="Recent activity" action={<Button variant="ghost" size="sm">View all</Button>} />
      <ActivityFeed
        className="mt-2"
        items={[
          { id: '1', actor: 'Sarah Chen', title: <><strong className="font-semibold">Sarah Chen</strong> published “Summer Sale: Up to 50% off”</>, meta: 'Email · 12,450 recipients', time: '2h ago' },
          { id: '2', actor: 'Jimmy Dane', title: <><strong className="font-semibold">Jimmy Dane</strong> scheduled 3 posts</>, meta: 'Instagram, LinkedIn', time: '5h ago' },
          { id: '3', icon: <UsersIcon />, title: '48 contacts added to “Lagos prospects”', meta: 'Import from CSV', time: 'Yesterday' },
        ]}
      />
    </Card>
  ),
};
