"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SpotSearchBar from "../app/spot/SpotSearchBar";

const categories = [
  { name: "All Spaces", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V4a1 1 0 011-1h3m6 0h3a1 1 0 011 1v3m0 6v3a1 1 0 01-1 1h-3m-6 0H5a1 1 0 01-1-1v-3" /></svg> },
  { name: "Photo Studio", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v4m0 0l-6 3m6-3l-6-3" /></svg> },
  { name: "Film Studio", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" /></svg> },
  { name: "Warehouse", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 9.75L12 4l9 5.75V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9.75z" /><path d="M9 22V12h6v10" /></svg> },
  { name: "Gallery", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 17l6-6 4 4 8-8" /></svg> },
  { name: "Restaurant", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> },
  { name: "Mansion", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 21V9.75L12 4l9 5.75V21" /><rect x="7" y="13" width="10" height="8" rx="2" /></svg> },
  { name: "House", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l9-7 9 7v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7z" /><rect x="9" y="15" width="6" height="6" rx="1" /></svg> },
  { name: "Apartment", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 21V9h6v12" /></svg> },
];

const whatOptions = [
  "Event", "Recreation", "Photo Shoot", "Meeting", "Music Video", "Birthday Party", "Party", "Swim", "Tennis", "Pickleball", "Basketball", "Baby Shower", "Wedding", "Other"
];
const whereOptions = ["Bangalore", "Chennai", "Mumbai", "Hyderabad", "Trivandrum"];

function CalendarWithTime({ value, onChange }: { value: { date: Date | null, start: string, end: string }, onChange: (v: { date: Date | null, start: string, end: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(1970);

  React.useEffect(() => {
    const now = new Date();
    setToday(now);
    setMonth(now.getMonth());
    setYear(now.getFullYear());
    setMounted(true);
  }, []);

  if (!mounted || today === null) {
    return (
      <div className="relative">
        <button className="flex flex-col items-start px-4 py-2 bg-white rounded-xl border border-gray-200 min-w-[120px] opacity-50" type="button" disabled>
          <span className="text-xs font-semibold text-gray-700 mb-0.5">When?</span>
          <span className="text-base font-bold text-gray-900">Anytime</span>
        </button>
      </div>
    );
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }
  const days = [];
  const firstDay = getFirstDayOfWeek(year, month);
  const numDays = getDaysInMonth(year, month);
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= numDays; d++) days.push(d);

  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    timeOptions.push(`${h}:00`);
    timeOptions.push(`${h}:30`);
  }

  function formatDate(date: Date | null) {
    if (!date) return "Anytime";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  function formatTime(t: string) {
    if (!t) return "";
    const [h, m] = t.split(":");
    let hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  }

  return (
    <div className="relative">
      <button
        className="w-full text-left bg-transparent outline-none px-0 py-0 min-w-0"
        onClick={() => setOpen(!open)}
        type="button"
        style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}
      >
        <span className="text-base font-bold text-gray-900">{formatDate(value.date)}</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-30 p-6 flex flex-row gap-0 min-w-[420px] max-w-[520px]" style={{width: '520px'}}>
          {/* Calendar */}
          <div className="flex flex-col items-center min-w-[240px] pr-6">
            <div className="flex items-center justify-between mb-2 w-full">
              <button className="p-2 rounded hover:bg-gray-100" onClick={() => { setMonth(prev => prev === 0 ? 11 : prev - 1); setYear(prev => month === 0 ? prev - 1 : prev); }}>&lt;</button>
              <span className="font-semibold text-lg text-gray-900">{new Date(year, month).toLocaleString(undefined, { month: "long", year: "numeric" })}</span>
              <button className="p-2 rounded hover:bg-gray-100" onClick={() => { setMonth(prev => prev === 11 ? 0 : prev + 1); setYear(prev => month === 11 ? prev + 1 : prev); }}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-gray-500 mb-1 text-sm w-full">
              {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center w-full">
              {days.map((d, i) => d === null ? <div key={i}></div> : (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full font-semibold text-xs ${value.date && value.date.getDate() === d && value.date.getMonth() === month && value.date.getFullYear() === year ? "bg-[#7440AD] text-white" : "hover:bg-gray-100 text-gray-900"}`}
                  onClick={() => { const newDate = new Date(year, month, d); onChange({ ...value, date: newDate }); }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="w-px bg-gray-200 mx-6" />
          {/* Time pickers */}
          <div className="flex flex-col justify-center min-w-[180px] pl-2">
            {value.date ? (
              <>
                <div className="font-semibold text-center mb-2 text-base text-gray-900">Select time</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-right text-sm text-gray-900 font-semibold">Start</span>
                    <select
                      className="flex-1 border rounded px-2 py-1 text-sm text-gray-900 font-semibold"
                      value={value.start}
                      onChange={e => onChange({ ...value, start: e.target.value })}
                    >
                      <option value="">--</option>
                      {timeOptions.map(t => <option key={t} value={t}>{formatTime(t)}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-right text-sm text-gray-900 font-semibold">End</span>
                    <select
                      className="flex-1 border rounded px-2 py-1 text-sm text-gray-900 font-semibold"
                      value={value.end}
                      onChange={e => onChange({ ...value, end: e.target.value })}
                    >
                      <option value="">--</option>
                      {timeOptions.map(t => <option key={t} value={t}>{formatTime(t)}</option>)}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-semibold text-base">Select date</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isSpotDetails = pathname.startsWith("/spot/");
  const isHome = pathname === "/";

  if (isSpotDetails) {
    // Compact header for spot details, reduce header height by 30% but keep logo/search/menu same size as homepage
    return (
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-0" style={{ minHeight: '34px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Go to homepage">
            <Image src="/spotowl-logo.png" alt="SpotOwl Logo" width={160} height={48} className="h-16 w-40 object-contain" unoptimized />
          </Link>
          {/* Mini Search Bar */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-2xl"><SpotSearchBar /></div>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="hidden md:block text-xs font-semibold text-gray-700 hover:bg-gray-100 px-1.5 py-1 rounded-full">Become a host</button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-full px-1.5 py-1 hover:shadow">
              <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="8" r="3" stroke="#222" strokeWidth="1.2" /><path d="M2 18c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.2" /></svg>
              <span className="hidden md:inline text-gray-700 text-xs">Menu</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Homepage header with categories and full search
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col items-stretch px-6 pt-4 pb-1">
        {/* Categories nav at the very top, smaller size */}
        <nav className="w-full flex justify-center gap-4 mb-2 mt-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat.name}
              className="flex flex-col items-center px-0.5 focus:outline-none"
              style={{ fontSize: '12px' }}
            >
              <span className="mb-0.5 text-black" style={{ fontSize: '16px' }}>{cat.icon}</span>
              <span className="text-xs font-medium text-black">{cat.name}</span>
            </button>
          ))}
        </nav>
        {/* Logo and right section, restore large logo */}
        <div className="w-full flex items-center justify-between mb-1" style={{ minHeight: '48px' }}>
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Go to homepage">
            <Image src="/spotowl-logo.png" alt="SpotOwl Logo" width={160} height={48} className="h-16 w-40 object-contain" unoptimized />
          </Link>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="hidden md:block text-xs font-semibold text-gray-700 hover:bg-gray-100 px-1.5 py-1 rounded-full">Become a host</button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-full px-1.5 py-1 hover:shadow">
              <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="8" r="3" stroke="#222" strokeWidth="1.2" /><path d="M2 18c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.2" /></svg>
              <span className="hidden md:inline text-gray-700 text-xs">Menu</span>
            </button>
          </div>
        </div>
        {/* Full search bar, always open on homepage */}
        <div className="w-full flex justify-center mt-0 mb-1">
          <div className="w-full max-w-2xl">
            <SpotSearchBar defaultOpen={true} />
          </div>
        </div>
      </div>
    </header>
  );
} 