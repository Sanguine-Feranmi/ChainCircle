import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user } = useAuth();
  
  // User profile data
  const [profile, setProfile] = useState({
    badgeScore: 0,
    badgeTier: "Beginner",
    joinDate: new Date().toISOString().split('T')[0],
    completedCircles: 0,
    successRate: 0,
    longestStreak: 0,
    onTimeRate: 0,
  });

  // Payout preferences
  const [payoutPreferences, setPayoutPreferences] = useState({
    preferredWallet: null,
    preferredToken: "USDC",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: false,
    push: true,
    paymentReminders: true,
    payoutAlerts: true,
    circleUpdates: true,
    marketing: false,
  });

  // Badges and achievements
  const [badges, setBadges] = useState([
    { id: 1, name: "First Circle", description: "Created your first circle", earned: false, icon: "🎯" },
    { id: 2, name: "Reliable Member", description: "100% on-time payment rate", earned: false, icon: "⏰" },
    { id: 3, name: "Circle Leader", description: "Led 5 successful circles", earned: false, icon: "👑" },
    { id: 4, name: "Savings Master", description: "Saved over $10,000", earned: false, icon: "💰" },
    { id: 5, name: "Community Builder", description: "Invited 10+ members", earned: false, icon: "🤝" },
  ]);

  // Circle history
  const [circleHistory, setCircleHistory] = useState([]);

  // Available tokens for payout preferences
  const availableTokens = ["USDC", "USDT", "ETH", "BTC", "MATIC"];

  // Load user data from localStorage on mount
  useEffect(() => {
    if (user) {
      const storedProfile = localStorage.getItem(`profile_${user.email}`);
      const storedPreferences = localStorage.getItem(`preferences_${user.email}`);
      const storedNotifications = localStorage.getItem(`notifications_${user.email}`);
      const storedBadges = localStorage.getItem(`badges_${user.email}`);
      const storedHistory = localStorage.getItem(`history_${user.email}`);

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedPreferences) {
        setPayoutPreferences(JSON.parse(storedPreferences));
      }
      if (storedNotifications) {
        setNotificationSettings(JSON.parse(storedNotifications));
      }
      if (storedBadges) {
        setBadges(JSON.parse(storedBadges));
      }
      if (storedHistory) {
        setCircleHistory(JSON.parse(storedHistory));
      }
    }
  }, [user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
    }
  }, [profile, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`preferences_${user.email}`, JSON.stringify(payoutPreferences));
    }
  }, [payoutPreferences, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`notifications_${user.email}`, JSON.stringify(notificationSettings));
    }
  }, [notificationSettings, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`badges_${user.email}`, JSON.stringify(badges));
    }
  }, [badges, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`history_${user.email}`, JSON.stringify(circleHistory));
    }
  }, [circleHistory, user]);

  // Calculate badge tier based on score
  const calculateBadgeTier = (score) => {
    if (score >= 800) return "Gold";
    if (score >= 600) return "Silver";
    if (score >= 300) return "Bronze";
    return "Beginner";
  };

  // Update profile data
  const updateProfile = (updates) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...updates };
      if (updates.badgeScore !== undefined) {
        newProfile.badgeTier = calculateBadgeTier(updates.badgeScore);
      }
      return newProfile;
    });
  };

  // Update payout preferences
  const updatePayoutPreferences = (preferences) => {
    setPayoutPreferences(prev => ({ ...prev, ...preferences }));
  };

  // Update notification settings
  const updateNotificationSettings = (settings) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  // Award badge
  const awardBadge = (badgeId) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId ? { ...badge, earned: true } : badge
    ));
  };

  // Add circle to history
  const addCircleToHistory = (circle) => {
    setCircleHistory(prev => [
      {
        ...circle,
        id: Date.now(),
        completedDate: new Date().toISOString().split('T')[0],
      },
      ...prev
    ]);
  };

  // Export user data
  const exportUserData = () => {
    const data = {
      profile,
      payoutPreferences,
      notificationSettings,
      badges,
      circleHistory,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chain-data-${user?.email || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Delete account data
  const deleteAccountData = () => {
    if (user) {
      localStorage.removeItem(`profile_${user.email}`);
      localStorage.removeItem(`preferences_${user.email}`);
      localStorage.removeItem(`notifications_${user.email}`);
      localStorage.removeItem(`badges_${user.email}`);
      localStorage.removeItem(`history_${user.email}`);
    }
  };

  const value = {
    profile,
    payoutPreferences,
    notificationSettings,
    badges,
    circleHistory,
    availableTokens,
    updateProfile,
    updatePayoutPreferences,
    updateNotificationSettings,
    awardBadge,
    addCircleToHistory,
    exportUserData,
    deleteAccountData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};