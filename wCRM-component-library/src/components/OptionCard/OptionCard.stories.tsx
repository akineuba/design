import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { FacebookLogo, InstagramLogo, LinkedInLogo, LucideMailIcon } from '../../icons';
import { Switch } from '../Switch';
import { OptionCard, OptionCardGroup } from './OptionCard';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/OptionCard',
  component: OptionCard,
  subcomponents: { OptionCardGroup },
  tags: ['autodocs'],
  args: { value: 'x', title: 'Microsoft Creator Hub' },
  parameters: {
    ...design('1446-32230'),
    docs: {
      description: {
        component:
          'Selectable cards for picking one record. Move To New Audience (1446:32230): 320px, p12, gap 20, r12; selected #FFF1F2 fill, #FECACA border, Semi Bold 14 #EE1F2F name ' +
          'and a 24px red check; unselected white, #E5E7EB border, #111827 name, #D1D5DB ring. Mobile sheet options, channel cards and connect-social platform cards are appearances.',
      },
    },
  },
} satisfies Meta<typeof OptionCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Move To New Audience modal list (1446:32223), first item selected. */
export const Modal: Story = {
  render: () => (
    <OptionCardGroup aria-label="Audience" appearance="modal" defaultValue="hub" className="w-field-sm">
      <OptionCard value="hub" title="Microsoft Creator Hub" description="1,248 members" />
      <OptionCard value="lagos" title="Lagos Enterprise Leads" description="342 members" />
      <OptionCard value="vip" title="VIP Customers" description="96 members" />
    </OptionCardGroup>
  ),
  parameters: design('1446-32223'),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByText('VIP Customers'));
    await expect(c.getByRole('radio', { name: /VIP Customers/ })).toBeChecked();
  },
};
/** Selected item (1446:32230). */
export const ModalSelected: Story = { args: { selected: true, description: '1,248 members', className: 'w-field-sm' }, parameters: design('1446-32230') };
/** Unselected item (1446:32237). */
export const ModalUnselected: Story = { args: { title: 'Lagos Enterprise Leads', description: '342 members', className: 'w-field-sm' }, parameters: design('1446-32237') };

/** Mobile select sheet options (1933:13986): 50px rows, 18px radio; selected #FFF0F2 + #F32135. */
export const Sheet: Story = {
  render: () => (
    <OptionCardGroup aria-label="Move to audience" appearance="sheet" defaultValue="vip" className="w-mobile-content">
      <OptionCard value="vip" title="VIP customers" description="128 members" />
      <OptionCard value="lagos" title="Lagos leads" description="42 members" />
      <OptionCard value="new" title="New signups" description="17 members" />
    </OptionCardGroup>
  ),
  parameters: design('1933-13986'),
};

/** Mobile campaign channel card (1926:27205): selected #FFC8CF border, 36px icon circle and the red switch. */
export const Channel: Story = {
  render: () => (
    <div className="flex w-mobile-content flex-col gap-2.25">
      <OptionCard appearance="channel" value="email" selected icon={<LucideMailIcon />} title="Email" description="Send to 1,248 contacts" control={<Switch appearance="channel" defaultChecked aria-label="Email channel" />} />
      <OptionCard appearance="channel" value="sms" icon={<LucideMailIcon />} title="SMS" description="Not configured" control={<Switch appearance="channel" aria-label="SMS channel" />} />
    </div>
  ),
  parameters: design('1926-27205'),
};

/** Connect social platform cards (1238:26211): 62px, p16, gap 16, r10, Instrument Sans. */
export const Platform: Story = {
  render: () => (
    <OptionCardGroup aria-label="Platform" appearance="platform" defaultValue="li" className="w-drawer-content">
      <OptionCard value="fb" icon={<FacebookLogo />} title="Facebook" description="Pages and groups" />
      <OptionCard value="ig" icon={<InstagramLogo />} title="Instagram" description="Business accounts" />
      <OptionCard value="li" icon={<LinkedInLogo />} title="LinkedIn" description="Company pages" />
    </OptionCardGroup>
  ),
  parameters: design('1238-26211'),
};

/** Every appearance × selected / unselected. */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['modal', 'sheet', 'platform'] as const).map((a) => (
        <div key={a} className="contents">
          <OptionCard appearance={a} value="a" selected title="Selected" description="Description" className="w-field-sm" />
          <OptionCard appearance={a} value="b" title="Unselected" description="Description" className="w-field-sm" />
        </div>
      ))}
    </div>
  ),
};
