import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy, Calendar, Users, DollarSign, Clock,
  Wallet, CreditCard, Bell, Circle, Settings, UserCircle,
  Search, ChevronRight, Plus, CheckCircle2, AlertCircle, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWallet } from "../context/WalletContext";
import { useUser } from "../context/UserContext";
import {
  WalletManagementModal,
  DisconnectWalletsModal,
  DeleteAccountModal,
} from "../components/profile/WalletManagementModals";

const TIER_COLORS = {
  Gold:     { border: "border-amber-400/50",  bg: "bg-yellow-500/20",  icon: "text-yellow-400", badge: "border-amber-400 text-amber-400" },
  Silver:   { border: "border-slate-400/50",  bg: "bg-slate-500/20",   icon: "text-slate-300",  badge: "border-slate-300 text-slate-300" },
  Bronze:   { border: "border-orange-400/50", bg: "bg-orange-500/20",  icon: "text-orange-400", badge: "border-orange-400 text-orange-400" },
  Beginner: { border: "border-violet-400/50", bg: "bg-violet-500/20",  icon: "text-violet-400", badge: "border-violet-400 text-violet-400" },
};

function Toggle({ value, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-violet-600" : "bg-white/10"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-white/70" />
      </div>
      <span className="text-white font-semibold text-sm">{title}</span>
    </div>
  );
}

function MagentaBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 ml-auto block bg-violet-600 hover:bg-violet-500 transition-colors text-white text-xs font-medium px-4 py-2 rounded-xl"
    >
      {children}
    </button>
  );
}

