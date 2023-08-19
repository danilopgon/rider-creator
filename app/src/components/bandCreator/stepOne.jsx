import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useBand from "../../context/BandContext.jsx";

export const StepOne = () => {
  const { storeBand, actionsBand } = useBand();
  const { nameBand } = storeBand;
  const { handleInputNameBand, handleOnsubmitBandName } = actionsBand;

  const initialValues = {
    name: "",
    musician: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "El lugar debe tener al menos 3 caracteres")
      .max(50, "El lugar no puede tener más de 50 caracteres"),
    musician: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "La sala debe tener al menos 5 caracteres")
      .max(100, "La sala no puede tener más de 100 caracteres"),
  });

  return (
    <div className="animate-fade">
      <div className="w-full h-full bg-base-100/50 backdrop-blur-sm p-5 rounded-lg sm:w-[80%] md:w-[80%] lg:w-[90%] xl:w-[100%] mx-auto flex flex-col gap-4 p-4 rounded">
        <h2 className="my-10 text-4xl font-semibold text-center text-base-content">
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
            <button
              className="btn btn-error w-[70%]"
              type="button"
              onClick={() => window.my_modal_5.showModal()}
            >
              Cancelar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
