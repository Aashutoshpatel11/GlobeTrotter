import React, { useState, useEffect } from 'react';
import { getCommunityPosts } from '../services/community.api.js';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CommunityCard from '../components/community/CommunityCard';
import ChallengeCard from '../components/community/ChallengeCard';

export default function CommunityHub() {
  const [activeFilter, setActiveFilter] = useState('All Trips');
  const filters = ['All Trips', 'Backpacking', 'Luxury', 'Foodie'];

  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600', // Japan fallback
      tags: ['Japan', 'Foodie'],
      title: '10 Days Culinary Journey through Kansai',
      authorName: 'Sarah Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      likes: '2.4k',
      isLiked: false
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&q=80&w=600', // Fjord fallback
      tags: ['Norway', 'Nature'],
      title: 'Fjord Hiking Adventure & Wild Camping',
      authorName: 'Lars Petersen',
      authorAvatar: 'https://i.pravatar.cc/150?img=11',
      likes: '8.1k',
      isLiked: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=600', // Morocco fallback
      tags: ['Morocco', 'Culture', 'Solo'],
      title: 'Lost in the Medinas: A Solo Guide',
      authorName: 'Elena Rivera',
      authorAvatar: 'https://i.pravatar.cc/150?img=9',
      likes: '1.2k',
      isLiked: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600', // Highway fallback
      tags: ['USA', 'Roadtrip'],
      title: 'Pacific Coast Highway: The Ultimate Itinerary',
      authorName: 'The Nomads',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: '4.5k',
      isLiked: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-12 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-3 tracking-tight">Traveler Community</h1>
          <p className="text-gray-600 text-[15px] max-w-lg leading-relaxed">
            Discover itineraries crafted by fellow explorers. Get inspired for your next journey.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#f4f3ec] rounded-2xl p-3 flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full lg:max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search destinations, tags..." 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${
                  activeFilter === filter 
                    ? 'bg-[var(--primary)] text-white border-transparent' 
                    : 'bg-white text-[var(--text-main)] border border-gray-200 hover:border-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap bg-white text-[var(--text-main)] border border-gray-200 hover:border-gray-300 flex items-center gap-1.5 ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {/* Column 1 Item */}
          <div className="break-inside-avoid">
            <CommunityCard {...posts[0]} />
          </div>

          {/* Column 2 Items */}
          <div className="break-inside-avoid">
            <CommunityCard {...posts[1]} />
          </div>
          <div className="break-inside-avoid">
            <CommunityCard {...posts[2]} />
          </div>

          {/* Column 3 Items */}
          <div className="break-inside-avoid">
            <ChallengeCard />
          </div>
          <div className="break-inside-avoid">
            <CommunityCard {...posts[3]} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

