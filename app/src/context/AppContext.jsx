import { createContext, useState, useContext } from "react";
import registerRole from "../services/userRolRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import registerVenue from "../services/registerVenue";
import setUserImgProfile from "../services/setUserImgProfile";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const [imgProfile, setImgProfile] = useState(null);

  const navigate = useNavigate();

  const handleRoleSelection = (values) => {
    setSelectedRole(values);
  };

  const handleRoleSubmit = async () => {
    const registerRoleToast = toast.loading("Registrando rol...");
    const response = await registerRole(store.selectedRole);
    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("jwt-token", data.token);
      toast.success("Rol registrado!", {
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

  //imagen de perfil
  const handleSaveImgProfile = async () => {
    setUserImgProfile(imgProfile)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Imagen guardada!");
        setImgProfile(null);
      }
      if (response.status === 400) {
        toast.error(`${response.message}`);
      }
    })
    toast.loading("Guardando imagen...");
  }

  const handleChargeImgProfile = (e) => {
    console.log('click');
    
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No se ha seleccionado ninguna imagen");
      return;
    }
    
    if (e.target.files.length > 1) {
      toast.error("Solo se puede seleccionar una imagen");
      return;
    }
    
    const file = e.target.files[0];
    setImgProfile(file);
    toast.success("Imagen cargada");
  };


  //




  const store = { selectedRole };
  const actions = {
    setSelectedRole,
    handleRoleSelection,
    handleRoleSubmit,
    handleVenueRegister,
    roleTranslation,
    handleSaveImgProfile,
    handleChargeImgProfile,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
