import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import type { Admin, ApiResponse } from "../types/api";

type AuthContextValue = {
  admin: Admin | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await api<ApiResponse<Admin>>("/api/admin/me");
      setAdmin(res.data);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api("/api/admin/logout", { method: "POST" });
    setAdmin(null);
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(() => ({ admin, loading, refresh, logout }), [admin, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};