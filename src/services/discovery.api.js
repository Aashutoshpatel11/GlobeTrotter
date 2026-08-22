const MOCK_DELAY = 500;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

const mockActivities = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600',
    category: 'Food & Drink',
    tagColor: 'text-blue-300',
    title: 'Street Food & Night Market Tour',
    rating: 4.8,
    duration: '3 hrs',
    cost: '$45',
    desc: 'Taste authentic local dishes and explore vibrant night markets with an expert guide.',
    added: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
    category: 'Adventure',
    tagColor: 'text-green-300',
    title: 'Sunrise Peak Guided Hike',
    rating: 4.9,
    duration: '5 hrs',
    cost: '$60',
    desc: 'Experience breathtaking views from the summit with our experienced local mountaineers.',
    added: false
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=600',
    category: 'Culture',
    tagColor: 'text-orange-300',
    title: 'National Museum Fast-Track',
    rating: 4.6,
    duration: '2.5 hrs',
    cost: '$30',
    desc: 'Skip the lines and dive into history with an audio guide covering centuries of art.',
    added: false
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&q=80&w=600',
    category: 'Relaxation',
    tagColor: 'text-blue-300',
    title: 'Thermal Baths & Massage',
    rating: 4.9,
    duration: '4 hrs',
    cost: '$120',
    desc: 'Unwind in historic thermal pools followed by a signature deep tissue massage.',
    added: false
  }
];

export const getActivities = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockActivities }), MOCK_DELAY);
    });
  }
  return { data: [] };
};

