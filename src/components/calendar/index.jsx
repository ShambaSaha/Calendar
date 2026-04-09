/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { MONTH_THEMES, flipVariants } from "@/constants/calendar";
import { useCalendarLogic } from "@/hooks/useCalendar";
import Wires from "./Wires";
import DeleteModal from "./DeleteModal";

// Sub-components
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import Sidebar from "./Sidebar";

export default function Calendar() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("month");
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(new Date());
  const [rangeEnd, setRangeEnd] = useState(null);
  const [direction, setDirection] = useState(0);
  const [notes, setNotes] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes, mounted]);

  const handleConfirmDelete = () => {
    setNotes({});
    localStorage.removeItem("calendar-notes");
    setIsDeleteModalOpen(false);
  };

  const monthIdx = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const { days, getFormattedDate } = useCalendarLogic(currentDate, year, monthIdx);

  if (!mounted) return <div className="h-screen w-screen bg-[#ebebeb]" />;

  return (
    <div className={`h-screen w-screen flex items-center justify-center transition-colors duration-500 overflow-hidden 
      ${darkMode ? 'bg-[#121212]' : 'bg-[#ebebeb]'} 
      max-md:h-auto max-md:min-h-screen max-md:overflow-y-auto`}
    >
      <AnimatePresence>
        {isDeleteModalOpen && (
          <DeleteModal 
            darkMode={darkMode} 
            onConfirm={handleConfirmDelete} 
            onCancel={() => setIsDeleteModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      <button 
  onClick={() => setDarkMode(!darkMode)} 
  className="fixed top-4 right-25 z-[100] p-3 bg-white/10 backdrop-blur-lg rounded-full md:top-10 md:right-10 md:bg-transparent"
>
  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>

      <div className="w-full h-full max-w-[1700px] p-6 flex flex-row gap-6 perspective-[2000px] 
        max-md:flex-col max-md:p-0 max-md:gap-0 max-md:perspective-none"
      >
        {/* Main Calendar Card */}
        <div className={`flex-[3] relative rounded-[45px] shadow-2xl overflow-hidden transition-colors h-full 
          ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'} 
          max-md:min-h-[100vw] max-md:rounded-none max-md:shadow-none`}
        >
          <div className="max-md:hidden">
            <Wires darkMode={darkMode} />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`${monthIdx}-${view}`} 
              custom={direction} 
              variants={flipVariants} 
              initial="enter" 
              animate="center" 
              exit="exit" 
              className="absolute inset-0 flex flex-col p-12 max-md:p-5"
            >
              <img src={MONTH_THEMES[monthIdx].img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${darkMode ? 'opacity-30' : 'opacity-100'}`} alt="bg" />
              
              <CalendarHeader 
                view={view} setView={setView} 
                monthName={MONTH_THEMES[monthIdx].name} 
                year={year} darkMode={darkMode} 
                onPaginate={(d) => { setDirection(d); setCurrentDate(new Date(year, monthIdx + d, 1)); }}
              />

              <div className={`relative mt-auto h-[58%] backdrop-blur-3xl rounded-[35px] p-8 border shadow-2xl overflow-hidden transition-all 
                ${darkMode ? 'bg-[#252525]/90 border-white/5' : 'bg-white/80 border-white'} 
                max-md:h-[65%] max-md:p-3 max-md:rounded-[20px]`}
              >
                {view === "month" && <MonthView days={days} year={year} monthIdx={monthIdx} darkMode={darkMode} rangeStart={rangeStart} rangeEnd={rangeEnd} setRangeStart={setRangeStart} setRangeEnd={setRangeEnd} notes={notes} getFormattedDate={getFormattedDate} />}
                {view === "week" && <WeekView rangeStart={rangeStart} darkMode={darkMode} notes={notes} setNotes={setNotes} getFormattedDate={getFormattedDate} />}
                {view === "day" && <DayView rangeStart={rangeStart} darkMode={darkMode} notes={notes} setNotes={setNotes} getFormattedDate={getFormattedDate}/>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Wrapper */}
        <div className="w-[400px] h-full max-md:w-full max-md:h-auto">
          <Sidebar 
            darkMode={darkMode} 
            rangeStart={rangeStart} 
            rangeEnd={rangeEnd} 
            notes={notes} 
            setNotes={setNotes} 
            getFormattedDate={getFormattedDate} 
            clearAllNotes={() => setIsDeleteModalOpen(true)} 
          />
        </div>
      </div>
    </div>
  );
}