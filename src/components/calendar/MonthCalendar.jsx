import React from 'react';

export default function MonthCalendar() {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Mock days array matching the screenshot exactly
  // { date, isCurrentMonth, city, alert, items }
  const days = [
    { date: 29, isCurrentMonth: false },
    { date: 30, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
    { date: 5, isCurrentMonth: true },
    
    { date: 6, isCurrentMonth: true },
    { date: 7, isCurrentMonth: true },
    { date: 8, isCurrentMonth: true },
    { date: 9, isCurrentMonth: true },
    { date: 10, isCurrentMonth: true },
    { date: 11, isCurrentMonth: true },
    { date: 12, isCurrentMonth: true, city: 'tokyo', items: 1 },
    
    { date: 13, isCurrentMonth: true, city: 'tokyo', items: 3, alert: true, isActive: true },
    { date: 14, isCurrentMonth: true, city: 'tokyo', items: 2 },
    { date: 15, isCurrentMonth: true, city: 'tokyo', items: 4 },
    { date: 16, isCurrentMonth: true, city: 'tokyo' },
    { date: 17, isCurrentMonth: true, city: 'kyoto' },
    { date: 18, isCurrentMonth: true, city: 'kyoto', items: 2 },
    { date: 19, isCurrentMonth: true, city: 'kyoto' },
    
    { date: 20, isCurrentMonth: true, city: 'kyoto' },
    { date: 21, isCurrentMonth: true, city: 'kyoto' },
    { date: 22, isCurrentMonth: true, city: 'osaka' },
    { date: 23, isCurrentMonth: true, city: 'osaka', items: 1 },
    { date: 24, isCurrentMonth: true, city: 'osaka' },
    { date: 25, isCurrentMonth: true, city: 'osaka', items: 3 },
    { date: 26, isCurrentMonth: true, city: 'osaka' },
    
    { date: 27, isCurrentMonth: true },
    { date: 28, isCurrentMonth: true },
    { date: 29, isCurrentMonth: true },
    { date: 30, isCurrentMonth: true },
    { date: 31, isCurrentMonth: true },
    { date: 1, isCurrentMonth: false },
    { date: 2, isCurrentMonth: false },
  ];

  const getDayStyles = (day) => {
    if (!day.isCurrentMonth) {
      return "bg-[#faf9f7] text-gray-300 border border-transparent";
    }

    let styles = "bg-white text-[var(--text-main)] border border-gray-100 hover:shadow-sm";
    
    if (day.city === 'tokyo') {
      styles = "bg-[#edf4f9] text-[#246399] border-[#c0ddef]";
    } else if (day.city === 'kyoto') {
      styles = "bg-[#fdebea] text-[#b34033] border-[#fad5d1]";
    } else if (day.city === 'osaka') {
      styles = "bg-[#eef5ef] text-[#2c7a40] border-[#cbe1d0]";
    }

    if (day.isActive) {
      styles += " shadow-[0_0_0_2px_#bc3e12] z-10"; // Highlight active day in rust
    }
    
    if (day.alert) {
       styles = styles.replace('text-[#246399]', 'text-[#d63b2f]'); // make date text red
    }

    return styles;
  };

  const getBadgeStyle = (city) => {
    if (city === 'tokyo') return "text-[#246399] bg-white";
    if (city === 'kyoto') return "text-[#b34033] bg-white";
    if (city === 'osaka') return "text-[#2c7a40] bg-white";
    return "text-gray-500 bg-gray-100";
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-sm font-bold text-[var(--text-main)]">
        <span>Stops:</span>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#246399]"></span> Tokyo</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b34033]"></span> Kyoto</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2c7a40]"></span> Osaka</div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-2 md:gap-3 mb-3">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-[10px] md:text-xs font-bold text-gray-500 tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-xl md:rounded-2xl h-16 md:h-24 p-2 md:p-3 flex flex-col justify-between transition-colors cursor-pointer ${getDayStyles(day)}`}
          >
            <span className="font-bold text-sm md:text-base">{day.date}</span>
            
            {day.items > 0 && (
              <span className={`self-start text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full ${getBadgeStyle(day.city)}`}>
                {day.items} item{day.items > 1 ? 's' : ''}
              </span>
            )}

            {day.alert && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#d63b2f] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm z-20">
                !
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

