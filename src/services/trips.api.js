const MOCK_DELAY = 500;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

const mockTrips = [
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

export const getUpcomingTrips = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockTrips }), MOCK_DELAY);
    });
  }
  // Fake real axios call here for future
  // return axios.get('/api/trips/upcoming');
  return { data: [] };
};

export const getTripDetails = async (id) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockTrips[0] }), MOCK_DELAY);
    });
  }
  return { data: null };
};

