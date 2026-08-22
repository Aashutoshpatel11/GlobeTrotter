import React from 'react';

export default function DayDetailsSidebar() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
      {/* Header Image Area */}
      <div className="h-32 bg-gray-200 relative">
        <img 
          src="https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600" 
          alt="Tokyo Street" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-5 text-white">
          <h3 className="font-extrabold text-xl mb-0.5">Sun, Oct 13</h3>
          <p className="text-xs font-semibold opacity-90">Tokyo • Day 2</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Activity 1 */}
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-[#fbfbfb]">
          <div className="text-gray-300 cursor-grab px-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M7 2a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-5 6a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-[var(--text-main)]">Tsukiji Market</h4>
            <p className="text-xs text-gray-500 font-semibold">09:00 AM</p>
          </div>
          <div className="font-bold text-sm text-[var(--text-main)]">$45</div>
        </div>

        {/* Activity 2 (Over Budget Alert) */}
        <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-red-200 bg-[#fff5f5]">
          <div className="text-gray-300 cursor-grab px-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M7 2a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-5 6a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-[var(--text-main)]">Ginza Shopping</h4>
            <p className="text-xs text-gray-500 font-semibold">01:00 PM</p>
          </div>
          <div className="font-bold text-sm text-red-600">$300</div>
        </div>
      </div>

      {/* Footer Total */}
      <div className="p-5 flex items-center justify-between border-t border-gray-100 bg-[#fdfbf7]">
        <div className="font-bold text-sm">
          <span className="text-[var(--text-main)]">Daily Total: </span>
          <span className="text-[#d63b2f]">$420</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
        </button>
      </div>
    </div>
  );
}

