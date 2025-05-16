import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://127.0.0.1:8000/register/', user);
      setSuccess('Registration successful! Please login.');
      setUser({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
    fontSize: '1.8rem',
    fontWeight: '600',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const inputFocusStyle = {
    borderColor: '#007BFF',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: '16px' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'username' ? inputFocusStyle : {})
          }}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'email' ? inputFocusStyle : {})
          }}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'password' ? inputFocusStyle : {})
          }}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
        <button
          type="submit"
          style={isButtonHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
