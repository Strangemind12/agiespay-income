// 📍 src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return showToast({
        type: 'error',
        message: '⚠️ Please fill in both email and password.'
      });
    }

    try {
      await login(email, password);

      showToast({
        type: 'success',
        message: '✅ Login successful! Redirecting...'
      });

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error('Login failed:', err);
      showToast({
        type: 'error',
        message: '❌ Invalid email or password. Try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          🔐 Login to Agiespay Income
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Sign up here
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link to="/forgot-password" className="text-xs text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
