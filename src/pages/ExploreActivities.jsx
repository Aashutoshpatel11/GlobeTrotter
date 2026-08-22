import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActivities } from '../services/discovery.api.js';
import Navbar from '../components/common/Navbar';

export default function ExploreActivities() {
  const [searchParams] = useSearchParams();
  const [activities, setActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxCost, setMaxCost] = useState(200);
  const [maxDuration, setMaxDuration] = useState(6);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [likedIds, setLikedIds] = useState(new Set());
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Sightseeing', 'Food & Drink', 'Adventure', 'Culture', 'Relaxation', 'Shopping', 'Nightlife'];

  useEffect(() => {
    getActivities().then(res => {
      setActivities(res.data || []);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load activities.");
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const toggleAdd = (id, title) => {
    setActivities(acts => acts.map(act => {
      if (act.id === id) {
        const nextAdded = !act.added;
        showToast(nextAdded ? `Added "${title}" to your itinerary! 🗺️` : `Removed "${title}" from your itinerary.`);
        return { ...act, added: nextAdded };
      }
      return act;
    }));
  };

  const toggleLike = (id) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      // Category match
      if (selectedCategory !== 'All' && act.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = act.title?.toLowerCase().includes(q);
        const matchesDesc = act.desc?.toLowerCase().includes(q);
        const matchesCat = act.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      // Cost filter (extract numeric value e.g. "$45" -> 45)
      const costNum = parseInt(act.cost?.replace(/[^0-9]/g, '') || '0', 10);
      if (costNum > maxCost) {
        return false;
      }
      // Duration filter (e.g. "3 hrs" -> 3)
      const durNum = parseFloat(act.duration?.replace(/[^0-9.]/g, '') || '0');
      if (durNum > maxDuration) {
        return false;
      }
      return true;
    });
  }, [activities, selectedCategory, searchQuery, maxCost, maxDuration]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white text-xs font-bold ml-2">✕</button>
        </div>
      )}
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 pt-8 pb-12 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-2 tracking-tight">Find Activities</h1>
          <p className="text-gray-600 text-sm font-semibold">Discover the best things to do on your next adventure.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 bg-[#f8f6f4] rounded-2xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold flex items-center gap-2 text-[var(--text-main)]">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
                Categories
              </h3>
              {selectedCategory !== 'All' && (
                <button onClick={() => setSelectedCategory('All')} className="text-xs text-[var(--primary)] font-bold hover:underline">
                  Reset Category
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search inside filter box */}
            <div className="mt-5 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword (e.g. night market, hike, museum)..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[var(--primary)]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold">✕</button>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
            {/* Max Cost Slider */}
            <div className="bg-[#f8f6f4] rounded-2xl p-5 border border-gray-200/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Max Cost
                </span>
                <span className="text-sm font-bold text-[var(--primary)]">${maxCost}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="300" 
                step="10"
                value={maxCost}
                onChange={(e) => setMaxCost(Number(e.target.value))}
                className="w-full accent-[var(--primary)] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mt-1">
                <span>$0</span>
                <span>$300+</span>
              </div>
            </div>

            {/* Max Duration Slider */}
            <div className="bg-[#f8f6f4] rounded-2xl p-5 border border-gray-200/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Max Duration
                </span>
                <span className="text-sm font-bold text-[var(--primary)]">{maxDuration} Hours</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5"
                value={maxDuration}
                onChange={(e) => setMaxDuration(Number(e.target.value))}
                className="w-full accent-[var(--primary)] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mt-1">
                <span>1 hr</span>
                <span>10 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
             [1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-white rounded-3xl h-[400px] border border-gray-100 flex flex-col group overflow-hidden">
                 <div className="h-[200px] bg-gray-200 animate-pulse"></div>
                 <div className="p-5 flex-1 space-y-3">
                   <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                   <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                   <div className="h-20 bg-gray-200 animate-pulse rounded w-full"></div>
                 </div>
               </div>
             ))
          ) : filteredActivities.length === 0 ? (
             <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-3xl border border-gray-100 p-8">
               <p className="text-lg font-bold mb-2">No activities match your selected filters.</p>
               <button 
                 onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxCost(300); setMaxDuration(10); }}
                 className="mt-2 text-sm text-[var(--primary)] font-bold underline"
               >
                 Reset all filters
               </button>
             </div>
          ) : (
             filteredActivities.map((act) => (
             <div key={act.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col group hover:shadow-md transition-all">
               <div className="relative h-[200px] w-full bg-gray-200">
                 <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 
                 <span className={`absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold ${act.tagColor} shadow-sm`}>
                   {act.category}
                 </span>

                 <button 
                   onClick={() => toggleLike(act.id)}
                   className={`absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform ${
                     likedIds.has(act.id) ? 'text-red-500' : 'text-gray-400 hover:text-[var(--primary)]'
                   }`}
                   aria-label="Save activity"
                 >
                   <svg className="w-4 h-4" fill={likedIds.has(act.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                   </svg>
                 </button>
               </div>

               <div className="p-5 flex flex-col flex-1">
                 <div className="flex items-start justify-between gap-2 mb-3">
                   <h3 className="font-bold text-[17px] text-[var(--text-main)] leading-snug">{act.title}</h3>
                   <div className="flex items-center gap-1 bg-gray-50 text-gray-700 border border-gray-100 px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0 mt-1">
                     <svg className="w-3 h-3 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                     {act.rating}
                   </div>
                 </div>

                 <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-main)] opacity-80 mb-4">
                   <span className="flex items-center gap-1.5">
                     <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     {act.duration}
                   </span>
                   <span className="flex items-center gap-1.5">
                     <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                     Est. {act.cost}
                   </span>
                 </div>

                 <p className="text-xs text-gray-600 font-medium leading-relaxed mb-6 flex-1">
                   {act.desc}
                 </p>

                 <button 
                   onClick={() => toggleAdd(act.id, act.title)}
                   className={`w-full py-2.5 rounded-full border text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                     act.added 
                       ? 'bg-[#fcf2ef] text-[var(--primary)] border-[var(--primary)]/30' 
                       : 'bg-white border-[#e6d8d0] text-[var(--text-main)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                   }`}
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     {act.added ? (
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                     ) : (
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                     )}
                   </svg>
                   {act.added ? 'Added to Itinerary ✓' : 'Add to Trip'}
                 </button>
               </div>
             </div>
           ))
          )}
        </div>
      </main>
    </div>
  );
}
