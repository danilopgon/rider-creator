import { createContext, useState, useContext, useEffect } from "react";
import registerRole from "../services/userRolRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import registerVenue from "../services/registerVenue";
import getDefaultGear from "../services/getDefaultGear";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [defaultGear, setDefaultGear] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const setGear = async () => {
        const response = await getDefaultGear();
        const data = await response.json();
        setDefaultGear(data);
      };
      setGear();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRoleSelection = (values) => {
    setSelectedRole(values);
  };

  const handleRoleSubmit = async () => {
    const registerRoleToast = toast.loading("Registrando rol...");
    const response = await registerRole(store.selectedRole);
    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("jwt-token", data.token);
      toast.success("¡Rol registrado!", {
        id: registerRoleToast,
      });
      setSelectedRole(null);
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } else {
      toast.error("Error al registrar rol", { id: registerRoleToast });
    }
  };

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

  const roleTranslation = () => {
    switch (selectedRole) {
      case "manager":
        return "Promotor";
      case "technician":
        return "Técnico";
      case "musician":
        return "Músico";
      default:
        return "Rol no encontrado";
    }
  };

  const store = { selectedRole, defaultGear };
  const actions = {
    setSelectedRole,
    handleRoleSelection,
    handleRoleSubmit,
    handleVenueRegister,
    roleTranslation,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
