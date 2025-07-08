import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

export default function ClickToEarn() {
  const [ads, setAds] = useState([]);
  const [clickedAds, setClickedAds] = useState([]);
  const { showToast } = useToast();

  const user = {
    id: 'user123',
    name: 'Strangemind',
    email: 'strangemind@agiespay.income',
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('/api/ptc-ads');
        setAds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
        showToast({ type: 'error', message: '❌ Failed to load ads.' });
      }
    };

    fetchAds();
  }, []);

  const handleClickAd = async (ad) => {
    if (clickedAds.includes(ad.id)) {
      return showToast({ type: 'info', message: '⚠️ You already clicked this ad.' });
    }

    try {
      await axios.post('/api/click-track', {
        userId: user.id,
        adId: ad.id,
        clickedAt: new Date(),
      });

      setClickedAds((prev) => [...prev, ad.id]);
      showToast({ type: 'success', message: `✅ You earned ${ad.reward} coins!` });
    } catch (err) {
      console.error("Ad click failed:", err);
      showToast({ type: 'error', message: '❌ Could not record click. Try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🖱️ Click & Earn (PTC Ads)</h1>
      <p className="text-gray-600 mb-6">View sponsored ads and earn instant coins. Simple as that.</p>

      {ads.length === 0 ? (
        <p className="text-sm text-gray-500">No ads available right now. Check back later.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`bg-white rounded-lg shadow p-4 flex justify-between items-center ${
                clickedAds.includes(ad.id) ? 'opacity-70' : ''
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
                <p className="text-sm text-gray-500">⏱ View Time: {ad.duration || '10s'}</p>
                <p className="text-sm text-green-600 font-bold mt-1">+{ad.reward} coins</p>
              </div>
              <button
                onClick={() => handleClickAd(ad)}
                disabled={clickedAds.includes(ad.id)}
                className={`${
                  clickedAds.includes(ad.id)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-lg font-semibold transition`}
              >
                {clickedAds.includes(ad.id) ? 'Clicked' : 'View Ad'}
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-12 text-center text-gray-400 text-sm">
        Ads refresh frequently. Stay active. Earn more.
      </footer>
    </div>
  );
                  }
