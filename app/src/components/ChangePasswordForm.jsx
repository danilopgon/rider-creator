import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useLoginContext from "../context/LoginContext";

const ChangePasswordForm = ({ token }) => {
  const { actions } = useLoginContext();

  return (
    <div className="w-4/5 md:w-2/5 bg-base-100 p-10 rounded-lg">
      <Formik
        initialValues={{ password: "", password2: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(10, "Mínimo 10 caracteres")
            .required("Requerido")
            .trim(),
          password2: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("Requerido")
            .trim(),
        })}
        onSubmit={(values) => actions.handleChangePassword(values, token)}
      >
        <Form className="form-control gap-1 w-full">
          <label htmlFor="password" className="label">
            Nueva contraseña
          </label>
          <Field
            name="password"
            type="password"
            className="input input-bordered w-full"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-600 flex"
          />
          <label htmlFor="password2" className="label">
            Confirma tu nueva contraseña
          </label>
          <Field
            name="password2"
            type="password"
            className="input input-bordered w-full"
          />
          <ErrorMessage
            name="password2"
            component="div"
            className="text-red-600 flex"
          />
          <input
            type="submit"
            className="btn btn-primary container-fluid my-3"
            value={"Cambiar contraseña"}
          ></input>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
