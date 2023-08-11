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
  const { defaultGear, translatedGear } = appStore;

  useEffect(() => {
    const filteredGear = translatedGear.filter((gear) => {
      return gear.type.toLowerCase().includes(values.searchQuery.toLowerCase());
    });

    if (values.searchQuery === "") {
      setSearchResults([]);
      return;
    }

    setSearchResults(filteredGear);
  }, [values.searchQuery, defaultGear, translatedGear]);

  const onSelectValue = (type) => {
    setFieldValue("searchQuery", type);
  };

  return (
    <>
      <Form className="form-control m-5">
        <div className="input-group">
          <Field
            name="searchQuery"
            placeholder="Buscar instrumento"
            className="input input-bordered"
          />

          <button
            type="submit"
            className="btn btn-square"
            disabled={
              !translatedGear
                .map((gear) => gear.type)
                .includes(values.searchQuery)
            }
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </Form>

      <div
        className={`dropdown mx-5 mb-32  ${
          searchResults.length === 0 ? "" : "dropdown-open"
        }`}
      >
        <ul className=" p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box  w-52">
          {searchResults?.map((instrument, index) => {
            if (values.searchQuery.length < 2 && index >= 5) {
              return null;
            }
            return (
              <li key={instrument.id}>
                <a onClick={() => onSelectValue(instrument.type)}>
                  {instrument.type}
                </a>
              </li>
            );
          })}
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
