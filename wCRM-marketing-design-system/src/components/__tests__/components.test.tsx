import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Accordion, AccordionItem } from '../Accordion';
import { initials } from '../Avatar';
import { Checkbox } from '../Checkbox';
import { FilterCheckboxList } from '../FilterPopover';
import { ConfirmDialog } from '../Modal';
import { Pagination, pageRange } from '../Pagination';
import { Switch } from '../Switch';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';
import { Tag } from '../Tag';
import { Button } from '../Button';

describe('pageRange', () => {
  it('lists every page when there are 7 or fewer', () => {
    expect(pageRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
  it('keeps first, last and neighbours with gaps', () => {
    expect(pageRange(14, 62)).toEqual([1, 'gap', 13, 14, 15, 'gap', 62]);
    expect(pageRange(1, 62)).toEqual([1, 2, 3, 4, 'gap', 62]);
    expect(pageRange(62, 62)).toEqual([1, 'gap', 59, 60, 61, 62]);
  });
});

describe('Pagination', () => {
  it('summarises the range and marks the current page', () => {
    render(<Pagination page={2} pageSize={10} totalItems={49} onPageChange={() => {}} />);
    expect(screen.getByText('11-20')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });
  it('disables previous on the first page and moves forward', async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageSize={10} totalItems={49} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

describe('Avatar initials', () => {
  it('uses the first two words', () => {
    expect(initials('Olumide Balogun')).toBe('OB');
    expect(initials('  christian  ')).toBe('C');
  });
});

describe('Checkbox and Switch', () => {
  it('toggles a labelled checkbox', async () => {
    render(<Checkbox label="Facebook Page" />);
    const box = screen.getByRole('checkbox', { name: 'Facebook Page' });
    await userEvent.click(box);
    expect(box).toHaveAttribute('data-state', 'checked');
  });
  it('toggles a labelled switch', async () => {
    render(<Switch label="Social interactions" />);
    const sw = screen.getByRole('switch', { name: 'Social interactions' });
    await userEvent.click(sw);
    expect(sw).toHaveAttribute('aria-checked', 'true');
  });
});

describe('FilterCheckboxList', () => {
  function Harness() {
    const [value, setValue] = useState<string[]>([]);
    return <FilterCheckboxList label="Accounts" searchable options={[{ value: 'a', label: 'Wragby_hq' }, { value: 'b', label: 'LinkedIn' }]} value={value} onChange={setValue} />;
  }
  it('filters options by search and records selection', async () => {
    render(<Harness />);
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search accounts' }), 'link');
    const group = screen.getByRole('group', { name: 'Accounts' });
    expect(within(group).queryByText('Wragby_hq')).not.toBeInTheDocument();
    await userEvent.click(within(group).getByRole('checkbox', { name: 'LinkedIn' }));
    expect(within(group).getByRole('checkbox', { name: 'LinkedIn' })).toHaveAttribute('data-state', 'checked');
  });
});

describe('Tag', () => {
  it('removes via an accessible button', async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>LinkedIn</Tag>);
    await userEvent.click(screen.getByRole('button', { name: 'Remove LinkedIn' }));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe('Tabs', () => {
  it('switches panels', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Settings"><TabsTrigger value="a">Accounts</TabsTrigger><TabsTrigger value="b" count={3}>Notifications</TabsTrigger></TabsList>
        <TabsContent value="a">Accounts panel</TabsContent>
        <TabsContent value="b">Notifications panel</TabsContent>
      </Tabs>,
    );
    await userEvent.click(screen.getByRole('tab', { name: /Notifications/ }));
    expect(screen.getByText('Notifications panel')).toBeVisible();
  });
});

describe('Accordion', () => {
  it('expands an item', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="s" title="Social Media Information">Website field</AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole('button', { name: 'Social Media Information' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Table', () => {
  it('exposes sort state on sortable headers', async () => {
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader><TableRow><TableHead sort="asc" onSort={onSort}>Name</TableHead><TableHead>Email</TableHead></TableRow></TableHeader>
        <TableBody />
      </Table>,
    );
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('aria-sort', 'ascending');
    await userEvent.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSort).toHaveBeenCalled();
  });
});

describe('ConfirmDialog', () => {
  it('opens from its trigger and confirms', async () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog trigger={<Button>Delete contact</Button>} title="Delete contact?" description="This cannot be undone." confirmLabel="Delete" onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete contact' }));
    const dialog = await screen.findByRole('alertdialog', { name: 'Delete contact?' });
    await userEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalled();
  });
});
