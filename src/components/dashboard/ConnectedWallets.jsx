import { mockWallets } from "../../data/mockData";
import { Copy } from "lucide-react";

export default function ConnectedWallets() {
  const truncate = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Connected Wallets</h3>
      <div className="space-y-3">
        {mockWallets.map((w) => (
          <div key={w.id} className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-violet-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600/30 to-blue-600/30 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">{w.chain}</div>
                <div className="flex items-center gap-1 text-white/40 text-xs font-mono">
                  {truncate(w.address)}
                  <button className="hover:text-white/70 transition-colors ml-1">
                    <Copy size={10} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-semibold">{w.usd}</div>
              <div className="text-white/40 text-xs">{w.balance}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
