import { createContext, useState, useContext, useEffect } from "react";
import registerRole from "../services/userRolRegister";
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";
import useLoginContext from "./LoginContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const {actionsLoginContext, storeLoginContext} = useLoginContext();

  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate()

  const handleRoleSubmit = (values) => {
    setSelectedRole(values);
  };

  useEffect(()=> {
    
    if(selectedRole){
      registerRole(selectedRole)
      .then((response) => {
        if(response.status === 'success'){
          selectedRole?toast.success(`${selectedRole} registrado!`, {
            id: registerRole,
          }):null
          localStorage.setItem('jwt-token', response.token)
        }
        if(response.status === 400){
          toast.error(`${response.message}`)
        }
        
      })
    }
    
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
