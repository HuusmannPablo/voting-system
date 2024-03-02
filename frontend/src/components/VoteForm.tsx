import React, { useState } from 'react';
import { votingOptions } from '../texts/votingOptions';
import './VoteForm.css';

interface VoteFormData {
  fullName: string;
  zipCode: string;
  selectedOption: string;
}

const VoteForm: React.FC = () => {
  const [formData, setFormData] = useState<VoteFormData>({
    fullName: '',
    zipCode: '',
    selectedOption: Object.values(votingOptions)[0].option, // Default selected option
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send formData to the backend for further processing
    console.log('Submitted data:', formData);
    // Add logic here to send the formData to the backend API
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default VoteForm;
