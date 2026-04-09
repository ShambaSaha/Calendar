// "use client";
// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ChevronLeft, ChevronRight, Trash2, 
//   PlusCircle, Clock, Sun, Moon
// } from "lucide-react";

// const MONTH_THEMES = [
//   { name: "JANUARY", img: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80&w=1600" },
//   { name: "FEBRUARY", img: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?auto=format&fit=crop&q=80&w=1600" },
//   { name: "MARCH", img: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1600" },
//   { name: "APRIL", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1600" },
//   { name: "MAY", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" },
//   { name: "JUNE", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600" },
//   { name: "JULY", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600" },
//   { name: "AUGUST", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600" },
//   { name: "SEPTEMBER", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1600" },
//   { name: "OCTOBER", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600" },
//   { name: "NOVEMBER", img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&q=80&w=1600" },
//   { name: "DECEMBER", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" },
// ];

// const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// const HOLIDAYS_2026 = {
//   "2026-01-01": "New Year's Day",
//   "2026-01-14": "Makar Sankranti",
//   "2026-01-26": "Republic Day",
//   "2026-02-17": "Maha Shivaratri",
//   "2026-03-03": "Holi",
//   "2026-03-20": "Eid al-Fitr",
//   "2026-04-03": "Good Friday",
//   "2026-04-14": "Ambedkar Jayanti",
//   "2026-05-01": "May Day",
//   "2026-05-14": "Mother's Day",
//   "2026-07-16": "Raath Yatra",
//   "2026-05-27": "Eid al-Adha",
//   "2026-08-15": "Independence Day",
//   "2026-08-28": "Onam",
//   "2026-09-04": "Janmashtami",
//   "2026-09-11": "Ganesh Chaturthi",
//   "2026-10-02": "Gandhi Jayanti",
//   "2026-10-17": "First day of Durga Puja",
//   "2026-10-19": "Dussehra",
//   "2026-11-08": "Diwali",
//   "2026-12-25": "Christmas"
// };

// export default function Calendar() {
//   const [view, setView] = useState("month"); 
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [rangeStart, setRangeStart] = useState(new Date());
//   const [rangeEnd, setRangeEnd] = useState(null);
//   const [notes, setNotes] = useState({});
//   const [noteInput, setNoteInput] = useState("");
//   const [activeSlot, setActiveSlot] = useState(null);
//   const [direction, setDirection] = useState(0);

//   const monthIdx = currentDate.getMonth();
//   const year = currentDate.getFullYear();
//   const today = new Date();

//   // Helper to get YYYY-MM-DD without timezone shifts
//   const getFormattedDate = (date) => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const days = useMemo(() => {
//     const firstDay = new Date(year, monthIdx, 1).getDay();
//     const total = new Date(year, monthIdx + 1, 0).getDate();
//     const offset = firstDay === 0 ? 6 : firstDay - 1; 
//     const arr = [];
//     const prevMax = new Date(year, monthIdx, 0).getDate();
//     for (let i = offset - 1; i >= 0; i--) arr.push({ d: prevMax - i, current: false });
//     for (let i = 1; i <= total; i++) arr.push({ d: i, current: true });
//     const remaining = (7 - (arr.length % 7)) % 7;
//     for (let i = 1; i <= remaining; i++) arr.push({ d: i, current: false });
//     return arr;
//   }, [year, monthIdx]);

//   const weekDates = useMemo(() => {
//     const start = rangeStart || new Date();
//     const day = start.getDay();
//     const diff = start.getDate() - day + (day === 0 ? -6 : 1);
//     const monday = new Date(new Date(start).setDate(diff));
//     return Array.from({ length: 7 }, (_, i) => {
//       const d = new Date(monday);
//       d.setDate(monday.getDate() + i);
//       return d;
//     });
//   }, [rangeStart]);

