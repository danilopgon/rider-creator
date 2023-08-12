import { useContext, createContext, useState, useEffect } from "react";

import useAppContext from "./AppContext";
import instrumentToIconMap from "../utils/instrumentToIcon";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [instrumentInformation, setInstrumentInformation] = useState({});
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [instrumentScale, setInstrumentScale] = useState(1);
  const [filter, setFilter] = useState("");

  const { store: appStore, actions: appActions } = useAppContext();

  const { isDesktop, isMobile, isTablet, translatedGear } = appStore;
  const { setIsDesktop, setIsMobile, setIsTablet } = appActions;

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setFilter(
          "invert(85%) sepia(3%) saturate(883%) hue-rotate(181deg) brightness(80%) contrast(94%)"
        )
      : setFilter(
          "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
        );
  }, []);

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail.theme === "dark") {
        setFilter(
          "invert(85%) sepia(3%) saturate(883%) hue-rotate(181deg) brightness(80%) contrast(94%)"
        );
      } else {
        setFilter(
          "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
        );
      }
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  useEffect(() => {
    if (size.width < 768) {
      setIsMobile(true);
      setIsDesktop(false);
      setIsTablet(false);
    } else if (size.width < 1024 && size.width > 768) {
      setIsTablet(true);
      setIsDesktop(false);
      setIsMobile(false);
    } else {
      setIsDesktop(true);
      setIsMobile(false);
      setIsTablet(false);
    }
  }, [size]);

  useEffect(() => {
    if (size.width < 768 && isMobile) {
      setInstrumentScale(1);
    } else if (size.width < 1024 && isTablet) {
      setInstrumentScale(1.25);
    } else if (size.width > 1024 && isDesktop) {
      setInstrumentScale(1.75);
    }
  }, [selectedInstruments, size, isMobile, isTablet, isDesktop]);

  const handleAddInstrument = (values, { resetForm }) => {
    const maxInstruments = 64;
    const findInstrument = translatedGear.find(
      (instrument) => instrument.type === values.searchQuery
    );

    const { type, size } = findInstrument;

    const sizeMultiplier = size === "Small" ? 1 : size === "Medium" ? 2 : 3;
    const newInstrument = {
      id: selectedInstruments.length + 1,
      type,
      width: sizeMultiplier,
      height: sizeMultiplier,
      icon: `./src/assets/icons/${instrumentToIconMap[type]}`,
      x: 0,
      y: 0,
    };

    if (
      selectedInstruments.length < maxInstruments &&
      newInstrument.width < 8 &&
      newInstrument.height < 8
    ) {
      setSelectedInstruments([...selectedInstruments, newInstrument]);
    }
    resetForm();
  };

  const handleInstrumentInformation = (event, data, instrument) => {
    console.log(instrument.id, data.x, data.y, instrument.type);
    console.log(instrumentInformation);
    setInstrumentInformation({
      ...instrumentInformation,
      [instrument.id]: {
        x: data.x,
        y: data.y,
        type: instrument.type,
        id: instrument.id,
      },
    });
  };

  const store = {
    searchResults,
    selectedInstruments,
    instrumentInformation,
    size,
    instrumentScale,
    filter,
  };

  const actions = {
    setSearchResults,
    setSelectedInstruments,
    setInstrumentInformation,
    setSize,
    setInstrumentScale,
    setFilter,
    handleAddInstrument,
    handleInstrumentInformation,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
