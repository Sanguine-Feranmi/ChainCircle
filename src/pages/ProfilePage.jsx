import { useState } from "react";
import { UserCircle, Shield, Bell, Palette, Key, Camera } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const settingsSections = [
  {
    id: "security",
    icon: Shield,
    title: "Security",
    desc: "Manage your password, 2FA, and active sessions.",
    fields: [
      { label: "Two-Factor Authentication", type: "toggle", value: true },
      { label: "Login Notifications",       type: "toggle", value: true },
      { label: "Session Timeout",           type: "select", options: ["15 min", "30 min", "1 hour", "Never"] },
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    desc: "Choose what alerts you receive.",
    fields: [
      { label: "Transaction Alerts",  type: "toggle", value: true  },
      { label: "Payout Reminders",    type: "toggle", value: true  },
      { label: "Circle Activity",     type: "toggle", value: false },
      { label: "Marketing Emails",    type: "toggle", value: false },
    ],
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    desc: "Customize your dashboard look.",
    fields: [
      { label: "Theme",         type: "select", options: ["Dark", "Light", "System"] },
      { label: "Accent Color",  type: "select", options: ["Violet", "Blue", "Green", "Orange"] },
    ],
  },
  {
    id: "api",
    icon: Key,
    title: "API Keys",
    desc: "Manage developer access tokens.",
    fields: [
      { label: "Read-Only Key",  type: "key", value: "cc_ro_••••••••••••••••" },
      { label: "Full-Access Key", type: "key", value: "cc_fa_••••••••••••••••" },
    ],
  },
];

function Toggle({ initial }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)}
      className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-violet-600" : "bg-white/10"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const [activeSection, setActiveSection] = useState("security");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <p className="text-white/40 text-sm mt-1">Manage your account details and settings.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-bold">{user?.name ?? "—"}</h3>
            <p className="text-white/40 text-sm">{user?.email ?? "—"}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full">Pro Member</span>
              <span className="text-xs text-white/30">Joined Jan 2025</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm px-4 py-2 rounded-xl transition-all">
            <UserCircle size={14} /> Edit Profile
          </button>
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
          {[
            { label: "Full Name",    value: user?.name  ?? "" },
            { label: "Email",        value: user?.email ?? "" },
            { label: "Phone",        value: "+1 (555) 000-0000" },
            { label: "Country",      value: "United States" },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
              <input defaultValue={value}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Settings section */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Shield size={18} className="text-violet-400" /> Settings
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Settings nav */}
          <div className="flex flex-row lg:flex-col gap-1 bg-white/5 border border-white/10 rounded-2xl p-2 h-fit">
            {settingsSections.map(({ id, icon: Icon, title }) => (
              <button key={id} onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${
                  activeSection === id
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}>
                <Icon size={15} className={activeSection === id ? "text-violet-400" : ""} />
                <span className="hidden sm:inline">{title}</span>
              </button>
            ))}
          </div>

          {/* Settings panel */}
          {settingsSections.filter((s) => s.id === activeSection).map(({ icon: Icon, title, desc, fields }) => (
            <div key={title} className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-9 h-9 bg-violet-500/10 rounded-xl flex items-center justify-center">
                  <Icon size={16} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">{title}</div>
                  <div className="text-white/40 text-xs">{desc}</div>
                </div>
              </div>
              {fields.map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{f.label}</span>
                  {f.type === "toggle" && <Toggle initial={f.value} />}
                  {f.type === "select" && (
                    <select className="bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg px-3 py-1.5 outline-none">
                      {f.options.map((o) => <option key={o} className="bg-[#13131a]">{o}</option>)}
                    </select>
                  )}
                  {f.type === "key" && (
                    <div className="flex items-center gap-2">
                      <code className="text-white/40 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-lg">{f.value}</code>
                      <button className="text-violet-400 hover:text-violet-300 text-xs transition-colors">Reveal</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