//   const handleDateClick = (date) => {
//     const dateStr = date.toDateString();
//     if (rangeStart && dateStr === rangeStart.toDateString() && !rangeEnd) {
//       setRangeStart(null); setRangeEnd(null); return;
//     }
//     if (!rangeStart || (rangeStart && rangeEnd)) {
//       setRangeStart(date); setRangeEnd(null);
//     } else {
//       if (date < rangeStart) { setRangeStart(date); setRangeEnd(null); }
//       else if (dateStr === rangeStart.toDateString()) { setRangeEnd(null); }
//       else { setRangeEnd(date); }
//     }
//   };

//   const getRangeStatus = (date) => {
//     if (!rangeStart) return "none";
//     const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
//     const start = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate()).getTime();
//     if (!rangeEnd) return d === start ? "anchor" : "none";
//     const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate()).getTime();
//     if (d === start || d === end) return "anchor";
//     if (d > start && d < end) return "between";
//     return "none";
//   };

//   const addNote = (text = noteInput, date = null) => {
//     const finalNote = text || noteInput;
//     if (!finalNote.trim() || !rangeStart) return;
    
//     const newNotes = { ...notes };
//     if (date) {
//       const key = getFormattedDate(date);
//       newNotes[key] = [...(newNotes[key] || []), finalNote];
//     } else {
//       const start = new Date(rangeStart);
//       const end = rangeEnd ? new Date(rangeEnd) : new Date(rangeStart);
//       let curr = new Date(start);
//       while (curr <= end) {
//         const key = getFormattedDate(curr);
//         newNotes[key] = [...(newNotes[key] || []), finalNote];
//         curr.setDate(curr.getDate() + 1);
//       }
//     }
//     setNotes(newNotes); 
//     setNoteInput(""); 
//     setActiveSlot(null); 
//     setRangeEnd(null);
//   };

//   const paginate = (newDirection) => {
//     setDirection(newDirection);
//     setCurrentDate(new Date(year, monthIdx + newDirection, 1));
//   };

//   const flipVariants = {
//     enter: (d) => ({ rotateX: d > 0 ? 80 : -80, opacity: 0, transformOrigin: d > 0 ? "top" : "bottom" }),
//     center: { rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
//     exit: (d) => ({ rotateX: d > 0 ? -80 : 80, opacity: 0, transformOrigin: d > 0 ? "bottom" : "top", transition: { duration: 0.3 } })
//   };

//   return (
//     <div className={`h-screen w-screen p-6 flex items-center justify-center overflow-hidden font-sans transition-colors duration-500 ${darkMode ? 'bg-[#121212]' : 'bg-[#ebebeb]'}`}>
      
//       <button 
//         onClick={() => setDarkMode(!darkMode)}
//         className={`fixed top-10 right-10 z-[100] p-2.5 transition-all hover:scale-110 active:rotate-12 ${darkMode ? 'text-white' : 'text-black'}`}
//       >
//         {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
//       </button>

//       <div className="w-full h-full max-w-[1700px] flex gap-6 perspective-[2000px]">
//         {/* Main Calendar Card */}
//         <div className={`flex-[3] relative rounded-[45px] shadow-2xl flex flex-col transition-colors duration-500 overflow-hidden ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
//           <div className="absolute top-0 left-0 right-0 h-14 flex justify-center items-start gap-[1.8%] px-12 z-50 pointer-events-none">
//             {[...Array(20)].map((_, i) => (
//               <div key={i} className="relative flex gap-[2px]">
//                 <div className={`w-[4px] h-10 rounded-full shadow-md transform -translate-y-4 bg-gradient-to-b ${darkMode ? 'from-[#111] via-[#444] to-[#222]' : 'from-[#444] via-[#ccc] to-[#888]'}`} />
//                 <div className={`w-[4px] h-10 rounded-full shadow-md transform -translate-y-4 bg-gradient-to-b ${darkMode ? 'from-[#111] via-[#444] to-[#222]' : 'from-[#444] via-[#ccc] to-[#888]'}`} />
//               </div>
//             ))}
//           </div>

