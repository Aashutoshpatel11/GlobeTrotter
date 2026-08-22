import React, { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CommunityCard from '../components/community/CommunityCard';
import ChallengeCard from '../components/community/ChallengeCard';

export default function CommunityHub() {
  const [activeFilter, setActiveFilter] = useState('All Trips');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All Trips', 'Foodie', 'Nature', 'Culture', 'Roadtrip', 'Backpacking'];

  const initialPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
      tags: ['Japan', 'Foodie'],
      title: '10 Days Culinary Journey through Kansai',
      authorName: 'Sarah Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      likes: '2.4k',
      isLiked: false
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&q=80&w=600',
      tags: ['Norway', 'Nature', 'Backpacking'],
      title: 'Fjord Hiking Adventure & Wild Camping',
      authorName: 'Lars Petersen',
      authorAvatar: 'https://i.pravatar.cc/150?img=11',
      likes: '8.1k',
      isLiked: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=600',
      tags: ['Morocco', 'Culture', 'Solo'],
      title: 'Lost in the Medinas: A Solo Guide',
      authorName: 'Elena Rivera',
      authorAvatar: 'https://i.pravatar.cc/150?img=9',
      likes: '1.2k',
      isLiked: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
      tags: ['USA', 'Roadtrip'],
      title: 'Pacific Coast Highway: The Ultimate Itinerary',
      authorName: 'The Nomads',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: '4.5k',
      isLiked: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&q=80&w=600',
      tags: ['Italy', 'Foodie', 'Nature'],
      title: 'Coastal Escapes & Hidden Lemon Groves',
      authorName: 'Marco Rossi',
      authorAvatar: 'https://i.pravatar.cc/150?img=33',
      likes: '3.1k',
      isLiked: false
    }
  ];

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      // Filter by tag
      if (activeFilter !== 'All Trips' && !post.tags.includes(activeFilter)) {
        return false;
      }
      // Filter by search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesAuthor = post.authorName.toLowerCase().includes(q);
        const matchesTags = post.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesAuthor && !matchesTags) return false;
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

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
        <div className="bg-[#f4f3ec] rounded-2xl p-3 flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 border border-gray-200/60 shadow-inner">
          <div className="relative w-full lg:max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations, tags (e.g. Japan, Roadtrip)..." 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-white placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold hover:text-gray-600">✕</button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${
                  activeFilter === filter 
                    ? 'bg-[var(--primary)] text-white shadow-sm' 
                    : 'bg-white text-[var(--text-main)] border border-gray-200 hover:border-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-lg mx-auto">
            <p className="text-lg font-bold text-gray-700 mb-2">No community stories found</p>
            <p className="text-sm text-gray-500 mb-4">Try selecting another filter or clearing your search.</p>
            <button onClick={() => { setActiveFilter('All Trips'); setSearchQuery(''); }} className="text-[var(--primary)] font-bold text-sm underline">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Always insert challenge card in feed */}
            <div className="break-inside-avoid">
              <ChallengeCard />
            </div>

            {filteredPosts.map((post) => (
              <div key={post.id} className="break-inside-avoid">
                <CommunityCard {...post} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
