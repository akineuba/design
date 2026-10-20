import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: 'Figma: Contacts and User management table footers ("Showing 1-10 of 49 entries", red current page, "10 / page").' } } },
  args: { page: 1, pageSize: 10, totalItems: 49, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

function Live({ total, start = 1 }: { total: number; start?: number }) {
  const [page, setPage] = useState(start);
  const [size, setSize] = useState(10);
  return <div className="w-page max-w-full"><Pagination page={page} pageSize={size} totalItems={total} onPageChange={setPage} onPageSizeChange={(s) => { setSize(s); setPage(1); }} /></div>;
}

export const Default: Story = { render: () => <Live total={49} /> };
export const ManyPages: Story = { render: () => <Live total={612} start={14} /> };
export const SinglePage: Story = { render: () => <Live total={7} /> };
export const Empty: Story = { render: () => <Live total={0} /> };
