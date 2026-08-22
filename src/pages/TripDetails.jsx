import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import ItineraryStop from '../components/trip/ItineraryStop';
import ActivityRow from '../components/trip/ActivityRow';
import TripSummary from '../components/trip/TripSummary';

export default function TripDetails() {
  const [openStops, setOpenStops] = useState({ tokyo: true, kyoto: false, osaka: false });

  const toggleStop = (stop) => {
    setOpenStops(prev => ({ ...prev, [stop]: !prev[stop] }));
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 pt-6 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Itinerary) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden h-[260px] md:h-[300px] shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200" 
                alt="Japan Explorer" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-900/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 w-max flex items-center gap-2 mb-3">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Upcoming Adventure</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight flex items-center gap-3">
                  Japan Explorer <span>🇯🇵</span>
                </h1>
                <p className="text-sm font-semibold opacity-90">Oct 12 - Oct 16 • 14 Days</p>
                
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 shadow-sm transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  </button>
                  <button className="bg-[var(--primary)] text-white font-bold py-2.5 px-5 rounded-full hover:bg-[var(--primary-hover)] transition-colors shadow-sm flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    Edit Trip
                  </button>
                </div>
              </div>
            </div>

            {/* Itinerary List */}
            <div className="pt-4 pl-2">
              <div onClick={() => toggleStop('tokyo')}>
                <ItineraryStop 
                  city="Tokyo" dates="Oct 12 - Oct 16" duration="5 Days" cost="$1,200" 
                  isOpen={openStops.tokyo} 
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
                  }
                >
                  <ActivityRow 
                    time="10:00 AM" 
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>}
                    title="Sushi Dai" subtitle="Tsukiji Outer Market, Tokyo" 
                    tag="Food" tagColor="blue" cost="$80" 
                  />
                  <ActivityRow 
                    time="1:00 PM" 
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>}
                    title="Shinjuku Gyoen National Garden" subtitle="Shinjuku, Tokyo" 
                    tag="Sightseeing" tagColor="green" cost="$5" 
                  />
                </ItineraryStop>
              </div>

              <div onClick={() => toggleStop('kyoto')}>
                <ItineraryStop 
                  city="Kyoto" dates="Oct 17 - Oct 20" duration="4 Days" cost="$800" 
                  isOpen={openStops.kyoto} 
                  icon={
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  }
                />
              </div>

              <div onClick={() => toggleStop('osaka')}>
                <ItineraryStop 
                  city="Osaka" dates="Oct 21 - Oct 25" duration="5 Days" cost="$650" 
                  isOpen={openStops.osaka} isLast={true}
                  icon={
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                  }
                />
              </div>

              <button className="w-full mt-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] text-[var(--text-main)] font-bold text-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                <span className="text-[var(--primary)] text-lg">+</span> Add Another Stop
              </button>
            </div>
            
            <div className="text-center pt-8">
              <p className="text-gray-400 italic text-sm relative inline-block">
                <svg className="absolute -left-8 top-1 w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Your adventure starts here ✨
              </p>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1 space-y-6">
            <TripSummary />

            {/* Your Route */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <h3 className="font-bold text-[var(--text-main)] mb-4">Your Route</h3>
              <div className="w-full h-40 bg-blue-50/50 rounded-2xl overflow-hidden relative border border-gray-100">
                {/* Mock Map Image */}
                <div className="absolute inset-0 bg-[#eef5f9] flex items-center justify-center">
                  <div className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Interactive Map</div>
                  {/* Decorative map points */}
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  <svg className="absolute inset-0 w-full h-full text-gray-300" preserveAspectRatio="none"><path d="M 75% 33% Q 50% 50% 25% 75%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none"/></svg>
                </div>
              </div>
            </div>

            {/* Need Suggestions */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
              <div className="relative z-10 w-2/3">
                <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                  <span className="text-orange-400">✨</span> Need Suggestions?
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Get personalized recommendations for your trip
                </p>
                <button className="bg-purple-100 text-purple-700 font-bold text-xs px-4 py-2 rounded-full hover:bg-purple-200 transition-colors">
                  Get Suggestions
                </button>
              </div>
              
              {/* Backpack Illustration Mock */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-80">
                <div className="w-24 h-24 bg-orange-200 rounded-2xl absolute bottom-10 right-10 rotate-12 flex items-center justify-center text-orange-600 font-bold">🎒</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

