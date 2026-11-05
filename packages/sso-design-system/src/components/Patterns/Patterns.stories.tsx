import type { Meta, StoryObj } from '@storybook/react';
import { Building2, CreditCard, Eye, Layers, Pencil, Power, ShieldCheck, Users } from 'lucide-react';
import { ActivityList, AppTile, EmptyState, LinkTile, RowActions, SectionHeading, SetupChecklist } from './Patterns';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { Button } from '../Button/Button';
import { activity, apps, setupSteps } from '../../demo/data';

const meta: Meta = { title: 'Patterns', tags: ['autodocs'] };
export default meta;

export const AppLauncher: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
      {apps.map((a) => <AppTile key={a.name} name={a.name} icon={a.icon} />)}
      <AppTile name="CRM" icon={<Users />} disabled />
    </div>
  ),
};

export const Checklist: StoryObj = { render: () => <div style={{ maxWidth: 520 }}><SetupChecklist subtitle="Complete your tenant setup" steps={setupSteps} /></div> };

export const Activity: StoryObj = { render: () => <div style={{ maxWidth: 520 }}><ActivityList title="Recent activity" subtitle="Changes across your account" items={activity} /></div> };

export const Empty: StoryObj = {
  render: () => <EmptyState icon={<Users />} title="No users yet" description="Invite your team so they can sign in once and open every wBiz app they're assigned." action={<Button>Invite users</Button>} />,
};

export const LinkTiles: StoryObj = {
  render: () => (
    <div>
      <SectionHeading title="Platform administration" description="Catalogue, plans, lifecycle, approvals, and cross-tenant tools." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <LinkTile title="Commercial tenants" description="Subscription-side tenant profiles." icon={<Building2 />} />
        <LinkTile title="Plans" description="List, edit drafts, publish." icon={<Layers />} tone="amber" />
        <LinkTile title="Lifecycle" description="Subscribe, trial, status changes." icon={<ShieldCheck />} tone="green" />
      </div>
      <div style={{ height: 24 }} />
      <SectionHeading title="Quick links" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <LinkTile title="Tenants" icon={<Building2 />} />
        <LinkTile title="Users" icon={<Users />} />
        <LinkTile title="Roles" icon={<ShieldCheck />} tone="teal" />
        <LinkTile title="Subscriptions" icon={<CreditCard />} tone="green" />
      </div>
    </div>
  ),
};

export const TableRowActions: StoryObj = {
  render: () => (
    <RowActions actions={[{ label: 'Entities', icon: <Layers /> }, { label: 'View', icon: <Eye /> }, { label: 'Edit', icon: <Pencil /> }]}>
      <ActionMenu label="More actions" items={[{ label: 'Deactivate', icon: <Power />, tone: 'danger' }]} />
    </RowActions>
  ),
};
