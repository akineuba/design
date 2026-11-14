import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { QuickFilter } from '../components/FilterDropdown';
import { EmptyState } from '../components/EmptyState';
import { ExportIcon, PlusIcon } from '../icons';
import { figma } from '../docs/links';

const meta = { title: 'Components/Card', component: Card, parameters: { layout: 'padded', design: { type: 'figma', url: figma('3:676') } } } satisfies Meta<typeof Card>;
export default meta;
type S = StoryObj<typeof meta>;
export const WithActions: S = {
  args: {
    title: 'Recent premiums',
    actions: (
      <>
        <Button variant="outline" leadingIcon={<ExportIcon />}>Export</Button>
        <Button leadingIcon={<PlusIcon />}>Receive premium</Button>
      </>
    ),
    children: <EmptyState compact title="No premiums received this week" description="Premiums you receive appear here." />,
    className: 'w-[560px]',
  },
};
/** Filters next to the title, as on the Figma list screen. */
export const WithTitleFilters: S = {
  args: {
    title: 'Policies',
    radius: 'lg',
    titleAddon: <QuickFilter label="Status" value="all" onChange={() => {}} options={[{ value: 'all', label: 'All' }]} />,
    actions: <Button leadingIcon={<PlusIcon />}>Add policy</Button>,
    children: <p className="text-13 text-fg-muted">Table goes here.</p>,
    className: 'w-[760px]',
  },
};
export const Plain: S = { args: { children: <p className="text-13">A white panel with the card shadow and 20px radius.</p>, className: 'w-[360px]' } };
