import React, { useState, useEffect } from 'react';
import { getUpcomingTrips } from '../services/trips.api.js';

import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SearchFilters from '../components/search/SearchFilters';
import TripCard from '../components/trip/TripCard';
import Button from '../components/common/Button';

export default function Dashboard() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpcomingTrips().then(res => {
      setUpcomingTrips(res.data);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load trips. Please try again.");
      setIsLoading(false);
    });
  }, []);

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
          <Link to="/create-trip">
            <Button className="w-full md:w-auto shadow-md">
              Plan New Trip
            </Button>
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchFilters />
        </div>

        {/* Upcoming Trips Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Your Upcoming Trips</h2>
            <button className="text-[var(--primary)] font-bold text-sm hover:underline">
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
            ) : upcomingTrips.length === 0 ? (
               <div className="w-full py-12 text-center text-gray-500">No trips found. <Link to="/create-trip" className="text-[var(--primary)] hover:underline">Start a new one!</Link></div>
            ) : (
               upcomingTrips.map((trip) => (
              <TripCard 
                key={trip.id}
                title={trip.title}
                image={trip.image}
                badgeText={trip.badgeText}
                badgeColor={trip.badgeColor}
                dates={trip.dates}
                onClick={() => window.location.href = '/trips'}
              />
            ))}
            <TripCard isNew={true} onClick={() => window.location.href = '/create-trip'} />
          </div>
        </section>
      </main>
    </div>
  );
}

