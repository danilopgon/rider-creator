import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useRiderCreationContext from "../../context/RiderCreationContext";

const RiderCreationForm = () => {
  const { store: useRiderStore } = useRiderCreationContext();
  const { venues, bands } = useRiderStore;

  const [bandaSearchResults, setBandaSearchResults] = useState([]);
  const [salaSearchResults, setSalaSearchResults] = useState([]);

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
    console.log(values.banda, values.sala, values.fecha);
  };

  const handleBandaSearch = (query) => {
    const filteredBands = bands.filter((band) =>
      band.name.toLowerCase().includes(query.toLowerCase())
    );

    setBandaSearchResults(filteredBands);
  };

  const handleSalaSearch = (query) => {
    const filteredVenues = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );

    setSalaSearchResults(filteredVenues);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="banda"
              className="block text-accent-content text-sm font-bold mb-2"
            >
              Selecciona tu banda
            </label>
            <Field
              name="banda"
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-accent-content leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre de la banda"
                    onChange={(e) => {
                      field.onChange(e);
                      handleBandaSearch(e.target.value);
                    }}
                    list="banda-list"
                  />
                  <datalist id="banda-list">
                    {bandaSearchResults.map((band) => (
                      <option key={band.id} value={band.name} />
                    ))}
                  </datalist>
                </div>
              )}
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
              name="sala"
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-accent-content leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre de la sala"
                    onChange={(e) => {
                      field.onChange(e);
                      handleSalaSearch(e.target.value);
                    }}
                    list="sala-list"
                  />
                  <datalist id="sala-list">
                    {salaSearchResults.map((venue) => (
                      <option key={venue.id} value={venue.name} />
                    ))}
                  </datalist>
                </div>
              )}
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
              value={values.fecha}
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
              className=" btn btn-primary text-white font-bold py-2 px-4 rounded"
            >
              ¡Comienza a crear!
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RiderCreationForm;
