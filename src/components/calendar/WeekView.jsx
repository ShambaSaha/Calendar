import React, { useMemo, useState } from "react";
import { WEEKDAYS, HOURS } from "@/constants/calendar";

export default function WeekView({ rangeStart, darkMode, notes, setNotes, getFormattedDate }) {
  const [activeSlot, setActiveSlot] = useState(null);

  const weekDates = useMemo(() => {
    const start = rangeStart || new Date();
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(new Date(start).setDate(diff));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [rangeStart]);

  const addSlotNote = (text, date, hour) => {
    const key = getFormattedDate(date);
    const newNotes = { ...notes };
    newNotes[key] = [...(newNotes[key] || []), `[${hour}] ${text}`];
    setNotes(newNotes);
    setActiveSlot(null);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      <div className={`grid grid-cols-8 border-l border-t min-w-[700px] ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
        <div className={`p-3 border-r border-b text-[10px] font-black sticky top-0 z-20 ${darkMode ? 'bg-black text-white/40' : 'bg-gray-50/50 text-gray-500'}`}>TIME</div>
        {weekDates.map((d, i) => (
          <div key={i} className={`p-3 border-r border-b text-[10px] font-black text-center sticky top-0 z-20 ${darkMode ? 'bg-[#1a1a1a] text-white/60' : 'bg-gray-50/80'}`}>
            {WEEKDAYS[i]} {d.getDate()}
          </div>
        ))}
        {HOURS.map(h => (
          <React.Fragment key={h}>
            <div className={`p-3 border-r border-b text-[10px] font-bold text-right ${darkMode ? 'text-white/20' : 'text-gray-400'}`}>{h}</div>
            {weekDates.map((d, i) => {
              const key = getFormattedDate(d);
              const isSlotActive = activeSlot?.dayIdx === i && activeSlot?.hour === h;
              return (
                <div key={`${i}-${h}`} onClick={() => setActiveSlot({ dayIdx: i, hour: h })}
                  className={`p-1 border-r border-b min-h-[50px] cursor-pointer relative ${darkMode ? 'hover:bg-white/5' : 'hover:bg-white'}`}
                >
                  {isSlotActive ? (
                    <input autoFocus 
                      className={`absolute inset-0 z-40 p-2 text-[10px] font-bold outline-none rounded-lg ${darkMode ? 'bg-[#333] text-white' : 'bg-white text-black'}`}
                      onBlur={() => setActiveSlot(null)}
                      onKeyDown={(e) => e.key === 'Enter' && addSlotNote(e.target.value, d, h)}
                    />
                  ) : notes[key]?.some(n => n.startsWith(`[${h}]`)) && (
                    <div className="w-full h-full bg-red-500/10 rounded-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}