import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-700 text-white">
      <h1 className="text-lg font-bold">AgiesPay Income</h1>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm">👤 {user.email}</span>}
        {user && (
          <button onClick={handleLogout} className="bg-white text-blue-700 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
