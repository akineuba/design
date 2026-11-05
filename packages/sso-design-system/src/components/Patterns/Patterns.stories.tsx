import type { Meta, StoryObj } from '@storybook/react';
import { Users } from 'lucide-react';
import { ActivityList, AppTile, SetupChecklist } from './Patterns';
import { activity, apps, setupSteps } from '../../demo/data';

const meta: Meta = { title: 'Patterns', tags: ['autodocs'] };
export default meta;

export const Applications: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
      {apps.map((a) => <AppTile key={a.name} name={a.name} icon={a.icon} />)}
      <AppTile name="CRM" icon={<Users />} disabled />
    </div>
  ),
};

export const GetStarted: StoryObj = { render: () => <div style={{ maxWidth: 520 }}><SetupChecklist description="Complete your organisation setup" steps={setupSteps} /></div> };

export const RecentActivity: StoryObj = { render: () => <div style={{ maxWidth: 520 }}><ActivityList title="Recent subscription activity" description="Changes across your account" items={activity} /></div> };
