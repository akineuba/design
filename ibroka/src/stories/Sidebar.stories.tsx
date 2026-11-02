import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { USER } from './demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Components/Sidebar', component: Sidebar, args: { activeId: 'dashboard', user: USER, onSignOut: () => {} }, parameters: { layout: 'fullscreen', docs: { source: { type: 'code' } }, design: { type: 'figma', url: figma('22:3309') } }, decorators: [(S) => <div className="h-[900px] bg-surface-page"><S /></div>] } satisfies Meta<typeof Sidebar>;
export default meta;
type S = StoryObj<typeof meta>;
/** Figma: Dashboard active, Insurance open. */
export const ModuleActive: S = { args: { defaultExpanded: ['insurance'] } };
export const PageActive: S = { args: { activeId: 'policies' } };
export const SubPageActive: S = { args: { activeId: 'payroll-runs' } };
export const FullyExpanded: S = { args: { defaultExpanded: ['hr', 'insurance', 'accounting', 'reports'] }, parameters: { design: { type: 'figma', url: figma('18:2625') } } };
export const Collapsed: S = { args: { collapsed: true, activeId: 'policies' }, parameters: { design: { type: 'figma', url: figma('22:3193') } } };
export const Interactive: S = {
  render: (a) => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return <Sidebar {...a} activeId={active} onNavigate={setActive} collapsed={collapsed} onCollapsedChange={setCollapsed} />;
  },
};
