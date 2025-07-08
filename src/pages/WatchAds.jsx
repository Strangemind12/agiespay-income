import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WatchAds() {
  const [ads, setAds] = useState([]);
  const [watchingAd, setWatchingAd] = useState(null);
  const [rewardedAd, setRewardedAd] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fetch ads from backend
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('https://your-backend.com/api/watch-ads'); // ← CHANGE TO YOUR URL
        setAds(res.data);
      } catch (err) {
        console.error('Error fetching ads:', err);
      }
    };
    fetchAds();
  }, []);

  // Handle video finished
  const handleWatchComplete = (ad) => {
    setRewardedAd(ad.id);
    setBalance((prev) => prev + ad.reward);
    setWatchingAd(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-yellow-600 mb-4">📺 Watch & Earn</h1>
      <p className="text-gray-600 mb-2">Watch videos or view image ads to earn instant rewards.</p>

      <div className="mb-6 text-sm text-gray-700">
        💰 Your Balance: <span className="font-bold text-green-700">{balance} coins</span>
      </div>

      {rewardedAd && (
        <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
          ✅ Ad completed — reward credited!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{ad.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              ⏱ {ad.duration}s | 🎁 +{ad.reward} coins
            </p>

            {ad.type === 'video' ? (
              <>
                <video
                  src={ad.src}
                  className="w-full rounded mb-2"
                  controls
                  muted
                  onPlay={() => setWatchingAd(ad.id)}
                  onEnded={() => handleWatchComplete(ad)}
                />
                {watchingAd === ad.id && (
                  <p className="text-xs text-yellow-600">Watching... Don’t skip to earn reward</p>
                )}
              </>
            ) : (
              <>
                <img src={ad.src} alt="Ad" className="w-full rounded mb-2" />
                {rewardedAd === ad.id ? (
                  <p className="text-green-600 text-sm font-semibold">Reward claimed ✅</p>
                ) : (
                  <button
                    onClick={() => handleWatchComplete(ad)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
                  >
                    View & Claim
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        Ads refresh daily. Complete all to earn max coins.
      </footer>
    </div>
  );
}
