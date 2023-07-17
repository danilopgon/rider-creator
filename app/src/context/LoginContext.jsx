import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import signup from "../services/signup";
import checkTokenValidity from "../services/checkTokenValidity";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (userInfo) => {
    try {
      await login(userInfo);

      setLoggedIn(true);
      alert("You're logged in");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to login. Please check your credentials.");
    }
  };

  const handleValidationLogin = () => {
    setLoggedIn(true);
    navigate("/dashboard");
  };

  const handleSignup = async (userInfo) => {
    try {
      await signup(userInfo);
      alert("Te has registrado correctamente");
      setSignupMode(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Failed to signup. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    alert("You have been logged out");
    navigate("/login");
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
