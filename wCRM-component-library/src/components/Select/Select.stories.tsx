import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, within } from '@storybook/test';
import { Select } from './Select';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const tags = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];
const campaigns = [
  { value: 'all', label: 'All' },
  { value: 'q2', label: 'Q2 Launch Campaign' },
  { value: 'summer', label: 'Summer Sale' },
];
const periods = [
  { value: '24h', label: 'First 24 hours' },
  { value: '48h', label: 'First 48 hours' },
  { value: 'week', label: 'First week' },
  { value: 'month', label: 'First month' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { options: tags, label: 'Tag', placeholder: 'Select an option' },
  decorators: [(S, ctx) => (ctx.parameters.wide ? <S /> : <div className="w-drawer-content"><S /></div>)],
  parameters: {
    ...design('808-6574'),
    docs: {
      description: {
        component:
          'Single-choice dropdown (Radix Select). Drawer select (808:6574): 44px, p12/16, r8, 1px #E2E8F0, "Select an option" in #1E2238 (Figma does not grey it), ' +
          '12px chevron #1E2238. Open list (1446:34877): p12/16, 10px gap, plain Inter 14 rows, no shadow. Keyboard: Space/Enter opens, arrows move, type-ahead, Esc closes.',
      },
    },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

/** New contact drawer select, placeholder (808:6574). */
export const Placeholder: Story = { args: { required: true }, parameters: design('808-6574') };
/** With a value. */
export const WithValue: Story = { args: { defaultValue: 'marketing' } };
/** Filters popover select: label Inter 13, 44px. */
export const FilterPopoverSelect: Story = { args: { label: 'Creator', options: campaigns, defaultValue: 'all' }, parameters: design('869-11860') };
/** Composer "Selector Dropdown": 41px, p12/16. */
export const Form: Story = { args: { label: 'Connected Accounts', labelStyle: 'section', size: 'form', options: campaigns }, parameters: design('1515-5781') };
/** Publishing card "Attach to Campaign": 37px, p10/14. */
export const Compact: Story = { args: { label: 'Attach to Campaign', size: 'compact', options: campaigns, defaultValue: 'q2' }, parameters: design('1066-9142') };
/** Insert Smart Field modal select: 36px, p10/14. */
export const Small: Story = { args: { label: 'Field', size: 'sm', options: tags }, parameters: design('1175-22676') };
/** Emails toolbar inline label "Campaign: All" (#1E2238, gap 10), 41px. */
export const InlineLabel: Story = {
  args: { label: 'Campaign', hideLabel: true, inlineLabel: 'Campaign:', size: 'form', options: campaigns, defaultValue: 'all' },
  parameters: { ...design('1104-15154'), wide: true },
};
/** Social accounts toolbar "Accounts: All". */
export const InlineLabelAccounts: Story = {
  args: { label: 'Accounts', hideLabel: true, inlineLabel: 'Accounts:', size: 'form', options: campaigns, defaultValue: 'all' },
  parameters: { ...design('1225-25729'), wide: true },
};
/** Fields toolbar prefix "Source: All" (#64748B prefix), 37px. */
export const Prefix: Story = {
  args: { label: 'Source', hideLabel: true, prefix: 'Source:', size: 'compact', options: [{ value: 'all', label: 'All' }, { value: 'custom', label: 'Custom' }], defaultValue: 'all' },
  parameters: { ...design('2524-8627'), wide: true },
};
/** Social accounts inline table select: 26px, r6, Roboto 12 #111827, chevron #4B5563. */
export const TableInline: Story = {
  args: { label: 'Post visibility', hideLabel: true, size: 'xs', options: [{ value: 'public', label: 'Public' }, { value: 'private', label: 'Connections' }], defaultValue: 'public' },
  parameters: { ...design('1224-25594'), wide: true },
};
/** Email config select: label Semi Bold 14 #111827, placeholder #A3AED0. */
export const EmailConfig: Story = { args: { label: 'System User', appearance: 'email', size: 'form', options: tags }, parameters: design('1555-13610') };
/** Mobile V2 select: no chevron drawn. */
export const MobileV2: Story = { args: { label: 'Company', appearance: 'mobile', size: 'mobile', placeholder: 'Select a company', options: tags }, parameters: design('1926-25062') };
/** Mobile V1 select: vuesax arrow-bottom 16 #292D32. */
export const MobileV1: Story = { args: { label: 'Company', appearance: 'mobile-v1', size: 'mobile', placeholder: 'Select a company', options: tags }, parameters: design('1918-21126') };
/** Mobile V2-sections select. */
export const MobileSections: Story = { args: { label: 'Time zone', appearance: 'mobile-sections', size: 'mobile', options: [{ value: 'wat', label: 'West Africa Time (WAT)' }], defaultValue: 'wat' }, parameters: design('1931-24362') };
/** Error (derived). */
export const ErrorState: Story = { name: 'Error', args: { error: 'Choose a tag.', required: true } };
/** Disabled (derived). */
export const Disabled: Story = { args: { disabled: true, defaultValue: 'sales' } };

/** Open option list (1446:34877): plain text rows, 10px gap, no shadow. */
export const Open: Story = {
  args: { defaultValue: 'marketing' },
  parameters: { ...design('1446-34877'), docs: { story: { height: '200px' } } },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('combobox'));
    await expect(await screen.findByRole('listbox')).toBeInTheDocument();
  },
};
/** Email performance "Selector Dropdown" panel (1147:17013): 15px row gap. */
export const OpenRelaxed: Story = {
  args: { label: 'Window', hideLabel: true, options: periods, defaultValue: '24h', menuSpacing: 'relaxed', size: 'md' },
  parameters: { ...design('1147-17013'), docs: { story: { height: '240px' } } },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(within(canvasElement).getByRole('combobox')).toHaveTextContent('First 48 hours');
  },
};

/** Every size and appearance side by side. */
export const Matrix: Story = {
  parameters: { wide: true, layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(['xs', 'sm', 'compact', 'md', 'form', 'lg', 'mobile'] as const).map((s) => (
        <Select key={s} label={`size ${s}`} size={s} options={tags} />
      ))}
      {(['default', 'settings', 'email', 'mobile', 'mobile-v1', 'mobile-sections'] as const).map((a) => (
        <Select key={a} label={`appearance ${a}`} appearance={a} size={a.startsWith('mobile') ? 'mobile' : 'lg'} options={tags} required />
      ))}
      <Select label="Error" options={tags} error="Choose a tag." />
      <Select label="Disabled" options={tags} disabled defaultValue="sales" />
    </div>
  ),
};
