import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../services/trips.api.js';
import Navbar from '../components/common/Navbar';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('Autumn in Kyoto');
  const [startDate, setStartDate] = useState('2024-10-12');
  const [endDate, setEndDate] = useState('2024-10-25');
  const [description, setDescription] = useState('Exploring culinary markets, historic temples, and scenic gardens.');
  const [coverPhoto, setCoverPhoto] = useState('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800');
  const [showCustomCityInput, setShowCustomCityInput] = useState(false);
  const [customCityText, setCustomCityText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cities, setCities] = useState([
    { name: 'Tokyo', added: true },
    { name: 'Kyoto', added: true },
    { name: 'Osaka', added: true },
    { name: 'Nara', added: false },
    { name: 'Hakone', added: false }
  ]);

  const toggleCity = (index) => {
    const newCities = [...cities];
    newCities[index].added = !newCities[index].added;
    setCities(newCities);
  };

  const handleAddCustomCity = (e) => {
    e.preventDefault();
    if (!customCityText.trim()) return;
    setCities(prev => [...prev, { name: customCityText.trim(), added: true }]);
    setCustomCityText('');
    setShowCustomCityInput(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPhoto(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const addedCities = cities.filter(c => c.added).map(c => c.name);
    
    try {
      const res = await createTrip({
        title: tripName,
        image: coverPhoto,
        dates: `${startDate} to ${endDate}`,
        cities: addedCities.length > 0 ? addedCities : ['Tokyo', 'Kyoto']
      });
      setIsSubmitting(false);
      navigate(`/trips/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      navigate('/trips');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#fdfbf7] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-blue-50/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-10 py-10 w-full relative">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 pb-24 relative overflow-hidden">
            <h1 className="text-4xl md:text-[42px] font-extrabold text-[var(--primary)] mb-2 tracking-tight">Plan New Trip</h1>
            <p className="text-gray-600 font-medium mb-8">Where is your next adventure taking you?</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Photo Area */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Cover Photo</label>
                <div className="relative group w-full h-44 rounded-2xl overflow-hidden border-2 border-dashed border-[#e6d8d0] bg-[#faf8f5] flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f1ed] transition-colors">
                  {coverPhoto ? (
                    <>
                      <img src={coverPhoto} alt="Cover preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                        <span>Click to Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-[#ebe3dd] rounded-full flex items-center justify-center text-gray-500 mb-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-bold text-[var(--text-main)] text-sm">Upload or choose a cover photo</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Trip Name */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Trip Name</label>
                <input 
                  type="text" 
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g., Autumn in Kyoto" 
                  className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-2">End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's the vibe of this trip?" 
                  rows="3"
                  className="w-full border border-[#e6d8d0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-[#fcfbfa] resize-none"
                ></textarea>
              </div>

              {/* Add starting cities */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-3">Destinations & Cities</label>
                <div className="flex flex-wrap items-center gap-3">
                  {cities.map((city, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => toggleCity(idx)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 transition-all border ${
                        city.added 
                          ? 'bg-[#eef5ef] text-[#2c7a40] border-[#cbe1d0] shadow-sm' 
                          : 'bg-[#f8f6f4] text-[var(--text-main)] border-[#e6d8d0] hover:bg-[#f0ebe7]'
                      }`}
                    >
                      {city.name} {city.added ? '✓' : '+'}
                    </button>
                  ))}

                  {showCustomCityInput ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="City name"
                        value={customCityText}
                        onChange={(e) => setCustomCityText(e.target.value)}
                        className="border border-[var(--primary)] rounded-full px-3 py-1.5 text-xs focus:outline-none bg-white"
                        autoFocus
                      />
                      <button 
                        type="button" 
                        onClick={handleAddCustomCity}
                        className="bg-[var(--primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        Add
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowCustomCityInput(false)}
                        className="text-gray-400 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowCustomCityInput(true)}
                      className="px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 bg-[#f8f6f4] text-gray-600 border border-dashed border-[#d8c9c0] hover:bg-[#f0ebe7]"
                    >
                      <span>+</span> Add Custom City
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-8 flex items-center justify-between border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#b34033] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#9c3226] transition-colors flex items-center gap-2 shadow-md text-sm"
                >
                  {isSubmitting ? 'Creating Itinerary...' : 'Save & Continue to Itinerary'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
