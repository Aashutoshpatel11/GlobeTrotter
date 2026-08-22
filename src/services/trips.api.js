const MOCK_DELAY = 150;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const STORAGE_KEY = 'globetrotter_trips';

const defaultTrips = [
  {
    id: 1,
    title: 'Japan Explorer',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    badgeText: 'Upcoming',
    badgeColor: 'green',
    dates: 'Oct 12 - Oct 25',
    flag: '🇯🇵',
    cities: ['Tokyo', 'Kyoto', 'Osaka'],
    totalBudget: '$2,650',
    stops: [
      {
        city: 'Tokyo',
        dates: 'Oct 12 - Oct 16',
        duration: '5 Days',
        cost: '$1,200',
        activities: [
          { time: '10:00 AM', title: 'Sushi Dai', subtitle: 'Tsukiji Outer Market, Tokyo', tag: 'Food', tagColor: 'blue', cost: '$80' },
          { time: '1:00 PM', title: 'Shinjuku Gyoen National Garden', subtitle: 'Shinjuku, Tokyo', tag: 'Sightseeing', tagColor: 'green', cost: '$5' }
        ]
      },
      {
        city: 'Kyoto',
        dates: 'Oct 17 - Oct 20',
        duration: '4 Days',
        cost: '$800',
        activities: [
          { time: '09:00 AM', title: 'Fushimi Inari Shrine', subtitle: 'Fushimi Ward, Kyoto', tag: 'Culture', tagColor: 'purple', cost: 'Free' },
          { time: '02:00 PM', title: 'Arashiyama Bamboo Grove', subtitle: 'Ukyo Ward, Kyoto', tag: 'Nature', tagColor: 'green', cost: 'Free' }
        ]
      },
      {
        city: 'Osaka',
        dates: 'Oct 21 - Oct 25',
        duration: '5 Days',
        cost: '$650',
        activities: [
          { time: '06:00 PM', title: 'Dotonbori Street Food Walk', subtitle: 'Namba, Osaka', tag: 'Food', tagColor: 'blue', cost: '$45' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Amalfi Coast',
    image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&q=80&w=800',
    badgeText: 'In 12 days',
    badgeColor: 'green',
    dates: 'Sep 14 - Sep 21',
    flag: '🇮🇹',
    cities: ['Positano', 'Capri', 'Amalfi'],
    totalBudget: '$3,100',
    stops: [
      {
        city: 'Positano',
        dates: 'Sep 14 - Sep 17',
        duration: '3 Days',
        cost: '$1,500',
        activities: [
          { time: '11:00 AM', title: 'Path of the Gods Cliff Walk', subtitle: 'Positano, Italy', tag: 'Nature', tagColor: 'green', cost: 'Free' },
          { time: '07:30 PM', title: 'Seaside Seafood Dinner', subtitle: 'Spiaggia Grande, Positano', tag: 'Food', tagColor: 'blue', cost: '$120' }
        ]
      },
      {
        city: 'Capri',
        dates: 'Sep 18 - Sep 21',
        duration: '3 Days',
        cost: '$1,600',
        activities: [
          { time: '09:00 AM', title: 'Blue Grotto Boat Tour', subtitle: 'Capri Island', tag: 'Adventure', tagColor: 'blue', cost: '$65' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Kyoto Autumn',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
    badgeText: 'Nov 3',
    badgeColor: 'blue',
    dates: 'Nov 03 - Nov 15',
    flag: '🍁',
    cities: ['Kyoto', 'Nara'],
    totalBudget: '$2,200',
    stops: [
      {
        city: 'Kyoto',
        dates: 'Nov 03 - Nov 10',
        duration: '7 Days',
        cost: '$1,400',
        activities: [
          { time: '08:00 AM', title: 'Golden Pavilion (Kinkaku-ji)', subtitle: 'Kita Ward, Kyoto', tag: 'Culture', tagColor: 'purple', cost: '$5' }
        ]
      }
    ]
  }
];

const getStoredTrips = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read from localStorage", e);
  }
  return defaultTrips;
};

const saveStoredTrips = (trips) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
};

export const getUpcomingTrips = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      const trips = getStoredTrips();
      setTimeout(() => resolve({ data: trips }), MOCK_DELAY);
    });
  }
  return { data: [] };
};

export const getTripDetails = async (id) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      const trips = getStoredTrips();
      const numId = id ? parseInt(id, 10) : 1;
      const found = trips.find(t => t.id === numId) || trips[0];
      setTimeout(() => resolve({ data: found }), MOCK_DELAY);
    });
  }
  return { data: null };
};

export const createTrip = async (tripData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      const trips = getStoredTrips();
      const newTrip = {
        id: Date.now(),
        title: tripData.title || 'New Adventure',
        image: tripData.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
        badgeText: 'New',
        badgeColor: 'green',
        dates: tripData.dates || 'Upcoming',
        flag: '✈️',
        cities: tripData.cities || ['Destination'],
        totalBudget: tripData.totalBudget || '$1,500',
        stops: (tripData.cities || ['Destination']).map((c, i) => ({
          city: c,
          dates: 'Day ' + (i * 3 + 1) + ' - Day ' + (i * 3 + 3),
          duration: '3 Days',
          cost: '$500',
          activities: [
            { time: '10:00 AM', title: `${c} City Center Exploration`, subtitle: `Center of ${c}`, tag: 'Sightseeing', tagColor: 'green', cost: 'Free' }
          ]
        }))
      };
      const updated = [newTrip, ...trips];
      saveStoredTrips(updated);
      setTimeout(() => resolve({ data: newTrip }), MOCK_DELAY);
    });
  }
  return { data: tripData };
};
