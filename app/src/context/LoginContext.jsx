import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import login from "../services/login";
// import signup from "../services/signup";
// import checkTokenValidity from "../services/checkTokenValidity";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     checkTokenValidity(handleLogout, handleValidationLogin);
  //   }, []);

  //   const handleUserInput = (event) => {
  //     const { name, value } = event.target;

  //     setUserInput((prevState) => ({
  //       ...prevState,
  //       [name]: value.trim(),
  //     }));
  //   };

  //   const handleLogin = async (event) => {
  //     event.preventDefault();

  //     await login(userInput);

  //     if (localStorage.getItem("jwt-token") === null) {
  //       return alert("Failed to login. Please check your credentials.");
  //     }

  //     setLoggedIn(true);
  //     setUserInput({
  //       username: "",
  //       email: "",
  //       password: "",
  //     });
  //     alert("You're logged in");
  //     navigate("/");
  //   };

  //   const handleValidationLogin = () => {
  //     setLoggedIn(true);
  //     navigate("/");
  //   };

  //   const handleSignup = async (event) => {
  //     event.preventDefault();

  //     await signup(userInput);
  //     setUserInput({
  //       username: "",
  //       email: "",
  //       password: "",
  //     });
  //     alert("¡Registro completado!");
  //     navigate("/login");
  //   };

  //   const handleLogout = () => {
  //     setLoggedIn(false);
  //     localStorage.removeItem("jwt-token");
  //     alert("You have been logged out");
  //     navigate("/login");
  //   };

  const actions = {
    setSignupMode,
    setLoggedIn,
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
