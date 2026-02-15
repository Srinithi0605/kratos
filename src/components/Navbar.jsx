import { Bell, Menu, UserCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar({ onToggleSidebar }) {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <button onClick={onToggleSidebar} className="rounded-xl border border-emerald-100 p-2 text-gray-600"><Menu size={18} /></button>
        <div className="flex-1 max-w-xl">
          <input placeholder="Search..." className="w-full rounded-full border border-emerald-100 bg-app-bg px-4 py-2 text-sm shadow-sm outline-none" />
        </div>
        <div className="ml-auto flex items-center gap-3" ref={profileRef}>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">● System Online</span>
          <span className="text-sm font-semibold text-gray-700">{time.toLocaleTimeString()}</span>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowNotifications((v) => !v); setShowProfile(false); }} className="rounded-xl border border-emerald-100 p-2 text-gray-600"><Bell size={18} /></button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-emerald-100 bg-white p-3 shadow-soft">
                <p className="text-sm font-semibold">Notifications</p>
                <p className="mt-2 text-xs text-gray-600">No critical alerts.</p>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowProfile((v) => !v); setShowNotifications(false); }} className="h-9 w-9 rounded-full bg-emerald-200 text-sm font-semibold text-emerald-800">AD</button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-emerald-100 bg-white p-2 shadow-soft">
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50"><UserCircle2 size={16} />View Profile</button>
                <button className="mt-1 w-full rounded-lg px-2 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
