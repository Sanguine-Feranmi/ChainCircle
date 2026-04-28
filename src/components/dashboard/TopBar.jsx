import { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Menu, LogOut, Wallet, Copy, Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";
import { useWallet } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ address, onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
                    bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl
                    px-5 py-4 flex items-center gap-4 min-w-[320px] max-w-[90vw]">
      <Wallet size={16} className="text-violet-400 flex-shrink-0" />
      <span className="text-white/60 text-xs font-mono flex-1 truncate">{address}</span>
      <button onClick={copy}
        className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors flex-shrink-0">
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}

// ── Wallet pill ───────────────────────────────────────────────────────────────
const truncate = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export default function TopBar({ onMenuClick }) {
  const [profileOpen, setProfileOpen]   = useState(false);
  const [bellOpen,    setBellOpen]      = useState(false);
  const [toast,       setToast]         = useState(false);
  const [activeNotif, setActiveNotif]   = useState(null);

  const { logout, user }                        = useAuth();
  const { notifications, markRead, unreadCount } = useNotifications();
  const { primaryWallet }                        = useWallet();
  const navigate                                = useNavigate();

  const profileRef = useRef(null);
  const bellRef    = useRef(null);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  // Close both dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (bellRef.current    && !bellRef.current.contains(e.target))    setBellOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotifClick = (notif) => {
    markRead(notif.id);
    setActiveNotif(notif.id);
    setBellOpen(false);
    navigate(notif.href);
  };

  return (
    <>
      <header className="h-16 bg-[#0d0d14] border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">

        {/* ── Left: hamburger + user identity ── */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden text-white/60 hover:text-white">
            <Menu size={20} />
          </button>
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

        {/* ── Right: wallet pill + bell + avatar ── */}
        <div className="flex items-center gap-3">

          {/* Wallet address pill — from global WalletContext */}
          {primaryWallet && (
            <button
              onClick={() => setToast(true)}
              className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10
                         rounded-full px-4 py-2 hover:border-violet-500/40 transition-colors group"
            >
              <Wallet size={13} className="text-violet-400 flex-shrink-0" />
              <span className="text-white/60 text-xs font-mono group-hover:text-white/80 transition-colors w-28 truncate">
                {truncate(primaryWallet.address)}
              </span>
            </button>
          )}

          {/* Bell with submenu */}
          <div ref={bellRef} className="relative">
            <button
              onClick={() => { setBellOpen((o) => !o); setProfileOpen(false); }}
              className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
              )}
            </button>

            {bellOpen && (
              <div className="absolute right-0 top-12 w-80 bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {/* Last 3 notifications */}
                <div className="divide-y divide-white/5">
                  {notifications.slice(0, 3).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                                  hover:bg-white/5
                                  ${activeNotif === n.id ? "bg-violet-500/10" : ""}
                                  ${!n.read ? "bg-white/[0.03]" : ""}`}
                    >
                      {/* Unread dot */}
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${!n.read ? "bg-violet-400" : "bg-transparent"}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-medium truncate">{n.title}</p>
                        {/* truncate — single line, no wrap */}
                        <p className="text-white/40 text-xs truncate">{n.body}</p>
                        <p className="text-white/20 text-xs mt-0.5">{n.time}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* View all */}
                <div className="px-4 py-3 border-t border-white/10">
                  <button
                    onClick={() => { setBellOpen(false); navigate("/notifications"); }}
                    className="w-full text-center text-violet-400 hover:text-violet-300 text-xs font-medium transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar dropdown — toggle + outside-click */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setProfileOpen((o) => !o); setBellOpen(false); }}
              className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <ChevronDown
                size={14}
                className={`text-white/40 hidden sm:block transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 w-48 bg-[#13131a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="text-white text-sm font-semibold">{user?.name}</div>
                  <div className="text-white/40 text-xs">{user?.email}</div>
                </div>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Toast — full wallet address + copy */}
      {toast && primaryWallet && <Toast address={primaryWallet.address} onClose={() => setToast(false)} />}
    </>
  );
}
