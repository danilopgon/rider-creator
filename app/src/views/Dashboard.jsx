import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const initialValues = {
    lugar: "",
    sala: "",
    tecnico: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    lugar: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "El lugar debe tener al menos 3 caracteres")
      .max(50, "El lugar no puede tener más de 50 caracteres"),
    sala: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(5, "La sala debe tener al menos 5 caracteres")
      .max(100, "La sala no puede tener más de 100 caracteres"),
    tecnico: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(2, "El técnico debe tener al menos 2 caracteres")
      .max(30, "El técnico no puede tener más de 30 caracteres"),
  });

  return (
    <div
      className="min-h-screen hero bg-base-100"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="pt-10 m-auto mt-4 rounded shadow-md w-96 bg-base-100">
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/ea/e3/8f/eae38f025c73045f983dd155949f81b1.jpg"
              className="w-40 mx-auto mb-4 rounded-full"
              alt="Fotografia"
            />
            <div className="flex items-center justify-center p-4 my-8 space-x-24 bg-base-300 rounded shadow-md">
              <p>Mensajes</p>
              <button type="button" className="w-32 h-8 btn btn-primary">
                Leer
              </button>
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto shadow-md">
          <h1 className="flex justify-center mb-6 text-4xl font-bold">
            Tu Rider
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="px-8 pt-6 pb-8 mb-4 bg-base-300">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-base-content"
                  htmlFor="lugar"
                >
                  Lugar
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lugar"
                  placeholder="Hotel Sur"
                />
                <ErrorMessage
                  name="lugar"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-base-content"
                  htmlFor="sala"
                >
                  Sala
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                  type="text"
                  name="sala"
                  placeholder="Sala el Perro"
                />
                <ErrorMessage
                  name="sala"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-base-content"
                  htmlFor="tecnico"
                >
                  Técnico
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                  type="text"
                  name="tecnico"
                  placeholder="Busca técnico"
                />
                <ErrorMessage
                  name="tecnico"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="container flex flex-col gap-3 justify-center  mx-auto">
                <button className="btn btn-primary w-full" type="submit">
                  Buscar técnico
                </button>

                <button className="btn btn-primary w-full" type="button">
                  Editar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="container flex justify-center px-12 py-2 mx-auto">
          <button className="btn btn-primary w-full" type="button">
            Comienza a crear
          </button>
        </div>
        <div className="container px-4 mx-auto mt-4 shadow-md">
          <h1 className="flex justify-center mb-6 text-4xl font-bold">
            Tus Grupos
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="px-8 pt-6 pb-8 mb-4 bg-base-300">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-base-content"
                  htmlFor="lugar"
                >
                  Lugar
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lugar"
                  placeholder="Hotel Sur"
                />
                <ErrorMessage
                  name="lugar"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="container flex flex-col gap-3 justify-center mx-auto">
                <button className="btn btn-primary w-full" type="button">
                  Editar
                </button>

                <Link
                  to="/createband"
                  className="btn btn-primary w-full"
                  type="button"
                >
                  Añadir
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
