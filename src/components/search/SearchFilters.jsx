import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchFilters({ 
  searchQuery = '', 
  onSearchChange = () => {}, 
  activeFilter = 'All', 
  onFilterChange = () => {} 
}) {
  const navigate = useNavigate();
  const filters = ['All', 'Flights', 'Stays', 'Experiences'];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full bg-[#f4f3ec] rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-3 shadow-inner border border-gray-200/60">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations (e.g. Amalfi, Kyoto), trips, or experiences..." 
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-white placeholder-gray-400"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-white text-[var(--primary)] border-2 border-[var(--primary)] shadow-sm' 
                : 'bg-white text-[var(--text-main)] border border-gray-200 hover:border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
