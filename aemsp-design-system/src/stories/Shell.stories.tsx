import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../components/layout';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar', component: Sidebar, tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'The AEMSP sidebar, exactly as designed: light navy by default, blue left border + 20% blue fill on the active item and active sub-page, dot-circle icons for sub-pages, caret for groups, Log Out pinned at the bottom. The collapse button switches to a 76px icon rail with tooltips.' } } },
  decorators: [(S) => <div style={{ height: 900, display: 'flex' }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof Sidebar>;
export const ModuleActive: S = { args: { active: 'dashboard', defaultOpen: ['partner'] } };
export const SubPageActive: S = { args: { active: 'policies' } };
export const WithPendingCount: S = { args: { active: 'approvals' } };
export const FullyExpanded: S = { args: { active: 'roles', defaultOpen: ['partner', 'users', 'settings'] } };
export const Collapsed: S = { args: { collapsed: true, active: 'approvals' } };
export const Dark: S = { args: { theme: 'dark', active: 'dashboard', defaultOpen: ['partner'] } };
