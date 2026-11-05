import type { Meta, StoryObj } from '@storybook/react';
import { Users } from 'lucide-react';
import { ActivityList, AppTile, EmptyState, SetupChecklist } from './Patterns';
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
