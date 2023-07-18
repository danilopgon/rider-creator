// RoleSelectionForm.js
import React from "react";
import { Formik, Form, Field } from "formik";

const RoleSelectionForm = ({ onSubmit }) => {
  const initialValues = {
    selectedRole: "",
  };

  const handleSubmit = (values) => {
    onSubmit(values.selectedRole);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <h2>Elige tu rol:</h2>
          <div>
            <label>
              <Field type="radio" name="selectedRole" value="Músico" />
              Músico
            </label>
          </div>
          <div>
            <label>
              <Field type="radio" name="selectedRole" value="Técnico" />
              Técnico
            </label>
          </div>
          <div>
            <label>
              <Field type="radio" name="selectedRole" value="Promotor" />
              Promotor
            </label>
          </div>
        </div>
        <button type="submit">Continuar</button>
      </Form>
    </Formik>
  );
};

export default RoleSelectionForm;
