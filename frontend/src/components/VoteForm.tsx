import React, { useState } from 'react';
import { votingOptions } from '../texts/votingOptions';
import axios from 'axios';
import './VoteForm.css';
import { convertToTitleCase } from '../utils/utils';

interface VoteFormData {
  fullName: string;
  zipCode: string;
  selectedOption: string;
}

const VoteForm: React.FC = () => {

	const [zipCodeError, setZipCodeError] = useState<boolean>(false);
	const [formError, setFormError] = useState<string>('');
	const [formData, setFormData] = useState<VoteFormData>({
		fullName: '',
		zipCode: '',
		selectedOption: Object.values(votingOptions)[0].option,
	});
  

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name === 'zipCode' && value.length !== 4) {
			setZipCodeError(true);
		} else {
			setZipCodeError(false);
		}
		
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.fullName || !formData.zipCode || !formData.selectedOption) {
			setFormError('All fields are mandatory, please fill in all fields.');
			return;
		}

		if (zipCodeError) {
			alert('Zip Code must be a four digit number.');
			return;
		}

		const titleCaseFullName = convertToTitleCase(formData.fullName);
		const updatedFormData = { ...formData, fullName: titleCaseFullName };

		try {
			const response = await axios.post('http://localhost:4000/api/submit-vote', updatedFormData);
			console.log('Response from server:', response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				alert(error.response?.data.message); // Display the error message from the backend
			}
			setFormError('Error submitting vote. Please try again later.');
			console.error('Error submitting vote:', error);
		}
		setFormError('');
	};

  return (
    <form className="form-container" onSubmit={handleSubmit}>
		<h2>Vote Form</h2>
		<p>Please fill out the form with your personal data, and click submit after choosing your option from the dropdown list</p>
		<br />
		<div className='form-fields'>
			<div>
				<label htmlFor="fullName">Full Name:</label>
				<input
					type="text"
					id="fullName"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="zipCode">Zip Code:</label>
				<input
					type="text"
					id="zipCode"
					name="zipCode"
					value={formData.zipCode}
					onChange={handleChange}
					required
				/>
				{zipCodeError && <div className="error">{zipCodeError}</div>}
			</div>
			<div>
				<label htmlFor="votingOptions">Voting Options:</label>
				<select
					id="votingOptions"
					name="selectedOption"
					value={formData.selectedOption}
					onChange={handleChange}
					required
				>
				{Object.entries(votingOptions).map(([key, value]) => (
					<option 
						key={value.id} 
						value={value.option}>
							{value.option}
					</option>
				))}
				</select>
			</div>
			{formError && <div className="error">{formError}</div>}
			<button type="submit">Submit</button>
		</div>
    </form>
  );
};

export default VoteForm;
