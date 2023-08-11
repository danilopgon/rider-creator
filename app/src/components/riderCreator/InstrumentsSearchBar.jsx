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

    console.log(searchResults);

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
      <Form className="form-control my-5">
        <div className="input-group">
          <Field
            name="searchQuery"
            placeholder="Buscar instrumento"
            className="input input-bordered"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </Form>

      <div
        className={`dropdown mb-32 ${
          searchResults.length === 0 ? "" : "dropdown-open"
        }`}
      >
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          {searchResults?.map((instrument) => (
            <li key={instrument.id}>
              <a onClick={() => onSelectValue(instrument.type)}>
                {instrument.type}
              </a>
            </li>
          ))}
        </ul>
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
