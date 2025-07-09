import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [footerContent, setFooterContent] = useState({
    about: '',
    support: '',
    legal: '',
    community: '',
  });

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        const types = ['about', 'support', 'legal', 'community'];
        const results = await Promise.all(
          types.map(type => axios.get(`/api/public/site-content/${type}`))
        );

        const updated = {};
        types.forEach((type, idx) => {
          updated[type] = results[idx].data.content || '';
        });

        setFooterContent(updated);
      } catch (err) {
        console.error("Footer fetch failed:", err);
      }
    };

    fetchAllSections();
  }, []);

  return (
    <footer className="bg-gray-900 text-white text-sm mt-12 py-6 px-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* About */}
        <div>
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-gray-300">{footerContent.about}</p>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <p className="text-gray-300">{footerContent.support}</p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-2">Legal</h3>
          <p className="text-gray-300">{footerContent.legal}</p>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-bold mb-2">Community</h3>
          <p className="text-gray-300">{footerContent.community}</p>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} Agiespay Income. All rights reserved.
      </p>
    </footer>
  );
}
