import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardFamily() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [officer, setOfficer] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = () => {
    if (search.trim() !== '') {
      setOfficer({
        name: 'Capt. Rohan Singh',
        phone: '9876543210',
        region: 'Northern Command, J&K',
        rank: 'Captain',
      });
    } else {
      setOfficer(null);
    }
  };

  return (
    <div
      className="dashboard-family"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '3rem 4rem',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f4f5ec',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        gridRowGap: '2.5rem',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #aab78d',
          paddingBottom: '1rem',
        }}
      >
        <h1 style={{ color: '#3d4f2d', margin: 0 }}>Family Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout} style={{ minWidth: '90px' }}>
          Logout
        </button>
      </header>

      <section
        style={{
          backgroundColor: '#e9eede',
          border: '1px solid #c1c9aa',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(170, 183, 141, 0.3)',
        }}
      >
        <h3 style={{ color: '#4a5e36', marginBottom: '0.5rem' }}>
          Welcome, {auth?.user?.name || 'Family Member'}
        </h3>
        <p style={{ color: '#444' }}>
          Find details about your loved one in the armed forces. Enter their name or phone number below:
        </p>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter officer name or phone number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: '2px solid #aab78d', backgroundColor: '#fefefe' }}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            style={{ backgroundColor: '#6b8e23', borderColor: '#6b8e23' }}
          >
            Search
          </button>
        </div>

        {officer && (
          <div
            className="card mt-4 p-4"
            style={{
              backgroundColor: '#fdfdf7',
              borderRadius: '8px',
              border: '1px solid #d1d9b2',
              boxShadow: '0 0 8px rgba(170, 183, 141, 0.3)',
            }}
          >
            <h5 style={{ color: '#374720', marginBottom: '1rem' }}>Officer Found:</h5>
            <p>
              <strong>Name:</strong> {officer.name}
            </p>
            <p>
              <strong>Rank:</strong> {officer.rank}
            </p>
            <p>
              <strong>Phone:</strong> {officer.phone}
            </p>
            <p>
              <strong>Posting Region:</strong> {officer.region}
            </p>
            <button
              className="btn btn-outline-success mt-3"
              style={{ minWidth: '100px' }}
            >
              Connect
            </button>
          </div>
        )}
      </section>

      <footer
        className="alert alert-info"
        style={{
          borderRadius: '8px',
          fontSize: '0.95rem',
          backgroundColor: '#d9e6c8',
          borderColor: '#c1c9aa',
          color: '#3d4f2d',
          padding: '1rem 1.5rem',
        }}
      >
        If you have trouble finding your officer, please contact your local unit or support center.
      </footer>
    </div>
  );
}
