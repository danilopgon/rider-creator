import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useBand from "../../context/BandContext.jsx";


export const StepOne = () => {

  const { store, actions } = useBand();
  const{nameBand, step} = store;
  const { handleInputNameBand, handleOnsubmitBandName, setStep } = actions;

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


      console.log("nameBand", nameBand)
      

  return (
    <div>
      <div className="w-full h-full bg-slate-300 sm:w-[80%] lg:w-[50%] xl:w-[100%] flex flex-col gap-4 p-4 rounded">
        <h2 className="my-10 text-4xl font-semibold text-center text-black">
          La musica te <br />
          llama!
        </h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          <Form
            className="flex flex-col items-center gap-4"
            onSubmit={handleOnsubmitBandName}
          >
            <Field
              className="input input-bordered w-[70%] bg-slate-100"
              name="name"
              type="text"
              placeholder="Nombre de la banda"
              onChange={handleInputNameBand}
              value={nameBand}
            />

            <button className="btn btn-primary w-[70%]" type="submit">
              Agregar Nombre
            </button>
            <button className="btn btn-error w-[70%]" type="button" onClick={()=>window.my_modal_5.showModal()}>Cancelar</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
