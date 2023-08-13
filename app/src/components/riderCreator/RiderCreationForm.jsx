import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RiderCreationForm = () => {
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col">
        <div className="mb-4">
          <label
            htmlFor="banda"
            className="block text-accent-content text-sm font-bold mb-2"
          >
            Selecciona tu banda
          </label>
          <Field
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-accent-content leading-tight focus:outline-none focus:shadow-outline"
            id="banda"
            name="banda"
            placeholder="Nombre de la banda"
          />
          <ErrorMessage
            name="banda"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sala"
            className="block text-accent-content text-sm font-bold mb-2"
          >
            ¿En qué sala?
          </label>
          <Field
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-accent-content leading-tight focus:outline-none focus:shadow-outline"
            id="sala"
            name="sala"
            placeholder="Nombre de la sala"
          />
          <ErrorMessage
            name="sala"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fecha"
            className="block text-accent-content text-sm font-bold mb-2"
          >
            Fecha
          </label>
          <Field
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-accent-content leading-tight focus:outline-none focus:shadow-outline"
            id="fecha"
            name="fecha"
          />
          <ErrorMessage
            name="fecha"
            component="div"
            className="text-red-500 text-sm"
          />
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
  );
};

export default RiderCreationForm;
