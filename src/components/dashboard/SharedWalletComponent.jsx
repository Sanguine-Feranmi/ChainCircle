import { useState } from "react";
import { Wallet, Plus, Copy, ExternalLink, Trash2 } from "lucide-react";
import { useWallet } from "../../context/WalletContext";
import { WalletManagementModal } from "../profile/WalletManagementModals";
import TransactionHistory from "./TransactionHistory";

const chainColors = {
  Ethereum:  "from-blue-600 to-indigo-600",
  Bitcoin:   "from-orange-500 to-yellow-500",
  Polygon:   "from-violet-600 to-purple-600",
  "BNB Chain": "from-yellow-500 to-amber-500",
  Base:      "from-blue-500 to-cyan-500",
  Arbitrum:  "from-blue-700 to-blue-500",
};

const typeLabel = {
  primary:   { text: "Primary",   cls: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  secondary: { text: "Secondary", cls: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
};

function WalletTypeBadge({ type }) {
  const t = typeLabel[type] ?? typeLabel.secondary;
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${t.cls}`}>
      {t.text}
    </span>
  );
}

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SharedWalletComponent({
  mode = "full",        // "full" | "condensed"
  showCreateButton = true,
  className = "",
}) {
  const { wallets, totalPortfolio, removeWallet } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(null);

  const copy = (addr, id) => {
    navigator.clipboard.writeText(addr);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const truncAddr = (addr) => `${addr.slice(0, 8)}…${addr.slice(-6)}`;

  // ── Condensed mode (Circle page Wallet tab) ───────────────────────────
  if (mode === "condensed") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm">Connected Wallets</h3>
            <p className="text-white/40 text-xs">
              {wallets.length} wallet{wallets.length !== 1 ? "s" : ""} • {fmt(totalPortfolio)}
            </p>
          </div>
          {showCreateButton && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs px-3 py-2 rounded-lg transition-all"
            >
              <Plus size={12} /> Add Wallet
            </button>
          )}
        </div>

        {wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
              <Wallet size={20} className="text-violet-400/50" />
            </div>
            <div className="text-center">
              <p className="text-white/50 text-xs font-medium">No wallets connected</p>
              <p className="text-white/25 text-xs mt-0.5">Add your first wallet to get started</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {wallets.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-violet-500/30 transition-all"
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${chainColors[w.chain] ?? "from-violet-600 to-blue-600"} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Wallet size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-xs font-medium">{w.chain}</span>
                      <WalletTypeBadge type={w.type} />
                      <span className="text-white/40 text-xs font-mono">{truncAddr(w.address)}</span>
                    </div>
                    <div className="text-white/70 text-xs">{fmt(w.balanceUsd ?? 0)}</div>
                  </div>
                </div>
              ))}
              {wallets.length > 3 && (
                <p className="text-white/40 text-xs text-center py-1">
                  +{wallets.length - 3} more wallet{wallets.length - 3 !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <TransactionHistory mode="condensed" />
          </>
        )}

        {showModal && <WalletManagementModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  // ── Full mode (Wallet page) ───────────────────────────────────────────
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Portfolio banner */}
      <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/20 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-1">Total Portfolio Value</p>
        <p className="text-4xl font-bold text-white">{fmt(totalPortfolio)}</p>
      </div>

      {showCreateButton && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20"
          >
            <Plus size={15} /> Add Wallet
          </button>
        </div>
      )}

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center">
            <Wallet size={28} className="text-violet-400/50" />
          </div>
          <div className="text-center">
            <p className="text-white/50 text-sm font-medium">No wallets connected</p>
            <p className="text-white/25 text-xs mt-1">Add your first wallet to get started</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            <Plus size={15} /> Add Wallet
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((w) => (
              <div
                key={w.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${chainColors[w.chain] ?? "from-violet-600 to-blue-600"} rounded-xl flex items-center justify-center`}
                    >
                      <Wallet size={18} className="text-white" />
                    </div>
                    <WalletTypeBadge type={w.type} />
                  </div>
                  <button
                    onClick={() => removeWallet(w.id)}
                    className="text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="text-white font-semibold mb-0.5">{w.chain}</div>
                <div className="text-white/40 text-xs mb-1">{w.provider}</div>

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-white/40 text-xs font-mono">{truncAddr(w.address)}</span>
                  <button
                    onClick={() => copy(w.address, w.id)}
                    className="text-white/30 hover:text-violet-400 transition-colors"
                  >
                    <Copy size={11} />
                  </button>
                  {copied === w.id && <span className="text-green-400 text-xs">Copied!</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">{fmt(w.balanceUsd ?? 0)}</div>
                    <div className="text-white/40 text-xs">{w.balance}</div>
                  </div>
                  <button className="text-white/30 hover:text-violet-400 transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>

                {/* Coin count indicator */}
                {w.coins && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-white/30 text-xs">{w.coins.length} assets available</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <TransactionHistory mode="full" />
        </>
      )}

      {showModal && <WalletManagementModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
