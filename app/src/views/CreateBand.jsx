import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const page_2 = "";

  return (
    <section className="w-screen h-auto @lg:w-[70%] flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl">
        {step === 1 ? "Crea tu banda" : "Agrega Miembros"}
      </h1>
      <div className="lg:w-[30%] md:w-[40%] w-[70%]  flex justify-between border">
        <span className="flex items-center justify-center w-16 h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          1
        </span>
        <div className="border w-[50%] h-0 flex my-auto"></div>
        <span className="flex items-center justify-center w-16 h-16 p-0 text-3xl text-black rounded-full bg-slate-300 fw-bold ">
          2
        </span>
      </div>

      <div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4 p-4 rounded">
        <h2 className="text-xl font-semibold text-center text-black ">
         Agrega miembros a tu banda
        </h2>
        <Formik>
          <Form className="flex flex-col items-center">
            <label htmlFor="inputMusician " className="w-[60%] bg-slate-100 border rounded p-2 flex justify-evenly">
                <Field
                    className="w-[90%] bg-slate-100 text-xl"
                    name="name"
                    type="text"
                    id="inputMusician"
                />
                <button className="text-center w-10% bg-slate-100 text-2xl text-black" type="submit">
                    +
                </button>
            </label>
            
            <div className="h-[50vh] w-[90%]">

            </div>
            
          </Form>
        </Formik>
      </div>
    </section>
  );
};
