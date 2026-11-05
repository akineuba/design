import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { PlanSummary } from '../Patterns/Patterns';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { StatusPill } from '../StatusPill/StatusPill';
import { billing, plans } from '../../demo/data';

const meta: Meta<typeof Accordion> = { title: 'Components/Accordion', component: Accordion, tags: ['autodocs'] };
export default meta;

export const SubscriptionPerTenant: StoryObj<typeof Accordion> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {plans.map((p, i) => (
        <Accordion key={p.org} title={p.org} meta={p.primary && <Tag>Primary</Tag>} aside={i > 0 ? `${p.planName} · ${p.price}` : undefined} defaultOpen={i === 0}>
          <PlanSummary
            status={{ label: 'Active', tone: 'success' }}
            planName={p.planName}
            planDescription={p.planDescription}
            price={p.price}
            renews="9 August 2027"
            features={p.features}
            billing={[...billing, { label: 'Renewal', value: <StatusPill tone="success">Automatic</StatusPill> }]}
            action={<Button variant="outline" size="sm">Change plan</Button>}
          />
        </Accordion>
      ))}
    </div>
  ),
};
