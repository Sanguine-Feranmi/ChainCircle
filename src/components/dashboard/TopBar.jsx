import { useState } from "react";
import { Bell, Search, ChevronDown, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopBar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <header className="h-16 bg-[#0d0d14] border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: hamburger (mobile) + user identity */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-white/60 hover:text-white">
          <Menu size={20} />
        </button>
        {/* User section */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="hidden sm:block">
            <div className="text-white text-sm font-semibold leading-tight">{user?.name ?? "—"}</div>
            <div className="text-white/40 text-xs leading-tight">{user?.email ?? "—"}</div>
          </div>
        </div>
      </div>

      {/* Right: search + bell + profile dropdown */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <Search size={14} className="text-white/40" />
          <input placeholder="Search..." className="bg-transparent text-white/70 text-sm outline-none w-40 placeholder:text-white/30" />
        </div>

        <button className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
        </button>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-xl transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <ChevronDown size={14} className="text-white/40 hidden sm:block" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-[#13131a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <div className="text-white text-sm font-semibold">{user?.name}</div>
                <div className="text-white/40 text-xs">{user?.email}</div>
              </div>
              <button onClick={() => { logout(); navigate("/"); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
