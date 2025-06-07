import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { auth } = useAuth();

  if (!auth) {
    // No auth info, redirect to login
    return <Navigate to="/login" replace />;
  }

  const userRole = auth?.user?.role;

  console.log('Auth:', auth);
  console.log('User Role:', userRole);
  console.log('Allowed Roles:', allowedRoles);

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    // User role is not allowed, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;
