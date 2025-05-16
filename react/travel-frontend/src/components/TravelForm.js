import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TravelForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    start_date: '',
    end_date: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axiosInstance.post('/requests/', formData);
      setSuccess('Travel request submitted successfully!');
      setFormData({ destination: '', start_date: '', end_date: '', reason: '' });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Create Travel Request</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            placeholder="Enter your destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />

          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />

          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Reason for travel"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={4}
          ></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </>
  );
};

export default TravelForm;
