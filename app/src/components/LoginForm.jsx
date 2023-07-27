import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useLoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const { store, actions } = useLoginContext();

  const emailRegExp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}/g;

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Email no válido")
      .required("Requerido")
      .matches(emailRegExp, "La dirección de correo no es válida")
      .trim(),
    password: Yup.string()
      .max(20, "Tu contraseña es demasiado larga")
      .min(10, "Tu contraseña es demasiado corta")
      .required("Requerido")
      .trim(),
  });

  const signupValidationSchema = Yup.object({
    username: Yup.string()
      .max(20, "Tu nombre de usuario es demasiado largo")
      .min(6, "Tu nombre de usuario es demasiado corto")
      .trim()
      .required("Requerido"),
    email: Yup.string()
      .email("Dirección de correo no válida")
      .required("Requerido")
      .matches(emailRegExp, "La dirección de correo no es válida")
      .trim(),
    password: Yup.string()
      .max(20, "Tu contraseña es demasiado larga")
      .min(10, "Tu contraseña es demasiado corta")
      .required("Requerido")
      .trim(),
  });

  return (
    <div className="w-4/5 md:w-2/5 bg-base-100 p-10 rounded-lg">
      <Formik
        enableReinitialize
        initialValues={
          store.signupMode
            ? { username: "", email: "", password: "" }
            : { email: "", password: "" }
        }
        validationSchema={
          store.signupMode ? signupValidationSchema : loginValidationSchema
        }
        onSubmit={store.signupMode ? actions.handleSignup : actions.handleLogin}
      >
        <Form className="form-control gap-1 w-full">
          {store.signupMode ? (
            <>
              <label htmlFor="username" className="label">
                Usuario
              </label>
              <Field
                name="username"
                type="text"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600 flex"
              />
            </>
          ) : (
            ""
          )}

          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <Field
            name="email"
            type="email"
            className="input input-bordered w-full "
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-600 flex"
          />

          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <Field
            name="password"
            type="password"
            className="input input-bordered w-full "
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-600 flex"
          />

          <input
            type="submit"
            className="btn btn-primary container-fluid my-3"
            value={store.signupMode ? "Registrarme" : "Iniciar sesión"}
          ></input>
          {store.signupMode ? (
            <span className="text-center">
              ¿Ya estás registrado?
              <a
                className="mx-1 font-semibold"
                onClick={() => {
                  actions.setSignupMode(false);
                }}
                href="#"
              >
                Conéctate
              </a>
            </span>
          ) : (
            <>
              <span className="text-center my-3">
                ¿No eres miembro?
                <a
                  className="mx-1 font-semibold"
                  onClick={() => {
                    actions.setSignupMode(true);
                  }}
                  href="#"
                >
                  Regístrate
                </a>
              </span>
              <span className="text-center">
                ¿Olvidaste tu contraseña?
                <Link className="mx-1 font-semibold" to={"/reset-password"}>
                  Recupérala
                </Link>
              </span>
            </>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
