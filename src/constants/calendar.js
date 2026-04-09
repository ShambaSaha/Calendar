export const MONTH_THEMES = [
  { name: "JANUARY", img: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80&w=1600" },
  { name: "FEBRUARY", img: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?auto=format&fit=crop&q=80&w=1600" },
  { name: "MARCH", img: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1600" },
  { name: "APRIL", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1600" },
  { name: "MAY", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" },
  { name: "JUNE", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600" },
  { name: "JULY", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600" },
  { name: "AUGUST", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600" },
  { name: "SEPTEMBER", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1600" },
  { name: "OCTOBER", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600" },
  { name: "NOVEMBER", img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&q=80&w=1600" },
  { name: "DECEMBER", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" },
];

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export const HOLIDAYS_2026 = {
  "2026-01-01": "New Year's Day",
  "2026-01-14": "Makar Sankranti",
  "2026-01-26": "Republic Day",
  "2026-02-17": "Maha Shivaratri",
  "2026-03-03": "Holi",
  "2026-03-20": "Eid al-Fitr",
  "2026-04-03": "Good Friday",
  "2026-04-14": "Ambedkar Jayanti",
  "2026-05-01": "May Day",
  "2026-05-14": "Mother's Day",
  "2026-07-16": "Ratha Yatra",
  "2026-05-27": "Eid al-Adha",
  "2026-08-15": "Independence Day",
  "2026-08-28": "Onam",
  "2026-09-04": "Janmashtami",
  "2026-09-11": "Ganesh Chaturthi",
  "2026-10-02": "Gandhi Jayanti",
  "2026-10-17": "Durga Puja",
  "2026-10-19": "Dussehra",
  "2026-11-08": "Diwali",
  "2026-12-25": "Christmas"
};

export const flipVariants = {
  enter: (d) => ({ 
    rotateX: d > 0 ? 80 : -80, 
    opacity: 0, 
    transformOrigin: d > 0 ? "top" : "bottom" 
  }),
  center: { 
    rotateX: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  exit: (d) => ({ 
    rotateX: d > 0 ? -80 : 80, 
    opacity: 0, 
    transformOrigin: d > 0 ? "bottom" : "top", 
    transition: { duration: 0.3 } 
  })
};