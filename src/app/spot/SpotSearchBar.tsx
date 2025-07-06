"use client";
import React, { useState, useRef, useEffect } from "react";

// CalendarWithTime copied from Header.tsx
function CalendarWithTime({ value, onChange }: { value: { date: Date | null, start: string, end: string }, onChange: (v: { date: Date | null, start: string, end: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(1970);

  useEffect(() => {
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

function FullSearchBar({ onClose }: { onClose: () => void }) {
  const [when, setWhen] = useState<{ date: Date | null, start: string, end: string }>({ date: null, start: "", end: "" });
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1 flex flex-row items-center relative z-20 transition-all duration-300">
      {/* What */}
      <div className="flex flex-col justify-center flex-1 px-4 py-1 min-w-[120px]">
        <label className="text-xs font-semibold text-gray-700 mb-0.5">What?</label>
        <select className="text-base font-bold text-gray-900 bg-transparent outline-none w-full" style={{fontWeight: 700}} defaultValue="Video Shoot">
          <option value="Video Shoot">Video Shoot</option>
          <option value="Event">Event</option>
          <option value="Recreation">Recreation</option>
          <option value="Photo Shoot">Photo Shoot</option>
          <option value="Meeting">Meeting</option>
          <option value="Music Video">Music Video</option>
          <option value="Birthday Party">Birthday Party</option>
          <option value="Party">Party</option>
          <option value="Swim">Swim</option>
          <option value="Tennis">Tennis</option>
          <option value="Pickleball">Pickleball</option>
          <option value="Basketball">Basketball</option>
          <option value="Baby Shower">Baby Shower</option>
          <option value="Wedding">Wedding</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="border-l border-gray-200 h-8 mx-2" />
      {/* Where */}
      <div className="flex flex-col justify-center flex-1 px-4 py-1 min-w-[120px]">
        <label className="text-xs font-semibold text-gray-700 mb-0.5">Where?</label>
        <select className="text-base font-bold text-gray-900 bg-transparent outline-none w-full" style={{fontWeight: 700}} defaultValue="Bangalore">
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Trivandrum">Trivandrum</option>
        </select>
      </div>
      <div className="border-l border-gray-200 h-8 mx-2" />
      {/* When */}
      <div className="flex flex-col justify-center flex-1 px-4 py-1 min-w-[120px]">
        <label className="text-xs font-semibold text-gray-700 mb-0.5">When?</label>
        <CalendarWithTime value={when} onChange={setWhen} />
      </div>
      {/* Search Button */}
      <button className="ml-4 flex items-center justify-center w-10 h-10 bg-[#7440AD] text-white rounded-full hover:bg-[#5e338a] shadow transition-all duration-150" type="submit" aria-label="Search">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

export default function SpotSearchBar({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [searchOpen, setSearchOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  // Click-away handler
  useEffect(() => {
    if (!searchOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  if (defaultOpen) {
    // Always show full search bar
    return (
      <div className="w-full flex justify-center pt-4 pb-4">
        <FullSearchBar onClose={() => {}} />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pt-8 pb-6">
      <div ref={ref} className="w-full flex justify-center">
        {!searchOpen ? (
          <button
            className="w-full max-w-xl md:max-w-2xl lg:max-w-xl bg-white rounded-full shadow border border-gray-200 px-6 py-3 flex flex-row items-center gap-3 text-gray-500 text-lg font-semibold focus:outline-none transition-all duration-300"
            style={{ width: '50%' }}
            onClick={() => setSearchOpen(true)}
          >
            <span className="flex-1 text-left">Search</span>
            <span className="flex items-center justify-center w-10 h-10 bg-[#7440AD] text-white rounded-full">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </button>
        ) : (
          <FullSearchBar onClose={() => setSearchOpen(false)} />
        )}
      </div>
    </div>
  );
} 