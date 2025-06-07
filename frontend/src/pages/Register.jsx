import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'family',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      backgroundColor: '#e0e4c4', // same light army green
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div
        style={{
          backgroundColor: '#f7f8ef',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #c2c5aa'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          color: '#4d5e3c',
          marginBottom: '20px',
          borderBottom: '2px solid #aab78d',
          paddingBottom: '10px'
        }}>Register</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              required
              value={form.name}
              onChange={handleChange}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px'
              }}
            />
          </div>

          <div className="mb-3">
            <label style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              value={form.email}
              onChange={handleChange}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px'
              }}
            />
          </div>

          <div className="mb-3">
            <label style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
              value={form.password}
              onChange={handleChange}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px'
              }}
            />
          </div>

          <div className="mb-3">
            <label style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Role</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px'
              }}
            >
              <option value="family">Family Member</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#6b8e23',
              color: 'white',
              border: 'none',
              padding: '10px',
              fontWeight: 'bold',
              borderRadius: '6px',
              marginTop: '10px'
            }}
          >
            Register
          </button>
        </form>

        <p className="mt-3 text-center" style={{ color: '#4d5e3c' }}>
          Already have an account? <Link to="/login" style={{ color: '#3d4f2d' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;