import { useContext, createContext, useState, useEffect } from "react";

import useAppContext from "./AppContext";
import instrumentToIconMap from "../utils/instrumentToIcon";
import getAllVenues from "../services/getAllVenues";
import getAllBands from "../services/getAllBands";
import { toast } from "react-hot-toast";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [instrumentInformation, setInstrumentInformation] = useState({});
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [instrumentScale, setInstrumentScale] = useState(1);
  const [filter, setFilter] = useState("");
  const [creatorStep, setCreatorStep] = useState(1);
  const [venues, setVenues] = useState([]);
  const [bands, setBands] = useState([]);
  const [riderBandID, setRiderBandID] = useState(0);
  const [riderVenueID, setRiderVenueID] = useState(0);
  const [riderTime, setRiderTime] = useState("");

  const { store: appStore, actions: appActions } = useAppContext();

  const { isDesktop, isMobile, isTablet, translatedGear } = appStore;
  const { setIsDesktop, setIsMobile, setIsTablet } = appActions;

  useEffect(() => {
    const fetchData = async () => {
      const responseVenues = await getAllVenues();
      const responseBands = await getAllBands();
      setVenues(responseVenues.venues);
      setBands(responseBands);
    };
    fetchData();
  }, []);

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
    } else if (size.width < 1280 && size.width > 768) {
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
    } else if (size.width < 1280 && isTablet) {
      setInstrumentScale(1.25);
    } else if (size.width > 1280 && isDesktop) {
      setInstrumentScale(1.75);
    }
  }, [selectedInstruments, size, isMobile, isTablet, isDesktop]);

  const handleFirstStepSubmit = (values) => {
    try {
      const bandID = bands.find((band) => band.name === values.banda).id;
      const venueID = venues.find((venue) => venue.name === values.sala).id;
      const date = values.fecha;
      const timeParts = values.hora.split(":");
      const hours = timeParts[0].padStart(2, "0");
      const minutes = timeParts[1].padStart(2, "0");
      const seconds = "00";
      const time = `${hours}:${minutes}:${seconds}`;
      toast.success("Datos guardados correctamente");

      setRiderTime(`${date} ${time}`);
      setRiderBandID(bandID);
      setRiderVenueID(venueID);

      setCreatorStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInstrument = (values, { resetForm }) => {
    const maxInstruments = 64;
    const findInstrument = translatedGear.find(
      (instrument) => instrument.type === values.searchQuery
    );

    const { type, size } = findInstrument;

    const sizeMultiplier = size === "Small" ? 1 : size === "Medium" ? 2 : 3;
    const newInstrument = {
      order: selectedInstruments.length + 1,
      id: selectedInstruments.length + 1,
      type,
      width: sizeMultiplier,
      height: sizeMultiplier,
      icon: `./src/assets/icons/${instrumentToIconMap[type]}`,
      x: 0,
      y: 0,
      notes: "",
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
    setInstrumentInformation({
      ...instrumentInformation,
      [instrument.id]: {
        order: instrument.order,
        id: instrument.id,
        coordinates_x: data.x,
        coordinates_y: data.y,
        type: instrument.type,
        notes: instrument.notes,
      },
    });
    console.log(instrumentInformation);
  };

  const getSavedPositions = (instrumentInformation) => {
    return Object.values(instrumentInformation).reduce(
      (positions, instrument) => {
        if (instrument.coordinates_x && instrument.coordinates_y) {
          positions[instrument.id] = {
            x: instrument.coordinates_x,
            y: instrument.coordinates_y,
          };
        }
        console.log(positions);
        return positions;
      },
      {}
    );
  };

  const store = {
    searchResults,
    selectedInstruments,
    instrumentInformation,
    size,
    instrumentScale,
    filter,
    creatorStep,
    venues,
    bands,
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
    setCreatorStep,
    setVenues,
    setBands,
    handleFirstStepSubmit,
    getSavedPositions,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
