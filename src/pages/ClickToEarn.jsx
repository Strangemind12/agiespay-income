import React, { useState } from 'react';

export default function ClickToEarn() {
  const [message, setMessage] = useState('');
  const ads = [
    { id: 1, title: "Crypto Faucet Site", reward: 20, duration: "10s" },
    { id: 2, title: "Airdrop Token Project", reward: 15, duration: "8s" },
    { id: 3, title: "Investment Promo", reward: 25, duration: "12s" },
    { id: 4, title: "Online Survey Portal", reward: 10, duration: "6s" },
  ];

  const handleViewAd = (ad) => {
    setMessage(`✅ You earned ${ad.reward} coins!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🖱️ Click & Earn (PTC Ads)</h1>
      <p className="text-gray-600 mb-6">View sponsored ads and earn instant coins. Simple as that.</p>

      {message && (
        <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
              <p className="text-sm text-gray-500">⏱ View Time: {ad.duration}</p>
              <p className="text-sm text-green-600 font-bold mt-1">+{ad.reward} coins</p>
            </div>
            <button
              onClick={() => handleViewAd(ad)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              View Ad
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        Ads will refresh every few hours. Stay active. Earn more.
      </footer>
    </div>
  );
}
