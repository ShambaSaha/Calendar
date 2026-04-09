import { useMemo } from "react";

export const useCalendarLogic = (currentDate, year, monthIdx) => {
  const getFormattedDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const days = useMemo(() => {
    const firstDay = new Date(year, monthIdx, 1).getDay();
    const total = new Date(year, monthIdx + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; 
    const arr = [];
    const prevMax = new Date(year, monthIdx, 0).getDate();
    
    for (let i = offset - 1; i >= 0; i--) arr.push({ d: prevMax - i, current: false });
    for (let i = 1; i <= total; i++) arr.push({ d: i, current: true });
    
    const remaining = (7 - (arr.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) arr.push({ d: i, current: false });
    return arr;
  }, [year, monthIdx]);

  return { days, getFormattedDate };
};