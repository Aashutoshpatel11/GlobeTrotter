import React from 'react';

export default function BudgetOverview({ 
  totalSpent = 3240, 
  targetBudget = 4500, 
  onAddExpense = () => {},
  categoryBreakdown = {
    flights: 1400,
    accommodation: 1100,
    activities: 340,
    meals: 320,
    misc: 80
  }
}) {
  const remaining = Math.max(0, targetBudget - totalSpent);
  const percentUsed = Math.min(100, Math.round((totalSpent / targetBudget) * 100));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-24">
      <h3 className="font-bold text-[var(--text-main)] mb-6">Budget Overview</h3>
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Total Spent</p>
          <span className="text-3xl font-extrabold text-[var(--primary)]">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Remaining</p>
          <span className="text-xl font-bold text-[#2c7a40]">${remaining.toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-[#eef5ef] rounded-full overflow-hidden mb-2 relative">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${percentUsed > 90 ? 'bg-red-500' : 'bg-[var(--primary)]'}`} 
          style={{ width: `${percentUsed}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-8">
        <span>Target: ${targetBudget.toLocaleString()}</span>
        <span>{percentUsed}% Used</span>
      </div>

      <h4 className="font-bold text-xs text-[var(--text-main)] mb-4">Category Breakdown</h4>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span> Flights & Transport</div>
          <span className="text-[var(--text-main)]">${categoryBreakdown.flights.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Accommodation</div>
          <span className="text-[var(--text-main)]">${categoryBreakdown.accommodation.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Activities</div>
          <span className="text-[var(--text-main)]">${categoryBreakdown.activities.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-[#d63b2f]"><span className="w-2.5 h-2.5 rounded-full bg-[#d63b2f]"></span> Meals & Food</div>
          <span className="text-[var(--text-main)]">${categoryBreakdown.meals.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-400"><span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span> Misc & Shopping</div>
          <span className="text-[var(--text-main)]">${categoryBreakdown.misc.toLocaleString()}</span>
        </div>
      </div>

      <h4 className="font-bold text-xs text-[var(--text-main)] mb-4">Daily Spend Trend</h4>
      <div className="flex items-end gap-1.5 h-16 mb-2 border-b border-gray-100 pb-1">
        <div className="flex-1 bg-[var(--primary)]/60 rounded-t-sm h-[40%]" title="Day 1: $120"></div>
        <div className="flex-1 bg-[#d63b2f] rounded-t-sm h-[100%]" title="Day 2: $370 (Over)"></div>
        <div className="flex-1 bg-[var(--primary)] rounded-t-sm h-[70%]" title="Day 3: $210"></div>
        <div className="flex-1 bg-[var(--primary)]/40 rounded-t-sm h-[30%]" title="Day 4: $90"></div>
        <div className="flex-1 bg-[var(--primary)] rounded-t-sm h-[85%]" title="Day 5: $260"></div>
      </div>
      <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-6 uppercase tracking-wider">
        <span>Day 1</span>
        <span>Avg: $231/day</span>
        <span>Day 5</span>
      </div>

      <button 
        onClick={onAddExpense}
        className="w-full bg-[var(--primary)] text-white font-bold py-3.5 rounded-full hover:bg-[var(--primary-hover)] transition-all text-sm shadow-sm active:scale-98"
      >
        + Add Expense
      </button>
    </div>
  );
}
