import React from 'react';

export default function BudgetOverview() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-24">
      <h3 className="font-bold text-[var(--text-main)] mb-6">Budget Overview</h3>
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Total Spent</p>
          <span className="text-3xl font-extrabold text-[var(--primary)]">$3,240</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Remaining</p>
          <span className="text-xl font-bold text-[#2c7a40]">$1,260</span>
        </div>
      </div>

      <div className="w-full h-2 bg-[#eef5ef] rounded-full overflow-hidden mb-2 relative">
        <div className="absolute top-0 left-0 h-full bg-[var(--primary)] rounded-full w-[72%]"></div>
      </div>
      
      <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-8">
        <span>Target: $4,500</span>
        <span>72% Used</span>
      </div>

      <h4 className="font-bold text-xs text-[var(--text-main)] mb-4">Category Breakdown</h4>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span> Flights & Transport</div>
          <span className="text-[var(--text-main)]">$1,400</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Accommodation</div>
          <span className="text-[var(--text-main)]">$1,100</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Activities</div>
          <span className="text-[var(--text-main)]">$340</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-[#d63b2f]"><span className="w-2.5 h-2.5 rounded-full bg-[#d63b2f]"></span> Meals (Over)</div>
          <span className="text-[#d63b2f] line-through decoration-1">$320</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-400"><span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span> Misc</div>
          <span className="text-[var(--text-main)]">$80</span>
        </div>
      </div>

      <h4 className="font-bold text-xs text-[var(--text-main)] mb-4">Daily Average</h4>
      <div className="flex items-end gap-1 h-16 mb-2 border-b border-gray-100 pb-1">
        <div className="flex-1 bg-[var(--primary)]/60 rounded-t-sm h-[40%]"></div>
        <div className="flex-1 bg-[#d63b2f] rounded-t-sm h-[100%]"></div>
        <div className="flex-1 bg-[var(--primary)] rounded-t-sm h-[70%]"></div>
        <div className="flex-1 bg-[var(--primary)]/40 rounded-t-sm h-[30%]"></div>
        <div className="flex-1 bg-[var(--primary)] rounded-t-sm h-[85%]"></div>
      </div>
      <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-6 uppercase tracking-wider">
        <span>Day 1</span>
        <span>Avg: $231/day</span>
        <span>Day 5</span>
      </div>

      <button className="w-full bg-[var(--primary)] text-white font-bold py-3.5 rounded-full hover:bg-[var(--primary-hover)] transition-colors text-sm shadow-sm">
        Add Expense
      </button>
    </div>
  );
}

