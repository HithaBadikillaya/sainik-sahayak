import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else if (auth.user.role !== 'admin') {
      navigate('/unauthorized');
    } else {
      setApplications([
        {
          id: 1,
          officerName: 'Captain Rajeev Nair',
          rank: 'Captain',
          scheme: 'Family Medical Support',
          status: 'pending',
        },
        {
          id: 2,
          officerName: 'Major Neha Sharma',
          rank: 'Major',
          scheme: 'Children Education Aid',
          status: 'pending',
        },
      ]);
    }
  }, [auth, navigate]);

  const handleDecision = (id, decision) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: decision } : app
      )
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!auth || auth.user.role !== 'admin') return null;

  return (
    <div
      className="dashboard-admin"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '3rem 4rem',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f4f5ec',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
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
        <h1 style={{ color: '#3d4f2d', margin: 0 }}>Admin Dashboard</h1>
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
          overflowY: 'auto',
        }}
      >
        <h3 style={{ color: '#4a5e36', marginBottom: '1.5rem' }}>
          Pending Officer Applications
        </h3>

        {applications.length === 0 ? (
          <p style={{ color: '#556b2f', fontStyle: 'italic' }}>No pending applications.</p>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="application-card"
              style={{
                backgroundColor: '#fdfdf7',
                borderRadius: '8px',
                borderLeft: `6px solid ${
                  app.status === 'approved'
                    ? '#4CAF50'
                    : app.status === 'rejected'
                    ? '#dc3545'
                    : '#ffc107'
                }`,
                border: '1px solid #d1d9b2',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.25rem',
                boxShadow: '0 0 8px rgba(170, 183, 141, 0.3)',
              }}
            >
              <h5 style={{ color: '#374720', marginBottom: '0.5rem' }}>{app.scheme}</h5>
              <p style={{ color: '#444', marginBottom: '0.75rem' }}>
                <strong>Officer:</strong> {app.officerName} <br />
                <strong>Rank:</strong> {app.rank} <br />
                <strong>Status:</strong>{' '}
                <span
                  className={`badge ${
                    app.status === 'approved'
                      ? 'bg-success'
                      : app.status === 'rejected'
                      ? 'bg-danger'
                      : 'bg-warning text-dark'
                  }`}
                  style={{ fontSize: '0.9rem', textTransform: 'capitalize' }}
                >
                  {app.status}
                </span>
              </p>

              {app.status === 'pending' && (
                <div>
                  <button
                    className="btn btn-success me-3"
                    onClick={() => handleDecision(app.id, 'approved')}
                    style={{ minWidth: '100px' }}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDecision(app.id, 'rejected')}
                    style={{ minWidth: '100px' }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default DashboardAdmin;