//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={`${monthIdx}-${view}`}
//               custom={direction}
//               variants={flipVariants}
//               initial="enter" animate="center" exit="exit"
//               className="absolute inset-0 flex flex-col p-12"
//             >
//               <img src={MONTH_THEMES[monthIdx].img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${darkMode ? 'opacity-30' : 'opacity-100'}`} alt="bg" />
//               <div className={`absolute inset-0 backdrop-blur-[1px] ${darkMode ? 'bg-black/40' : 'bg-black/5'}`} />

//               <div className="relative z-10 flex flex-col gap-4 mb-8 pt-6">
//                 <div className="flex justify-between items-baseline">
//                   <h2 className={`text-[90px] font-black tracking-tighter leading-none uppercase drop-shadow-sm transition-colors ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
//                     {MONTH_THEMES[monthIdx].name}
//                   </h2>
//                   <span className={`text-3xl font-black transition-colors ${darkMode ? 'text-white/10' : 'text-white/30'}`}>{year}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className={`flex backdrop-blur-2xl p-1.5 rounded-[20px] shadow-xl w-fit border transition-colors ${darkMode ? 'bg-black/60 border-white/10' : 'bg-white/90 border-white'}`}>
//                     {['MONTH', 'WEEK', 'DAY'].map((v) => (
//                       <button key={v} onClick={() => { setDirection(0); setView(v.toLowerCase()); setActiveSlot(null); }}
//                         className={`px-8 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${view === v.toLowerCase() ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') : 'text-gray-400 hover:text-gray-200'}`}
//                       >
//                         {v}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="flex gap-4">
//                     <button onClick={() => paginate(-1)} className={`p-4 rounded-full shadow-lg ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-black'}`}><ChevronLeft size={20}/></button>
//                     <button onClick={() => paginate(1)} className={`p-4 rounded-full shadow-lg ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-black'}`}><ChevronRight size={20}/></button>
//                   </div>
//                 </div>
//               </div>

//               <div className={`relative mt-auto h-[58%] backdrop-blur-3xl rounded-[35px] p-8 border shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ${darkMode ? 'bg-[#252525]/90 border-white/5' : 'bg-white/80 border-white'}`}>
                
