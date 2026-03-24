import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { token } = useAuthStore();

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}