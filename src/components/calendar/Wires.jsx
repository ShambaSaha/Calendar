// components/calendar/Wires.jsx
import React from "react";

export default function Wires({ darkMode }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-14 flex justify-center items-start gap-[1.8%] px-12 z-50 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="relative flex gap-[2px]">
          <div className={`w-[4px] h-10 rounded-full shadow-md transform -translate-y-4 bg-gradient-to-b ${
            darkMode 
              ? 'from-[#111] via-[#444] to-[#222]' 
              : 'from-[#444] via-[#ccc] to-[#888]'
          }`} />
          <div className={`w-[4px] h-10 rounded-full shadow-md transform -translate-y-4 bg-gradient-to-b ${
            darkMode 
              ? 'from-[#111] via-[#444] to-[#222]' 
              : 'from-[#444] via-[#ccc] to-[#888]'
          }`} />
        </div>
      ))}
    </div>
  );
}