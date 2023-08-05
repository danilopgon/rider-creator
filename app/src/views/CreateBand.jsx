import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";
import * as Yup from "yup";
import { CardUserBand } from "../components/CardUserBand";
import Lottie from 'lottie-react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import check from "../assets/animations/UYite2OzKA.json";
import getUserByUserName from "../services/getUserByUserName";
import postNewBand from "../services/postNewBand";
import { toast } from "react-hot-toast";

export const CreateBand = () => {
  const [step, setStep] = useState(1);
  const [inputName, setInputName] = useState("");
  const [inputMember, setInputMember] = useState({});//mirar esto puede ser que lo elimine
  const [inputMemberName, setInputMemberName] = useState("");//recibe el valor del input del usuario para agregar miembros
  const [usersListAutocomplete, setUsersListAutocomplete] = useState([]); // [{id: 1, name: 'Juan'},{id: 2, name: 'Pedro'}
  const [showAutocompleteUser, setShowAutocompleteUser] = useState(false);
  const [members, setMembers] = useState([])
  const [band, setBand] = useState({});
  
  const navigate = useNavigate();
  
  const handleUserInputNameBand = (e) => {
    if(e.target.value.length === 0) {
      toast.error("El nombre de la banda no puede estar vacío");
      return
    }
    setInputName(e.target.value);
  }
  const handleOnSubmitSaveNameBand = (e) => {
    e.preventDefault();
    if(inputName.length === 0) {
      toast.error("El nombre de la banda no puede estar vacío");
      return
    }
    setBand((prev) => ({ ...prev, name: inputName }));
    setStep(2);
  }
  
  

  const handleFindUser = (e) => {
    setInputMemberName(e.target.value);
    if(inputMemberName?.length > 0) {
      setShowAutocompleteUser(true);
    }
    if(inputMemberName.length === 0) {
      setShowAutocompleteUser(false);
    }
    getUserByUserName(String(e.target.value))
      .then((res) => {
        setUsersListAutocomplete(res);
      })
    
  }

  const handleAddMember = (e) => {
    const { id } = e.target.parentNode;
    console.log(id)
    const member = usersListAutocomplete?.find((member) => parseInt(member.user.id) === parseInt(id));
    console.log(member)
    if (member) {
      setMembers((prev) => [...prev, member.user]);
      console.log(member.user)
      setInputMember({});
      setInputMemberName('');
      setShowAutocompleteUser(false);
      
      
    }
    console.log(members)
    setBand((prev) => ({ ...prev, members: members }));
  }
  const handleAddMemberNotRegistred = () => {
    const member = members.find((member) => member.name === inputMemberName);
    if (member) {
      alert("Este miembro ya existe");
      return;
    }
    if(inputMemberName?.length > 0) {
    const member = {'username':inputMemberName, id: Math.random()*99999999999}
    setMembers((prev) => [...prev, member]);
    setInputMember({});
    setInputMemberName('');
    setShowAutocompleteUser(false);
    
    }else{
      toast.error('Debes ingresar un nombre')
    }
  }
  const handleDeleteMember = (e) => {
    const { id } = e.target.parentNode.parentNode;
    setMembers((prev) => prev.filter((member) => {
      return parseInt(member.id) != parseInt(id)}));
  }

  console.log(band)
  console.log(members)

  const handleCreateBand = (e) => {
    e.preventDefault();
    if(members.length < 1){
      toast.error('Debes agregar al menos un miembro')
      return
    }
    setBand((prev) => ({ ...prev, members: members }));
    console.log(band)
    postNewBand(band)
    .then((res) => {
      console.log(res)
      if(res.status == '200'){
        toast.success("Banda creada con éxito");
        setStep(3);
      }else{
        toast.error("Error al crear la banda" + res.message);
        return
      }
    })
    
  }
  

  const handleResetStates = () => {
    setInputName('');
    setInputMember({});
    setInputMemberName('');
    setUsersListAutocomplete([]);
    setShowAutocompleteUser(false);
    setMembers([]);
    setBand({});
    navigate('/dashboard')
  }

  const initialValues = {
    name: '',
    musician: ''
  } 

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Este campo es obligatorio')
      .min(3, 'El lugar debe tener al menos 3 caracteres')
      .max(50, 'El lugar no puede tener más de 50 caracteres'),
    musician: Yup.string()
      .trim()
      .required('Este campo es obligatorio')
      .min(3, 'La sala debe tener al menos 5 caracteres')
      .max(100, 'La sala no puede tener más de 100 caracteres'),
  });
  

  const page_1 = (
    <div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4 p-4 rounded">
      <h2 className="my-10 text-4xl font-semibold text-center text-black">
        La musica te <br />
        llama!
      </h2>
      <Formik validationSchema={validationSchema} initialValues={initialValues} >
        <Form className="flex flex-col items-center gap-4" onSubmit={handleOnSubmitSaveNameBand}>
          <Field
            className="input input-bordered w-[70%] bg-slate-100"
            name="name"
            type="text"
            placeholder="Nombre de la banda"
            onChange={handleUserInputNameBand}
            value={inputName}
          />

          <button className="btn btn-primary w-[70%]" type="submit">
            Agregar Nombre
          </button>
          <button className="btn btn-error w-[70%]" onClick={()=>window.my_modal_1.showModal()}>Cancelar</button>
        </Form>
      </Formik>
    </div>
  );

  const page_2 = (<div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4 p-4 rounded">
  <h2 className="text-xl font-semibold text-center text-black ">
   Agrega miembros a tu banda
  </h2>
  <Formik validationSchema={validationSchema} initialValues={initialValues}>
    <Form onSubmit={handleCreateBand} className="flex flex-col items-center gap-2 ring-0 active:border-0">
      <div className="md:w-[60%] w-[90%] flex flex-col flex-nowrap">
        <label htmlFor="inputMusician " className="flex p-0 border rounded bg-slate-100 justify-evenly">
          <Field
              className="w-full p-1 m-0 text-xl border-0 bg-slate-100"
              name="name"
              type="text"
              id="inputMusician"
              placeholder="Agrega un miembro"
              onChange={handleFindUser} 
              value={inputMemberName?.length !== 0 ? inputMemberName : ''}
          />
        </label>
        <div className={`absolute border bg-slate-50 w-[18rem] h-auto flex flex-col mt-9 ${showAutocompleteUser?'':'hidden'}`}>
          <div className="h-auto">
            {!usersListAutocomplete?.length > 0 && <ul className="p-2"><li className="flex items-center justify-between">{inputMemberName} <button type="button" className="text-2xl" onClick={handleAddMemberNotRegistred}>+</button></li> <li>user not found</li></ul>}
            
              {usersListAutocomplete.length > 0 && <ul>{usersListAutocomplete?.map((user) => {
                return (<li className="flex items-center justify-between p-2" id={user.user.id} key={user.user.id}>{user.user.username }<button onClick={handleAddMember} type="button" className="text-2xl">+</button></li>)
              })}</ul>}
            
            
          </div>
        </div>
      </div>
      
      
      <div className="h-[42vh] w-[100%] sm:w-[90%] flex flex-col gap-2 p-2 overflow-y-auto">
          {members.map((member) => {
            return <CardUserBand member={member} handler={handleDeleteMember} key={member.id}/>
          })}
      </div>
      <div className=" flex gap-4">
      <button type="submit" className="btn btn-primary w-[45%]">
        Completar!
      </button>
      <button type="button" className="btn btn-error w-[45%]" onClick={()=>window.my_modal_1.showModal()}>Cancelar</button>
      </div>
      
    </Form>
  </Formik>
</div>)

  const page_3 = (
    <div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col items-center p-1 rounded">
      <div className="w-[30%] flex justify-center">
        <Lottie animationData={check}/>
      </div>
      <h2 className="my-0 text-4xl font-semibold text-center text-black">
        Felicidades!! <br/> Has creado tu nuevo grupo
      </h2>
      <div className="my-8">
        <Link to="/dashboard" className="btn btn-primary">Ir al Dashboard</Link>
      </div>
      
    </div>
  )


  return (
    <section className="w-screen h-auto lg:w-[90%] flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl">
        {step === 1 ? "Crea tu banda" 
        :step ===2? "Agrega Miembros":'Completado!!!'}
      </h1>
      <div className="lg:w-[30%] md:w-[40%] w-[40%] md:w-[70%]  flex justify-between">
        <button onClick={()=> setStep(1)} className={`flex items-center justify-center w-8 h-8 p-0 text-3xl text-black rounded-full md:w-16 md:h-16 ${step===1?'bg-slate-300':'bg-green-400'} fw-bold `}>
          1
        </button>
        <div className="border w-[20%] md:w-[50%] h-0 flex my-auto"></div>
        <button onClick={()=> setStep(2)} className={`flex items-center justify-center w-8 h-8 p-0 text-3xl text-black rounded-full md:w-16 md:h-16 ${step===2||step===1?'bg-slate-300':'bg-green-400'} fw-bold `}>
          2
        </button>
      </div>
      {step === 1 ? page_1 : step === 2 ? page_2 : page_3}
      
      
        
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Segur@ que quieres cerrar sin guardar?</p>
            <div className="modal-action">
              <button type="button" className="btn btn-success" onClick={handleResetStates}>Aceptar</button>
              <button  className="btn btn-error">Close</button>
            </div>
          </form>
        </dialog>
    </section>
  );
};
