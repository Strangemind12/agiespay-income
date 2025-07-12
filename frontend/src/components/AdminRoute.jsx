// 📍 frontend/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // ✅ Fancy loader

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait if auth is still loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // 🚪 Not logged in? Send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🧢 Not an admin? Send to home
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // ✅ Access granted to admin
  return children;
}


