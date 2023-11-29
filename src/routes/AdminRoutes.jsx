/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import ForbiddenPage from "../utils/error/ForbiddenPage";

const AdminRoutes = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, loading } = useAuth();

  if (loading) return;

  if (!loading && !user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  if (isLoading) return;

  if (!isLoading && !isAdmin) {
    return <ForbiddenPage />;
  }

  return children;
};

export default AdminRoutes;
