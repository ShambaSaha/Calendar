import React, { useState } from "react";
import { HOURS } from "@/constants/calendar";

export default function DayView({ rangeStart, darkMode, notes, setNotes, getFormattedDate }) {
  const [activeSlot, setActiveSlot] = useState(null);

  const addDayNote = (text, hour) => {
    const key = getFormattedDate(rangeStart);
    const newNotes = { ...notes };
    newNotes[key] = [...(newNotes[key] || []), `[${hour}] ${text}`];
    setNotes(newNotes);
    setActiveSlot(null);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      <div className={`p-4 font-black tracking-widest text-center uppercase text-[11px] sticky top-0 z-20 rounded-xl mb-4 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
        {rangeStart ? rangeStart.toDateString() : "Select a Date"}
      </div>
      {rangeStart && HOURS.map(h => {
        const dayKey = getFormattedDate(rangeStart);
        const existingNote = notes[dayKey]?.find(n => n.startsWith(`[${h}]`));
        return (
          <div key={h} className={`flex border-b min-h-[60px] relative items-center ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
            <div className={`w-24 p-4 text-[10px] font-black text-right uppercase tracking-tighter ${darkMode ? 'text-white/20' : 'text-gray-400'}`}>{h}</div>
            <div className="flex-1 p-2">
              {activeSlot === h ? (
                <input autoFocus 
                  className={`w-full border-2 rounded-xl p-3 text-xs font-bold ${darkMode ? 'bg-[#333] border-white/20 text-white' : 'bg-white border-black text-black'}`}
                  onBlur={() => setActiveSlot(null)}
                  onKeyDown={(e) => e.key === 'Enter' && addDayNote(e.target.value, h)}
                />
              ) : (
                <button onClick={() => setActiveSlot(h)} className={`w-full text-left px-6 text-[10px] font-bold italic uppercase ${darkMode ? 'text-white/20 hover:text-white/60' : 'text-gray-300 hover:text-gray-600'}`}>
                  {existingNote || "+ ADD EVENT"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}