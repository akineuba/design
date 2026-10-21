import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  args: { label: 'Customer Type:', required: true, children: null },
  parameters: {
    design: { url: FIGMA + '209-4142' },
    docs: { description: { component: 'Radio group for picking one of two to five options that should all be visible, e.g. Customer Type on the New Customer panel. Arrow keys move between options.' } },
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

const Group = (props: Partial<React.ComponentProps<typeof RadioGroup>> & { initial?: string }) => {
  const [v, setV] = useState(props.initial ?? '');
  return (
    <RadioGroup label="Customer Type:" required {...props} value={v} onChange={setV}>
      <Radio value="individual" label="Individual" />
      <Radio value="business" label="Business" />
    </RadioGroup>
  );
};

export const NoneSelected: Story = { render: () => <Group /> };
export const Selected: Story = { render: () => <Group initial="business" /> };
export const Vertical: Story = { render: () => <Group orientation="vertical" initial="individual" /> };
export const Disabled: Story = { render: () => <Group disabled initial="individual" /> };
