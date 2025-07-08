import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 🔐 Optional: Supabase Auth Guard
import { useToast } from '../context/ToastContext';

const sections = ['about', 'support', 'legal', 'community'];

export default function AdminPanel() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedType, setSelectedType] = useState('about');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch content for selected type
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/public/site-content/${selectedType}`);
        setContent(res.data.content || '');
      } catch (err) {
        console.error(err);
        setContent('');
        showToast({ type: 'error', message: '⚠️ Could not load content' });
      }
      setLoading(false);
    };

    fetchContent();
  }, [selectedType]);

  const handleSave = async () => {
    if (!content) return showToast({ type: 'warning', message: 'Content cannot be empty!' });

    try {
      await axios.post('/api/admin/site-content', {
        type: selectedType,
        content,
      });
      showToast({ type: 'success', message: `✅ ${selectedType} content updated.` });
    } catch (err) {
      console.error(err);
      showToast({ type: 'error', message: '❌ Failed to update content.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">⚙️ Admin Panel – Site Content</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Select Section</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 border rounded-lg outline-blue-500"
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold text-gray-600">Edit Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg outline-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
