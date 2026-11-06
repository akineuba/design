import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar, type NavItem } from './Sidebar';
import { Logo } from '../Logo';
import { appFooterNavigation, appNavigation } from '../../patterns/demo-data';

// Finds menu ids by label so the stories stay in step with the sample menu.
const all = (items: NavItem[]): NavItem[] => items.flatMap((i) => [i, ...all(i.children ?? [])]);
const idOf = (label: string, within?: string) =>
  all([...appNavigation, ...appFooterNavigation]).find((i) => i.label === label && (!within || i.id.startsWith(within)))?.id ?? label;

const recentIds = [idOf('General Ledger'), idOf('Posting Groups'), idOf('Attendance Management'), idOf('Dashboard', 'human-resources')];
const hrPage = idOf('Dashboard', 'human-resources');

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {
    items: appNavigation,
    footerItems: appFooterNavigation,
    activeId: hrPage,
    recentIds,
    logo: <Logo />,
    logoCollapsed: <Logo variant="mark" />,
  },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The wBizManager menu as a module rail and a page panel, from the navigation reference images supplied by design (Nov 2026). ' +
          'The rail lists modules (icon over a short label) with Settings and Help at the bottom; the panel lists the selected module\'s pages. ' +
          'Home shows recent and pinned pages; hover a page and click the star to pin it. "Find in menu" (or the / key) searches every page. ' +
          'Only the module being viewed is highlighted, styled like the primary button; in the collapsed rail the module holding the current page gets that style. The page list is text only.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Home: recent pages and the empty "pin" prompt. The current page is in HR, which stays unhighlighted while Home is viewed. */
export const Home: Story = { args: { defaultView: 'home' } };
/** Browsing another module: Purchases, with Procurement as a page that has sub-pages. */
export const ModulePages: Story = { args: { defaultView: 'purchases' } };
/** Opens on the current page's module. */
export const CurrentModule: Story = {};
/** A sub-page is current: its group opens in place with a back link. */
export const SubPageActive: Story = { args: { activeId: idOf('Asset Category') } };
export const WithPinnedPages: Story = {
  args: { defaultView: 'home', defaultPinnedIds: [idOf('Invoices'), idOf('Chart of Accounts'), idOf('Bills')] },
};
export const ModuleWithoutPagesActive: Story = { args: { activeId: 'approvals', defaultView: 'home' } };
export const Collapsed: Story = { args: { collapsed: true } };

export const Interactive: Story = {
  args: { defaultView: 'home' },
  render: (args) => {
    const [active, setActive] = useState(hrPage);
    const [recent, setRecent] = useState(recentIds);
    const [pinned, setPinned] = useState<string[]>([]);
    return (
      <Sidebar
        {...args}
        activeId={active}
        recentIds={recent}
        pinnedIds={pinned}
        onPinnedChange={setPinned}
        onNavigate={(i) => {
          setActive(i.id);
          setRecent((r) => [i.id, ...r.filter((x) => x !== i.id)].slice(0, 5));
        }}
      />
    );
  },
};
