import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CalendarIcon, ListIcon, PencilIcon, TrashIcon } from '../../icons';
import { ProgressBar, StatCard } from '../Card';
import { FilterButton } from '../FilterButton';
import { RowActionButtons, RowActionLink, RowActionsMenu } from '../RowActions';
import { Tabs, TabsList, TabsTrigger } from '../Tabs';
import { ViewToggle } from '../ViewToggle';

describe('FilterButton', () => {
  it('announces the applied count and marks itself active', () => {
    render(<FilterButton count={2} />);
    const button = screen.getByRole('button', { name: 'Filter, 2 applied' });
    expect(button).toHaveAttribute('data-active', 'true');
  });

  it('keeps an accessible name when icon-only', () => {
    render(<FilterButton display="icon" label="Filter accounts" />);
    expect(screen.getByRole('button', { name: 'Filter accounts' })).not.toHaveAttribute('data-active');
  });
});

describe('ViewToggle', () => {
  function Harness() {
    const [view, setView] = useState('list');
    return (
      <ViewToggle
        aria-label="Posts view"
        value={view}
        onValueChange={setView}
        options={[{ value: 'list', label: 'List view', icon: <ListIcon /> }, { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> }]}
      />
    );
  }

  it('is a radio group with one tab stop that arrow keys move through', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByRole('radiogroup', { name: 'Posts view' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Calendar view' })).toHaveAttribute('tabindex', '-1');
    await user.tab();
    await user.keyboard('{ArrowRight}');
    const calendar = screen.getByRole('radio', { name: 'Calendar view' });
    expect(calendar).toHaveAttribute('aria-checked', 'true');
    expect(calendar).toHaveFocus();
  });
});

describe('Cards', () => {
  it('states trend direction for screen readers', () => {
    render(<StatCard label="Open rate" value="51%" trend={{ value: '3%', direction: 'up' }} />);
    expect(screen.getByText('Up', { exact: false })).toBeInTheDocument();
  });

  it('clamps progress values', () => {
    render(<ProgressBar label="Budget" value={140} />);
    expect(screen.getByRole('progressbar', { name: 'Budget' })).toHaveAttribute('aria-valuenow', '100');
  });
});

describe('Row actions', () => {
  it('builds View / Edit / Delete from handlers and calls them', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<RowActionsMenu recordName="Summer Sale" onView={() => {}} onDelete={onDelete} />);
    await user.click(screen.getByRole('button', { name: 'Actions for Summer Sale' }));
    expect(screen.getAllByRole('menuitem').map((i) => i.textContent)).toEqual(['View', 'Delete']);
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('renders a link or a button for RowActionLink', () => {
    render(<><RowActionLink href="/c/1">Open</RowActionLink><RowActionLink /></>);
    expect(screen.getByRole('link', { name: 'Open' })).toHaveAttribute('href', '/c/1');
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  it('names inline buttons with the record', () => {
    render(<RowActionButtons recordName="Post 1" actions={[{ label: 'Edit', icon: <PencilIcon /> }, { label: 'Delete', icon: <TrashIcon />, danger: true }]} />);
    expect(screen.getByRole('button', { name: 'Delete Post 1' })).toBeInTheDocument();
  });
});

describe('Tabs dot variant', () => {
  it('renders a decorative dot per tab', () => {
    render(
      <Tabs variant="dot" defaultValue="all">
        <TabsList aria-label="Status">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sent" tone="success">Sent</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'Sent' }).querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('data-state', 'active');
  });
});
