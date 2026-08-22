import React from 'react';

export default function ItineraryStop({ city, dates, duration, cost, isOpen, icon, isLast, children }) {
  return (
    <div className="relative">
      {/* Timeline line connecting stops */}
      {!isLast && (
        <div className="absolute left-[19px] top-12 bottom-[-16px] w-[2px] bg-red-100/50"></div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] mb-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center relative z-10 shrink-0 border-4 border-white shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-[var(--text-main)]">{city}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{dates} <span className="text-gray-400">({duration})</span></p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Est. Cost</div>
            <div className="font-bold text-[var(--primary)]">{cost}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="ml-14 pr-4 pb-6">
          <div className="relative">
            {/* Timeline dots for activities */}
            <div className="absolute -left-[37px] top-4 bottom-0 w-[2px] border-l-2 border-dashed border-gray-200"></div>
            
            {children}
            
            {/* Add Activity Button */}
            <button className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

