import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SearchFilters from '../components/search/SearchFilters';
import TripCard from '../components/trip/TripCard';
import Button from '../components/common/Button';

export default function Dashboard() {
  const upcomingTrips = [
    {
      id: 1,
      title: 'Amalfi Coast',
      image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&q=80&w=400',
      badgeText: 'In 12 days',
      badgeColor: 'green',
      dates: 'Sep 14 - Sep 21',
    },
    {
      id: 2,
      title: 'Kyoto Autumn',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400',
      badgeText: 'Nov 3',
      badgeColor: 'blue',
      dates: 'Nov 03 - Nov 15',
    }
  ];

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
          <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {upcomingTrips.map((trip) => (
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

