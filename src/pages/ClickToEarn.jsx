import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function ClickToEarn() {
  const [ads, setAds] = useState([]);
  const [cooldowns, setCooldowns] = useState({});
  const [loading, setLoading] = useState(true);

  const { user, session } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchAdsAndCooldowns = async () => {
      try {
        const [adsRes, cooldownRes] = await Promise.all([
          axios.get('/api/ptc-ads'),
          axios.get(`/api/user/${user.id}/cooldowns`), // Fetch cooldown timestamps
        ]);
        setAds(adsRes.data);
        setCooldowns(cooldownRes.data); // Expected format: { adId1: timestamp, adId2: timestamp, ... }
      } catch (err) {
        console.error('Error loading ads or cooldowns:', err);
        showToast({ type: 'error', message: '❌ Failed to load ads or cooldown data.' });
      }
      setLoading(false);
    };

    if (user?.id) fetchAdsAndCooldowns();
  }, [user?.id, showToast]);

  // Check if ad is cooling down based on backend timestamp + cooldown period (e.g., 10 seconds)
  const COOLDOWN_MS = 10 * 1000;

  const isCoolingDown = (adId) => {
    if (!cooldowns[adId]) return false;
    const lastClicked = new Date(cooldowns[adId]).getTime();
    return Date.now() - lastClicked < COOLDOWN_MS;
  };

  const timeLeft = (adId) => {
    if (!cooldowns[adId]) return 0;
    const lastClicked = new Date(cooldowns[adId]).getTime();
    return Math.ceil((COOLDOWN_MS - (Date.now() - lastClicked)) / 1000);
  };

  const handleClickAd = async (ad) => {
    if (isCoolingDown(ad.id)) {
      showToast({ type: 'info', message: `⏳ Please wait ${timeLeft(ad.id)} seconds before clicking again.` });
      return;
    }

    try {
      const token = session?.access_token || sessionStorage.getItem('access_token');

      const res = await axios.post(
        '/api/click-track',
        {
          userId: user.id,
          adId: ad.id,
          clickedAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update cooldown timestamp locally based on backend response or just set now
      setCooldowns((prev) => ({
        ...prev,
        [ad.id]: new Date().toISOString(),
      }));

      showToast({ type: 'success', message: `✅ You earned ${ad.reward} coins!` });
    } catch (err) {
      console.error('Ad click failed:', err);
      showToast({ type: 'error', message: '❌ Could not record click. Try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🖱️ Click & Earn (PTC Ads)</h1>
      <p className="text-gray-600 mb-6">View sponsored ads and earn instant coins. Simple as that.</p>

      {loading ? (
        <p className="text-gray-500 text-sm">🔄 Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-sm text-gray-500">No ads available right now. Check back later.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {ads.map((ad) => {
            const cooling = isCoolingDown(ad.id);
            return (
              <div
                key={ad.id}
                className={`bg-white rounded-lg shadow p-4 flex justify-between items-center ${
                  cooling ? 'opacity-70' : ''
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
                  <p className="text-sm text-gray-500">⏱ View Time: {ad.duration || '10s'}</p>
                  <p className="text-sm text-green-600 font-bold mt-1">+{ad.reward} coins</p>
                </div>
                <button
                  onClick={() => handleClickAd(ad)}
                  disabled={cooling}
                  className={`${
                    cooling ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white px-4 py-2 rounded-lg font-semibold transition`}
                >
                  {cooling ? `Wait ${timeLeft(ad.id)}s` : 'View Ad'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <footer className="mt-12 text-center text-gray-400 text-sm">
        Ads refresh frequently. Stay active. Earn more.
      </footer>
    </div>
  );
                                                                    }
