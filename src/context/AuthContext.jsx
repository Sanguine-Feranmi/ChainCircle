import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cc_token");
    const stored = localStorage.getItem("cc_user");
    if (token && stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (userData) => {
    const token = "mock_token_" + Date.now();
    // Preserve joinDate if user already exists in storage
    const existing = localStorage.getItem("cc_user");
    const existingUser = existing ? JSON.parse(existing) : null;
    const merged = {
      ...userData,
      joinDate: existingUser?.joinDate ?? new Date().toISOString(),
    };
    localStorage.setItem("cc_token", token);
    localStorage.setItem("cc_user", JSON.stringify(merged));
    setUser(merged);
  };

  const logout = () => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
