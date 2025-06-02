import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Welcome, {auth.user.name}!</h1>
      <p>Your role: <strong>{auth.user.role}</strong></p>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
