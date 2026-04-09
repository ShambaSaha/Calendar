import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarHeader({ view, setView, monthName, year, darkMode, onPaginate }) {
  return (
    <div className="flex flex-col gap-4 mb-6 md:mb-12 relative z-10">
      
      {/* Top Row: Toggles and Pagination */}
      <div className="flex justify-between items-center w-full">
        {/* View Toggles */}
        <div className={`flex p-1 rounded-[20px] backdrop-blur-md border ${
          darkMode ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white'
        }`}>
          {["month", "week", "day"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-2 md:px-6 md:py-2.5 rounded-[15px] text-[10px] font-black uppercase tracking-widest transition-all ${
                view === v
                  ? (darkMode ? "bg-white text-black" : "bg-black text-white")
                  : (darkMode ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-black")
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => onPaginate(-1)}
            className={`rounded-full transition-all shadow-lg active:scale-90 ${
              darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-black hover:shadow-xl'
            } p-2 md:p-4`}
          >
            <ChevronLeft size={18} className="md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={() => onPaginate(1)}
            className={`rounded-full transition-all shadow-lg active:scale-90 ${
              darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-black hover:shadow-xl'
            } p-2 md:p-4`}
          >
            <ChevronRight size={18} className="md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Row (Header Info): Month on Left, Year on Right */}
      <div className="flex justify-between items-baseline w-full border-t border-white/10 pt-4 md:border-none md:pt-0">
        <h2 className={`text-[90px] font-black tracking-tighter leading-none uppercase transition-colors ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
          {monthName}
        </h2>
        <span className={`text-3xl font-black transition-colors ${darkMode ? 'text-white/10' : 'text-white/30'}`}>
          {year}
        </span>
      </div>
    </div>
  );
}