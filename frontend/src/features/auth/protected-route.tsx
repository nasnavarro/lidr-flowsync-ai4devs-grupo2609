import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth-context";

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === "idle" || status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
