import { useState } from "react";
import { Bell, CheckCheck, Trash2, Circle, ArrowRight } from "lucide-react";
import { useNotifications } from "../context/NotificationsContext";
import { useNavigate } from "react-router-dom";

const categoryColors = {
  "Circle payout received":  { bg: "bg-green-500/10",  icon: "text-green-400",  dot: "bg-green-400"  },
  "Contribution reminder":   { bg: "bg-yellow-500/10", icon: "text-yellow-400", dot: "bg-yellow-400" },
  "New member joined":       { bg: "bg-blue-500/10",   icon: "text-blue-400",   dot: "bg-blue-400"   },
  "Transaction confirmed":   { bg: "bg-violet-500/10", icon: "text-violet-400", dot: "bg-violet-400" },
  "Wallet connected":        { bg: "bg-violet-500/10", icon: "text-violet-400", dot: "bg-violet-400" },
};

const defaultColor = { bg: "bg-white/5", icon: "text-white/40", dot: "bg-white/40" };

const filters = ["All", "Unread", "Read"];

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useNotifications();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected]         = useState(null);
  const navigate                        = useNavigate();

  const filtered = notifications.filter((n) => {
    if (activeFilter === "Unread") return !n.read;
    if (activeFilter === "Read")   return n.read;
    return true;
  });

  const unread = notifications.filter((n) => !n.read).length;

  const handleClick = (n) => {
    markRead(n.id);
    setSelected(n.id);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          <p className="text-white/40 text-sm mt-1">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300
                       bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-xl transition-all"
          >
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === f
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "text-white/50 hover:text-white"
            }`}
          >
            {f}
            {f === "Unread" && unread > 0 && (
              <span className="ml-1.5 text-xs bg-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded-full">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Notification list ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
            <Bell size={28} className="text-white/20" />
          </div>
          <p className="text-white/30 text-sm">No {activeFilter.toLowerCase()} notifications</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const colors  = categoryColors[n.title] ?? defaultColor;
            const isActive = selected === n.id;

            return (
              <div
                key={n.id}
                onClick={() => handleClick(n)}
                className={`group relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer
                            transition-all duration-200
                            ${isActive
                              ? "bg-violet-500/10 border-violet-500/30"
                              : !n.read
                              ? "bg-white/[0.04] border-white/10 hover:border-violet-500/20 hover:bg-white/[0.07]"
                              : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            }`}
              >
                {/* Icon bubble */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
                  <Bell size={16} className={colors.icon} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {/* Unread dot */}
                    {!n.read && (
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    )}
                    <p className={`text-sm font-semibold truncate ${!n.read ? "text-white" : "text-white/60"}`}>
                      {n.title}
                    </p>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{n.body}</p>
                  <p className="text-white/20 text-xs mt-1.5">{n.time}</p>
                </div>

                {/* Navigate arrow — appears on hover */}
                <button
                  onClick={(e) => { e.stopPropagation(); markRead(n.id); navigate(n.href); }}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
                             w-8 h-8 rounded-lg bg-white/5 hover:bg-violet-500/20
                             flex items-center justify-center"
                >
                  <ArrowRight size={14} className="text-white/50 hover:text-violet-400" />
                </button>

                {/* Unread badge pill */}
                {!n.read && (
                  <span className="absolute top-3 right-3 text-[10px] bg-violet-500/20 text-violet-300
                                   border border-violet-500/20 px-2 py-0.5 rounded-full font-medium
                                   group-hover:opacity-0 transition-opacity">
                    New
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
