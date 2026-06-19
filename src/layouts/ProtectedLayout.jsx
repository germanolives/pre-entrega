import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/common/Spinner";
import { Helmet } from "react-helmet-async";

export const ProtectedLayout = ({ requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  //   if (loading) return <div>Loading...</div>;
  if (loading) return <Spinner />;

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Access denied | Tienda S.A.U.</title>
        </Helmet>
        <Navigate to="/login" state={{ from: location.pathname }} replace />
      </>
    );
  }

  if (requiredRole && user.rol !== requiredRole) {
    return (
      <>
        <Helmet>
          <title>Access denied | Tienda S.A.U.</title>
        </Helmet>
        <Navigate to="/" replace />
      </>
    );
  }

  // 🌟 El Outlet renderiza el componente hijo de la ruta
  return <Outlet />;
};
