import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authenticate, getCurrentUser } from "../api/auth";
import { tokenKey } from "../api/client";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    getCurrentUser(token)
      .then(({ data }) => setUser(data.data.user))
      .catch(() => {
        localStorage.removeItem(tokenKey);
        setToken(null);
        setUser(null);
      });
  }, [token]);

  const authenticateUser = useCallback(async (mode, form) => {
    setLoading(true);

    try {
      const { data } = await authenticate(mode, form);
      localStorage.setItem(tokenKey, data.data.token);
      setToken(data.data.token);
      setUser(data.data.user);
      toast.success(mode === "login" ? "Welcome back." : "Your Linkra account is ready.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(tokenKey);
    setToken(null);
    setUser(null);
    toast.success("You have been signed out.");
  }, []);

  const value = useMemo(() => ({
    token,
    user,
    loading,
    authenticateUser,
    logout,
  }), [token, user, loading, authenticateUser, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
