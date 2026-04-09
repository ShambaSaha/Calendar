import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarHeader({ view, setView, monthName, year, darkMode, onPaginate }) {
  const viewOptions = ['MONTH', 'WEEK', 'DAY'];

  return (
    <div className="relative z-10 flex flex-col gap-4 mb-8 pt-6">
      <div className="flex justify-between items-baseline">
        <h2 className={`text-[90px] font-black tracking-tighter leading-none uppercase transition-colors ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
          {monthName}
        </h2>
        <span className={`text-3xl font-black transition-colors ${darkMode ? 'text-white/10' : 'text-white/30'}`}>
          {year}
        </span>
      </div>

      <div className="flex justify-between items-center">
        {/* View Switcher */}
        <div className={`flex backdrop-blur-2xl p-1.5 rounded-[20px] shadow-xl w-fit border transition-colors ${darkMode ? 'bg-black/60 border-white/10' : 'bg-white/90 border-white'}`}>
          {viewOptions.map((v) => (
            <button 
              key={v} 
              onClick={() => setView(v.toLowerCase())}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${view === v.toLowerCase() ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') : 'text-gray-400 hover:text-gray-200'}`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button onClick={() => onPaginate(-1)} className={`p-4 rounded-full shadow-lg ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-black'}`}>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={() => onPaginate(1)} className={`p-4 rounded-full shadow-lg ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-black'}`}>
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
}