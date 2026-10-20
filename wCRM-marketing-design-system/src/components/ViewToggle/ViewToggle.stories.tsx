import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { CalendarIcon, GridIcon, ListIcon } from '../../icons';
import { ViewToggle } from './ViewToggle';

const meta = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Swap buttons for switching a list between views. Figma: Social posts toolbar (`Frame 1618874107` with `btn-list-view` and `btn-calendar-view`). ' +
          'Selected: `brand-primary` fill, white icon. Unselected: white, `text-icon` (#8F9BB3) glyph. Radio-group keyboard model (arrows, Home, End).',
      },
    },
  },
  args: { 'aria-label': 'Posts view', options: [], value: 'list', onValueChange: () => {} },
} satisfies Meta<typeof ViewToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

const twoViews = [
  { value: 'list', label: 'List view', icon: <ListIcon /> },
  { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> },
];

function Controlled({ initial = 'list', options = twoViews }: { initial?: string; options?: typeof twoViews }) {
  const [view, setView] = useState(initial);
  return <ViewToggle aria-label="Posts view" options={options} value={view} onValueChange={setView} />;
}

export const ListSelected: Story = { render: () => <Controlled /> };
export const CalendarSelected: Story = { render: () => <Controlled initial="calendar" /> };
export const ThreeViews: Story = {
  render: () => <Controlled options={[...twoViews, { value: 'grid', label: 'Grid view', icon: <GridIcon /> }]} />,
};

export const Keyboard: Story = {
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: 'List view' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: 'Calendar view' })).toHaveAttribute('aria-checked', 'true');
  },
};
