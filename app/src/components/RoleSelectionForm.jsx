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
      <Form className="max-w-sm mx-auto">
        <div className="my-4">
          <h2 className="text-2xl font-bold mb-2">Elige tu rol:</h2>
          <div className="my-2">
            <label className="flex items-center">
              <Field type="radio" name="selectedRole" value="Músico" className="mr-2" />
              Músico
            </label>
          </div>
          <div className="my-2">
            <label className="flex items-center">
              <Field type="radio" name="selectedRole" value="Técnico" className="mr-2" />
              Técnico
            </label>
          </div>
          <div className="my-2">
            <label className="flex items-center">
              <Field type="radio" name="selectedRole" value="Promotor" className="mr-2" />
              Promotor
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Continuar
        </button>
      </Form>
    </Formik>
  );
};

export default RoleSelectionForm;
