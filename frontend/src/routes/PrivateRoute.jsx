import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth check is done
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );
  }

  // 🚪 If no user after loading, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔓 If user exists, render children
  return children;
};

export default PrivateRoute;
