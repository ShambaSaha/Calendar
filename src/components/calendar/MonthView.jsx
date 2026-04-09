import React from "react";
import { WEEKDAYS, HOLIDAYS_2026 } from "@/constants/calendar";

export default function MonthView({ 
  days, year, monthIdx, darkMode, 
  rangeStart, rangeEnd, setRangeStart, 
  setRangeEnd, notes, getFormattedDate 
}) {
  const today = new Date();

  const handleDateClick = (date) => {
    if (rangeStart && date.toDateString() === rangeStart.toDateString() && !rangeEnd) {
      setRangeStart(null); setRangeEnd(null);
    } else if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date); setRangeEnd(null);
    } else {
      date < rangeStart ? setRangeStart(date) : setRangeEnd(date);
    }
  };

  const getRangeStatus = (date) => {
    if (!rangeStart) return "none";
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const start = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate()).getTime();
    if (!rangeEnd) return d === start ? "anchor" : "none";
    const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate()).getTime();
    return (d === start || d === end) ? "anchor" : (d > start && d < end) ? "between" : "none";
  };

  return (
    <div className="h-full flex flex-col pb-6">
      <div className="grid grid-cols-7 flex-1 text-center items-center overflow-y-auto custom-scrollbar">
        {WEEKDAYS.map((d) => (
          <span key={d} className={`text-[10px] font-black mb-2 tracking-widest uppercase ${darkMode ? 'text-white/20' : 'text-black/40'}`}>{d}</span>
        ))}
        
        {days.map((item, i) => {
          const dateObj = new Date(year, monthIdx, item.d);
          const dateKey = getFormattedDate(dateObj);
          const isToday = item.current && dateObj.toDateString() === today.toDateString();
          const holidayName = HOLIDAYS_2026[dateKey];
          const status = item.current ? getRangeStatus(dateObj) : "none";
          
          return (
            <div 
              key={i} 
              onClick={() => item.current && handleDateClick(dateObj)}
              className={`h-12 flex flex-col items-center justify-center text-xl font-black transition-all cursor-pointer relative rounded-2xl
                ${!item.current ? (darkMode ? 'text-white/5' : 'text-black/5') : (darkMode ? 'text-white' : 'text-black')}
                ${status === 'anchor' ? (darkMode ? 'bg-[#3b82f6]/20 text-[#60a5fa] border border-[#60a5fa]/50 scale-110 z-20 shadow-lg' : 'bg-black text-white scale-110 z-20 shadow-lg') : ''}
                ${status === 'between' ? (darkMode ? 'bg-white/10 text-blue-400' : 'bg-indigo-500/10 text-indigo-600') : ''}
                ${status === 'none' && item.current ? (darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100') : ''}
              `}
            >
              {item.d}

              {/* 1. Holiday Pointer (Top Left) */}
              {holidayName && item.current && (
                <div className={`absolute top-2 left-4 w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`} />
              )}

              {/* 2. Today Pointer (Bottom Center) */}
              {isToday && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
              )}

              {/* 3. Note Pointer (Top Right) */}
              {notes[dateKey]?.length > 0 && item.current && (
                <div className={`absolute top-2 right-4 w-1 h-1 rounded-full ${status === 'anchor' ? 'bg-red-400' : 'bg-red-500'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}