import { useContext, createContext, useState, useEffect } from "react";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [instrumentScale, setInstrumentScale] = useState(1);
  const [filter, setFilter] = useState("");

  const store = {
    searchResults,
    selectedInstruments,
    size,
    instrumentScale,
    filter,
  };

  const actions = {
    setSearchResults,
    setSelectedInstruments,
    setSize,
    setInstrumentScale,
    setFilter,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
