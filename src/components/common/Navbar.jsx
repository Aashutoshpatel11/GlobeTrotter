import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const getLinkClasses = (path) => {
    const isActive = 
      currentPath === path || 
      (path === '/dashboard' && currentPath === '/') ||
      (path === '/trips' && (currentPath === '/trips' || currentPath === '/calendar' || currentPath === '/budget'));
    
    if (isActive) {
      return "relative cursor-pointer text-[var(--primary)] font-bold";
    }
    return "cursor-pointer hover:text-[var(--primary)] transition-colors font-semibold text-[var(--text-main)]";
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const ActiveIndicator = () => (
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-[2px] bg-[var(--primary)] rounded-full border-[1.5px] border-[var(--primary)] shadow-[0_2px_4px_rgba(188,62,18,0.2)]"></div>
  );

  return (
    <nav className="w-full bg-[#fdfbf7] py-4 px-6 md:px-10 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/dashboard" className="text-2xl md:text-3xl font-bold text-[var(--primary)] tracking-tight">
          GlobeTrotter
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-10 text-sm">
        <Link to="/dashboard" className={getLinkClasses('/dashboard')}>
          Home
          {(currentPath === '/dashboard' || currentPath === '/') && <ActiveIndicator />}
        </Link>
        <Link to="/trips" className={getLinkClasses('/trips')}>
          My Trips
          {(currentPath === '/trips' || currentPath === '/calendar' || currentPath === '/budget') && <ActiveIndicator />}
        </Link>
        <Link to="/explore" className={getLinkClasses('/explore')}>
          Explore
          {currentPath === '/explore' && <ActiveIndicator />}
        </Link>
        <Link to="/community" className={getLinkClasses('/community')}>
          Community
          {currentPath === '/community' && <ActiveIndicator />}
        </Link>
      </div>

      {/* Desktop Right (Search, Bell, Avatar) */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className="pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] w-48 bg-[#f4f3ec]/50"
          />
        </div>
        <button 
          title="Notifications" 
          className="text-gray-600 hover:text-[var(--primary)] transition-colors relative p-1.5"
          onClick={() => alert("You have 1 new recommendation for your Japan trip! 🌸")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
        </button>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border-2 border-transparent hover:border-[var(--primary)] transition-colors cursor-pointer shadow-sm"
          >
            <img src="https://i.pravatar.cc/150?img=32" alt="User Profile" className="w-full h-full object-cover" />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-[var(--text-main)]">Elena Ivanova</p>
                <p className="text-[11px] text-gray-500 truncate">elena@globetrotter.io</p>
              </div>
              <Link 
                to="/create-trip" 
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#fdfbf7] hover:text-[var(--primary)]"
              >
                ✈️ Plan New Trip
              </Link>
              <Link 
                to="/trips" 
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#fdfbf7] hover:text-[var(--primary)]"
              >
                🗺️ My Itineraries
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                🔒 Sign Out / Switch Account
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-[var(--text-main)] focus:outline-none p-1"
          aria-label="Toggle Navigation"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#fdfbf7] shadow-lg flex flex-col p-4 space-y-4 md:hidden border-t border-gray-100 z-40">
          <Link 
            to="/dashboard" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`font-semibold text-sm ${currentPath === '/dashboard' || currentPath === '/' ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-main)]'}`}
          >
            Home
          </Link>
          <Link 
            to="/trips" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`font-semibold text-sm ${currentPath === '/trips' ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-main)]'}`}
          >
            My Trips
          </Link>
          <Link 
            to="/explore" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`font-semibold text-sm ${currentPath === '/explore' ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-main)]'}`}
          >
            Explore
          </Link>
          <Link 
            to="/community" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`font-semibold text-sm ${currentPath === '/community' ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-main)]'}`}
          >
            Community
          </Link>
          <Link 
            to="/create-trip" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="font-semibold text-sm text-[var(--primary)]"
          >
            + Plan New Trip
          </Link>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                 <img src="https://i.pravatar.cc/150?img=32" alt="User Profile" className="w-full h-full object-cover" />
               </div>
               <span className="font-semibold text-xs text-gray-700">Elena Ivanova</span>
             </div>
             <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-[var(--primary)] font-bold">
               Sign Out
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
