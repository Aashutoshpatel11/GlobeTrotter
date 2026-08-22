import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTripDetails } from '../services/trips.api.js';
import Navbar from '../components/common/Navbar';
import ItineraryStop from '../components/trip/ItineraryStop';
import ActivityRow from '../components/trip/ActivityRow';
import TripSummary from '../components/trip/TripSummary';

export default function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openStops, setOpenStops] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCityDates, setNewCityDates] = useState('');
  const [extraStops, setExtraStops] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTripDetails(id).then(res => {
      if (res.data) {
        setTrip(res.data);
        // default first stop open
        if (res.data.stops && res.data.stops.length > 0) {
          setOpenStops({ [res.data.stops[0].city.toLowerCase()]: true });
        }
      }
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, [id]);

  const toggleStop = (stopKey) => {
    setOpenStops(prev => ({ ...prev, [stopKey]: !prev[stopKey] }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Shareable trip link copied to clipboard! 📋");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddStop = (e) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    const newStop = {
      id: Date.now(),
      city: newCityName.trim(),
      dates: newCityDates.trim() || 'Upcoming',
      duration: '3 Days',
      cost: '$500',
      activities: [
        { time: '10:00 AM', title: `Explore ${newCityName.trim()}`, subtitle: `City Center`, tag: 'Sightseeing', tagColor: 'green', cost: 'Free' }
      ]
    };
    setExtraStops(prev => [...prev, newStop]);
    setOpenStops(prev => ({ ...prev, [newStop.city.toLowerCase()]: true }));
    setNewCityName('');
    setNewCityDates('');
    setShowAddStopModal(false);
    showToast(`Added stop for ${newStop.city}! 🎌`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfaf8] flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 w-full animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 rounded-3xl w-full"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 h-96 bg-gray-200 rounded-3xl"></div>
            <div className="col-span-1 h-96 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentTrip = trip || {
    title: 'Japan Explorer',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
    flag: '🇯🇵',
    dates: 'Oct 12 - Oct 25 • 14 Days',
    stops: []
  };

  const allStops = [...(currentTrip.stops || []), ...extraStops];

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col">
      <Navbar />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white text-xs font-bold ml-2">✕</button>
        </div>
      )}

      {/* Add Stop Modal */}
      {showAddStopModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">Add Another Destination</h3>
            <p className="text-xs text-gray-500 mb-6">Extend your journey with another city stop.</p>
            <form onSubmit={handleAddStop} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City / Region Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hiroshima, Nara, Hakone" 
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Dates</label>
                <input 
                  type="text" 
                  placeholder="e.g. Oct 26 - Oct 29" 
                  value={newCityDates}
                  onChange={(e) => setNewCityDates(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddStopModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] shadow-sm"
                >
                  Add Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 pt-6 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Itinerary) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden h-[260px] md:h-[300px] shadow-sm group">
              <img 
                src={currentTrip.image} 
                alt={currentTrip.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 w-max flex items-center gap-2 mb-3">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{currentTrip.badgeText || 'Active Journey'}</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight flex items-center gap-3">
                  {currentTrip.title} <span>{currentTrip.flag || '✈️'}</span>
                </h1>
                <p className="text-sm font-semibold opacity-90">{currentTrip.dates}</p>
                
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    title="Share trip"
                    className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 shadow-sm transition-transform active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  </button>
                  <button 
                    onClick={() => navigate('/create-trip')}
                    className="bg-[var(--primary)] text-white font-bold py-2.5 px-5 rounded-full hover:bg-[var(--primary-hover)] transition-colors shadow-sm flex items-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    Edit Trip
                  </button>
                </div>
              </div>
            </div>

            {/* Itinerary List */}
            <div className="pt-4 pl-2">
              {allStops.map((stop, idx) => {
                const stopKey = stop.city.toLowerCase();
                const isOpen = !!openStops[stopKey];
                const isLast = idx === allStops.length - 1;

                return (
                  <div key={idx} onClick={() => toggleStop(stopKey)}>
                    <ItineraryStop 
                      city={stop.city} 
                      dates={stop.dates} 
                      duration={stop.duration} 
                      cost={stop.cost} 
                      isOpen={isOpen} 
                      isLast={isLast}
                      icon={
                        <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      }
                    >
                      {stop.activities && stop.activities.map((act, actIdx) => (
                        <ActivityRow 
                          key={actIdx}
                          time={act.time} 
                          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>}
                          title={act.title} 
                          subtitle={act.subtitle} 
                          tag={act.tag} 
                          tagColor={act.tagColor || 'blue'} 
                          cost={act.cost} 
                        />
                      ))}
                    </ItineraryStop>
                  </div>
                );
              })}

              <button 
                onClick={() => setShowAddStopModal(true)}
                className="w-full mt-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] text-[var(--text-main)] font-bold text-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="text-[var(--primary)] text-lg">+</span> Add Another Stop
              </button>
            </div>
            
            <div className="text-center pt-8">
              <p className="text-gray-400 italic text-sm relative inline-block">
                <svg className="absolute -left-8 top-1 w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Your adventure starts here ✨
              </p>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1 space-y-6">
            <TripSummary />

            {/* Your Route */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <h3 className="font-bold text-[var(--text-main)] mb-4">Your Route</h3>
              <div className="w-full h-40 bg-blue-50/50 rounded-2xl overflow-hidden relative border border-gray-100">
                <div className="absolute inset-0 bg-[#eef5f9] flex items-center justify-center">
                  <div className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Interactive Map</div>
                  <div className="absolute top-1/3 right-1/4 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-md animate-bounce"></div>
                  <div className="absolute top-1/2 right-1/2 w-3.5 h-3.5 bg-purple-500 rounded-full border-2 border-white shadow-md"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  <svg className="absolute inset-0 w-full h-full text-gray-300" preserveAspectRatio="none"><path d="M 75% 33% Q 50% 50% 25% 75%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none"/></svg>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 text-xs font-semibold text-gray-600">
                <span>{allStops.map(s => s.city).join(' → ') || 'Route map'}</span>
              </div>
            </div>

            {/* Need Suggestions */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
              <div className="relative z-10 w-2/3">
                <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                  <span className="text-orange-400">✨</span> Need Suggestions?
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Discover curated activities, tours, and culinary gems for this trip.
                </p>
                <button 
                  onClick={() => navigate('/explore')}
                  className="bg-purple-100 text-purple-700 font-bold text-xs px-4 py-2.5 rounded-full hover:bg-purple-200 transition-colors shadow-sm"
                >
                  Explore Activities →
                </button>
              </div>
              
              <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-80 pointer-events-none">
                <div className="w-24 h-24 bg-orange-200 rounded-2xl absolute bottom-10 right-10 rotate-12 flex items-center justify-center text-orange-600 font-bold text-2xl shadow-sm">🎒</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
