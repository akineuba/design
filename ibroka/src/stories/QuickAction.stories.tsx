import type { Meta, StoryObj } from '@storybook/react';
import { QuickAction } from '../components/QuickAction';
import { DeleteIcon, ExpenseIcon, HumanResourcesIcon, PlusIcon, ReportIcon } from '../icons';
import { figma } from '../docs/links';

const meta = { title: 'Components/QuickAction', component: QuickAction, args: { icon: <PlusIcon />, children: 'Add Transaction' }, parameters: { design: { type: 'figma', url: figma('3:675') } }, decorators: [(S) => <div className="w-[243px]"><S /></div>] } satisfies Meta<typeof QuickAction>;
export default meta;
type S = StoryObj<typeof meta>;
export const Teal: S = {};
export const Blue: S = { args: { tone: 'blue', icon: <HumanResourcesIcon />, children: 'HR Management' } };
export const Green: S = { args: { tone: 'green', icon: <ExpenseIcon />, children: 'Add Expense' } };
export const Red: S = { args: { tone: 'red', icon: <DeleteIcon />, children: 'Delete' } };
/** The Figma Quick Actions row. */
export const Row: S = {
  decorators: [(S) => <div className="w-[1029px]"><S /></div>],
  render: () => (
    <div className="grid grid-cols-4 gap-5">
      <QuickAction icon={<PlusIcon />}>Add Transaction</QuickAction>
      <QuickAction tone="blue" icon={<HumanResourcesIcon />}>HR Management</QuickAction>
      <QuickAction tone="green" icon={<ExpenseIcon />}>Add Expense</QuickAction>
      <QuickAction tone="ink" icon={<ReportIcon />}>View Reports</QuickAction>
    </div>
  ),
};
