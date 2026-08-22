const MOCK_DELAY = 500;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

const mockPosts = [
  {
    id: 1,
    type: 'post',
    author: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=47',
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600',
    location: 'Tokyo, Japan',
    likes: 234,
    comments: 18,
    isLiked: true,
    caption: 'Finally made it to Tokyo! The night markets are absolutely incredible. 🍜🗼',
    timeAgo: '2h ago'
  },
  {
    id: 2,
    type: 'post',
    author: 'Marcus Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=11',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600',
    location: 'Paris, France',
    likes: 156,
    comments: 12,
    isLiked: false,
    caption: 'Sunrise at the Eiffel Tower. Waking up at 5am was totally worth it. ☕️🥐',
    timeAgo: '5h ago'
  },
  {
    id: 3,
    type: 'challenge',
    title: 'Hidden Gems Challenge',
    participants: 1250,
    desc: 'Share your favorite off-the-beaten-path discovery this week!',
    timeLeft: '2 days left'
  },
  {
    id: 4,
    type: 'post',
    author: 'Elena Ivanova',
    avatar: 'https://i.pravatar.cc/150?img=32',
    image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&q=80&w=600',
    location: 'Amalfi Coast, Italy',
    likes: 892,
    comments: 45,
    isLiked: false,
    caption: 'Endless blue waters and lemon groves. Summer in Italy is unmatched! 🍋🌊',
    timeAgo: '1d ago'
  },
  {
    id: 5,
    type: 'post',
    author: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=60',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
    location: 'Kyoto, Japan',
    likes: 342,
    comments: 28,
    isLiked: true,
    caption: 'Autumn colors in full bloom at the temples. Nature\'s painting. 🍁⛩️',
    timeAgo: '2d ago'
  }
];

export const getCommunityPosts = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockPosts }), MOCK_DELAY);
    });
  }
  return { data: [] };
};

