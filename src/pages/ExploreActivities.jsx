import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';

export default function ExploreActivities() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600',
      category: 'Food & Drink',
      tagColor: 'text-blue-300',
      title: 'Street Food & Night Market Tour',
      rating: 4.8,
      duration: '3 hrs',
      cost: '$45',
      desc: 'Taste authentic local dishes and explore vibrant night markets with an expert guide.',
      added: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
      category: 'Adventure',
      tagColor: 'text-green-300',
      title: 'Sunrise Peak Guided Hike',
      rating: 4.9,
      duration: '5 hrs',
      cost: '$60',
      desc: 'Experience breathtaking views from the summit with our experienced local mountaineers.',
      added: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=600',
      category: 'Culture',
      tagColor: 'text-orange-300',
      title: 'National Museum Fast-Track',
      rating: 4.6,
      duration: '2.5 hrs',
      cost: '$30',
      desc: 'Skip the lines and dive into history with an audio guide covering centuries of art.',
      added: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&q=80&w=600',
      category: 'Relaxation',
      tagColor: 'text-blue-300',
      title: 'Thermal Baths & Massage',
      rating: 4.9,
      duration: '4 hrs',
      cost: '$120',
      desc: 'Unwind in historic thermal pools followed by a signature deep tissue massage.',
      added: false
    }
  ]);

  const toggleAdd = (id) => {
    setActivities(acts => acts.map(act => act.id === id ? { ...act, added: !act.added } : act));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 pt-8 pb-12 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-2 tracking-tight">Find Activities</h1>
          <p className="text-[var(--text-main)] text-sm font-semibold">Discover the best things to do on your next adventure.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 bg-[#f8f6f4] rounded-2xl p-6">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-[var(--text-main)]">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
              Categories
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <button className="bg-[var(--primary)] text-white text-xs font-bold px-4 py-2 rounded-full">All</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Sightseeing</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Food & Drink</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Adventure</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Culture</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Relaxation</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Shopping</button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:border-gray-300 text-xs font-bold px-4 py-2 rounded-full transition-colors">Nightlife</button>
            </div>
          </div>
          
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
            <div className="bg-[#f8f6f4] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Max Cost
                </span>
                <span className="text-sm font-bold text-[var(--primary)]">$150</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full relative mb-1">
                <div className="absolute top-0 left-0 h-full bg-[var(--primary)] rounded-full w-1/3"></div>
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            <div className="bg-[#f8f6f4] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Max Duration
                </span>
                <span className="text-sm font-bold text-[var(--primary)]">4 Hours</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full relative mb-1">
                <div className="absolute top-0 left-0 h-full bg-[var(--primary)] rounded-full w-[40%]"></div>
                <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                <span>1 hr</span>
                <span>12+ hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div key={act.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col group hover:shadow-md transition-all">
              <div className="relative h-[200px] w-full bg-gray-200">
                <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <span className={`absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold ${act.tagColor} shadow-sm`}>
                  {act.category}
                </span>

                <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--primary)] shadow-sm hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
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
                  onClick={() => toggleAdd(act.id)}
                  className={`w-full py-2.5 rounded-full border text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                    act.added 
                      ? 'bg-[#fcf2ef] text-[var(--primary)] border-transparent' 
                      : 'bg-white border-[#e6d8d0] text-[var(--text-main)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
