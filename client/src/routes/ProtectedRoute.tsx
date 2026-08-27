import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/AuthProvider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { admin, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};