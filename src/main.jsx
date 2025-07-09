import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import './index.css'; // Your styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  </AuthProvider>
);
