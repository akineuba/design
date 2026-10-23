import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { LucideLockIcon } from '../../icons';
import { Checkbox, type CheckboxAppearance } from './Checkbox';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Daily' },
  argTypes: { appearance: { control: 'select', options: ['table', 'form', 'settings', 'list', 'drawer', 'success'] } },
  parameters: {
    ...design('1586-5524'),
    docs: {
      description: {
        component:
          'Checkbox in every style Figma draws: table 14px r3 1px #CBD5E1 · form 16px r3 1px #CBD5E1 · settings 16px r4 2px #E2E8F0 (checked #E53E3E, 10px white check) · ' +
          'list 18px r4 1.5px #64748B · drawer 20px r5 1px #A3AED0 (checked #EE1F2F, disabled-checked #F4A3AA) · success 20px #059669. Supports `checked="indeterminate"`.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Frequency checklist, unchecked (1586:5524). */
export const SettingsUnchecked: Story = { args: { label: 'None' }, parameters: design('1586-5524') };
/** Frequency checklist, checked #E53E3E (1586:5527). */
export const SettingsChecked: Story = {
  args: { defaultChecked: true },
  parameters: design('1586-5527'),
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole('checkbox', { name: 'Daily' });
    await expect(box).toHaveAttribute('data-state', 'checked');
    await userEvent.click(box);
    await expect(box).toHaveAttribute('data-state', 'unchecked');
  },
};
/** Notification pref row checkbox in its 32px frame (p8/12, gap 12). */
export const SettingsFramed: Story = { args: { label: 'Facebook Page', framed: true, defaultChecked: true }, parameters: design('1529-9531') };
/** Audience list selection column: 14px, r3, 1px #CBD5E1 (no label). */
export const Table: Story = { args: { label: undefined, appearance: 'table', 'aria-label': 'Select row' }, parameters: design('817-8458') };
/** Drawer `Component 16`: 16px r3 1px, title Medium 13 + description 12 #64748B. */
export const Form: Story = { args: { appearance: 'form', label: 'Send birthday wishes', description: 'An email goes out on the contact’s birthday.' }, parameters: design('808-6693') };
/** New-audience pick-list: 18px r4 1.5px #64748B, title Semi Bold 14. */
export const List: Story = { args: { appearance: 'list', label: 'Acme Corp' }, parameters: design('1533-9596') };
/** Fields drawer option, unchecked: 20px r5 1px #A3AED0. */
export const DrawerUnchecked: Story = { args: { appearance: 'drawer', label: 'Required', description: 'Contacts can’t be saved without it.' }, parameters: design('2535-65056') };
/** Fields drawer option, checked #EE1F2F. */
export const DrawerChecked: Story = { args: { appearance: 'drawer', label: 'Show on contact form', description: 'Appears on the create and edit forms.', defaultChecked: true }, parameters: design('2535-65062') };
/** Fields drawer option, disabled unchecked: #F1F5F9 fill, 1.5px #CBD5E1. */
export const DrawerDisabled: Story = {
  args: { appearance: 'drawer', label: 'Unique value', description: <span className="inline-flex items-center gap-1 text-caption"><LucideLockIcon className="size-3" />Protected</span>, disabled: true },
  parameters: design('2518-62914'),
};
/** Fields drawer option, disabled checked: #F4A3AA fill. */
export const DrawerDisabledChecked: Story = { args: { appearance: 'drawer', label: 'Required', description: 'Locked while required', disabled: true, defaultChecked: true }, parameters: design('2518-62925') };
/** YouTube "Made for kids?": 20px green #059669 when checked. */
export const Success: Story = { args: { appearance: 'success', label: 'Made for kids?', defaultChecked: true }, parameters: design('1526-8811') };
/** Indeterminate "select all" (derived). */
export const Indeterminate: Story = { args: { appearance: 'table', checked: 'indeterminate', label: 'All contacts' } };

/** Every appearance × state. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-6 items-center gap-x-6 gap-y-4">
      {['', 'Unchecked', 'Checked', 'Indeterminate', 'Disabled', 'Disabled checked'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      {(['table', 'form', 'settings', 'list', 'drawer', 'success'] as CheckboxAppearance[]).map((a) => (
        <div key={a} className="contents">
          <span className="text-label-sm text-text-primary">{a}</span>
          <Checkbox appearance={a} aria-label={`${a} unchecked`} />
          <Checkbox appearance={a} aria-label={`${a} checked`} defaultChecked />
          <Checkbox appearance={a} aria-label={`${a} indeterminate`} checked="indeterminate" />
          <Checkbox appearance={a} aria-label={`${a} disabled`} disabled />
          <Checkbox appearance={a} aria-label={`${a} disabled checked`} disabled defaultChecked />
        </div>
      ))}
    </div>
  ),
};
