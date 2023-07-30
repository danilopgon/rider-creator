import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";
import * as Yup from "yup";
import { CardUserBand } from "../components/CardUserBand";


export const CreateBand = () => {
  const [step, setStep] = useState(1);
  const [inputName, setInputName] = useState("");
  const [inputMember, setInputMember] = useState({});
  const [showAutocompleteUser, setShowAutocompleteUser] = useState(false);
  const [members, setMembers] = useState([])
  const [band, setBand] = useState({});

  const handleCheckFocus = (e) => {
    if (e.target.value.length > 0) {
      setShowAutocompleteUser(true);
    } else {
      setShowAutocompleteUser(false);
    }
  }
  
  const handleUserInputNameBand = (e) => {
    setInputName(e.target.value);
  }
  const handleOnSubmitSaveNameBand = (e) => {
    e.preventDefault();
    setBand((prev) => ({ ...prev, name: inputName }));
    setStep(2);
  }
  
  const handleUserInputMember = (e) => {
    setInputMember((prev) => ({ ...prev, name: e.target.value }));
  }
  const handleAddMemberNotRegistred = () => {
    const member = members.find((member) => member.name === inputMember.name);
    if (member) {
      alert("Este miembro ya existe");
      return;
    }
    if(inputMember.name.length > 0) {
    const member = {...inputMember, id: Math.random()}
    setMembers((prev) => [...prev, member]);
    setInputMember({});
    
    }else{
      alert('Debes ingresar un nombre')
    }
  }
  
  

  const handleDeleteMember = (e) => {
    e.preventDefault();
    const { id } = e.target;
    setMembers((prev) => prev.filter((member, index) => index !== parseInt(id)));
  }
  const handleCreateBand = (e) => {
    e.preventDefault();
    console.log(members);
  }
  console.log(inputName)
  console.log(band)
  console.log(inputMember)
  console.log(members)
  
  
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
        </Form>
      </Formik>
    </div>
  );

  const page_2 = (<div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4 p-4 rounded">
  <h2 className="text-xl font-semibold text-center text-black ">
   Agrega miembros a tu banda
  </h2>
  <Formik validationSchema={validationSchema} initialValues={initialValues}>
    <Form className="flex flex-col items-center gap-2 ring-0 active:border-0">
      <div className="md:w-[60%] w-[90%] flex flex-col flex-nowrap">
        <label htmlFor="inputMusician " className=" bg-slate-100 border rounded flex justify-evenly">
          <Field
              className="w-[90%] bg-slate-100 text-xl border-0"
              name="name"
              type="text"
              id="inputMusician"
              placeholder="Agrega un miembro"
              onChange={handleUserInputMember}
              value={inputMember?.name?.length > 0 ? inputMember.name : ''}
          />
          <button onClick={handleAddMemberNotRegistred} className="text-center w-10% bg-slate-100 text-2xl text-black" type="button">
              +
          </button>
        </label>
        <div className={`absolute border bg-slate-50 w-[18rem] h-auto flex flex-col mt-9 ${showAutocompleteUser?'null':'hidden'}`}>
          <div className="h-8">
            <p>user not found</p>
          </div>
        </div>
      </div>
      
      
      <div className="h-[42vh] w-[100%] sm:w-[90%] flex flex-col gap-2 p-2 overflow-y-auto">
          {members.map((member, index) => {
            return <CardUserBand member={member}/>
          })}
      </div>
      <div className="">
      <button type="submit" className="btn btn-primary">
        Finalizar
      </button>
      </div>
      
    </Form>
  </Formik>
</div>)


  return (
    <section className="w-screen h-auto lg:w-[90%] flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl">
        {step === 1 ? "Crea tu banda" : "Agrega Miembros"}
      </h1>
      <div className="lg:w-[30%] md:w-[40%] w-[40%] md:w-[70%]  flex justify-between">
        <button onClick={()=> setStep(1)} className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          1
        </button>
        <div className="border w-[20%] md:w-[50%] h-0 flex my-auto"></div>
        <button onClick={()=> setStep(2)} className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          2
        </button>
      </div>
      {step === 1 ? page_1 : page_2}
      
    </section>
  );
};
