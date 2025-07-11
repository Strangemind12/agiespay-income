import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // ✅ adjust if needed
import { useToast } from '../context/ToastContext';

export default function AdminSettings() {
  const { showToast } = useToast();
  const [heroImage, setHeroImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    message: '',
    country: '',
    avatar_url: ''
  });

  // Fetch current settings and testimonials
  useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('homepage_settings').select('*').single();
      if (settings) {
        setHeroImage(settings.hero_image_url || '');
        setVideoUrl(settings.video_url || '');
      }

      const { data: allTestimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      setTestimonials(allTestimonials || []);
    };

    fetchData();
  }, []);

  const updateSettings = async () => {
    const { error } = await supabase.from('homepage_settings').upsert({
      id: 'homepage-settings-001', // static ID
      hero_image_url: heroImage,
      video_url: videoUrl,
      updated_at: new Date()
    });

    if (error) return showToast({ type: 'error', message: 'Failed to update settings' });
    showToast({ type: 'success', message: 'Settings updated successfully!' });
  };

  const addTestimonial = async () => {
    const { error } = await supabase.from('testimonials').insert([newTestimonial]);
    if (error) return showToast({ type: 'error', message: '❌ Failed to add testimonial' });

    setTestimonials(prev => [newTestimonial, ...prev]);
    setNewTestimonial({ name: '', message: '', country: '', avatar_url: '' });
    showToast({ type: 'success', message: '✅ Testimonial added!' });
  };

  const deleteTestimonial = async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return showToast({ type: 'error', message: '❌ Deletion failed' });
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast({ type: 'success', message: '🗑️ Deleted successfully!' });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Settings</h1>

      {/* 🔥 Hero Image + Video */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Homepage Media</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Hero Image URL:</label>
          <input
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://image-link.com"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Video Preview URL (YouTube, etc):</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://youtube.com/embed/..."
          />
        </div>

        <button
          onClick={updateSettings}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          💾 Save Changes
        </button>
      </div>

      {/* 💬 Testimonial Manager */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Testimonials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            placeholder="Name"
            className="px-3 py-2 border rounded"
          />
          <input
            value={newTestimonial.country}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, country: e.target.value })}
            placeholder="Country (🇳🇬 Nigeria)"
            className="px-3 py-2 border rounded"
          />
          <input
            value={newTestimonial.avatar_url}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar_url: e.target.value })}
            placeholder="Avatar URL"
            className="px-3 py-2 border rounded col-span-2"
          />
          <textarea
            value={newTestimonial.message}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
            placeholder="Testimonial message"
            className="px-3 py-2 border rounded col-span-2"
          />
        </div>

        <button
          onClick={addTestimonial}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Testimonial
        </button>

        <hr className="my-6" />

        {/* Testimonials List */}
        <ul className="space-y-4">
          {testimonials.map(t => (
            <li key={t.id} className="bg-gray-100 p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.name} ({t.country})</p>
                  <p className="text-sm text-gray-600">{t.message}</p>
                </div>
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
