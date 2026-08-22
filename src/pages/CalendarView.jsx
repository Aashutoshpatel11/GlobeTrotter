import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MonthCalendar from '../components/calendar/MonthCalendar';
import DayDetailsSidebar from '../components/calendar/DayDetailsSidebar';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(13);
  const [selectedCity, setSelectedCity] = useState('tokyo');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const months = ['October 2024', 'November 2024', 'December 2024'];

  const handleSelectDate = (date, city) => {
    setSelectedDate(date);
    if (city) setSelectedCity(city);
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => (prev > 0 ? prev - 1 : months.length - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => (prev < months.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 pt-6 pb-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-[34px] font-extrabold text-[var(--text-main)] mb-1 tracking-tight">Japan Discovery 🇯🇵</h1>
            <p className="text-gray-500 text-sm font-semibold">{months[currentMonthIndex]}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100/80 rounded-full px-3 py-1.5 border border-gray-200 shadow-sm">
              <button onClick={handlePrevMonth} className="text-gray-400 hover:text-gray-700 p-1 transition-colors" aria-label="Previous month">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <span className="font-bold text-xs mx-4 text-[var(--text-main)] select-none">{months[currentMonthIndex].split(' ')[0]}</span>
              <button onClick={handleNextMonth} className="text-gray-400 hover:text-gray-700 p-1 transition-colors" aria-label="Next month">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            
            <div className="flex items-center bg-gray-100/80 rounded-full p-1 border border-gray-200 shadow-sm">
              <button className="bg-[var(--primary)] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-sm">
                Calendar
              </button>
              <Link to="/budget" className="text-gray-500 hover:text-gray-700 text-xs font-bold px-5 py-1.5 rounded-full transition-colors">
                Timeline / Budget
              </Link>
            </div>
          </div>
        </div>

        {/* Alert Banner for over-budget day */}
        {selectedDate === 13 && (
          <div className="mb-6 bg-[#fdebea] border border-[#f9c3c0] rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-in fade-in duration-200">
            <svg className="w-5 h-5 text-[#d63b2f] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <span className="font-bold text-[#d63b2f] text-sm">Budget Alert</span>
              <p className="text-[#d63b2f] text-sm font-medium mt-0.5">Day 2 (Oct 13 in Tokyo) is currently projected $120 over your daily budget due to Ginza shopping.</p>
            </div>
            <Link to="/budget" className="text-xs font-bold text-[#d63b2f] underline shrink-0 mt-1">
              Adjust in Budget →
            </Link>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MonthCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} />
          </div>
          <div className="lg:col-span-1">
            <DayDetailsSidebar selectedDate={selectedDate} city={selectedCity} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
