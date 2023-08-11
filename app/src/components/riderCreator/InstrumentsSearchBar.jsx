import { Formik, Form, Field, useFormikContext } from "formik";
import { useEffect } from "react";

import useAppContext from "../../context/AppContext";
import useRiderCreationContext from "../../context/RiderCreationContext";
import translateInstrumentMap from "../../utils/translateInstrument";

const InstrumentsSearchBar = () => {
  const { actions: useRiderActions, store: useRiderStore } =
    useRiderCreationContext();
  const { store: appStore } = useAppContext();
  const { values, setFieldValue } = useFormikContext();
  const { searchResults } = useRiderStore;
  const { setSearchResults } = useRiderActions;
  const { defaultGear } = appStore;

  useEffect(() => {
    const translatedGear = defaultGear.map((gear) => {
      return translateInstrumentMap[gear.type];
    });

    const filteredGear = translatedGear.filter((gear) => {
      return gear.type.toLowerCase().includes(values.searchQuery.toLowerCase());
    });

    if (values.searchQuery === "") {
      setSearchResults([]);
      return;
    }

    setSearchResults(filteredGear);
  }, [values.searchQuery, defaultGear]);

  const onSelectValue = (type) => {
    setFieldValue("searchQuery", type);
  };

  return (
    <>
      <Form>
        <Field
          name="searchQuery"
          placeholder="Buscar instrumento"
          className="form-control"
        />
        <button type="submit">Añadir instrumento</button>
      </Form>
      <div className="flex flex-col join max-h-20 overflow-y-scroll">
        {searchResults?.map((instrument) => (
          <div
            key={instrument.id}
            className="flex items-center gap-4 cursor-pointer"
          >
            <div onClick={() => onSelectValue(instrument.type)}>
              {instrument.type}
            </div>
          </div>
        ))}
      </div>
    </>
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
