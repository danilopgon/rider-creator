import { Navigate, Outlet } from "react-router-dom";
import useLoginContext from "../context/LoginContext";
import { toast } from "react-hot-toast";

const PrivateRoutes = () => {
  const token = localStorage.getItem("jwt-token");

  if (token === null) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
