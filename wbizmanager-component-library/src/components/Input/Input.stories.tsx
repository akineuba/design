import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ArrowDownIcon, CalendarIcon, SearchIcon } from '../../foundations/icons';

const FIGMA = 'https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Ref. Number', placeholder: 'Enter reference number' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  decorators: [(Story) => <div className="w-field"><Story /></div>],
  parameters: {
    design: { url: FIGMA + '6309-33026' },
    docs: {
      description: {
        component:
          'Built from the journal-entry fields on the accounting screens: label in Inter Medium 12/18 (fg-muted) ' +
          '4px above a 40px field with a 1px line border, 8px radius and 10/16 padding. Focus, error, success and ' +
          'loading are not drawn in Figma and use derived tokens.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = { args: { defaultValue: 'JV-2026-00418' } };

export const WithHint: Story = { args: { hint: 'Shown on the printed journal voucher.' } };

export const Required: Story = { args: { required: true, label: 'Journal Date', placeholder: 'DD/MM/YYYY', trailingIcon: <CalendarIcon /> } };

export const Error: Story = {
  args: { defaultValue: 'JV-418', error: 'Reference must start with JV- and a four-digit year.' },
};

export const Success: Story = { args: { defaultValue: 'JV-2026-00418', success: 'Reference is available.' } };

export const Disabled: Story = { args: { disabled: true, defaultValue: 'JV-2026-00418' } };

export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'JV-2026-00418', label: 'Posted reference' } };

export const Loading: Story = { args: { loading: true, defaultValue: 'Adeyemi Stores', label: 'Customer' } };

export const Search: Story = {
  args: { label: undefined, placeholder: 'Search', leadingIcon: <SearchIcon />, 'aria-label': 'Search' },
  parameters: { design: { url: FIGMA + '6309-32999' } },
};

export const SelectLike: Story = {
  args: { label: 'Customer Type', defaultValue: 'Business', readOnly: true, trailingIcon: <ArrowDownIcon /> },
  parameters: { design: { url: FIGMA + '203-6216' } },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="sm" label="Small (34px)" />
      <Input {...args} size="md" label="Medium (40px)" />
      <Input {...args} size="lg" label="Large (46px)" />
    </div>
  ),
};
