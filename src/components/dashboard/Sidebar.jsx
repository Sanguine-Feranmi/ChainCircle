import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Hexagon, LayoutDashboard, Users, Banknote, UserCircle,
  Wallet, ArrowLeftRight, LogOut, ChevronLeft, ChevronRight, X, Search,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "/dashboard" },
  { icon: Users,           label: "Circle",       path: "/circle" },
  { icon: Banknote,        label: "Payouts",      path: "/payouts" },
  { icon: UserCircle,      label: "Profile",      path: "/profile" },
  { icon: Wallet,          label: "Wallet",       path: "/wallet" },
  { icon: ArrowLeftRight,  label: "Transactions", path: "/transaction" },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch]       = useState("");
  const { logout, user }          = useAuth();
  const navigate                  = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  // Filter nav items by search (only when not collapsed)
  const visibleItems = search.trim()
    ? navItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
    : navItems;

  // Auto-close sidebar on mobile when a nav link is clicked
  const handleNavClick = () => {
    if (window.innerWidth < 1024) onMobileClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onMobileClose} />
      )}

      <aside className={`
        fixed lg:relative z-40 h-full flex flex-col bg-[#0d0d14] border-r border-white/10 transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "w-16" : "w-64"}
      `}>

        {/* ── Logo header ── */}
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-4 border-b border-white/10`}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 text-white font-bold">
              <Hexagon className="text-violet-500 flex-shrink-0" size={22} fill="currentColor" />
              <span>Chain<span className="text-violet-400">Circle</span></span>
            </Link>
          )}
          {collapsed && <Hexagon className="text-violet-500" size={22} fill="currentColor" />}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex text-white/40 hover:text-white p-1 rounded transition-colors"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button onClick={onMobileClose} className="lg:hidden text-white/40 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Search bar (hidden when collapsed) ── */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Search size={13} className="text-white/30 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white/70 text-sm outline-none w-full placeholder:text-white/30"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-white/30 hover:text-white/60 transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Nav ── */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/dashboard"}
              title={collapsed ? label : undefined}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? "text-violet-400" : ""}`} />
                  {!collapsed && <span className="text-sm font-medium">{label}</span>}
                </>
              )}
            </NavLink>
          ))}

          {/* No results state */}
          {search && visibleItems.length === 0 && (
            <p className="text-white/20 text-xs text-center py-4">No results</p>
          )}
        </nav>

        {/* ── Logout ── */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60
                        hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent
                        ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
