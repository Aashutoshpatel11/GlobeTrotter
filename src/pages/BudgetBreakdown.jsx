import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BudgetOverview from '../components/budget/BudgetOverview';

export default function BudgetBreakdown() {
  const [totalSpent, setTotalSpent] = useState(3240);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('meals');
  const [expenseCity, setExpenseCity] = useState('Tokyo');
  const [toastMessage, setToastMessage] = useState(null);

  const [categoryBreakdown, setCategoryBreakdown] = useState({
    flights: 1400,
    accommodation: 1100,
    activities: 340,
    meals: 320,
    misc: 80
  });

  const [customItems, setCustomItems] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if (!expenseTitle.trim() || isNaN(amt) || amt <= 0) return;

    const newItem = {
      id: Date.now(),
      title: expenseTitle.trim(),
      city: expenseCity,
      category: expenseCategory,
      cost: `$${amt}`,
      time: 'Just now'
    };

    setCustomItems(prev => [newItem, ...prev]);
    setTotalSpent(prev => prev + amt);
    setCategoryBreakdown(prev => ({
      ...prev,
      [expenseCategory]: (prev[expenseCategory] || 0) + amt
    }));

    setExpenseTitle('');
    setExpenseAmount('');
    setShowAddModal(false);
    showToast(`Recorded expense "${newItem.title}" for $${amt}! 💸`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white text-xs font-bold ml-2">✕</button>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">Add New Expense</h3>
            <p className="text-xs text-gray-500 mb-6">Track costs for flights, hotels, meals, or activities.</p>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Expense Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wagyu Beef Dinner, Shinkansen Ticket" 
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)]"
                  autoFocus
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 85" 
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--primary)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                  <select 
                    value={expenseCity} 
                    onChange={(e) => setExpenseCity(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-white"
                  >
                    <option value="Tokyo">Tokyo</option>
                    <option value="Kyoto">Kyoto</option>
                    <option value="Osaka">Osaka</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select 
                  value={expenseCategory} 
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-white"
                >
                  <option value="meals">Meals & Food</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="flights">Flights & Transport</option>
                  <option value="activities">Activities & Sightseeing</option>
                  <option value="misc">Misc & Shopping</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] shadow-sm"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-10 pt-8 pb-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text-main)] mb-1 tracking-tight">Japan Explorer 🇯🇵</h1>
            <p className="text-gray-500 text-xs font-bold">Oct 12 - Oct 25 • 14 Days • 2 Travelers</p>
          </div>
          
          <div className="flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button className="bg-[var(--primary)] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              Timeline / Budget
            </button>
            <Link to="/calendar" className="text-gray-500 hover:text-gray-700 text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Calendar View
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column (Detailed Timeline) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tokyo Section */}
            <div className="relative">
              <div className="absolute left-[3px] top-8 bottom-[-32px] w-px bg-gray-200"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] shrink-0"></div>
                  <h2 className="text-[var(--primary)] font-extrabold text-xl">Tokyo Stop</h2>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                  5 Days • Oct 12-16
                </span>
              </div>

              <div className="ml-5 space-y-6">
                {/* Dynamically added custom expenses in Tokyo */}
                {customItems.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest mb-3">Recently Added Expenses</h3>
                    <div className="space-y-3">
                      {customItems.map((item) => (
                        <div key={item.id} className="bg-white border-2 border-orange-100 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-100 text-[var(--primary)] rounded-xl flex items-center justify-center shrink-0 font-bold text-xs">
                              💸
                            </div>
                            <div>
                              <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">{item.title}</h4>
                              <p className="text-[11px] font-semibold text-gray-500">{item.city} • {item.category}</p>
                            </div>
                          </div>
                          <span className="font-extrabold text-sm text-[var(--primary)]">{item.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Day 1 • Oct 12</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">International Flight Arrival</h4>
                          <p className="text-[11px] font-semibold text-gray-500">Narita Terminal 2 • JL007</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-gray-700">$700</span>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Hotel Groove Shinjuku (4 Nights)</h4>
                          <p className="text-[11px] font-semibold text-gray-500">Standard King Room</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-gray-700">$580</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Day 2 • Oct 13</h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] group hover:border-[var(--primary)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Ginza Shopping & Boutiques</h4>
                          <p className="text-[11px] font-semibold text-red-500">Over Daily Target</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-red-600">$300</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kyoto Section */}
            <div className="relative pt-4">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></div>
                  <h2 className="text-purple-700 font-extrabold text-xl">Kyoto Stop</h2>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                  4 Days • Oct 17-20
                </span>
              </div>
              <div className="ml-5 space-y-3">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[var(--text-main)] mb-0.5">Ryokan Traditional Stay & Onsen</h4>
                      <p className="text-[11px] font-semibold text-gray-500">Gion District • Half Board</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-gray-700">$520</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Budget Overview Card) */}
          <div className="lg:col-span-1">
            <BudgetOverview 
              totalSpent={totalSpent} 
              targetBudget={4500} 
              categoryBreakdown={categoryBreakdown}
              onAddExpense={() => setShowAddModal(true)} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
