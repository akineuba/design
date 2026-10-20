import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: 'Figma: settings `sub-tabs` (Accounts / Notifications / Publishing, 1224:25545) and list filter pills on mobile V2 ("All records / My records").' } } },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="accounts" className="w-modal-lg">
      <TabsList aria-label="Social media settings">
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="publishing">Publishing</TabsTrigger>
        <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts" className="text-body text-text-secondary">5 connected accounts.</TabsContent>
      <TabsContent value="notifications" className="text-body text-text-secondary">Choose what you are notified about.</TabsContent>
      <TabsContent value="publishing" className="text-body text-text-secondary">Default publishing schedule.</TabsContent>
    </Tabs>
  ),
};

export const WithCounts: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-modal-lg">
      <TabsList aria-label="Contacts">
        <TabsTrigger value="active" count={49}>Active contacts</TabsTrigger>
        <TabsTrigger value="archived" count={3}>Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs variant="pill" defaultValue="all" className="w-modal-md">
      <TabsList aria-label="Contact views">
        <TabsTrigger value="all">All records</TabsTrigger>
        <TabsTrigger value="mine">My records</TabsTrigger>
        <TabsTrigger value="recent">Recently updated</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};
