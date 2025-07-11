import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const earnings = [
    { name: 'Chika 🇳🇬', amount: '3.5 USDT' },
    { name: 'Raj 🇮🇳', amount: '2 AGY' },
    { name: 'Sarah 🇬🇧', amount: '5 USDT' },
    { name: 'James 🇵🇭', amount: '1.2 AGY' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden">
        {/* 📱 Hero Image */}
        <div className="w-full md:w-1/2 p-6">
          <img
            src="https://cdn.dribbble.com/users/1753953/screenshots/16517061/media/71bb7a0b04df26c89cf1e3e50d2f5bde.png"
            alt="Mobile users earning"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* 💬 Hero Text */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Agiespay Income</h1>
          <p className="text-gray-700 text-lg mb-4">
            💸 Turn your time, clicks, and attention into real income — 100% free.
          </p>
          <div className="flex gap-4 mb-6">
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
            >
              Start Earning
            </Link>
            <Link
              to="/login"
              className="text-blue-700 underline font-semibold hover:text-blue-900"
            >
              Sign In
            </Link>
          </div>

          {/* 💸 Live Earnings */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">📱 Live Earnings:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {earnings.map((e, index) => (
                <li key={index}>✅ {e.name} earned <strong>{e.amount}</strong></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 🔍 How It Works */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 How It Works</h2>
        <ul className="space-y-4">
          <li>
            <h3 className="font-bold text-gray-700 flex items-center">
              📝 <span className="ml-2">Sign Up</span>
            </h3>
            <p className="text-gray-600 ml-6">Create your free account</p>
          </li>
          <li>
            <h3 className="font-bold text-gray-700 flex items-center">
              🖱️ <span className="ml-2">Click / Watch / Share</span>
            </h3>
            <p className="text-gray-600 ml-6">Complete simple tasks daily</p>
          </li>
          <li>
            <h3 className="font-bold text-gray-700 flex items-center">
              💰 <span className="ml-2">Earn Coins</span>
            </h3>
            <p className="text-gray-600 ml-6">Get paid per click, view or link</p>
          </li>
          <li>
            <h3 className="font-bold text-gray-700 flex items-center">
              📤 <span className="ml-2">Withdraw Instantly</span>
            </h3>
            <p className="text-gray-600 ml-6">Convert coins to USDT or AGY</p>
          </li>
        </ul>
      </div>

      {/* 🌍 Why Choose Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">✅ Why Choose Agiespay Income?</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>No investment required — 100% free forever</li>
          <li>Instant crypto withdrawals (USDT, AGY, FaucetPay)</li>
          <li>Works on all devices, globally available</li>
          <li>Click-to-earn, Watch ads, and share shortlinks</li>
          <li>Referral program — earn while your friends earn</li>
          <li>Daily bonuses and leaderboard rewards</li>
        </ul>
      </div>

      {/* ⚓ Footer */}
      <footer className="text-center mt-10 text-sm text-gray-500">
        <div className="space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/helpcenter" className="hover:underline">Help Center</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
        </div>
        <p className="mt-2">&copy; 2025 Agiespay Income. All rights reserved.</p>
      </footer>
    </div>
  );
}
