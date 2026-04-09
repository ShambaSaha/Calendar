import React, { useState } from "react";
import { PlusCircle, Trash2, Trash, X } from "lucide-react"; // Added X icon
import { HOLIDAYS_2026 } from "@/constants/calendar";

export default function Sidebar({ 
  darkMode, rangeStart, rangeEnd, notes, 
  setNotes, getFormattedDate, clearAllNotes 
}) {
  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (!noteInput.trim() || !rangeStart) return;
    const newNotes = { ...notes };
    const start = new Date(rangeStart);
    const end = rangeEnd ? new Date(rangeEnd) : new Date(rangeStart);
    let curr = new Date(start);

    while (curr <= end) {
      const key = getFormattedDate(curr);
      newNotes[key] = [...(newNotes[key] || []), noteInput];
      curr.setDate(curr.getDate() + 1);
    }
    setNotes(newNotes);
    setNoteInput("");
  };

  // --- NEW: Individual Delete Function ---
  const deleteSingleNote = (dateKey, noteIndex) => {
    const newNotes = { ...notes };
    newNotes[dateKey] = newNotes[dateKey].filter((_, idx) => idx !== noteIndex);
    
    // Clean up the key if no notes are left for that day
    if (newNotes[dateKey].length === 0) {
      delete newNotes[dateKey];
    }
    
    setNotes(newNotes);
  };

  const formattedKey = rangeStart ? getFormattedDate(rangeStart) : "";

  return (
    <div className="w-[400px] flex flex-col gap-6">
      {/* Quick Note Card */}
      <div className={`rounded-[40px] p-8 shadow-xl border flex flex-col transition-all duration-500 overflow-hidden ${darkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-white'}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
          <PlusCircle size={14} /> {rangeEnd ? 'Range Sync' : 'Quick Note'}
        </h3>
        <textarea 
          value={noteInput} 
          onChange={(e) => setNoteInput(e.target.value)} 
          disabled={!rangeStart}
          placeholder={!rangeStart ? "Select a date..." : "Type your note..."}
          className={`w-full h-32 border-none rounded-[25px] px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-0 resize-none transition-all ${darkMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-gray-50 text-black'}`}
        />
        <button onClick={addNote} className={`mt-4 w-full py-4 rounded-[20px] text-[10px] font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          SAVE NOTE
        </button>
      </div>

      {/* Timeline Card */}
      <div className={`flex-1 rounded-[40px] p-8 shadow-xl border flex flex-col overflow-hidden transition-all duration-500 ${darkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>Timeline</h3>
          {Object.keys(notes).length > 0 && (
            <button onClick={clearAllNotes} className="text-red-500 hover:text-red-600 transition-colors p-1">
              <Trash size={16} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {rangeStart && (
            <>
              {/* Holiday Display */}
              {HOLIDAYS_2026[formattedKey] && (
                <div className={`p-6 rounded-[25px] border-l-4 ${darkMode ? 'bg-cyan-500/10 border-l-cyan-400' : 'bg-indigo-50/80 border-l-indigo-500'}`}>
                  <p className="text-[10px] font-black uppercase text-cyan-400">Public Holiday</p>
                  <p className="text-[12px] font-bold">{HOLIDAYS_2026[formattedKey]}</p>
                </div>
              )}

              {/* Individual Notes Display */}
              {(notes[formattedKey] || []).map((note, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-[25px] border-l-4 group relative transition-all ${
                    darkMode ? 'bg-white/5 border-l-white hover:bg-white/10' : 'bg-gray-50 border-l-black hover:bg-gray-100'
                  }`}
                >
                  <p className={`text-[12px] font-bold pr-6 ${
      darkMode ? 'text-white' : 'text-black' 
    }`}>
      {note}
    </p>
                  
                  {/* Individual Delete Button - Visible on Hover */}
                  <button 
                    onClick={() => deleteSingleNote(formattedKey, idx)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:scale-110"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}