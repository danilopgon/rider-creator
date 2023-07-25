import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleLogin = async (userInfo) => {
    try {
      const response = await login(userInfo);

      if (response.status === 403) {
        alert("Tu cuenta no está activada");
        return;
      }

      if (response.status !== 200) {
        alert("Error al conectar. Comprueba tus datos");
        return;
      }

      setLoggedIn(true);
      alert("Estás conectado");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Error al conectar. Comprueba tus datos");
    }
  };

  const handleValidationLogin = () => {
    setLoggedIn(true);
    navigate("/dashboard");
  };

  const handleSignup = async (userInfo) => {
    try {
      const response = await signup(userInfo);

      console.log(response);

      if (response.status !== 201) {
        alert("Error al registrarte. Comprueba tus datos");
        return;
      }

      alert("Te has registrado correctamente");
      setSignupMode(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Error al registrarte. Comprueba tus datos");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    navigate("/login");
    alert("Te has desconectado");
  };

  const handleResetPassword = async (userInfo) => {
    try {
      const response = await recovery(userInfo);

      if (response.status !== 200) {
        alert("Error al enviar el email de recuperación");
        return;
      }

      alert("Email de recuperación enviado");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Error al enviar el email de recuperación");
    }
  };

  const handleChangePassword = async (userInfo, token) => {
    try {
      const response = await changePassword(userInfo, token);

      if (response.status !== 200) {
        alert("Error al cambiar la contraseña");
        return;
      }

      alert("Contraseña cambiada correctamente");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Error al cambiar la contraseña");
    }
  };

  const handleActiveAccount = async (token) => {
    try {
      const response = await activeAccount(token);

      if (response.status !== 200) {
        alert("Error al activar la cuenta");
        return;
      }
    } catch (error) {
      console.log(error);
      alert("Error al activar la cuenta");
    }
  };

  useEffect(() => {
    checkTokenValidity(handleLogout, handleValidationLogin);
  }, [loggedIn]);

  const actions = {
    setSignupMode,
    setLoggedIn,
    handleLogin,
    handleSignup,
    handleLogout,
    handleResetPassword,
    handleChangePassword,
    handleActiveAccount,
  };

  const store = {
    signupMode,
    loggedIn,
  };

  return (
    <LoginContext.Provider value={{ actions, store }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);

export default useLoginContext;
