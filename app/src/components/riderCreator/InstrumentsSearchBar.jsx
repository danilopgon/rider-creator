import { Formik, Form, Field, useFormikContext } from "formik";
import { useEffect } from "react";

import useAppContext from "../../context/AppContext";
import useRiderCreationContext from "../../context/RiderCreationContext";
import translateInstrumentMap from "../../utils/translateInstrument";

const InstrumentsSearchBar = () => {
  const { actions: useRiderActions } = useRiderCreationContext();
  const { store: appStore } = useAppContext();
  const { values } = useFormikContext();
  const { defaultGear } = appStore;

  useEffect(() => {
    const translatedGear = defaultGear.map((gear) => {
      return translateInstrumentMap[gear.type];
    });

    const filteredGear = translatedGear.filter((gear) => {
      return gear.type.toLowerCase().includes(values.searchQuery.toLowerCase());
    });

    if (values.searchQuery === "") {
      useRiderActions.setSearchResults([]);
      return;
    }

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
