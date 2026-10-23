import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './Radio';

describe('RadioGroup', () => {
  it('selects one option and reports it', async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Scope" defaultValue="org" onValueChange={onValueChange}>
        <Radio value="org" label="Entire organisation" />
        <Radio value="campaigns" label="Specific campaigns" />
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: 'Scope' })).toBeInTheDocument();
    expect(screen.getByLabelText('Entire organisation')).toBeChecked();
    await userEvent.click(screen.getByLabelText('Specific campaigns'));
    expect(screen.getByLabelText('Specific campaigns')).toBeChecked();
    expect(screen.getByLabelText('Entire organisation')).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('campaigns');
  });
});
