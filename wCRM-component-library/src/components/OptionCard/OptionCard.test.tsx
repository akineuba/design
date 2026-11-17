import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptionCard, OptionCardGroup } from './OptionCard';

describe('OptionCardGroup', () => {
  it('is a radio group whose cards select on click', async () => {
    render(
      <OptionCardGroup aria-label="Audience" defaultValue="a">
        <OptionCard value="a" title="Creator Hub" description="12 members" />
        <OptionCard value="b" title="VIP" description="3 members" />
      </OptionCardGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Audience' })).toBeInTheDocument();
    await userEvent.click(screen.getByText('VIP'));
    expect(screen.getByRole('radio', { name: /VIP/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Creator Hub/ })).not.toBeChecked();
  });
});
