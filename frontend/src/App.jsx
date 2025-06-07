import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import CommunityPortal from './pages/CommunityPortal';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardOfficer from './pages/DashboardOfficer';
import DashboardFamily from './pages/DashboardFamily';
import Unauthorized from './pages/Unauthorized';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/officer"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <DashboardOfficer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/family"
          element={
            <ProtectedRoute allowedRoles={['family']}>
              <DashboardFamily />
            </ProtectedRoute>
          }
        />

        <Route
  path="/community"
  element={
    <ProtectedRoute allowedRoles={['officer', 'family']}>
      <CommunityPortal />
    </ProtectedRoute>
  }
/>


        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
