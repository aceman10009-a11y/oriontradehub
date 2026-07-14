import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageSkeleton from "./loading/PageSkeleton";

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <PageSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile?.roles?.includes("admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}