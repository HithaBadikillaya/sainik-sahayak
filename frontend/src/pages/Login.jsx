import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Ensure res.data has { user, token }
      if (!res.data || !res.data.user || !res.data.token) {
        throw new Error('Invalid login response from server');
      }

      // Save auth info (user + token)
      login(res.data);

      // Redirect user to dashboard based on role
      const role = res.data.user.role;
      if (role === 'admin') navigate('/dashboard/admin');
      else if (role === 'officer') navigate('/dashboard/officer');
      else if (role === 'family') navigate('/dashboard/family');
      else navigate('/unauthorized');

      // Optional: Clear inputs on success
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#e0e4c4',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#f7f8ef',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #c2c5aa',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#4d5e3c',
          marginBottom: '20px',
          borderBottom: '2px solid #aab78d',
          paddingBottom: '10px',
        }}>
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Email address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              required
              autoComplete="email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px',
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" style={{ color: '#4d5e3c', fontWeight: 'bold' }}>Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              required
              autoComplete="current-password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: '2px solid #aab78d',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '5px',
              }}
            />
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
              marginTop: '10px',
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-center" style={{ color: '#4d5e3c' }}>
          Don't have an account? <Link to="/register" style={{ color: '#3d4f2d' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
