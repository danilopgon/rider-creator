import { createContext, useState, useContext, useEffect } from "react";
import registerRole from "../services/userRolRegister";
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState();

  const navigate = useNavigate()

  const handleRoleSubmit = (values) => {
    alert("You have selected: " + values);
    setSelectedRole(values);
  };

  useEffect(()=> {
    registerRole(selectedRole)
    selectedRole?toast.success(`${selectedRole} registrado!`, {
      id: registerRole,
    }):null
    setSelectedRole(null)
  },[selectedRole, navigate])

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
