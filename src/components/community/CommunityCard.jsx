import React from 'react';

export default function CommunityCard({ image, tags = [], title, authorName, authorAvatar, likes, isLiked = false }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col mb-6 cursor-pointer hover:shadow-md transition-shadow group">
      {/* Image Container */}
      <div className="relative h-[220px] sm:h-[260px] w-full bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Heart Icon (Like) */}
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, i) => (
            <span key={i} className="bg-[#e8f1ec] text-[#2c7a40] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg md:text-xl text-[var(--text-main)] mb-4 leading-snug">
          {title}
        </h3>

        {/* Author Footer */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--text-main)]">{authorName}</span>
            <span className="text-[10px] text-gray-500 font-medium">{likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

