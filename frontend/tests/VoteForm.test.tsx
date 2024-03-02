import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VoteForm from '../src/components/VoteForm';

describe('VoteForm', () => {
  it('renders form fields correctly', () => {
    const { getByLabelText } = render(<VoteForm />);
    expect(getByLabelText('Full Name')).toBeInTheDocument();
    expect(getByLabelText('Zip Code')).toBeInTheDocument();
    expect(getByLabelText('Voting Options')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<VoteForm />);
    fireEvent.change(getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Zip Code'), { target: { value: '1234' } });
    fireEvent.change(getByLabelText('Voting Options'), { target: { value: 'Option 1' } });

    expect(getByLabelText('Full Name')).toHaveValue('John Doe');
    expect(getByLabelText('Zip Code')).toHaveValue('1234');
    expect(getByLabelText('Voting Options')).toHaveValue('Option 1');
  });

});