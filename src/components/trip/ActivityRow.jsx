import React from 'react';

export default function ActivityRow({ time, icon, title, subtitle, tag, tagColor, cost }) {
  const getIconBg = () => {
    switch(tagColor) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTagStyle = () => {
    switch(tagColor) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="flex items-start py-4 group hover:bg-gray-50/50 rounded-xl transition-colors -mx-2 px-2">
      <div className="w-20 shrink-0 text-xs font-bold text-gray-500 pt-1">
        {time}
      </div>
      
      <div className="flex-1 flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconBg()}`}>
          {icon}
        </div>
        
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h4 className="font-bold text-[var(--text-main)] text-sm">{title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getTagStyle()}`}>
              {tag}
            </span>
            <span className="font-bold text-sm w-12 text-right text-[var(--text-main)]">{cost}</span>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

