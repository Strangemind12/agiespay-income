import React, { useState } from 'react';

export default function Shortlinks() {
  const [completedLink, setCompletedLink] = useState(null);

  const links = [
    {
      id: 1,
      title: "EarnCrypto.cc",
      reward: 25,
      url: "https://example.com/short1",
    },
    {
      id: 2,
      title: "LinkShrinker",
      reward: 18,
      url: "https://example.com/short2",
    },
    {
      id: 3,
      title: "SmartURL Vault",
      reward: 30,
      url: "https://example.com/short3",
    },
  ];

  const handleVisit = (link) => {
    setCompletedLink(link.id);
    window.open(link.url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">🔗 Shortlinks Tasks</h1>
      <p className="text-gray-600 mb-6">Click on the links, complete the countdown, and earn coins instantly.</p>

      {completedLink && (
        <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
          ✅ You completed a shortlink and earned coins!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className={`bg-white rounded-lg shadow p-4 flex justify-between items-center ${
              completedLink === link.id ? "opacity-60" : ""
            }`}
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800">{link.title}</h3>
              <p className="text-sm text-green-600 font-semibold mt-1">+{link.reward} coins</p>
            </div>
            <button
              disabled={completedLink === link.id}
              onClick={() => handleVisit(link)}
              className={`${
                completedLink === link.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-4 py-2 rounded-lg font-semibold transition`}
            >
              {completedLink === link.id ? "Completed" : "Visit"}
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        Links refresh daily — complete all available to maximize your earnings 💸
      </footer>
    </div>
  );
}
