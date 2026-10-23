import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { DayPicker, FrequencyPicker } from './FrequencyPicker';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/FrequencyPicker',
  component: FrequencyPicker,
  subcomponents: { DayPicker },
  tags: ['autodocs'],
  decorators: [(S) => <div className="w-modal-md"><S /></div>],
  parameters: {
    ...design('1594-7192'),
    docs: {
      description: {
        component:
          '`frequency-checklist-container` (1594:7192): title Inter Semi Bold 14 #111827, a 32px row of settings checkboxes (gap 20), then a detail row per selected frequency: ' +
          'Daily "Every 00 Hrs · 00 Mins · 00 Times" (41px unit fields), Weekly day pills (p6/10, r4, Semi Bold 12; selected #EE1F2F) + "Deliver at: 00 : 00 Hrs", ' +
          'Monthly "Every DD/MM/YYYY By 00:00" date-time field. "None" clears the others.',
      },
    },
  },
} satisfies Meta<typeof FrequencyPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

/** day=Default (1594:7191): Daily checked, "Frequency Time" row. */
export const Daily: Story = { args: { defaultValue: { frequencies: ['daily'], daily: { hours: '00', minutes: '00', times: '00' } } }, parameters: design('1594-7191') };

/** day=week (1594:7190): Weekly checked, Wednesday pill selected. */
export const Weekly: Story = {
  args: { defaultValue: { frequencies: ['weekly'], weekly: { days: ['wed'], hours: '00', minutes: '00' } } },
  parameters: design('1594-7190'),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const fri = c.getByRole('button', { name: 'Friday' });
    await userEvent.click(fri);
    await expect(fri).toHaveAttribute('aria-pressed', 'true');
    await expect(c.getByRole('button', { name: 'Wednesday' })).toHaveAttribute('aria-pressed', 'true');
  },
};

/** day=month (1594:7189): Monthly checked, date-time field. */
export const Monthly: Story = { args: { defaultValue: { frequencies: ['monthly'] } }, parameters: design('1594-7189') };

/** "None" clears every other frequency. */
export const NoneClearsOthers: Story = {
  args: { defaultValue: { frequencies: ['daily', 'weekly'] } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('checkbox', { name: 'None' }));
    await expect(c.getByRole('checkbox', { name: 'Daily' })).toHaveAttribute('data-state', 'unchecked');
    await expect(c.getByRole('checkbox', { name: 'Weekly' })).toHaveAttribute('data-state', 'unchecked');
  },
};

/** Weekly delivery day pills on their own (1590:5634). */
export const DayPills: Story = {
  render: () => <DayPicker aria-label="Weekly delivery days" defaultValue={['wed']} />,
  parameters: design('1590-5634'),
};

/** Mobile Social calendar strip day pills (1931:22554): 42×54, r8; selected red. */
export const CalendarDayPills: Story = {
  render: () => (
    <DayPicker
      aria-label="Day"
      appearance="calendar"
      single
      defaultValue={['wed']}
      days={[
        { value: 'mon', label: 'Mon', name: 'Monday 14', date: 14 },
        { value: 'tue', label: 'Tue', name: 'Tuesday 15', date: 15 },
        { value: 'wed', label: 'Wed', name: 'Wednesday 16', date: 16 },
        { value: 'thu', label: 'Thu', name: 'Thursday 17', date: 17 },
        { value: 'fri', label: 'Fri', name: 'Friday 18', date: 18 },
        { value: 'sat', label: 'Sat', name: 'Saturday 19', date: 19 },
        { value: 'sun', label: 'Sun', name: 'Sunday 20', date: 20 },
      ]}
    />
  ),
  parameters: design('1931-22554'),
};

/** All three variants together. */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <FrequencyPicker defaultValue={{ frequencies: ['daily'] }} />
      <FrequencyPicker defaultValue={{ frequencies: ['weekly'], weekly: { days: ['wed'], hours: '', minutes: '' } }} />
      <FrequencyPicker defaultValue={{ frequencies: ['monthly'] }} />
    </div>
  ),
};
