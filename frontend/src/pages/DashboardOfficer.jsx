import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ROLE = 'officer';

export default function DashboardOfficer() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      title: 'Request for Education Allowance',
      description: 'Application to request educational allowance for my child.',
      status: 'Pending',
      submittedAt: '2024-05-01',
    },
    {
      id: 2,
      title: 'Medical Reimbursement Request',
      description: 'Seeking reimbursement for recent medical expenses.',
      status: 'Approved',
      submittedAt: '2024-04-20',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else if (auth.user.role !== ROLE) {
      navigate('/unauthorized');
    }
  }, [auth, navigate]);

  if (!auth || auth.user.role !== ROLE) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError('Please fill in both Title and Description.');
      return;
    }

    const newApp = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };

    setApplications((prev) => [newApp, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setSuccessMessage('Application submitted successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="dashboard-officer"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridTemplateRows: 'auto auto 1fr',
        gridTemplateAreas: `
          "header header"
          "welcome welcome"
          "form applications"
        `,
        minHeight: '100vh',
        gap: '3rem',
        padding: '3rem 4rem',
        backgroundColor: '#f4f5ec',
        fontFamily: 'Segoe UI, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <header
        style={{
          gridArea: 'header',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #aab78d',
          paddingBottom: '1rem',
        }}
      >
        <h1 style={{ color: '#3d4f2d', margin: 0 }}>Officer Dashboard</h1>
        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
          style={{ minWidth: '90px' }}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          gridArea: 'welcome',
          paddingBottom: '1rem',
          borderBottom: '1px solid #c1c9aa',
        }}
      >
        <h4 style={{ color: '#556b2f', marginBottom: '0.3rem' }}>
          Welcome, {auth.user.name}
        </h4>
        <p style={{ color: '#444', marginTop: 0 }}>
          Submit and track your welfare applications below.
        </p>

        <Link
          to="/community"
          style={{
            marginTop: '1rem',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#4a5e36',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          🌐 Go to Community Portal
        </Link>
      </section>

      <section
        style={{
          gridArea: 'form',
          backgroundColor: '#e9eede',
          border: '1px solid #c1c9aa',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(170, 183, 141, 0.3)',
          height: 'fit-content',
        }}
      >
        <h4 style={{ color: '#4a5e36', marginBottom: '1rem' }}>
          Submit New Application
        </h4>
        {formError && <div className="alert alert-danger">{formError}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label"
              style={{ fontWeight: 'bold', color: '#3d4f2d' }}
            >
              Application Title
            </label>
            <input
              type="text"
              className="form-control"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter title"
              style={{ border: '2px solid #aab78d', backgroundColor: '#fefefe' }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontWeight: 'bold', color: '#3d4f2d' }}
            >
              Description
            </label>
            <textarea
              className="form-control"
              rows="5"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter description"
              style={{ border: '2px solid #aab78d', backgroundColor: '#fefefe' }}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#6b8e23', color: 'white' }}
          >
            Submit Application
          </button>
        </form>
      </section>

      {/* Applications List */}
      <section
        style={{
          gridArea: 'applications',
          backgroundColor: '#fdfdf7',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid #d1d9b2',
          boxShadow: '0 0 10px rgba(170, 183, 141, 0.3)',
          overflowY: 'auto',
          maxHeight: '70vh',
        }}
      >
        <h4 style={{ color: '#4a5e36', marginBottom: '1rem' }}>Your Applications</h4>
        {applications.length === 0 ? (
          <p className="text-muted">No applications submitted yet.</p>
        ) : (
          <div className="list-group" style={{ maxHeight: '100%', overflowY: 'auto' }}>
            {applications.map(({ id, title, description, status, submittedAt }) => (
              <div
                key={id}
                className="list-group-item mb-3 shadow-sm rounded"
                style={{
                  borderLeft: `6px solid ${
                    status === 'Approved' ? '#4CAF50' : status === 'Rejected' ? '#dc3545' : '#ffc107'
                  }`,
                  border: '1px solid #d1d9b2',
                  backgroundColor: '#fdfdf7',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1" style={{ color: '#374720' }}>
                    {title}
                  </h5>
                  <span
                    className={`badge ${
                      status === 'Approved'
                        ? 'bg-success'
                        : status === 'Rejected'
                        ? 'bg-danger'
                        : 'bg-warning text-dark'
                    }`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    {status}
                  </span>
                </div>
                <small className="text-muted">Submitted on: {submittedAt}</small>
                <p className="mt-2 mb-1" style={{ color: '#444' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
