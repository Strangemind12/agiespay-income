// 📍 src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // ✅ Fancy loader

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth(); // 👈 bring in loading

  // ⏳ Still fetching user?
  if (loading) {
    return <LoadingSpinner />;
  }

  // 🚪 Not logged in? Bye
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🧢 Not an admin? Block access
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin verified
  return children;
}

