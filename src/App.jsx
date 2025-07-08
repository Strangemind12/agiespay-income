// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';  // ✅ Add this

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// Add your other pages...

function App() {
  return (
    <ToastProvider> {/* ✅ Wrap the app here */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes... */}
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
