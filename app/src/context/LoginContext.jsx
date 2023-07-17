import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import signup from "../services/signup";

// import signup from "../services/signup";
// import checkTokenValidity from "../services/checkTokenValidity";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (userInfo) => {
    await login(userInfo);

    if (localStorage.getItem("jwt-token") === null) {
      return alert("Failed to login. Please check your credentials.");
    }

    // setLoggedIn(true);
    // alert("You're logged in");
    // navigate("/");
  };

  const handleSignup = async (userInfo) => {
    const response = await signup(userInfo);

    if (response.status === 400) {
      return alert("Failed to signup. Please check your info.");
    }

    alert("Te has registrado correctamente");
    setSignupMode(false);
    navigate("/login");
  };

  const actions = {
    setSignupMode,
    setLoggedIn,
    handleLogin,
    handleSignup,
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
