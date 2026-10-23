import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DayPicker, FrequencyPicker } from './FrequencyPicker';

describe('FrequencyPicker', () => {
  it('shows the detail row for each selected frequency and None clears the rest', async () => {
    render(<FrequencyPicker defaultValue={{ frequencies: ['daily'] }} />);
    expect(screen.getByText('Frequency Time')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Weekly' }));
    expect(screen.getByRole('group', { name: 'Weekly delivery days' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('checkbox', { name: 'None' }));
    expect(screen.queryByText('Frequency Time')).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Weekly delivery days' })).not.toBeInTheDocument();
  });
});

describe('DayPicker', () => {
  it('toggles days with aria-pressed', async () => {
    render(<DayPicker aria-label="Days" />);
    const mon = screen.getByRole('button', { name: 'Monday' });
    await userEvent.click(mon);
    expect(mon).toHaveAttribute('aria-pressed', 'true');
  });
});
