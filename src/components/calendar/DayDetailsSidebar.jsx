import React, { useState } from 'react';

const dayDataMap = {
  12: {
    city: 'Tokyo',
    dayIndex: 1,
    weekday: 'Sat',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Arrival at Narita Airport', time: '02:00 PM', cost: '$30', icon: 'plane' },
      { id: 2, name: 'Check-in at Shinjuku Hotel', time: '05:00 PM', cost: '$180', icon: 'hotel' }
    ],
    total: 210,
    isOverBudget: false
  },
  13: {
    city: 'Tokyo',
    dayIndex: 2,
    weekday: 'Sun',
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Tsukiji Outer Market Tour', time: '09:00 AM', cost: '$45', icon: 'food' },
      { id: 2, name: 'Ginza Luxury Shopping', time: '01:00 PM', cost: '$300', icon: 'shop', alert: true },
      { id: 3, name: 'Roppongi Hills Sunset View', time: '06:00 PM', cost: '$25', icon: 'sight' }
    ],
    total: 370,
    isOverBudget: true
  },
  14: {
    city: 'Tokyo',
    dayIndex: 3,
    weekday: 'Mon',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Senso-ji Temple & Asakusa', time: '10:00 AM', cost: '$15', icon: 'culture' },
      { id: 2, name: 'Akihabara Tech & Anime', time: '03:00 PM', cost: '$60', icon: 'shop' }
    ],
    total: 75,
    isOverBudget: false
  },
  17: {
    city: 'Kyoto',
    dayIndex: 6,
    weekday: 'Thu',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Bullet Train to Kyoto (Shinkansen)', time: '09:30 AM', cost: '$130', icon: 'train' },
      { id: 2, name: 'Gion Evening Geisha District Walk', time: '06:00 PM', cost: '$40', icon: 'culture' }
    ],
    total: 170,
    isOverBudget: false
  },
  18: {
    city: 'Kyoto',
    dayIndex: 7,
    weekday: 'Fri',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Fushimi Inari 10,000 Torii Gates', time: '07:00 AM', cost: '$0', icon: 'nature' },
      { id: 2, name: 'Kinkaku-ji Golden Pavilion', time: '11:30 AM', cost: '$5', icon: 'culture' },
      { id: 3, name: 'Traditional Tea Ceremony Experience', time: '03:00 PM', cost: '$65', icon: 'food' }
    ],
    total: 70,
    isOverBudget: false
  },
  23: {
    city: 'Osaka',
    dayIndex: 12,
    weekday: 'Wed',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Osaka Castle & Park Gardens', time: '10:00 AM', cost: '$10', icon: 'sight' },
      { id: 2, name: 'Dotonbori Street Food Feast', time: '07:00 PM', cost: '$55', icon: 'food' }
    ],
    total: 65,
    isOverBudget: false
  }
};

export default function DayDetailsSidebar({ selectedDate = 13, city = 'tokyo' }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCost, setNewCost] = useState('');
  const [customActivities, setCustomActivities] = useState({});

  const dayInfo = dayDataMap[selectedDate] || {
    city: city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Travel Day',
    dayIndex: selectedDate > 12 && selectedDate <= 25 ? selectedDate - 11 : 1,
    weekday: 'Day',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
    activities: [
      { id: 1, name: 'Free Exploration & Leisure', time: '11:00 AM', cost: '$25', icon: 'sight' }
    ],
    total: 25,
    isOverBudget: false
  };

  const currentCustom = customActivities[selectedDate] || [];
  const allActivities = [...dayInfo.activities, ...currentCustom];
  const customSum = currentCustom.reduce((sum, item) => sum + (parseInt(item.cost.replace(/[^0-9]/g, '') || 0, 10)), 0);
  const finalTotal = dayInfo.total + customSum;

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newTitle.trim(),
      time: '04:00 PM',
      cost: newCost ? `$${newCost.replace('$', '')}` : '$30',
      icon: 'sight'
    };
    setCustomActivities(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newItem]
    }));
    setNewTitle('');
    setNewCost('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
      {/* Header Image Area */}
      <div className="h-36 bg-gray-200 relative overflow-hidden">
        <img 
          src={dayInfo.image} 
          alt={dayInfo.city} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
        <div className="absolute bottom-4 left-5 right-5 text-white flex justify-between items-end">
          <div>
            <h3 className="font-extrabold text-xl mb-0.5">{dayInfo.weekday}, Oct {selectedDate}</h3>
            <p className="text-xs font-semibold opacity-90">{dayInfo.city} • Day {dayInfo.dayIndex}</p>
          </div>
          {dayInfo.isOverBudget && (
            <span className="bg-red-500/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full">
              Over Budget
            </span>
          )}
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4 flex-1 flex flex-col gap-3 max-h-[380px] overflow-y-auto">
        {allActivities.map((act) => (
          <div 
            key={act.id} 
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
              act.alert 
                ? 'border-red-200 bg-[#fff5f5]' 
                : 'border-gray-100 bg-[#fbfbfb] hover:border-gray-200'
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
              act.alert ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {act.alert ? '⚠️' : '📍'}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-[var(--text-main)] truncate">{act.name}</h4>
              <p className="text-[11px] text-gray-500 font-semibold">{act.time}</p>
            </div>
            <div className={`font-bold text-xs ${act.alert ? 'text-red-600' : 'text-[var(--text-main)]'}`}>
              {act.cost}
            </div>
          </div>
        ))}

        {showAddForm ? (
          <form onSubmit={handleAddActivity} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 mt-2">
            <input 
              type="text" 
              placeholder="Activity name (e.g. Ramen dinner)" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--primary)]"
              autoFocus
            />
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Cost $" 
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                className="w-24 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--primary)]"
              />
              <button 
                type="submit" 
                className="flex-1 bg-[var(--primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--primary-hover)]"
              >
                Add
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-3 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-xl"
              >
                ✕
              </button>
            </div>
          </form>
        ) : null}
      </div>

      {/* Footer Total */}
      <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-[#fdfbf7]">
        <div className="font-bold text-xs md:text-sm">
          <span className="text-gray-500">Daily Total: </span>
          <span className={dayInfo.isOverBudget ? "text-[#d63b2f]" : "text-[var(--primary)]"}>
            ${finalTotal}
          </span>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          title="Add activity to this day"
          className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
        </button>
      </div>
    </div>
  );
}
