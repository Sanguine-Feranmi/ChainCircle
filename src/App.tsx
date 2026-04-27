import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import OverviewPage from "./pages/OverviewPage";
import CirclePage from "./pages/CirclePage";
import PayoutsPage from "./pages/PayoutsPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import TransactionPage from "./pages/TransactionPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected shell — renders Sidebar + TopBar + <Outlet> */}
          <Route element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
            <Route path="/dashboard"   element={<OverviewPage />} />
            <Route path="/circle"      element={<CirclePage />} />
            <Route path="/payouts"     element={<PayoutsPage />} />
            <Route path="/profile"     element={<ProfilePage />} />
            <Route path="/wallet"      element={<WalletPage />} />
            <Route path="/transaction" element={<TransactionPage />} />
          </Route>

          {/* Fallback — redirect unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