function ChevronRow({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between py-2.5 text-sm hover:opacity-80 transition-opacity ${danger ? "text-red-400/70" : "text-white/60"}`}
    >
      <span>{label}</span>
      <ChevronRight size={14} className="text-white/30" />
    </button>
  );
}

function Divider() {
  return <hr className="border-white/[0.07] my-4" />;
}

// ── Badge detail modal ──────────────────────────────────────────────────────
function BadgeDetailModal({ badge, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xs bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold text-sm">Badge Detail</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 flex flex-col items-center gap-4 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2 ${
            badge.earned ? "border-violet-400/50 bg-violet-500/10" : "border-white/10 bg-white/5"
          }`}>
            {badge.icon}
          </div>
          <div>
            <p className={`font-semibold text-base ${badge.earned ? "text-white" : "text-white/40"}`}>{badge.name}</p>
            <p className="text-white/50 text-sm mt-1">{badge.description}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${
            badge.earned
              ? "text-green-400 border-green-500/30 bg-green-500/5"
              : "text-white/30 border-white/10 bg-white/5"
          }`}>
            {badge.earned ? "Earned" : "Not yet earned"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wallets, totalPortfolio, transactions } = useWallet();
  const {
    profile, notificationSettings, updateNotificationSettings,
    payoutPreferences, updatePayoutPreferences, availableTokens,
    circleHistory, badges, exportUserData, deleteAccountData,
  } = useUser();

  const [walletModal,      setWalletModal]      = useState(false);
  const [disconnectModal,  setDisconnectModal]  = useState(false);
  const [deleteModal,      setDeleteModal]      = useState(false);
  const [selectedBadge,    setSelectedBadge]    = useState(null);

  // Payout preferences local state
  const [prefWallet, setPrefWallet] = useState(payoutPreferences.preferredWallet ?? "");
  const [prefToken,  setPrefToken]  = useState(payoutPreferences.preferredToken  ?? availableTokens[0]);
  const [prefStatus, setPrefStatus] = useState(null); // null | "success" | "error"

  const tierColors      = TIER_COLORS[profile.badgeTier] ?? TIER_COLORS.Beginner;
  const primaryWallet   = wallets.find(w => w.type === "primary");
  const secondaryWallets = wallets.filter(w => w.type === "secondary");

  const toggle = (key) => updateNotificationSettings({ [key]: !notificationSettings[key] });

  const totalSaved      = "$" + totalPortfolio.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const completedCircles = profile.completedCircles ?? 0;
  const onTimeRate      = transactions.length === 0 ? "—" : "0%";

  // Format join date from user or profile
  const rawJoinDate = user?.joinDate ?? profile.joinDate;
  const joinLabel = rawJoinDate
    ? (() => {
        const d = new Date(rawJoinDate);
        return isNaN(d.getTime())
          ? rawJoinDate
          : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      })()
    : "—";

  const statPills = [
    { icon: Calendar,   label: `User since ${joinLabel}` },
    { icon: Users,      label: `${completedCircles} completed circles` },
    { icon: DollarSign, label: `${totalSaved} total saved` },
    { icon: Clock,      label: `${onTimeRate} On-time rate` },
  ];

  const handleDeleteConfirm = () => {
    try {
      deleteAccountData();
      logout();
      navigate("/login");
    } catch {
      // error handled inside modal
    }
  };

  return (
    <div className="p-6 space-y-5 min-h-screen" style={{ background: "#0a0a0f" }}>

      {/* ── Hero Banner ── */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a21caf 60%, #c026d3 100%)" }}
      >
        <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width: "40%" }}>
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice">
            <circle cx="180" cy="100" r="120" fill="none" stroke="white" strokeWidth="40" />
            <circle cx="180" cy="100" r="70"  fill="none" stroke="white" strokeWidth="20" />
          </svg>
        </div>

        <div className="flex items-center gap-4 z-10">
          <div className={`w-16 h-16 rounded-full ${tierColors.bg} border-2 ${tierColors.border} flex items-center justify-center flex-shrink-0`}>
            <Trophy size={28} className={tierColors.icon} />
          </div>
          <div>
            <div className="text-white text-4xl font-extrabold leading-none">
              {profile.badgeScore}<span className="text-white/50 text-2xl">/1000</span>
            </div>
            <div className={`mt-2 inline-block border ${tierColors.badge} text-xs font-semibold px-3 py-0.5 rounded-full`}>
              {profile.badgeTier} Tier
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 z-10 sm:ml-auto">
          {statPills.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2">
              <Icon size={13} className="text-white/70 flex-shrink-0" />
              <span className="text-white text-xs whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Account Settings Card ── */}
      <div className="rounded-2xl p-5" style={{ background: "#111118" }}>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-base">Account Settings</h2>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search size={13} className="text-white/30" />
            <input
              placeholder="Search"
              className="bg-transparent text-white/70 text-sm outline-none w-28 placeholder:text-white/30"
            />
          </div>
        </div>

        {/* 2a — Linked Wallets */}
        <SectionHeader icon={Wallet} title="Linked Wallets" />

        <div className="mb-1">
          <p className="text-white/30 text-xs mb-1 uppercase tracking-wide">Primary</p>
          {primaryWallet ? (
            <div className="flex items-center gap-3 py-2">
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <Wallet size={13} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm font-medium truncate">{primaryWallet.provider}</p>
                <p className="text-white/40 text-xs">{primaryWallet.chain} · {primaryWallet.address.slice(0, 8)}…{primaryWallet.address.slice(-6)}</p>
              </div>
            </div>
          ) : (
            <p className="text-white/30 text-sm py-1">No primary wallet</p>
          )}
        </div>

        <div className="mb-2">
          <p className="text-white/30 text-xs mb-1 uppercase tracking-wide">Secondary</p>
          {secondaryWallets.length > 0 ? secondaryWallets.map(w => (
            <div key={w.id} className="flex items-center gap-3 py-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Wallet size={13} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm font-medium truncate">{w.provider}</p>
                <p className="text-white/40 text-xs">{w.chain} · {w.address.slice(0, 8)}…{w.address.slice(-6)}</p>
              </div>
            </div>
          )) : (
            <p className="text-white/30 text-sm py-1">No secondary wallets</p>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setWalletModal(true)}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 transition-colors text-white text-xs font-medium px-4 py-2 rounded-xl"
          >
            <Plus size={13} /> Add Wallet
          </button>
          <button
            onClick={() => setWalletModal(true)}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 text-xs font-medium px-4 py-2 rounded-xl"
          >
            Link Wallet
          </button>
        </div>

        <Divider />

        {/* 2b — Payout Preferences */}
        <SectionHeader icon={CreditCard} title="Payout Preferences" />

        <div className="space-y-3">
          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide block mb-1">Preferred Receiving Wallet</label>
            {wallets.length === 0 ? (
              <p className="text-white/30 text-sm py-1">No wallets linked yet</p>
            ) : (
              <select
                value={prefWallet}
                onChange={e => setPrefWallet(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm outline-none focus:border-violet-500/50 transition-colors"
              >
                <option value="" className="bg-[#13131a]">Select a wallet</option>
                {wallets.map(w => (
                  <option key={w.id} value={String(w.id)} className="bg-[#13131a]">
                    {w.provider} — {w.address.slice(0, 8)}…{w.address.slice(-6)} ({w.chain})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide block mb-1">Preferred Token</label>
            <select
              value={prefToken}
              onChange={e => setPrefToken(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm outline-none focus:border-violet-500/50 transition-colors"
            >
              {availableTokens.map(t => (
                <option key={t} value={t} className="bg-[#13131a]">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {prefStatus === "success" && (
          <div className="mt-3 flex items-center gap-2 text-green-400 text-xs">
            <CheckCircle2 size={13} /> Preferences saved.
          </div>
        )}
        {prefStatus === "error" && (
          <div className="mt-3 flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={13} /> Please select a wallet first.
          </div>
        )}

        <MagentaBtn onClick={() => {
          if (wallets.length > 0 && !prefWallet) {
            setPrefStatus("error");
            setTimeout(() => setPrefStatus(null), 3000);
            return;
          }
          updatePayoutPreferences({ preferredWallet: prefWallet || null, preferredToken: prefToken });
          setPrefStatus("success");
          setTimeout(() => setPrefStatus(null), 3000);
        }}>Save preferences</MagentaBtn>

        <Divider />

        {/* 2c — Notification Settings */}
        <SectionHeader icon={Bell} title="Notification Settings" />
        <div className="space-y-1">
          {[
            { key: "email", label: "Email notifications" },
            { key: "push",  label: "Push notifications" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-white/60 text-sm">{label}</span>
              <Toggle value={notificationSettings[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
          {[
            { key: "paymentReminders", label: "Payment Reminders" },
            { key: "payoutAlerts",     label: "Payout Alerts" },
            { key: "circleUpdates",    label: "Circle Updates" },
            { key: "marketing",        label: "Marketing" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-2 pl-6">
              <span className="text-white/40 text-sm">{label}</span>
              <Toggle value={notificationSettings[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>

        <Divider />

        {/* 2d — Circle History */}
        <SectionHeader icon={Circle} title="Circle History" />
        {circleHistory.length === 0 ? (
          <p className="text-white/30 text-sm py-2">No circle history yet.</p>
        ) : (
          <div className="space-y-1">
            {circleHistory.map(c => (
              <button
                key={c.id}
                onClick={() => navigate(`/circle?id=${c.id}`)}
                className="w-full flex items-center justify-between py-2.5 text-sm text-white/60 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate">{c.name}</span>
                  {c.completedDate && (
                    <span className="text-white/30 text-xs flex-shrink-0">· {c.completedDate}</span>
                  )}
                </div>
                <ChevronRight size={14} className="text-white/30 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        <Divider />

        {/* 2e — Stats & Achievements */}
        <SectionHeader icon={Settings} title="Stats & Achievements" />
        <div className="space-y-1">
          {[
            { label: "Total Circles",  value: String(completedCircles) },
            { label: "Success rate",   value: transactions.length === 0 ? "—" : "0%" },
            { label: "Longest Streak", value: transactions.length === 0 ? "—" : "0 on-time payments" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2">
              <span className="text-white/60 text-sm">{label}</span>
              <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">{value}</span>
            </div>
          ))}
        </div>

        {/* Badges grid */}
        <div className="mt-3">
          <p className="text-white/30 text-xs uppercase tracking-wide mb-3">Badges Earned</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {badges.map(badge => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all hover:scale-105 ${
                  badge.earned
                    ? "bg-violet-500/10 border-violet-500/30 hover:border-violet-400/50"
                    : "bg-white/[0.03] border-white/10 opacity-40 hover:opacity-60"
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-white/60 text-[10px] text-center leading-tight line-clamp-2">{badge.name}</span>
              </button>
            ))}
          </div>
        </div>

        <Divider />

        {/* 2f — Account Action */}
        <SectionHeader icon={UserCircle} title="Account Action" />
        <ChevronRow label="Export Data" onClick={exportUserData} />
        <ChevronRow label="Disconnect wallets" onClick={() => setDisconnectModal(true)} />
        <button
          onClick={() => setDeleteModal(true)}
          className="w-full flex items-center justify-between py-2.5 text-sm text-red-400/70 hover:opacity-80 transition-opacity"
        >
          <span>Delete account</span>
          <ChevronRight size={14} className="text-white/30" />
        </button>
      </div>

      {/* ── Modals ── */}
      {walletModal     && <WalletManagementModal  onClose={() => setWalletModal(false)} />}
      {disconnectModal && <DisconnectWalletsModal onClose={() => setDisconnectModal(false)} />}
      {deleteModal     && (
        <DeleteAccountModal
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {selectedBadge   && <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />}
    </div>
  );
}
