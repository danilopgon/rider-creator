import { useContext, createContext, useState, useEffect } from "react";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const store = {
    searchResults,
    selectedInstruments,
  };

  const actions = {
    setSearchResults,
    setSelectedInstruments,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
