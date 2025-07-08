import React, { useState } from 'react';

export default function WatchAds() {
  const [watchingAd, setWatchingAd] = useState(null);
  const [rewardedAd, setRewardedAd] = useState(null);

  const ads = [
    {
      id: 1,
      title: "AGY Token Promo",
      type: "video",
      reward: 30,
      duration: 10, // in seconds
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Earn App Image Ad",
      type: "image",
      reward: 15,
      duration: 6,
      src: "https://via.placeholder.com/300x180.png?text=Ad+Image+Here",
    },
  ];

  const handleWatch = (ad) => {
    setWatchingAd(ad.id);
    setTimeout(() => {
      setRewardedAd(ad.id);
      setWatchingAd(null);
    }, ad.duration * 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-yellow-600 mb-4">📺 Watch & Earn</h1>
      <p className="text-gray-600 mb-6">View sponsored content. Once the timer completes, you earn your reward.</p>

      {rewardedAd && (
        <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
          ✅ Ad completed — reward credited!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{ad.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Reward: +{ad.reward} coins | Duration: {ad.duration}s</p>

            {watchingAd === ad.id ? (
              <div className="text-center py-4">
                ⏳ Watching... Please wait {ad.duration} seconds
              </div>
            ) : rewardedAd === ad.id ? (
              <div className="text-green-600 font-semibold">Reward claimed ✅</div>
            ) : (
              <>
                {ad.type === "video" ? (
                  <video
                    className="w-full rounded mb-2"
                    src={ad.src}
                    controls
                    preload="metadata"
                    muted
                  />
                ) : (
                  <img className="w-full rounded mb-2" src={ad.src} alt="Ad" />
                )}
                <button
                  onClick={() => handleWatch(ad)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Watch Now
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        New ads are added daily. Watch more to earn more! 🚀
      </footer>
    </div>
  );
}
