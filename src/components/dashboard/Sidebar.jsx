import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Hexagon, LayoutDashboard, Users, Banknote, UserCircle, Wallet, ArrowLeftRight, LogOut, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users,           label: "Circle",    path: "/circle" },
  { icon: Banknote,        label: "Payouts",   path: "/payouts" },
  { icon: UserCircle,      label: "Profile",   path: "/profile" },
  { icon: Wallet,          label: "Wallet",    path: "/wallet" },
  { icon: ArrowLeftRight,  label: "Transactions", path: "/transaction" },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  // Derive initials from auth user name
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onMobileClose} />}

      <aside className={`
        fixed lg:relative z-40 h-full flex flex-col bg-[#0d0d14] border-r border-white/10 transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "w-16" : "w-64"}
      `}>
        {/* Logo header */}
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-4 border-b border-white/10`}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 text-white font-bold">
              <Hexagon className="text-violet-500 flex-shrink-0" size={22} fill="currentColor" />
              <span>Chain<span className="text-violet-400">Circle</span></span>
            </Link>
          )}
          {collapsed && <Hexagon className="text-violet-500" size={22} fill="currentColor" />}
          <div className="flex items-center gap-1">
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex text-white/40 hover:text-white p-1 rounded transition-colors">
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button onClick={onMobileClose} className="lg:hidden text-white/40 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* User section — dynamic from auth */}
        {/* <div className={`p-4 border-b border-white/10 ${collapsed ? "flex justify-center" : ""}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-white text-sm font-semibold truncate">{user?.name ?? "—"}</div>
                <div className="text-white/40 text-xs truncate">{user?.email ?? "—"}</div>
              </div>
            )}
          </div>
        </div> */}

        {/* Nav — NavLink for active state */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/dashboard"}
              title={collapsed ? label : undefined}
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
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent ${collapsed ? "justify-center" : ""}`}>
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
