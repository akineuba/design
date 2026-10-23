import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarTimePicker, TimeSpinner } from './CalendarTimePicker';
import { SyncTimeSelect } from './SyncTimeSelect';

describe('CalendarTimePicker', () => {
  it('selects a day and clears it', async () => {
    const onChange = vi.fn();
    render(<CalendarTimePicker defaultMonth={new Date(2026, 8, 1)} onChange={onChange} showTime={false} />);
    await userEvent.click(screen.getByRole('gridcell', { name: '28 September 2026' }));
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 8, 28));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});

describe('TimeSpinner', () => {
  it('steps hours with the arrow keys', async () => {
    const onChange = vi.fn();
    render(<TimeSpinner value={{ hours: 9, minutes: 2, period: 'AM' }} onChange={onChange} />);
    screen.getByRole('spinbutton', { name: 'Hours' }).focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenCalledWith({ hours: 10, minutes: 2, period: 'AM' });
  });
});

describe('SyncTimeSelect', () => {
  it('expands inline and picks an option', async () => {
    const onValueChange = vi.fn();
    render(<SyncTimeSelect label="Sync Time" options={[{ value: 'a', label: 'Every 15 min' }, { value: 'b', label: 'Hourly' }]} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('button', { name: /Sync Time/ }));
    await userEvent.click(screen.getByRole('option', { name: 'Hourly' }));
    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
