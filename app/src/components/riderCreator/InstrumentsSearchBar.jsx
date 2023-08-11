import { Formik, Form, Field, useFormikContext } from "formik";
import { useEffect } from "react";

import useAppContext from "../../context/AppContext";
import useRiderCreationContext from "../../context/RiderCreationContext";

const InstrumentsSearchBar = () => {
  const { actions: useRiderActions } = useRiderCreationContext();
  const { store: appStore } = useAppContext();
  const { values } = useFormikContext();
  const { defaultGear } = appStore;

  useEffect(() => {
    const filteredGear = defaultGear.filter((gear) => {
      return gear.type.toLowerCase().includes(values.searchQuery.toLowerCase());
    });

    console.log(filteredGear);
    useRiderActions.setSearchResults(filteredGear);
  }, [values.searchQuery, defaultGear]);

  return (
    <Form>
      <Field
        name="searchQuery"
        placeholder="Buscar instrumento"
        className="form-control"
      />
      <button type="submit">Añadir instrumento</button>
    </Form>
  );
};

const InstrumentsSearchBarFormik = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        searchQuery: "",
      }}
      onSubmit={onSubmit}
    >
      <InstrumentsSearchBar />
    </Formik>
  );
};

export default InstrumentsSearchBarFormik;
