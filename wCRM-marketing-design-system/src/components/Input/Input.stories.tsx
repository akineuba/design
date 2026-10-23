import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { BxAtIcon, FacebookLogo, LucideCalendarIcon, LucideSearchIcon, SearchNormalIcon } from '../../icons';
import { Input } from './Input';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'First Name', placeholder: 'Enter first name' },
  decorators: [(S, ctx) => (ctx.parameters.wide ? <S /> : <div className="w-drawer-content"><S /></div>)],
  parameters: {
    ...design('808-6562'),
    docs: {
      description: {
        component:
          'Text field. Drawer field (808:6562): label Inter Regular 13 #1E2238 with a separate Semi Bold #E11D48 asterisk 3px after it, 6px above a 44px box ' +
          '(p12/16, r8, 1px #E2E8F0), placeholder Inter 14 #64748B. Heights 26 / 32 / 36 / 37 / 38 / 40 / 41 / 44 by `size`; mobile dialects by `appearance` ' +
          '(Roboto 11–12 labels, 13px values, red 1.5px focus border).',
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

/** New contact drawer field, placeholder only (808:6562). */
export const Default: Story = { args: { required: true }, parameters: design('808-6562') };
/** Filled value (#1E2238). */
export const Filled: Story = { args: { defaultValue: 'Olumide' } };
/** Create user drawer: label Inter Medium 13. */
export const MediumLabel: Story = { args: { label: 'Email Address', labelStyle: 'medium', placeholder: 'Enter email address', required: true }, parameters: design('1823-7673') };
/** With helper text (Inter 12 #64748B). */
export const WithHelper: Story = { args: { label: 'Birthday', placeholder: 'DD/MM', helperText: 'Day and month required; year optional.' }, parameters: design('808-6717') };
/** Campaign details read-only field: 37px, white, label Inter 12. */
export const ReadOnly: Story = { args: { label: 'Campaign Name', labelStyle: 'caption', size: 'compact', readOnly: true, defaultValue: 'Q2 Launch Campaign' }, parameters: design('898-3454') };
/** Email config auto-filled address: #F4F6FA fill, italic helper. */
export const ReadOnlyCanvas: Story = {
  args: { label: 'From Address', appearance: 'email', size: 'form', readOnly: true, readOnlyFill: 'canvas', defaultValue: 'akinola@wragby.com', helperText: 'Auto-filled from the selected user.' },
  parameters: design('1555-13421'),
};
/** Spec drawer read-only: #F8F9FC fill, value #64748B. */
export const ReadOnlySpec: Story = { args: { label: 'Internal key', readOnly: true, readOnlyFill: 'table-header', defaultValue: 'secondary_email' }, parameters: design('2535-64759') };
/** Email config field: label Inter Semi Bold 14 #111827, 41px, placeholder #A3AED0. */
export const EmailConfig: Story = { args: { label: 'From Name', appearance: 'email', size: 'form', placeholder: 'e.g. Wragby Marketing' }, parameters: design('1555-13610') };
/** Composer post settings: label Semi Bold 13 #A3AED0, 37px, value #2B3674, trailing @ icon. */
export const Composer: Story = { args: { label: 'Collaborators', appearance: 'composer', size: 'compact', defaultValue: 'wragby_hq', trailingIcon: <BxAtIcon /> }, parameters: design('1526-8752') };
/** Organisation form: Roboto, 36px, label #111827. */
export const Settings: Story = { args: { label: 'Company Name', appearance: 'settings', size: 'settings', defaultValue: 'Wragby Solutions' }, parameters: design('1434-31321') };
/** Social link: 38px with the 18px platform logo. */
export const SocialLink: Story = { args: { label: 'Facebook', appearance: 'settings', size: 'social', defaultValue: 'facebook.com/wragby', leadingIcon: <FacebookLogo /> }, parameters: design('1206-24343') };
/** Date input with a trailing 16px calendar (#64748B). */
export const DateField: Story = { args: { label: 'Start Date', placeholder: 'DD/MM/YYYY', trailingIcon: <LucideCalendarIcon /> }, parameters: design('892-816') };
/** Frequency row unit field: "00" + "Hrs" suffix (#A3AED0), 41px. */
export const UnitSuffix: Story = { args: { label: 'Hours', hideLabel: true, size: 'form', defaultValue: '00', suffix: 'Hrs' }, parameters: design('1586-5541') };
/** Toolbar search: 220×36, p8/12, 13px, #A3AED0 placeholder and icon. */
export const ToolbarSearch: Story = {
  args: { label: 'Search contacts', hideLabel: true, appearance: 'toolbar', size: 'toolbar', placeholder: 'Search...', leadingIcon: <LucideSearchIcon />, wrapperClassName: 'w-search-sm' },
  parameters: { ...design('817-9046'), wide: true },
};
/** Fields toolbar search: 260×40, p0/12. */
export const ToolbarSearchMd: Story = {
  args: { label: 'Search fields', hideLabel: true, appearance: 'toolbar', size: 'md', placeholder: 'Search fields...', leadingIcon: <LucideSearchIcon />, wrapperClassName: 'w-search-md' },
  parameters: { ...design('2524-8622'), wide: true },
};
/** Connect-social small search: 32px, Roboto 13 #9CA3AF. */
export const SearchSmall: Story = { args: { label: 'Search profiles', hideLabel: true, appearance: 'settings', size: 'search-sm', placeholder: 'Search profiles', leadingIcon: <LucideSearchIcon /> }, parameters: design('1239-26352') };
/** Error (derived on desktop): #E11D48 border and message. */
export const ErrorState: Story = { name: 'Error', args: { required: true, defaultValue: 'alex@', label: 'Email Address', error: 'Enter a valid email address.' } };
/** Disabled (derived). */
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Olumide' } };

function MobileSearch() {
  const [q, setQ] = useState('Ada');
  return (
    <Input
      label="Search contacts"
      hideLabel
      appearance="mobile"
      size="mobile-search"
      placeholder="Search contacts"
      leadingIcon={<SearchNormalIcon strokeWidth={1.5} />}
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onClear={() => setQ('')}
      clearLabel="Clear search"
      helperText="Searching name, email, company and phone"
    />
  );
}

/** Mobile V2 search, focused and typing: red 1.5px border, x-circle clear, 10px helper. */
export const MobileSearchFocused: Story = {
  render: () => <div className="w-mobile-content"><MobileSearch /></div>,
  parameters: { ...design('1926-24937'), wide: true },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('textbox', { name: 'Search contacts' }));
    await userEvent.click(c.getByRole('button', { name: 'Clear search' }));
    await expect(c.getByRole('textbox', { name: 'Search contacts' })).toHaveValue('');
  },
};
/** Mobile V2 field, placeholder: Roboto Semi Bold 11 label, 44px, #DDE3ED, Roboto 13 #98A4BF placeholder. */
export const MobileV2: Story = { args: { label: 'First name', appearance: 'mobile', size: 'mobile', placeholder: 'e.g. Ada' }, parameters: design('1926-25049') };
/** Mobile V2 field, filled. */
export const MobileV2Filled: Story = { args: { label: 'First name', appearance: 'mobile', size: 'mobile', defaultValue: 'Ada' }, parameters: design('1926-25373') };
/** Mobile V2 error: asterisk typed in the label, #F32135 border, Roboto 11 message. */
export const MobileV2Error: Story = { args: { label: 'First name', required: true, appearance: 'mobile', size: 'mobile', error: 'Required' }, parameters: design('1926-25040') };
/** Mobile V1 field: Roboto Semi Bold 12 label with a separate red asterisk. */
export const MobileV1: Story = { args: { label: 'Email', required: true, appearance: 'mobile-v1', size: 'mobile-v1', placeholder: 'name@company.com' }, parameters: design('1918-21123') };
/** Mobile V2-sections field: Roboto Medium 12 #475569 label, #CBD5E1 border, Roboto 14/140% value. */
export const MobileSections: Story = { args: { label: 'Workspace name', appearance: 'mobile-sections', size: 'mobile', defaultValue: 'Wragby Marketing' }, parameters: design('1931-24362') };
/** Mobile sections error: #EE1F2F border and caption. */
export const MobileSectionsError: Story = { args: { label: 'Work email', appearance: 'mobile-sections', size: 'mobile', defaultValue: 'ada@gmail.com', error: 'Use a company email address' }, parameters: design('1931-24560') };

/** Every height side by side. */
export const Heights: Story = {
  parameters: { wide: true, layout: 'padded' },
  render: () => (
    <div className="flex w-drawer-content flex-col gap-3">
      {(['xs', 'search-sm', 'toolbar', 'settings', 'compact', 'social', 'md', 'search', 'form', 'lg', 'mobile'] as const).map((s) => (
        <Input key={s} label={s} size={s} placeholder={s} />
      ))}
    </div>
  ),
};

/** Every appearance × state. */
export const Matrix: Story = {
  parameters: { wide: true, layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {(['default', 'toolbar', 'settings', 'email', 'composer', 'mobile', 'mobile-v1', 'mobile-sections'] as const).map((a) => (
        <div key={a} className="contents">
          <Input appearance={a} label={`${a} placeholder`} placeholder="Placeholder" required />
          <Input appearance={a} label="Filled" defaultValue="Value" />
          <Input appearance={a} label="Error" defaultValue="Value" error="Error message" />
          <Input appearance={a} label="Disabled" defaultValue="Value" disabled />
        </div>
      ))}
    </div>
  ),
};
