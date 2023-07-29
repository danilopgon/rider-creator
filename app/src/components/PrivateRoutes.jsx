import { Navigate, Outlet } from "react-router-dom";
import useLoginContext from "../context/LoginContext";
import { toast } from "react-hot-toast";

const PrivateRoutes = () => {
  const { store } = useLoginContext();

  if (store.token === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
