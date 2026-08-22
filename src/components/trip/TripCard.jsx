import React from 'react';

export default function TripCard({ isNew, title, image, badgeText, badgeColor = 'green', dates, onClick }) {
  if (isNew) {
    return (
      <div 
        onClick={onClick}
        className="min-w-[280px] w-[280px] h-[240px] rounded-2xl border-2 border-dashed border-[#e3dcd1] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-full border-2 border-[var(--text-main)] flex items-center justify-center mb-3 text-[var(--text-main)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="font-bold text-sm text-[var(--text-main)]">Start a new journal</span>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="min-w-[280px] w-[280px] h-[240px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="h-[140px] w-full bg-gray-200 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-[var(--text-main)] truncate pr-2">{title}</h3>
          {badgeText && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
              badgeColor === 'green' ? 'bg-[#e2f1e6] text-[#2c7a40]' : 'bg-[#e0eff8] text-[#1c6fa6]'
            }`}>
              {badgeText}
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-500 text-xs font-semibold mt-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dates}
        </div>
      </div>
    </div>
  );
}

