import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';

export default function CreateTrip() {
  const [cities, setCities] = useState([
    { name: 'Tokyo', added: true },
    { name: 'Kyoto', added: false },
    { name: 'Osaka', added: false }
  ]);

  const toggleCity = (index) => {
    const newCities = [...cities];
    newCities[index].added = !newCities[index].added;
    setCities(newCities);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#fdfbf7] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-blue-50/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-10 py-12 w-full relative">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 pb-24 relative overflow-hidden">
            <h1 className="text-4xl md:text-[42px] font-extrabold text-[var(--primary)] mb-2 tracking-tight">Plan New Trip</h1>
            <p className="text-gray-600 font-medium mb-8">Where is your next adventure taking you?</p>

            <form className="space-y-6">
              {/* Drag and drop area */}
              <div className="w-full h-40 rounded-2xl border-2 border-dashed border-[#e6d8d0] bg-[#faf8f5] flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f1ed] transition-colors">
                <div className="w-10 h-10 bg-[#ebe3dd] rounded-full flex items-center justify-center text-gray-500 mb-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="font-bold text-[var(--text-main)] text-sm">Drag and drop a cover photo</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">or click to browse</p>
              </div>

              {/* Trip Name */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Trip Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Summer in Kyoto" 
                  className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Start Date</label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input 
                      type="text" 
                      placeholder="dd/mm/yyyy" 
                      className="w-full border border-[#e6d8d0] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-2">End Date</label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input 
                      type="text" 
                      placeholder="dd/mm/yyyy" 
                      className="w-full border border-[#e6d8d0] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea 
                  placeholder="What's the vibe of this trip?" 
                  rows="3"
                  className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa] resize-none"
                ></textarea>
              </div>

              {/* Add starting cities */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-3">Add starting cities <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="flex flex-wrap gap-3">
                  {cities.map((city, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => toggleCity(idx)}
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors border ${
                        city.added 
                          ? 'bg-[#eef5ef] text-[#2c7a40] border-[#cbe1d0]' 
                          : 'bg-[#f8f6f4] text-[var(--text-main)] border-[#e6d8d0] hover:bg-[#f0ebe7]'
                      }`}
                    >
                      {city.name} {city.added ? '×' : '+'}
                    </button>
                  ))}
                  <button type="button" className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 bg-[#f8f6f4] text-gray-500 border border-dashed border-[#d8c9c0] hover:bg-[#f0ebe7]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    Add custom
                  </button>
                </div>
              </div>
            </form>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 w-full p-8 pt-0 flex items-center justify-between z-10 bg-gradient-to-t from-white via-white to-transparent">
              <button className="text-sm font-bold text-[var(--text-main)] hover:text-gray-600 transition-colors">
                Cancel
              </button>
              <button className="bg-[#b34033] text-white font-bold py-3 px-6 rounded-full hover:bg-[#9c3226] transition-colors flex items-center gap-2 shadow-sm text-sm">
                Save & Continue to Itinerary
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
            
            {/* Corner Illustration Mock */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-90 rotate-[-5deg] pointer-events-none">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544644181-1484b3f8c5b3?auto=format&fit=crop&q=80&w=300')] bg-cover bg-center rounded-2xl shadow-lg mix-blend-multiply opacity-50 grayscale sepia"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