//                 {view === "month" && (
//                   <div className="h-full flex flex-col">
//                     <div className="grid grid-cols-7 flex-1 text-center items-center overflow-y-auto custom-scrollbar">
//                       {WEEKDAYS.map((d, i) => <span key={i} className={`text-[10px] font-black mb-2 tracking-widest uppercase ${darkMode ? 'text-white/20' : 'text-black/40'}`}>{d}</span>)}
//                       {days.map((item, i) => {
//                         const dateObj = new Date(year, monthIdx, item.d);
//                         const isToday = item.current && dateObj.toDateString() === today.toDateString();
//                         const dateKey = getFormattedDate(dateObj);
//                         const holidayName = HOLIDAYS_2026[dateKey];
//                         const status = item.current ? getRangeStatus(dateObj) : "none";
//                         return (
//                           <div key={i} onClick={() => item.current && handleDateClick(dateObj)}
//                             className={`h-12 flex flex-col items-center justify-center text-xl font-black transition-all cursor-pointer relative
//                               ${!item.current ? (darkMode ? 'text-white/5' : 'text-black/5') : (darkMode ? 'text-white' : 'text-black')}
//                               ${status === 'anchor' ? (darkMode ? 'bg-[#3b82f6]/20 text-[#60a5fa] border border-[#60a5fa]/50 scale-110 z-20 shadow-lg rounded-[15px]' : 'bg-black text-white scale-110 z-20 shadow-lg') : 'rounded-2xl'}
//                               ${status === 'between' ? (darkMode ? 'bg-white/10 text-blue-400' : 'bg-indigo-500/10 text-indigo-600') : ''}
//                               ${status === 'none' && item.current ? (darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100') : ''}
//                             `}
//                           >
//                             {item.d}
//                             {holidayName && item.current && <div className={`absolute top-2 left-4 w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`} />}
//                             {isToday && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]" />}
//                             {notes[dateKey]?.length > 0 && item.current && <div className={`absolute top-2 right-4 w-1 h-1 rounded-full ${status === 'anchor' ? 'bg-red-400' : 'bg-red-500'}`} />}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {view === "week" && (
//                   <div className="h-full overflow-y-auto custom-scrollbar pr-2">
//                     <div className={`grid grid-cols-8 border-l border-t min-w-[700px] ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
//                       <div className={`p-3 border-r border-b text-[10px] font-black sticky top-0 z-20 ${darkMode ? 'bg-black border-white/5 text-white/40' : 'bg-gray-50/50 border-black/5 text-gray-500'}`}>TIME</div>
//                       {weekDates.map((d, i) => (
//                         <div key={i} className={`p-3 border-r border-b text-[10px] font-black text-center sticky top-0 z-20 ${rangeStart && d.toDateString() === rangeStart.toDateString() ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') : (darkMode ? 'bg-[#1a1a1a] text-white/60 border-white/5' : 'bg-gray-50/80 border-black/5')}`}>
//                           {WEEKDAYS[i]} {d.getDate()}
//                           {d.toDateString() === today.toDateString() && <div className="h-1 w-1 bg-yellow-400 mx-auto mt-0.5 rounded-full" />}
//                         </div>
//                       ))}
//                       {HOURS.map(h => (
//                         <React.Fragment key={h}>
//                           <div className={`p-3 border-r border-b text-[10px] font-bold text-right ${darkMode ? 'border-white/5 text-white/20' : 'border-black/5 text-gray-400'}`}>{h}</div>
//                           {weekDates.map((d, i) => {
//                             const key = getFormattedDate(d);
//                             const isSlotActive = activeSlot?.dayIdx === i && activeSlot?.hour === h;
//                             return (
//                               <div key={`${i}-${h}`} onClick={() => { setRangeStart(d); setRangeEnd(null); setActiveSlot({ dayIdx: i, hour: h }); }}
//                                 className={`p-1 border-r border-b min-h-[50px] cursor-pointer relative ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-black/5 hover:bg-white'}`}
//                               >
//                                 {isSlotActive ? (
//                                   <input autoFocus className={`absolute inset-0 z-40 p-2 text-[10px] font-bold outline-none shadow-inner ${darkMode ? 'bg-[#333] text-white' : 'bg-white text-black'}`}
//                                     onBlur={() => setActiveSlot(null)}
//                                     onKeyDown={(e) => {
//                                       if (e.key === 'Enter') addNote(`[${h}] ${e.target.value}`, d);
//                                       if (e.key === 'Escape') setActiveSlot(null);
//                                     }}
//                                   />
//                                 ) : notes[key]?.some(n => n.startsWith(`[${h}]`)) && (
//                                   <div className="w-full h-full bg-red-500/10 rounded-md flex items-center justify-center"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /></div>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </React.Fragment>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {view === "day" && (
//                   <div className="h-full overflow-y-auto custom-scrollbar pr-2">
//                     <div className={`p-4 font-black tracking-widest text-center uppercase text-[11px] sticky top-0 z-20 rounded-xl mb-4 transition-colors ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
//                       {rangeStart ? rangeStart.toDateString() : "Select a Date"}
//                     </div>
//                     {rangeStart && HOURS.map(h => {
//                       const dayKey = getFormattedDate(rangeStart);
//                       const existingNote = notes[dayKey]?.find(n => n.startsWith(`[${h}]`));
//                       return (
//                         <div key={h} className={`flex border-b min-h-[60px] relative items-center ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
//                           <div className={`w-24 p-4 text-[10px] font-black text-right uppercase tracking-tighter ${darkMode ? 'text-white/20' : 'text-gray-400'}`}>{h}</div>
//                           <div className="flex-1 p-2">
//                             {activeSlot?.hour === h ? (
//                               <input autoFocus className={`w-full border-2 rounded-xl p-3 text-xs font-bold transition-colors ${darkMode ? 'bg-[#333] border-white/20 text-white' : 'bg-white border-black text-black'}`}
//                                 onKeyDown={(e) => {
//                                   if (e.key === 'Enter') addNote(`[${h}] ${e.target.value}`, rangeStart);
//                                   if (e.key === 'Escape') setActiveSlot(null);
//                                 }}
//                                 onBlur={() => setActiveSlot(null)}
//                               />
//                             ) : (
//                               <button onClick={() => { setRangeEnd(null); setActiveSlot({ hour: h }); }} className={`w-full text-left px-6 text-[10px] font-bold italic uppercase transition-colors ${darkMode ? 'text-white/20 hover:text-white/60' : 'text-gray-300 hover:text-gray-600'}`}>
//                                 {existingNote || "+ ADD EVENT"}
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Sidebar */}
//         <div className="w-[400px] flex flex-col gap-6">
//           <div className={`rounded-[40px] p-8 shadow-xl border flex flex-col transition-all duration-500 ${darkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-white'}`}>
//             <h3 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
//               <PlusCircle size={14} className={darkMode ? 'text-white' : 'text-black'}/> {rangeEnd ? 'Range Sync' : 'Quick Note'}
//             </h3>
//             <textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)} disabled={!rangeStart}
//               placeholder={!rangeStart ? "Select a date..." : rangeEnd ? "Adding to range..." : `Note for ${rangeStart.getDate()}...`}
//               className={`w-full h-32 border-none rounded-[25px] px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-4 resize-none transition-all disabled:opacity-50 ${darkMode ? 'bg-white/5 text-white ring-white/5 placeholder:text-white/20' : 'bg-gray-50 text-black ring-black/5'}`}
//             />
//             <button onClick={() => addNote()} className={`mt-4 w-full py-4 rounded-[20px] text-[10px] font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
//               {rangeEnd ? `SYNC TO ALL DATES` : 'SAVE NOTE'}
//             </button>
//           </div>

