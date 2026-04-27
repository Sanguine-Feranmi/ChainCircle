import { Send, Download, RefreshCw, CreditCard } from "lucide-react";

const actions = [
  { icon: Send, label: "Send", color: "from-violet-600 to-violet-700" },
  { icon: Download, label: "Receive", color: "from-blue-600 to-blue-700" },
  { icon: RefreshCw, label: "Swap", color: "from-indigo-600 to-indigo-700" },
  { icon: CreditCard, label: "Buy", color: "from-purple-600 to-purple-700" },
];

export default function QuickActions() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map(({ icon: Icon, label, color }) => (
          <button key={label} className="flex flex-col items-center gap-2 group">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <Icon size={18} className="text-white" />
            </div>
            <span className="text-white/60 text-xs group-hover:text-white transition-colors">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
