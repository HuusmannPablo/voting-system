import React, { useState } from 'react';
import { votingOptions } from '../texts/votingOptions';
import './VoteForm.css';

interface VotingOption {
    id: number;
    option: string;
}

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
    console.log('Form Data is: ', formData)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.zipCode || !formData.selectedOption) {
        setFormError('All fields are mandatory, please fill in all fields.');
        return;
    }

    if (zipCodeError) {
        alert('Zip Code must be a four digit number.');
        return;
    }
    // Send formData to the backend for further processing
    console.log('Submitted data:', formData);
    // Add logic here to send the formData to the backend API
    setFormError('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default VoteForm;
