import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useLoginContext from "../context/LoginContext";

const ResetPasswordForm = () => {
  const { actions } = useLoginContext();

  const emailRegExp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}/g;

  return (
    <div className="w-4/5 md:w-2/5 bg-base-100 p-10 rounded-lg">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email no válido")
            .required("Requerido")
            .matches(emailRegExp, "La dirección de correo no es válida")
            .trim(),
        })}
        onSubmit={actions.handleResetPassword}
      >
        <Form className="form-control gap-1 w-full">
          <label htmlFor="email" className="label">
            Email
          </label>
          <Field
            name="email"
            type="email"
            className="input input-bordered w-full"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-600 flex"
          />
          <input
            type="submit"
            className="btn btn-primary container-fluid my-3"
            value={"Enviar email de recuperación"}
          ></input>
          <span className="text-center">
            <Link className="mx-1 font-semibold" to="/login" href="#">
              ¡Volver al login!
            </Link>
          </span>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
