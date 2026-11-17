import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FilterButton } from './FilterButton';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/FilterButton',
  component: FilterButton,
  tags: ['autodocs'],
  args: { label: 'Filter' },
  argTypes: {
    display: { control: 'inline-radio', options: ['labelled', 'icon', 'responsive'] },
    appearance: { control: 'inline-radio', options: ['v2', 'v1', 'sections'] },
  },
  parameters: {
    ...design('1230-26010'),
    docs: {
      description: {
        component:
          'Desktop `filter-button` (1230:26010): 40px, transparent, 1px #E2E8F0, r8, p10/16, gap 8, 20px vuesax calendar glyph #A3AED0, Inter Medium 14 #64748B. ' +
          'Mobile icon-only: 44×44 (V2 / V1) or 40×40 (sections); the glyph stays #292D32 and switches linear → bold when active, with a 7px (V2) or 14px (V1) dot.',
      },
    },
  },
} satisfies Meta<typeof FilterButton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop list toolbars (audience, social posts). */
export const Labelled: Story = { parameters: design('1230-26010') };
/** User management toolbar: label #4F5966. */
export const LabelledUserManagement: Story = { args: { labelTone: 'nav' }, parameters: design('1823-7447') };
/** Applied filters on desktop (derived: Figma draws no applied state on desktop). */
export const LabelledActive: Story = { args: { count: 2 } };
/** Mobile V2-flow default: 44×44, #DDE3ED border, linear funnel 20. */
export const MobileV2: Story = { args: { display: 'icon' }, parameters: design('1926-24556') };
/** Mobile V2-flow active: #FFF0F2 fill, #F32135 border, bold funnel, 7px dot. */
export const MobileV2Active: Story = {
  args: { display: 'icon', count: 3 },
  parameters: design('1926-24736'),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Filter, 3 applied' })).toHaveAttribute('data-active', 'true');
  },
};
/** Mobile V1 default: 44×44, #E2E8F0 border. */
export const MobileV1: Story = { args: { display: 'icon', appearance: 'v1' }, parameters: design('1918-20825') };
/** Mobile V1 active: #FFF1F2 fill, #EE1F2F border, bold funnel, 14px count dot. */
export const MobileV1Active: Story = { args: { display: 'icon', appearance: 'v1', count: 2 }, parameters: design('1918-20992') };
/** Mobile V2-sections default: 40×40, 18px linear funnel. */
export const MobileSections: Story = { args: { display: 'icon', appearance: 'sections' }, parameters: design('1931-24248') };
/** Mobile V2-sections active: #FFF0F1 fill, #EE1F2F border, glyph stays linear, no dot. */
export const MobileSectionsActive: Story = { args: { display: 'icon', appearance: 'sections', active: true }, parameters: design('1931-24486') };
/** Disabled (derived). */
export const Disabled: Story = { args: { disabled: true } };
/** Labelled from 640px up, 44px icon-only below. */
export const Responsive: Story = { args: { display: 'responsive', count: 1 } };

/** Every display × state. */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-4 items-center gap-x-6 gap-y-4">
      {['', 'Default', 'Applied', 'Disabled'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      <span className="text-label-sm">Desktop</span>
      <FilterButton />
      <FilterButton count={2} />
      <FilterButton disabled />
      {(['v2', 'v1', 'sections'] as const).map((a) => (
        <div key={a} className="contents">
          <span className="text-label-sm">Mobile {a}</span>
          <FilterButton display="icon" appearance={a} />
          <FilterButton display="icon" appearance={a} count={2} active />
          <FilterButton display="icon" appearance={a} disabled />
        </div>
      ))}
    </div>
  ),
};
