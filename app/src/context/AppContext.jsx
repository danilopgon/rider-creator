import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSubmit = (values) => {
    setSelectedRole(values.selectedRole);
  };

  const store = { selectedRole };
  const actions = { setSelectedRole, handleRoleSubmit };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
