import React, { useState } from 'react';

export default function SearchFilters() {
  const [activeFilter, setActiveFilter] = useState('Flights');

  const filters = ['Flights', 'Stays', 'Experiences'];

  return (
    <div className="w-full bg-[#f4f3ec] rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search destinations, trips, or friends..." 
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-white placeholder-gray-400"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? 'bg-white text-[#2c7a40] border-2 border-[#2c7a40]' 
                : 'bg-white text-[var(--text-main)] border border-transparent hover:border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

