import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const [heroImage, setHeroImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const earnings = [
    { name: 'Chika 🇳🇬', amount: '3.5 USDT' },
    { name: 'Raj 🇮🇳', amount: '2 AGY' },
    { name: 'Sarah 🇬🇧', amount: '5 USDT' },
    { name: 'James 🇵🇭', amount: '1.2 AGY' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('homepage_settings').select('*').single();
      const { data: tList } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

      if (settings) {
        setHeroImage(settings.hero_image_url);
        setVideoUrl(settings.video_url);
      }
      setTestimonials(tList || []);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Hero Image */}
        <div className="w-full md:w-1/2 p-6">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Agiespay mobile users"
              className="w-full h-auto rounded-lg shadow-md"
            />
          ) : (
            <div className="text-center text-gray-400 italic">No image uploaded yet</div>
          )}
        </div>

        {/* Hero Text */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Agiespay Income</h1>
          <p className="text-gray-700 text-lg mb-4">
            💸 Turn your time, clicks, and attention into real income — 100% free.
          </p>
          <div className="flex gap-4 mb-6">
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
              Start Earning
            </Link>
            <Link to="/login" className="text-blue-700 underline font-semibold hover:text-blue-900">
              Sign In
            </Link>
          </div>

          {/* Video Preview */}
          {videoUrl && (
            <div className="mt-4">
              <iframe
                src={videoUrl}
                title="Earnings Preview"
                className="w-full rounded-lg"
                style={{ minHeight: '200px' }}
                allowFullScreen
              />
            </div>
          )}

          {/* Live Earnings */}
          <div className="bg-gray-100 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">📱 Live Earnings:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {earnings.map((e, i) => (
                <li key={i}>✅ {e.name} earned <strong>{e.amount}</strong></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 rounded shadow-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={t.avatar_url || `https://ui-avatars.com/api/?name=${t.name}`}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.country}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{t.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 How It Works</h2>
        <ul className="space-y-4">
          <li><strong>📝 Sign Up:</strong> Create your free account</li>
          <li><strong>🖱️ Click / Watch / Share:</strong> Complete simple tasks daily</li>
          <li><strong>💰 Earn Coins:</strong> Get paid per click, view or link</li>
          <li><strong>📤 Withdraw Instantly:</strong> Convert coins to USDT or AGY</li>
        </ul>
      </div>

      {/* Why Choose Agiespay */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
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

      {/* Footer */}
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
