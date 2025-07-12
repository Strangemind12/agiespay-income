// 📍 frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// ✅ Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminSettings from './pages/AdminSettings';

// ✅ Route Guards
import AdminRoute from './components/AdminRoute'; // 🔐 Ensure this file is named EXACTLY: AdminRoute.jsx

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🔐 Admin-only route */}
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
