// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastAlert from '../components/ToastAlert';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ type = 'info', message = '', duration = 4000 }) => {
    setToast({ type, message, duration });
  }, []);

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToastAlert
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
}
