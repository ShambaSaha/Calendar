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

      {/* Bottom Row: Month and Year */}
      {/* FIX: Use flex-col on mobile to prevent year and month from fighting for space */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline w-full pt-4 md:pt-0">
        
        {/* FIX: Month name uses viewport width (vw) so it never overflows its container */}
        <h2 className={`text-[12vw] md:text-[90px] font-black tracking-tighter leading-[0.85] uppercase transition-all ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          {monthName}
        </h2>

        {/* FIX: Adjusted year visibility and positioning for mobile */}
        <span className={`text-4xl md:text-3xl font-black transition-colors self-end md:self-auto ${
          darkMode ? 'text-white/20' : 'text-black/10'
        }`}>
          {year}
        </span>
      </div>
    </div>
  );
}