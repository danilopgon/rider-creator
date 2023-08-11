import { useContext, createContext, useState, useEffect } from "react";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [instrumentScale, setInstrumentScale] = useState(1);

  const store = {
    searchResults,
    selectedInstruments,
    size,
    instrumentScale,
  };

  const actions = {
    setSearchResults,
    setSelectedInstruments,
    setSize,
    setInstrumentScale,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
