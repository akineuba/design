import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { CalendarTimePicker, TimeSpinner } from './CalendarTimePicker';
import { DateTimePicker, TimePicker } from './DateTimePicker';
import { SyncTimeSelect } from './SyncTimeSelect';
import { TimeField, UnitInput } from './TimeField';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const syncOptions = [
  { value: '15m', label: 'Every 15 min' },
  { value: '30m', label: 'Every 30 min' },
  { value: '1h', label: 'Hourly' },
  { value: '6h', label: 'Every 6 hours' },
  { value: '1d', label: 'Daily' },
  { value: 'custom', label: 'Custom' },
];

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  subcomponents: { CalendarTimePicker, TimeSpinner, TimePicker, SyncTimeSelect, TimeField, UnitInput },
  tags: ['autodocs'],
  args: { label: 'Monthly delivery date and time' },
  parameters: {
    ...design('1594-7048'),
    docs: {
      description: {
        component:
          'Date and time inputs from Settings and the Publishing card. Fields are 41px, p12/16, r8, 1px #E2E8F0 with Inter 14 values and #A3AED0 units / placeholders. ' +
          'The `calendar-time-picker` (1594:7048) and `TimePickerSection` (461:4702) are 0.5× mocks in Figma; they are built here at full (2×) scale on the light tokens.',
      },
    },
  },
} satisfies Meta<typeof DateTimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Monthly frequency "DD/MM/YYYY By 00:00" field with the fluent calendar icon (1590:5601). */
export const DateTime: Story = { decorators: [(S) => <div className="w-field-sm"><S /></div>], parameters: design('1590-5601') };

/** Open: the calendar-time picker under the field (1594:7048). */
export const DateTimeOpen: Story = {
  args: { defaultOpen: true, defaultDate: new Date(2026, 8, 28) },
  decorators: [(S) => <div className="h-control-41 w-field-sm"><S /></div>],
  parameters: { ...design('1594-7048'), docs: { story: { height: '640px' } } },
};

/** `calendar-time-picker` (1594:7048) on its own: 28 Sep 2026 selected, Clear / Today in #3B82F6. */
export const Calendar: Story = {
  render: () => <CalendarTimePicker defaultMonth={new Date(2026, 8, 1)} value={new Date(2026, 8, 28)} today={new Date(2026, 8, 28)} />,
  parameters: design('1594-7048'),
};

/** Keyboard: arrows move between days, Enter selects; Today jumps to today's month. */
export const CalendarKeyboard: Story = {
  render: () => <CalendarTimePicker defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 28)} showTime={false} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('gridcell', { name: '28 September 2026' }));
    await expect(c.getByRole('gridcell', { name: '28 September 2026' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(c.getByRole('button', { name: 'Clear' }));
    await expect(c.getByRole('gridcell', { name: '28 September 2026' })).toHaveAttribute('aria-selected', 'false');
  },
};

/** `TimePickerSection` (461:4701 empty / 461:4700 09:02 AM), light build. */
export const TimeSection: Story = {
  render: () => (
    <div className="flex w-field-sm flex-col gap-6">
      <TimeSpinner />
      <TimeSpinner value={{ hours: 9, minutes: 2, period: 'AM' }} />
    </div>
  ),
  parameters: design('461-4702'),
};

/** `time-picker-row` Property 1=Default (1268:28450): "Sync Time" + 00 Hrs / 00 Mins. */
export const UnitFields: Story = {
  render: () => (
    <div className="flex w-field-sm flex-col gap-2">
      <span className="text-field-label text-text-primary">Sync Time</span>
      <div className="flex gap-2">
        <UnitInput label="Hours" unit="Hrs" defaultValue="00" wrapperClassName="flex-1" />
        <UnitInput label="Minutes" unit="Mins" defaultValue="00" wrapperClassName="flex-1" />
      </div>
    </div>
  ),
  parameters: design('1268-28450'),
};

/** `time-picker-row` Property 1=dropdown (1268:28451): inline-expanded options in one bordered box. */
export const SyncTimeDropdown: Story = {
  render: () => <SyncTimeSelect label="Sync Time" options={syncOptions} defaultValue="15m" defaultOpen className="w-field-sm" />,
  parameters: design('1268-28451'),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('option', { name: 'Hourly' }));
    await expect(c.getByRole('button', { name: /Sync Time Hourly/ })).toHaveAttribute('aria-expanded', 'false');
  },
};

/** Weekly "Deliver at: 00 : 00 Hrs" field (1586:5571). */
export const DeliverAt: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-field-label text-text-primary">Deliver at:</span>
      <TimeField label="Deliver at" />
    </div>
  ),
  parameters: design('1586-5571'),
};

/** Publishing card "Time" trigger: "8:45" #1E2238 + "AM" #64748B, 44px (1066:9141). */
export const PublishingTime: Story = {
  render: () => <TimePicker label="Time" defaultValue={{ hours: 8, minutes: 45, period: 'AM' }} className="w-field-sm" />,
  parameters: design('1066-9141'),
};

/** Every piece side by side. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex w-field-sm flex-col gap-6">
        <DateTimePicker label="Date and time" showLabel />
        <DateTimePicker label="Date and time (filled)" showLabel defaultDate={new Date(2026, 8, 28)} defaultTime={{ hours: 9, minutes: 2, period: 'AM' }} />
        <TimePicker label="Time" defaultValue={{ hours: 8, minutes: 45, period: 'AM' }} />
        <TimeField label="Deliver at" />
        <SyncTimeSelect label="Sync Time" options={syncOptions} />
      </div>
      <CalendarTimePicker defaultMonth={new Date(2026, 8, 1)} value={new Date(2026, 8, 28)} today={new Date(2026, 8, 28)} />
    </div>
  ),
};
