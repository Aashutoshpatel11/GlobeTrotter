import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BudgetOverview from '../components/budget/BudgetOverview';

export default function BudgetBreakdown() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-10 pt-8 pb-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--text-main)] mb-1 tracking-tight">Japan Explorer</h1>
            <p className="text-[var(--text-main)] text-[11px] font-bold">Oct 12 - Oct 26 • 2 Travelers</p>
          </div>
          
          <div className="flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button className="bg-[var(--primary)] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              Timeline
            </button>
            <Link to="/calendar" className="text-gray-500 hover:text-gray-700 text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Calendar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column (Detailed Timeline) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tokyo Section */}
            <div className="relative">
              <div className="absolute left-[3px] top-8 bottom-[-32px] w-px bg-gray-200"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0"></div>
                <h2 className="text-[var(--primary)] font-extrabold text-xl">Tokyo</h2>
              </div>

              <div className="ml-5 space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Day 1 • Oct 12</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Arrival at Narita (NRT)</h4>
                          <p className="text-[11px] font-semibold text-gray-500">JL007 • Terminal 2</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[var(--text-main)]">2:30 PM</span>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Check-in: Shibuya Stream Hotel</h4>
                          <p className="text-[11px] font-semibold text-gray-500">Shibuya City, Tokyo</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[var(--text-main)]">4:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 mt-8">Day 2 • Oct 13</h3>
                  
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">teamLab Planets TOKYO</h4>
                        <p className="text-[11px] font-semibold text-gray-500 mb-2">Immersive art museum. Pre-booked tickets.</p>
                        <span className="inline-flex items-center gap-1 bg-[#eef5f9] text-[#246399] px-2 py-0.5 rounded text-[10px] font-bold border border-[#c0ddef]">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                           $65
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[var(--text-main)] shrink-0">10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kyoto Section */}
            <div className="relative pt-4">
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0"></div>
                <h2 className="text-[var(--primary)] font-extrabold text-xl">Kyoto</h2>
              </div>

              <div className="ml-5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Day 4 • Oct 15</h3>
                
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Shinkansen to Kyoto</h4>
                      <p className="text-[11px] font-semibold text-gray-500">Nozomi 15 • Car 4, Seats 12A/B</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--text-main)]">9:00 AM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Alert Box */}
            <div className="bg-[#fdebea] border border-[#f9c3c0] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
              <svg className="w-4 h-4 text-[#d63b2f] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <span className="font-bold text-[#d63b2f] text-[11px] block mb-0.5">Budget Alert</span>
                <p className="text-[#d63b2f] text-[11px] font-semibold leading-relaxed">You are currently projected to exceed your dining budget by $120.</p>
              </div>
            </div>

            <BudgetOverview />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