//           <div className={`flex-1 rounded-[40px] p-8 shadow-xl border flex flex-col overflow-hidden transition-all duration-500 ${darkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-white'}`}>
//             <h3 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex justify-between items-center ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
//               <span>Timeline</span>
//             </h3>
//             <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
//               {rangeStart && (
//                 <>
//                   {/* Holidays */}
//                   {HOLIDAYS_2026[getFormattedDate(rangeStart)] && (
//                     <div className={`p-6 rounded-[25px] border-l-4 shadow-sm ${darkMode ? 'bg-cyan-500/10 border-l-cyan-400' : 'bg-indigo-50/80 border-l-indigo-500'}`}>
//                       <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${darkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Public Holiday</p>
//                       <p className={`text-[12px] font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{HOLIDAYS_2026[getFormattedDate(rangeStart)]}</p>
//                     </div>
//                   )}
//                   {/* Notes */}
//                   {(notes[getFormattedDate(rangeStart)] || []).map((note, idx) => (
//                     <div key={idx} className={`p-6 rounded-[25px] relative group border-l-4 transition-all shadow-sm ${darkMode ? 'bg-white/5 border-l-white hover:bg-white/10' : 'bg-gray-50 border-l-black hover:bg-white'}`}>
//                       <div className="flex justify-between items-center mb-2">
//                         <Clock size={12} className={darkMode ? 'text-white/20' : 'text-gray-300'}/>
//                         <button onClick={() => {
//                             const k = getFormattedDate(rangeStart);
//                             const updated = [...notes[k]];
//                             updated.splice(idx, 1);
//                             setNotes({ ...notes, [k]: updated });
//                         }} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all"><Trash2 size={12}/></button>
//                       </div>
//                       <p className={`text-[12px] font-bold leading-relaxed ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>{note}</p>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: ${darkMode ? '#444' : '#d1d5db'}; border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// }