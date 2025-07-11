// 📍 src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // 👈 Import fancy loader

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // ⏳ Still loading user data?
  if (user === null) {
    return <LoadingSpinner />;
  }

  // 🔐 Not logged in? Send 'em to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🧢 Logged in but not an admin? Get outta here
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // ✅ All clear
  return children;
}
