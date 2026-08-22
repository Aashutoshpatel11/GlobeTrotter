import React, { useState } from 'react';

export default function ChallengeCard() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="bg-[#ff794d] rounded-3xl p-6 md:p-8 flex flex-col mb-6 shadow-sm text-white">
      {/* Icon + Title */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
        <span className="text-black font-bold text-sm tracking-wide">Community Challenge</span>
      </div>

      <h3 className="font-bold text-2xl text-black leading-tight mb-3">
        Share your best hidden gem!
      </h3>
      
      <p className="text-black/80 text-sm mb-6 leading-relaxed">
        Join this month's challenge and win a featured spot on the homepage.
      </p>

      <button 
        onClick={() => setJoined(!joined)}
        className={`font-bold py-3 px-6 rounded-full w-max transition-all text-sm shadow-sm ${
          joined 
            ? 'bg-white text-[#5a1c06] scale-105' 
            : 'bg-[#5a1c06] text-white hover:bg-[#421303]'
        }`}
      >
        {joined ? 'Joined Challenge! 🏆' : 'Join Challenge'}
      </button>
    </div>
  );
}
