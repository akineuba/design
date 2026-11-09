import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar, UserMenu, NotificationsPanel, HelpMenu, PageHeader, Breadcrumb } from '../components/layout';
import { Button } from '../components/primitives';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar', component: TopBar, tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Top bar from the Figma: breadcrumb above the page title on the left; help, notifications, theme toggle and the user chip on the right. Each icon opens its own menu.' } } },
  decorators: [(S) => <div style={{ minHeight: 560 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof TopBar>;
export const Default: S = {};
export const DeepBreadcrumb: S = { args: { breadcrumb: ['Overview', 'Organisations', 'Northwind Motors', 'Subscriptions'], title: 'Fleet Diagnostics Pro' } };
export const NotificationsOpen: S = { args: { open: 'notifications' } };
export const NoNotifications: S = { args: { notifications: 0, open: 'notifications' } };
export const UserMenuOpen: S = { args: { open: 'user' } };
export const HelpOpen: S = { args: { open: 'help' } };

export const Menus: S = {
  name: 'Menus side by side',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <UserMenu inline /><NotificationsPanel inline /><HelpMenu inline />
    </div>
  ),
};
export const PageHeaders: S = {
  name: 'Page header',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <PageHeader title="Good Morning, User" subtext="Here’s what’s happening across your organisations today." />
      <PageHeader title="Organisations" subtext="OEMs, dealers, fleets and partners on AEMSP." actions={<><Button variant="outline" icon="export">Export</Button><Button icon="add">Add organisation</Button></>} />
      <PageHeader back="Back to Organisations" title="Northwind Motors" subtext="OEM · UK & Ireland" />
    </div>
  ),
};
