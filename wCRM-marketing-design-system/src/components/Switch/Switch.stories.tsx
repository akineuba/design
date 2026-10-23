import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Switch } from './Switch';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { 'aria-label': 'Show on forms' },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['default', 'channel', 'icon'] },
    labelStyle: { control: 'select', options: ['default', 'settings', 'preference', 'composer', 'mobile', 'sheet'] },
  },
  parameters: {
    ...design('2523-63164'),
    docs: {
      description: {
        component:
          '`toggle-switch`: 42×22 track, r11, p2; on #05D38A, off #9CA3AF; 18px white thumb with no shadow. Mobile channel card uses a 38px red-on track; ' +
          'mobile V2-sections preference rows use the 32px vuesax toggle-on / toggle-off glyphs in #292D32.',
      },
    },
  },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fields table "On forms", on (2523:63164). */
export const On: Story = { args: { defaultChecked: true }, parameters: design('2523-63164') };
/** Fields table "On forms", off #9CA3AF (2542:65453). */
export const Off: Story = {
  parameters: design('2542-65453'),
  play: async ({ canvasElement }) => {
    const sw = within(canvasElement).getByRole('switch');
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute('aria-checked', 'true');
  },
};
/** Notification pref row header: Roboto Semi Bold 14 #111827 + Roboto 12 #4B5563, switch at the end. */
export const PreferenceRow: Story = {
  args: { label: 'Social interactions', description: 'Comments, mentions and messages on connected accounts.', labelPosition: 'start', labelStyle: 'preference', defaultChecked: true, className: 'w-field-sm' },
  parameters: design('1529-9553'),
};
/** Organisation "Show email footer" toggle row: description Roboto 12 #9CA3AF. */
export const SettingsRow: Story = {
  args: { label: 'Show email footer', description: 'Adds your logo, address and social links to every email.', labelPosition: 'start', labelStyle: 'settings', defaultChecked: true, className: 'w-field-sm' },
  parameters: design('1206-24406'),
};
/** Composer toggle row: Inter Semi Bold 14 #2B3674 + 12 #A3AED0. */
export const ComposerRow: Story = {
  args: { label: 'Hide Like Count', description: 'Only you will see the total number of likes.', labelPosition: 'start', labelStyle: 'composer', className: 'w-field-sm' },
  parameters: design('1526-8772'),
};
/** Mobile campaign channel card: 38×22, red on (#F32135). */
export const Channel: Story = { args: { appearance: 'channel', defaultChecked: true, 'aria-label': 'Email channel' }, parameters: design('1926-27211') };
/** Mobile V2-sections preference row: vuesax toggle glyphs 32px #292D32. */
export const IconToggle: Story = {
  args: { appearance: 'icon', label: 'Push notifications', description: 'Alerts for replies and failed sends.', labelPosition: 'start', labelStyle: 'mobile', defaultChecked: true, className: 'w-mobile-content' },
  parameters: design('1931-24424'),
};
/** Mobile sheet "Default toggle" row label (Roboto 12 #151A33). */
export const SheetRow: Story = {
  args: { label: 'Set as default view', labelPosition: 'start', labelStyle: 'sheet', defaultChecked: true, className: 'w-mobile-content rounded-md bg-mobile-chip p-3' },
  parameters: design('1933-14091'),
};
/** Disabled (derived). */
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

/** Every appearance × state. */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-4 items-center gap-x-6 gap-y-4">
      {['', 'Off', 'On', 'Disabled'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      {(['default', 'channel', 'icon'] as const).map((a) => (
        <div key={a} className="contents">
          <span className="text-label-sm text-text-primary">{a}</span>
          <Switch appearance={a} aria-label={`${a} off`} />
          <Switch appearance={a} aria-label={`${a} on`} defaultChecked />
          <Switch appearance={a} aria-label={`${a} disabled`} disabled defaultChecked />
        </div>
      ))}
    </div>
  ),
};
