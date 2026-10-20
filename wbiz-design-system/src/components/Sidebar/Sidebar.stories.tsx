import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { FIGMA, Logo, navItems } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  args: { items: navItems, activeId: 'items', logo: <Logo />, logoCollapsed: <Logo compact /> },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '7067-32543' },
    docs: { description: { component: 'Main menu from the new features screens, the most recent version of the navigation. Groups expand in place; the group holding the current page is tinted with a primary indicator. The collapse button switches to an icon rail (derived; only the button is drawn in Figma).' } },
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InventoryActive: Story = {};
export const TopLevelActive: Story = { args: { activeId: 'approvals' } };
export const NothingExpanded: Story = { args: { activeId: undefined } };
export const Collapsed: Story = { args: { collapsed: true } };

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState('items');
    return <Sidebar {...args} activeId={active} onNavigate={(i) => setActive(i.id)} />;
  },
};
