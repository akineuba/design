import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { CalendarIcon, GridIcon, ListIcon } from '../../icons';
import { ViewToggle } from './ViewToggle';

// Source design: the wCRM design system's ViewToggle (wCRM updates Figma file).
const WCRM_FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';

const meta = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  parameters: {
    design: { type: 'figma', url: WCRM_FIGMA + '1036-6314' },
    docs: {
      description: {
        component:
          'Swap buttons for switching the same records between views (list, calendar, grid). Ported from the wCRM design system ' +
          '(Social posts view switch) and restyled with wBiz tokens: selected cell `primary` with a white icon; others `surface` with an ' +
          '`icon-muted` glyph inside one `line` outline. Radio-group keyboard model (arrows, Home, End). For labelled options use SegmentedControl.',
      },
    },
  },
  args: { 'aria-label': 'Records view', options: [], value: 'list', onValueChange: () => {} },
} satisfies Meta<typeof ViewToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

const twoViews = [
  { value: 'list', label: 'List view', icon: <ListIcon /> },
  { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> },
];

function Controlled({ initial = 'list', options = twoViews }: { initial?: string; options?: typeof twoViews }) {
  const [view, setView] = useState(initial);
  return <ViewToggle aria-label="Records view" options={options} value={view} onValueChange={setView} />;
}

/** List view selected: 80 × 40 group, `line` outline, blue 40px cell with the white list glyph. */
export const ListSelected: Story = { render: () => <Controlled /> };
/** Calendar view selected. */
export const CalendarSelected: Story = {
  render: () => <Controlled initial="calendar" />,
  parameters: { design: { type: 'figma', url: WCRM_FIGMA + '1054-8582' } },
};
/** List, calendar and grid. */
export const ThreeViews: Story = {
  render: () => <Controlled options={[...twoViews, { value: 'grid', label: 'Grid view', icon: <GridIcon /> }]} />,
};

/** Tab focuses the selected cell; arrow keys move and select. */
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

/** Both states side by side. */
export const Matrix: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Controlled />
      <Controlled initial="calendar" />
    </div>
  ),
};
