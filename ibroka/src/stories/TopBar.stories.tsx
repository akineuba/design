import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { NOTIFICATIONS } from './demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Components/TopBar', component: TopBar, args: { breadcrumb: [{ label: 'Overview' }, { label: 'Dashboard' }], notifications: NOTIFICATIONS }, parameters: { layout: 'fullscreen', design: { type: 'figma', url: figma('22:3209') } }, decorators: [(S) => <div className="h-[520px] bg-surface-page"><S /></div>] } satisfies Meta<typeof TopBar>;
export default meta;
type S = StoryObj<typeof meta>;
export const Default: S = {};
export const DeepBreadcrumb: S = { args: { breadcrumb: [{ label: 'Insurance' }, { label: 'Policies' }, { label: 'POL-2026-00975' }] } };
export const NotificationsOpen: S = { args: { defaultNotificationsOpen: true, onMarkAllRead: () => {} } };
export const NoNotifications: S = { args: { notifications: [], defaultNotificationsOpen: true } };
export const Interactive: S = {
  render: (a) => {
    const [n, setN] = useState(NOTIFICATIONS);
    const [t, setT] = useState<'light' | 'dark'>('light');
    return (
      <div data-theme={t} className="h-full bg-surface-page">
        <TopBar {...a} theme={t} onThemeChange={setT} notifications={n} onMarkAllRead={() => setN(n.map((x) => ({ ...x, unread: false })))} />
      </div>
    );
  },
};
