import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Logo } from '../Logo';
import { FIGMA, appNavigation } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {
    items: appNavigation,
    activeId: 'accounting/fixed-assets/asset-category',
    logo: <Logo />,
    logoCollapsed: <Logo variant="mark" />,
  },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '7067-32543' },
    docs: {
      description: {
        component:
          'The full wBizManager menu: modules, pages and sub-pages (three levels, any of which can be a group). ' +
          'Metrics come from the new features sidebar; the structure comes from the fully unfolded sidebar the design team supplied. ' +
          'The module holding the current page is tinted with a primary indicator. The collapse button switches to an icon rail (derived; only the button is drawn in Figma).',
      },
    },
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Current page three levels deep: Accounting › Fixed Assets › Asset Category. */
export const SubPageActive: Story = {};
export const PageActive: Story = { args: { activeId: 'sales/customers' } };
export const ModuleWithoutPagesActive: Story = { args: { activeId: 'approvals' } };
/** Every group open, matching the unfolded reference. */
export const FullyExpanded: Story = { args: { expandAll: true, activeId: 'accounting/chart-of-accounts' } };
export const NothingExpanded: Story = { args: { activeId: undefined } };
export const Collapsed: Story = { args: { collapsed: true } };

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState('sales/customers');
    return <Sidebar {...args} activeId={active} onNavigate={(i) => setActive(i.id)} />;
  },
};
