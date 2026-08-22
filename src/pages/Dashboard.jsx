import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUpcomingTrips } from '../services/trips.api.js';

import Navbar from '../components/common/Navbar';
import SearchFilters from '../components/search/SearchFilters';
import TripCard from '../components/trip/TripCard';
import Button from '../components/common/Button';

export default function Dashboard() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUpcomingTrips().then(res => {
      setUpcomingTrips(res.data || []);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load trips. Please try again.");
      setIsLoading(false);
    });
  }, []);

  const filteredTrips = useMemo(() => {
    return upcomingTrips.filter(trip => {
      const matchesSearch = trip.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            trip.dates?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [upcomingTrips, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-[42px] font-bold text-[var(--text-main)] mb-2 tracking-tight">
              Have a good day, traveler <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform cursor-pointer">👋</span>
            </h1>
            <p className="text-gray-600 text-lg">Where to next?</p>
          </div>
          <Button onClick={() => navigate('/create-trip')} className="w-full md:w-auto shadow-md">
            Plan New Trip
          </Button>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Quick Discovery Cards / Featured Destinations */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Trending Destinations</h2>
            <Link to="/explore" className="text-[var(--primary)] font-bold text-xs hover:underline">
              Explore All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=400', tag: 'Top Rated' },
              { name: 'Amalfi, Italy', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&q=80&w=400', tag: 'Coastal' },
              { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400', tag: 'Culture' },
              { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400', tag: 'Romance' },
            ].map((dest, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/trips')}
                className="group relative rounded-2xl overflow-hidden h-36 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-extrabold uppercase bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full mb-1 inline-block">{dest.tag}</span>
                  <p className="text-sm font-bold truncate">{dest.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Trips Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Your Upcoming Trips</h2>
            <button onClick={() => navigate('/trips')} className="text-[var(--primary)] font-bold text-sm hover:underline">
              View All
            </button>
          </div>
          
          {/* Horizontal scroll container */}
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
          
          <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {isLoading ? (
               [1,2,3].map(i => (
                 <div key={i} className="min-w-[280px] w-[280px] h-[240px] bg-gray-200 animate-pulse rounded-2xl"></div>
               ))
            ) : filteredTrips.length === 0 && searchQuery ? (
               <div className="w-full py-12 text-center text-gray-500">
                 No trips match "{searchQuery}". <button onClick={() => setSearchQuery('')} className="text-[var(--primary)] font-bold underline ml-1">Clear search</button>
               </div>
            ) : (
               filteredTrips.map((trip) => (
                <TripCard 
                  key={trip.id}
                  title={trip.title}
                  image={trip.image}
                  badgeText={trip.badgeText}
                  badgeColor={trip.badgeColor}
                  dates={trip.dates}
                  onClick={() => navigate('/trips')}
                />
              ))
            )}
            <TripCard isNew={true} onClick={() => navigate('/create-trip')} />
          </div>
        </section>
      </main>
    </div>
  );
}
