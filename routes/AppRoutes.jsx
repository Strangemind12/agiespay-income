import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Wallet from '../pages/Wallet';
import ClickToEarn from '../pages/ClickToEarn';
import AdminPanel from '../pages/AdminPanel';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/wallet" element={user ? <Wallet /> : <Navigate to="/login" />} />
        <Route path="/click" element={user ? <ClickToEarn /> : <Navigate to="/login" />} />
        <Route
          path="/admin"
          element={user?.email === 'admin@agiespay.income' ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
