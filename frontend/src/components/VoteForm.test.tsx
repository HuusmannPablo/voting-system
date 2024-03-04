import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import VoteForm from './VoteForm';

// Mock Axios post request
jest.mock('axios');

describe('VoteForm component', () => {
	it('should render correctly', () => {
		render(<VoteForm />);
		
		// Test form elements are rendered
		expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
		expect(screen.getByLabelText('Voting Options')).toBeInTheDocument();
		expect(screen.getByText('Submit')).toBeInTheDocument();
	});

  	it('should display error messages when form is submitted with invalid data', async () => {
    	render(<VoteForm />);
    
    	fireEvent.click(screen.getByText('Submit'));

		// Test error messages are displayed
		await waitFor(() => {
			expect(screen.getByText('All fields are mandatory, please fill in all fields.')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText('Zip Code must be a four digit number.')).toBeInTheDocument();
		});
  	});

	it('should submit form data when valid data is provided', async () => {
		render(<VoteForm />);

		// Mock successful response
		(axios.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'Vote submitted successfully' } });
		
		fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
		fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '1234' } });
		fireEvent.change(screen.getByLabelText('Voting Options'), { target: { value: 'Option A' } });
		fireEvent.click(screen.getByText('Submit'));

		// Test form submission
		await waitFor(() => {
			expect(axios.post).toHaveBeenCalledTimes(1);
		});
		
		await waitFor(() => {
			expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/submit-vote', {
				fullName: 'John Doe',
				zipCode: '1234',
				selectedOption: 'Option 1'
			});
		});

		await waitFor(() => {
			expect(screen.queryByText('All fields are mandatory, please fill in all fields.')).toBeNull();
		});

		await waitFor(() => {
			expect(screen.queryByText('Zip Code must be a four digit number.')).toBeNull();
		});
	});

});
