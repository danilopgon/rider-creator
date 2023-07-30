import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardUserBand } from "../components/CardUserBand";


export const CreateBand = () => {
  const [step, setStep] = useState(1);
  const [userInput, setUserInput] = useState({});

  const page_1 = (
    <div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4 p-4 rounded">
      <h2 className="my-10 text-4xl font-semibold text-center text-black">
        La musica te <br />
        llama!
      </h2>
      <Formik>
        <Form className="flex flex-col items-center gap-4">
          <Field
            className="input input-bordered w-[70%] bg-slate-100"
            name="name"
            type="text"
             
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
  <Formik>
    <Form className="flex flex-col items-center gap-2">
      <div className="md:w-[60%] w-[90%] flex flex-col flex-nowrap">
        <label htmlFor="inputMusician " className=" bg-slate-100 border rounded flex justify-evenly">
          <Field
              className="w-[90%] bg-slate-100 text-xl"
              name="name"
              type="text"
              id="inputMusician"
          />
          <button className="text-center w-10% bg-slate-100 text-2xl text-black">
              +
          </button>
        </label>
        <div className="absolute border bg-slate-50 w-[18rem] h-auto flex flex-col mt-9">
          <div className="h-8">
            <p>user not found</p>
          </div>
        </div>
      </div>
      
      
      <div className="h-[50vh] w-[100%] sm:w-[90%] flex flex-col gap-2 p-2 overflow-y-auto">
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
          <CardUserBand user={{name:"Juan"}}/>
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
      <div className="lg:w-[30%] md:w-[40%] w-[70%]  flex justify-between">
        <button onClick={()=> setStep(1)} className="flex items-center justify-center w-16 h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          1
        </button>
        <div className="border w-[50%] h-0 flex my-auto"></div>
        <button onClick={()=> setStep(2)} className="flex items-center justify-center w-16 h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          2
        </button>
      </div>
      {step === 1 ? page_1 : page_2}
      
    </section>
  );
};
