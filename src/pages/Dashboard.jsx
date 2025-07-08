import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const user = {
    name: "Strangemind", // 🧠 Replace later with actual user state
    coins: 2850,
    referrals: 12,
    country: "🇳🇬",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-sm text-gray-600">Dashboard Overview — Agiespay Income</p>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 font-semibold mb-1">💰 Coins Balance</h3>
          <p className="text-3xl font-bold text-green-600">{user.coins} coins</p>
          <p className="text-xs text-gray-400 mt-1">Minimum payout: 1,000 coins</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 font-semibold mb-1">👥 Referrals</h3>
          <p className="text-3xl font-bold text-purple-600">{user.referrals}</p>
          <p className="text-xs text-gray-400 mt-1">Invite friends to earn 10% bonus</p>
        </div>
      </div>

      {/* Task Access */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Link
          to="/ptc"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg py-6 px-4 shadow transition"
        >
          <h3 className="text-xl font-bold mb-1">🖱️ Click & Earn</h3>
          <p className="text-sm">Earn per ad click</p>
        </Link>
        <Link
          to="/shortlinks"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg py-6 px-4 shadow transition"
        >
          <h3 className="text-xl font-bold mb-1">🔗 Shortlinks</h3>
          <p className="text-sm">Earn by completing link redirects</p>
        </Link>
        <Link
          to="/watch"
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-center rounded-lg py-6 px-4 shadow transition"
        >
          <h3 className="text-xl font-bold mb-1">📺 Watch & Earn</h3>
          <p className="text-sm">Earn by watching video/image ads</p>
        </Link>
      </div>

      {/* Withdraw Box */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">💸 Ready to Withdraw?</h3>
        <p className="text-sm text-gray-600 mb-4">
          You can withdraw when you reach the minimum coins. Payouts available via USDT, FaucetPay, or AGY token.
        </p>
        <Link
          to="/wallet"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg transition"
        >
          Go to Wallet
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs mt-8">
        Powered by Agiespay Income · Built for real earnings 🚀
      </footer>
    </div>
  );
}
