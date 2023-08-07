import { useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import getUserByUserName from "../services/getUserByUserName";
import postNewBand from "../services/postNewBand";
import { useNavigate } from "react-router-dom";

const BandContext = createContext();

export const BandProvider = ({ children }) => {

  const [step, setStep] = useState(1);
  const [nameBand, setNameBand] = useState("");
  const [findUser, setFindUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [members, setMembers] = useState([]);
  const [band, setBand] = useState({});
  const [showAutocompleteUser, setShowAutocompleteUser] = useState(false);

  const navigate = useNavigate();

  const handleInputNameBand = (e) => {
    setNameBand(e.target.value);   
  }

  const handleOnsubmitBandName = (e) => {
    e.preventDefault();
    if (nameBand === "") {
      toast.error("Debes agregar un nombre a la banda");
      return;
    }
    toast.success("Banda creada con exito");
    setStep(2);
  }

  const handleFindUser = (e) => {
    setFindUser(e.target.value);
    setShowAutocompleteUser(true);
  }

  useEffect(() => {
    if (findUser === "") {
      return;
    }
    getUserByUserName(findUser)
    .then((res) => {
      console.log(res)
      if(res.length === 0){
        toast.error("No se encontraron usuarios registrados, puedes guardar uno nuevo");
      }
        setUserList(res)    
    })
  }, [findUser]);

  const handleSelectUser  = (e) => {
    const {id} = e.target.parentNode;
    console.log(id)
    console.log(userList)
    const user = userList.find((user) => parseInt(user?.user.id) == parseInt(id));
    console.log(user)
    setMembers([...members, user.user]);
    console.log(members)
    setFindUser("");
    setShowAutocompleteUser(false);
    toast.success("Usuario agregado con exito");
  }

  const handleAddMemberNotRegistred = () => {
    if (findUser === "") {
      toast.error("Debes agregar un nombre de usuario");
      return;
    }
    setMembers([...members, {'username': findUser, id: Math.random()*99999999}]);
    setFindUser("");
    setShowAutocompleteUser(false);
    toast.success("Usuario agregado con exito");
  }

  const handleOnSubmitAddMember = (e) => {
    e.preventDefault();
    if (members.length === 0) {
      toast.error("Debes agregar al menos un miembro a la banda");
      return;
    }
    setBand({name: nameBand, members: members});
    postNewBand(band)
    .then((res) => {
      console.log(res)
      if (res.status =='200'){
        setStep(3)
        toast.success("Banda creada con exito");
      }
    })
    toast.success("Banda creada con exito");

  }
  console.log(band)
  const handleDeleteMember = (e) => {
    const {id} = e.target.parentNode.parentNode;
    const newMembers = members.filter((member) => parseInt(member.id) !== parseInt(id));
    setMembers(newMembers);
  }
  
  const handleCancelledCreateBand = () => {
    setStep(1);
    setNameBand("");
    setFindUser("");
    setUserList([]);
    setMembers([]);
    setBand({});
    setShowAutocompleteUser(false);
    navigate("/dashboard")
  }

  const store = {
    step,
    nameBand,
    findUser,
    members,
    band,
    userList,
    showAutocompleteUser,

  };
  const actions = {
    setStep,
    setNameBand,
    setFindUser,
    setMembers,
    setBand,
    handleInputNameBand,
    handleOnsubmitBandName,
    handleFindUser,
    handleSelectUser,
    setUserList,
    setShowAutocompleteUser,
    handleAddMemberNotRegistred,
    handleOnSubmitAddMember,
    handleDeleteMember,
    handleCancelledCreateBand,
  };

  return (
    <BandContext.Provider value={{ store, actions }}>
      {children}
    </BandContext.Provider>
  );
}

const useBand = () => useContext(BandContext);
export default useBand;