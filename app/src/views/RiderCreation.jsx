import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RiderCreation = () => {
  const initialValues = {
    banda: "",
    sala: "",
    fecha: "",
  };

  const validationSchema = Yup.object().shape({
    banda: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "El nombre de la banda debe tener al menos 3 caracteres")
      .max(50, "El nombre de la banda no puede tener más de 50 caracteres"),
    sala: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "El nombre de la sala debe tener al menos 3 caracteres")
      .max(50, "El nombre de la sala no puede tener más de 50 caracteres"),
    fecha: Yup.date().required("Este campo es obligatorio"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-4 text-3xl font-bold">Crea tu rider</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
<<<<<<<<< Temporary merge branch 1
          <form className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="exampleInputText" className="form-label">
                Selecciona tu banda
              </label>
              <input
                type="text"
                className="form-input"
                id="exampleInputText"
                aria-describedby="Select your band"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputText2" className="form-label">
                ¿En qué sala?
              </label>
              <input
                type="text"
                className="form-input"
                id="exampleInputText2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputDate" className="form-label">
                Fecha
              </label>
              <input type="date" className="form-input" id="exampleInputDate" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ¡Comienza a crear!
              </button>
            </div>
          </form>
=========
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="banda" className="block text-gray-700 text-sm font-bold mb-2">
                  Selecciona tu banda
                </label>
                <Field
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="banda"
                  name="banda"
                  placeholder="Nombre de la banda"
                />
                <ErrorMessage name="banda" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="sala" className="block text-gray-700 text-sm font-bold mb-2">
                  ¿En qué sala?
                </label>
                <Field
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sala"
                  name="sala"
                  placeholder="Nombre de la sala"
                />
                <ErrorMessage name="sala" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha
                </label>
                <Field
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fecha"
                  name="fecha"
                />
                <ErrorMessage name="fecha" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-violet-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  ¡Comienza a crear!
                </button>
              </div>
            </Form>
          </Formik>
>>>>>>>>> Temporary merge branch 2
        </div>
      </div>
    </div>
  );
};

export default RiderCreation;
