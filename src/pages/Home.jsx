import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Agiespay Income</h1>
        <p className="text-xl mb-6">
          💸 Turn your clicks, links, and video views into real income. 100% free.
        </p>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full shadow hover:bg-gray-200 transition">
            Start Earning
          </Link>
          <Link to="/login" className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-700 transition">
            Sign In
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">📈 How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-sm md:text-base">
          {[
            { icon: "📝", label: "Sign Up", desc: "Create your free account" },
            { icon: "🖱️", label: "Click / Watch / Share", desc: "Complete simple tasks daily" },
            { icon: "💰", label: "Earn Coins", desc: "Get paid per click, view or link" },
            { icon: "📤", label: "Withdraw Instantly", desc: "Convert coins to USDT or AGY" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-bold">{item.label}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-12 px-6 text-center border-t">
        <h2 className="text-3xl font-bold mb-4">✅ Why Choose Agiespay Income?</h2>
        <p className="mb-8 text-gray-600">We make online earnings easy, fair, and fast.</p>
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {[
            "No investment required — 100% free forever",
            "Instant crypto withdrawals (USDT, AGY, FaucetPay)",
            "Works on all devices, globally available",
            "Click-to-earn, Watch ads, and share shortlinks",
            "Referral program — earn while your friends earn",
            "Daily bonuses and leaderboard rewards"
          ].map((feature, i) => (
            <div key={i} className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✔️</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6 text-center text-sm">
        <div className="mb-4">
          <span className="font-bold text-white">Agiespay Income</span> — Monetize your attention.
        </div>
        <div className="space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/help" className="hover:underline">Help Center</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Agiespay Income. All rights reserved.</p>
      </footer>
    </div>
  );
}
