import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

export default function TripSummary() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="font-bold text-[var(--text-main)]">Trip Summary</h3>
        </div>
        <button 
          onClick={() => navigate('/budget')} 
          className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
        >
          View Budget Breakdown →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-orange-50 rounded-2xl flex flex-col items-center justify-center py-3">
          <span className="text-xl font-bold text-orange-600">14</span>
          <span className="text-[10px] font-bold text-orange-600/70 uppercase tracking-wide">Days</span>
        </div>
        <div className="bg-green-50 rounded-2xl flex flex-col items-center justify-center py-3">
          <span className="text-xl font-bold text-green-600">3</span>
          <span className="text-[10px] font-bold text-green-600/70 uppercase tracking-wide">Cities</span>
        </div>
        <div className="bg-purple-50 rounded-2xl flex flex-col items-center justify-center py-3">
          <span className="text-xl font-bold text-purple-600">8</span>
          <span className="text-[10px] font-bold text-purple-600/70 uppercase tracking-wide">Activities</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-sm text-[var(--text-main)]">Estimated Budget</h4>
        <span className="text-xl font-bold text-[var(--primary)]">$2,650</span>
      </div>

      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Tokyo</span>
          <span className="font-bold text-gray-700">$1,200</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Kyoto</span>
          <span className="font-bold text-gray-700">$800</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Osaka</span>
          <span className="font-bold text-gray-700">$650</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          onClick={handleSave} 
          fullWidth 
          className={`text-sm shadow-sm py-3 transition-all ${isSaved ? 'bg-[#2c7a40] hover:bg-[#236334]' : ''}`}
        >
          {isSaved ? '✓ Itinerary Saved!' : 'Save Itinerary'}
        </Button>
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className={`w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors shadow-sm ${
            isFavorited ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500'
          }`}
          aria-label="Bookmark trip"
        >
          <svg className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
