import React, { useEffect, useState } from 'react';

export default function LoadingSpinner() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* 🌐 Placeholder Logo (Change when real logo drops) */}
      <img
        src="https://img.icons8.com/ios-filled/100/000000/internet.png"
        alt="Agiespay Income"
        className="w-20 h-20 animate-pulse opacity-80"
      />

      {/* ✨ Platform Name */}
      <h1 className="mt-4 text-xl font-bold text-gray-700">Agiespay Income</h1>

      {/* 🕒 Progress Label */}
      <p className="text-gray-500 mt-1 text-sm">Loading... {progress}%</p>

      {/* 📊 Progress Bar */}
      <div className="w-full max-w-sm mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
