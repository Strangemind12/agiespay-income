import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    referralCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // ⚙️ You’ll connect this to backend API later
    console.log('Registering user:', formData);
    navigate('/dashboard'); // Simulated login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          📝 Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Country</label>
            <select
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
            >
              <option value="">Select Country</option>
              <option value="Nigeria">🇳🇬 Nigeria</option>
              <option value="Ghana">🇬🇭 Ghana</option>
              <option value="Kenya">🇰🇪 Kenya</option>
              <option value="India">🇮🇳 India</option>
              <option value="Philippines">🇵🇭 Philippines</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Referral Code <span className="text-gray-500">(optional)</span></label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-blue-500"
              placeholder="ABC123"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
