import type { Meta, StoryObj } from '@storybook/react';
import { RecordStatus, StatusPill, STATUS_TONES, type KnownStatus } from '../components/StatusPill';
import { figma } from '../docs/links';

const meta = { title: 'Components/StatusPill', component: StatusPill, args: { children: 'Active', tone: 'success' }, parameters: { design: { type: 'figma', url: figma('14:1038') } } } satisfies Meta<typeof StatusPill>;
export default meta;
type S = StoryObj<typeof meta>;
export const Success: S = {};
export const Warning: S = { args: { tone: 'warning', children: 'Pending approval' } };
export const Error: S = { args: { tone: 'error', children: 'Expired' } };
export const Info: S = { args: { tone: 'info', children: 'Reported' } };
export const Neutral: S = { args: { tone: 'neutral', children: 'Draft' } };
export const WithoutDot: S = { args: { dot: false } };
/** Every iBroka status and its tone. Use RecordStatus so the mapping can't drift. */
export const AllStatuses: S = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-xl flex-wrap gap-2">
      {(Object.keys(STATUS_TONES) as KnownStatus[]).map((s) => (
        <RecordStatus key={s} status={s} />
      ))}
    </div>
  ),
};
