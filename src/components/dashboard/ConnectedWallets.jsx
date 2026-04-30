import { Copy, Wallet } from "lucide-react";
import { useState } from "react";
import { useWallet } from "../../context/WalletContext";

export default function ConnectedWallets() {
  const { wallets } = useWallet();
  const [copied, setCopied] = useState(null);

  const copy = (addr, id) => {
    navigator.clipboard.writeText(addr);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const truncate = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">
        Connected Wallets
        <span className="ml-2 text-white/30 text-sm font-normal">({wallets.length})</span>
      </h3>

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <Wallet size={24} className="text-white/20" />
          <p className="text-white/30 text-sm">No wallets connected</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wallets.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600/30 to-blue-600/30 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{w.chain}</div>
                  <div className="flex items-center gap-1 text-white/40 text-xs font-mono">
                    {truncate(w.address)}
                    <button onClick={() => copy(w.address, w.id)} className="hover:text-white/70 transition-colors ml-1">
                      <Copy size={10} />
                    </button>
                    {copied === w.id && <span className="text-green-400">Copied!</span>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-semibold">
                  ${(w.balanceUsd ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-white/40 text-xs">{w.balance}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
