import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/common/Spinner";

export const ProtectedLayout = ({ requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  //   if (loading) return <div>Loading...</div>;
  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // 🌟 El Outlet renderiza el componente hijo de la ruta
  return <Outlet />;
};
