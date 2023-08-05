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
    if (selectedRole) {
      registerRole(selectedRole)
        .then((response) => {
          if (response.status === "success") {
            selectedRole
              ? toast.success(`${selectedRole} registrado!`, {
                id: registerRole,
              })
              : null;
          }
          if (response.status === 400) {
            toast.error(`${response.message}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
