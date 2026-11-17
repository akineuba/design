import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Radio, RadioGroup } from './Radio';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  args: { label: 'Scope', children: null },
  parameters: {
    ...design('1555-13610'),
    docs: {
      description: {
        component:
          'Single choice from a short list, on native radio inputs (arrow keys move the selection). Email config (1555:13398): 16px, checked #EE1F2F with a 6px white dot, ' +
          'unchecked 2px #E2E8F0 ring, label Inter Medium 13 #111827, 12px gap, options 16px apart. Also the carbon radios of the audience drawer, the 18px mobile sheet radio and the 22px mobile check circle.',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Email config "Scope" group (Component 19, 1555:13609). */
export const Default: Story = {
  render: () => (
    <RadioGroup label="Scope" defaultValue="org" helperText="Applies to every email sent from this workspace.">
      <Radio value="org" label="Entire organisation" />
      <Radio value="campaigns" label="Specific campaigns" />
    </RadioGroup>
  ),
  parameters: design('1555-13609'),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByLabelText('Specific campaigns'));
    await expect(c.getByLabelText('Specific campaigns')).toBeChecked();
    await userEvent.keyboard('{ArrowUp}');
    await expect(c.getByLabelText('Entire organisation')).toBeChecked();
  },
};

/** Email config "From Name": selected Medium 13 #111827, others Regular 13 #64748B (gap 8). */
export const EmphasizeSelected: Story = {
  render: () => (
    <RadioGroup label="From Name" defaultValue="user" emphasizeSelected>
      <Radio value="user" label="Select System User" />
      <Radio value="custom" label="Custom Free Text" />
    </RadioGroup>
  ),
  parameters: design('1555-13608'),
};

/** New-audience drawer: carbon radio glyphs, unchecked #000000, checked #EE1F2F, label Inter 14 #1E2238, gap 10. */
export const Carbon: Story = {
  render: () => (
    <RadioGroup aria-label="Email" appearance="carbon" orientation="horizontal" defaultValue="primary">
      <Radio value="primary" label="Primary email" />
      <Radio value="all" label="All emails" />
    </RadioGroup>
  ),
  parameters: design('1533-9613'),
};

/** Mobile select sheet radio: 18px, white + 1px #DDE3ED; selected solid #F32135. */
export const Sheet: Story = {
  render: () => (
    <RadioGroup aria-label="Audience" appearance="sheet" defaultValue="vip">
      <Radio value="vip" label="VIP customers" description="128 members" />
      <Radio value="lagos" label="Lagos leads" description="42 members" />
    </RadioGroup>
  ),
  parameters: design('1933-14003'),
};

/** Mobile Emails / Social selection: 22px circle, #EE1F2F with a white check; unchecked #E2E8F0 ring. */
export const CheckCircle: Story = {
  render: () => (
    <RadioGroup aria-label="Sender" appearance="check" defaultValue="ada">
      <Radio value="ada" label="Ada Obi" />
      <Radio value="tunde" label="Tunde Bello" />
    </RadioGroup>
  ),
  parameters: design('1931-23598'),
};

/** Every appearance × state (derived disabled). */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-4 items-center gap-x-8 gap-y-4">
      {['', 'Unchecked', 'Checked', 'Disabled'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      {(['default', 'carbon', 'sheet', 'check'] as const).map((a) => (
        <div key={a} className="contents">
          <span className="text-label-sm text-text-primary">{a}</span>
          <Radio appearance={a} name={`${a}-1`} value="x" label="Option" />
          <Radio appearance={a} name={`${a}-2`} value="y" label="Option" checked onChange={() => {}} />
          <Radio appearance={a} name={`${a}-3`} value="z" label="Option" disabled />
        </div>
      ))}
    </div>
  ),
};
