import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";

import login from "../services/login";
import signup from "../services/signup";
import checkTokenValidity from "../services/checkTokenValidity";
import recovery from "../services/recovery";
import changePassword from "../services/changePassword";
import activeAccount from "../services/activeAccount";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [musicianID, setMusicianID] = useState(null);
  const [venueManagerID, setVenueManagerID] = useState(null);
  const [technicianID, setTechnicianID] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (userInfo) => {
    const loadingLogin = toast.loading("Conectando...");
    try {
      const response = await login(userInfo);

      if (response.status === 404) {
        toast.error("¡Aún no estás registrado!", {
          id: loadingLogin,
        });
        return;
      }

      if (response.status === 403) {
        toast.error("Tu cuenta no está activada", {
          id: loadingLogin,
        });
        return;
      }

      if (response.status !== 200) {
        toast.error("Error al conectar. Comprueba tus datos", {
          id: loadingLogin,
        });
        return;
      }

      handleRolePermissions(localStorage.getItem("jwt-token"));
      setLoggedIn(true);

      toast.success("Estás conectado", {
        id: loadingLogin,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error al conectar", {
        id: loadingLogin,
      });
    }
  };

  const handleValidationLogin = () => {
    const loadingLogin = toast.loading("Validando...");
    setLoggedIn(true);
    if (location.pathname === "/" || location.pathname === "/login") {
      navigate("/dashboard");
    }
    localStorage.getItem("jwt-token");
    toast.success("¡Hola de nuevo!", {
      id: loadingLogin,
    });
  };

  const handleSignup = async (userInfo) => {
    const signupToast = toast.loading("Registrando tu cuenta...");
    try {
      const response = await signup(userInfo);

      if (response.status !== 201) {
        toast.error("Error al registrarte. Comprueba tus datos", {
          id: signupToast,
        });
        return;
      }

      toast.success("¡Cuenta registrada!", {
        id: signupToast,
      });
      setSignupMode(false);
      navigate("/login");
    } catch (error) {
      toast.error("Error al registrarte", {
        id: signupToast,
      });
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    setMusicianID(null);
    setTechnicianID(null);
    setVenueManagerID(null);
    toast.success("Te has desconectado");
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  const handleResetPassword = async (userInfo) => {
    const resetPasswordToast = toast.loading(
      "Enviando email de recuperación..."
    );
    try {
      const response = await recovery(userInfo);

      if (response.status !== 200) {
        toast.error("Error al enviar email de recuperación", {
          id: resetPasswordToast,
        });
        return;
      }

      toast.success("Email de recuperación enviado", {
        id: resetPasswordToast,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar el email de recuperación", {
        id: resetPasswordToast,
      });
    }
  };

  const handleChangePassword = async (userInfo, token) => {
    const resetPasswordToast = toast.loading("Cambiando contraseña...");
    try {
      const response = await changePassword(userInfo, token);

      if (response.status !== 200) {
        toast.error("Error al cambiar la contraseña", {
          id: resetPasswordToast,
        });
        return;
      }

      toast.success("Contraseña cambiada", {
        id: resetPasswordToast,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error al cambiar la contraseña, vuelve a intentarlo", {
        id: resetPasswordToast,
      });
    }
  };

  const handleActiveAccount = async (token) => {
    const activeAccountToast = toast.loading("Activando cuenta...");
    try {
      const response = await activeAccount(token);

      if (response.status !== 200) {
        toast.error("Error al activar la cuenta", {
          id: activeAccountToast,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al activar la cuenta, vuelve a intentarlo", {
        id: activeAccountToast,
      });
    }
  };

  const handleRolePermissions = (token) => {
    const decoded = jwt_decode(token);
    if (decoded?.sub.musician_id) {
      setMusicianID(decoded.sub.musician_id);
    }
    if (decoded?.sub.technician_id) {
      setTechnicianID(decoded.sub.technician_id);
    }
    if (decoded?.sub.venue_manager_id) {
      setVenueManagerID(decoded.sub.venue_manager_id);
    }
  };

  useEffect(() => {
    checkTokenValidity(
      handleLogout,
      handleValidationLogin,
      handleRolePermissions
    );
  }, []);

  const actions = {
    setSignupMode,
    setLoggedIn,
    handleLogin,
    handleSignup,
    handleLogout,
    handleResetPassword,
    handleChangePassword,
    handleActiveAccount,
    handleValidationLogin,
    handleRolePermissions,
    setMusicianID,
    setTechnicianID,
    setVenueManagerID,
  };

  const store = {
    signupMode,
    loggedIn,
    musicianID,
    technicianID,
    venueManagerID,
  };

  return (
    <LoginContext.Provider value={{ actions, store }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);

export default useLoginContext;
