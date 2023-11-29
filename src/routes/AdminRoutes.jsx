/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AdminRoutes = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, loading } = useAuth();

  if (loading) return;

  if (!loading && !user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  if (isLoading) return;

  if (!isLoading && !isAdmin) {
    toast.error("Forbidden Access!!!");
    return;
  }

  return children;
};

export default AdminRoutes;
