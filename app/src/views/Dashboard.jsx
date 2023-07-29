import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Dashboard = () => {

  const initialValues = {
    lugar: '',
    sala: '',
    tecnico: '',
  };

  const validationSchema = Yup.object().shape({
    lugar: Yup.string()
      .trim()
      .required('Este campo es obligatorio')
      .min(3, 'El lugar debe tener al menos 3 caracteres')
      .max(50, 'El lugar no puede tener más de 50 caracteres'),
    sala: Yup.string()
      .trim()
      .required('Este campo es obligatorio')
      .min(5, 'La sala debe tener al menos 5 caracteres')
      .max(100, 'La sala no puede tener más de 100 caracteres'),
    tecnico: Yup.string()
      .trim()
      .required('Este campo es obligatorio')
      .min(2, 'El técnico debe tener al menos 2 caracteres')
      .max(30, 'El técnico no puede tener más de 30 caracteres'),
  });
  
  

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <div
      className="hero min-h-screen bg-primary-content"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="w-96 m-auto shadow-md rounded bg-primary-content pt-10 mt-4">
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/ea/e3/8f/eae38f025c73045f983dd155949f81b1.jpg"
              className="rounded-full w-40 mx-auto mb-4"
              alt="Fotografia"
            />
            <div className="flex justify-center items-center space-x-24 my-8 shadow-md rounded bg-white p-2">
              <p>Mensajes</p>
              <button type="button" className="rounded-md bg-violet-700 h-8 w-32 text-white">Leer</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 shadow-md">
          <h1 className="text-4xl font-bold mb-6 flex justify-center">Tu Rider</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="bg-white px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-primary-content text-sm font-bold mb-2" htmlFor="lugar">
                  Lugar
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lugar"
                  placeholder="Hotel Sur"
                />
                <ErrorMessage name="lugar" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-primary-content text-sm font-bold mb-2" htmlFor="sala">
                  Sala
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="sala"
                  placeholder="Sala el Perro"
                />
                <ErrorMessage name="sala" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-primary-content text-sm font-bold mb-2" htmlFor="tecnico">
                  Técnico
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="tecnico"
                  placeholder="Busca técnico"
                />
                <ErrorMessage name="tecnico" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-violet-700 h-10 w-96 text-white mb-4 mt-4" type="submit">
                  Buscar técnico
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-violet-700 h-10 w-96 text-white" type="button">
                  Editar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="container mx-auto px-12 py-2 flex justify-center">
          <button
            className="rounded-md bg-violet-700 h-10 w-80 text-white"
            type="button"
          >
            Comienza a crear
          </button>
        </div>
        <div className="container mx-auto px-4 shadow-md mt-4">
          <h1 className="text-4xl font-bold mb-6 flex justify-center">Tus Grupos</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="bg-white px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-primary-content text-sm font-bold mb-2" htmlFor="lugar">
                  Lugar
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lugar"
                  placeholder="Hotel Sur"
                />
                <ErrorMessage name="lugar" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <button className="rounded-md bg-violet-700 h-10 w-96 text-white" type="button">
                  Editar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-violet-700 h-10 w-96 text-white" type="button">
                  Añadir
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
