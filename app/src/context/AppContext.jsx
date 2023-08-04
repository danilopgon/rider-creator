import { createContext, useState, useContext, useEffect } from "react";
import registerRole from "../services/userRolRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import registerVenue from "../services/registerVenue";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();

  const handleRoleSubmit = (values) => {
    setSelectedRole(values);
  };

  useEffect(() => {
    const registerRoleToast = toast.loading("Registrando rol...");
    if (selectedRole) {
      registerRole(selectedRole).then((response) => {
        if (response.status === "success") {
          selectedRole
            ? toast.success(`${selectedRole} registrado!`, {
                id: registerRoleToast,
              })
            : null;
          localStorage.setItem("jwt-token", response.token);
        }
        if (response.status === 400) {
          toast.error(`${response.message}`);
        }
      });
    }

    setSelectedRole(null);
  }, [selectedRole]);

  const handleVenueRegister = (values) => {
    const registerVenueToast = toast.loading("Registrando sala...");

    registerVenue(values).then((response) => {
      if (response.status === 201) {
        toast.success("Sala registrada!", {
          id: registerVenueToast,
        });
        navigate("/dashboard");
      }
      if (response.status === 400) {
        toast.error(`${response.message}`, {
          id: registerVenueToast,
        });
      }
    });
  };

  const store = { selectedRole };
  const actions = { setSelectedRole, handleRoleSubmit, handleVenueRegister };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
