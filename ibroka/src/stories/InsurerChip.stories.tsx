import type { Meta, StoryObj } from '@storybook/react';
import { InsurerChip } from '../insurance/InsurerChip';

const meta = { title: 'Insurance/InsurerChip', component: InsurerChip, args: { name: 'Harbor General Assurance' } } satisfies Meta<typeof InsurerChip>;
export default meta;
type S = StoryObj<typeof meta>;
export const Single: S = {};
/** Co-insurance placement: lead insurer first, shares add to 100%. */
export const CoInsurance: S = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <InsurerChip name="Harbor General Assurance" share={60} lead />
      <InsurerChip name="Lagoon Mutual" share={25} />
      <InsurerChip name="Crestline Re" share={15} />
    </div>
  ),
};
