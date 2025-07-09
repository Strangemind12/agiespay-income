import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = ({ type = 'info', message }) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow ${
          type === 'success' ? 'bg-green-500' :
          type === 'error' ? 'bg-red-500' :
          type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        } text-white`}>
          {toast.message}
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
