import React, { useState } from 'react';
import axios from 'axios';
import SubAdminNavbar from './navbarsubadmin';
import '../css/addpeople.css'; // Import your CSS file here

export default function AddDataForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added email field
    mobileNumber: '',
    rationCardNumber: '',
    aadharCardNumber: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the field is the mobileNumber field, validate and format it
    if (name === 'mobileNumber') {
      // Remove all non-digit characters from the value
      const numericValue = value.replace(/\D/g, '');
  
      // Limit the length to 10 digits after removing any leading zeros
      const formattedMobileNumber = numericValue.replace(/^0+/, '').slice(0, 10);
  
      // Update the state with the formatted mobile number
      setFormData({ ...formData, [name]: formattedMobileNumber });
    } else {
      // For other fields, update the state normally
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend server with the form data
      const res = await axios.post('/auth/addpeople', formData);
      console.log('Data added successfully:', res.data);
      // Optionally, you can reset the form after successful submission
      setFormData({ name: '', email: '', mobileNumber: '', rationCardNumber: '', aadharCardNumber: '' });
      setSubmissionStatus({ submitted: true, success: true, error: false });
    } catch (error) {
      console.error('Error adding data:', error);
      setSubmissionStatus({ submitted: true, success: false, error: true });
    }
  };

  return (
    <>
      <SubAdminNavbar />
      <div className="form-container">
        <form className="data-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email: {/* Added email field */}
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Mobile Number:
            <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          </label>
          <label>
            Ration Card Number:
            <input type="text" name="rationCardNumber" value={formData.rationCardNumber} onChange={handleChange} />
          </label>
          <label>
            Aadhar Card Number:
            <input type="text" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {submissionStatus.submitted && (
          <div className="submission-feedback">
            {submissionStatus.success ? (
              <p className="success-message">Data submitted successfully!</p>
            ) : (
              <p className="error-message">Error submitting data. Please try again.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
