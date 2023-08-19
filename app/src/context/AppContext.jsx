import { createContext, useState, useContext, useEffect } from "react";
import registerRole from "../services/userRolRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import registerVenue from "../services/registerVenue";
import getDefaultGear from "../services/getDefaultGear";
import translateInstrumentMap from "../utils/translateInstrument";
import setUserImgProfile from "../services/setUserImgProfile";
import updateUserImgProfile from "../services/updateUserImgProfile";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [defaultGear, setDefaultGear] = useState([]);
  const [translatedGear, setTranslatedGear] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [imgProfile, setImgProfile] = useState(null);
  const [selectNewRole, setSelectNewRole] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (defaultGear.length !== 0) {
      return;
    }
    try {
      const setGear = async () => {
        const response = await getDefaultGear();
        const data = await response.json();
        setDefaultGear(data);
        const spanishGear = data.map((gear) => {
          return translateInstrumentMap[gear.type];
        });
        setTranslatedGear(spanishGear);
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

  //imagen de perfil
  const handleSaveImgProfile = async () => {
    setUserImgProfile(imgProfile).then((response) => {
      if (response.status === 200) {
        toast.success("Imagen guardada!");
        setImgProfile(null);
      }
      if (response.status === 400) {
        toast.error(`${response.message}`);
      }
    });
    toast.loading("Guardando imagen...");
  };

  const handleChargeImgProfile = (e) => {
    console.log("click");

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

  const handleUpdateImgProfile = () => {
    updateUserImgProfile(imgProfile).then((response) => {
      if (response.status === 200) {
        toast.success("Imagen actualizada!");
        setImgProfile(null);
      }
      if (response.status === 400) {
        toast.error(`${response.message}`);
      }
    });
  };

  const handleNewRoleSelection = () => {
    setSelectNewRole(true);
  };

  const store = {
    selectedRole,
    defaultGear,
    isDesktop,
    isMobile,
    isTablet,
    translatedGear,
    selectNewRole,
  };

  const actions = {
    setSelectedRole,
    handleRoleSelection,
    handleRoleSubmit,
    handleVenueRegister,
    roleTranslation,
    setIsDesktop,
    setIsMobile,
    setIsTablet,
    setTranslatedGear,
    handleSaveImgProfile,
    handleChargeImgProfile,
    handleUpdateImgProfile,
    setSelectNewRole,
    handleNewRoleSelection,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
