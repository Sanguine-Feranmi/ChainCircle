import SharedWalletComponent from "../components/dashboard/SharedWalletComponent";

export default function WalletPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet</h2>
          <p className="text-white/40 text-sm mt-1">All your connected wallets and asset balances.</p>
        </div>
      </div>

      <SharedWalletComponent mode="full" />
    </div>
  );
}
