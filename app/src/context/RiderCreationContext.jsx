import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useAppContext from "./AppContext";
import useLoginContext from "./LoginContext";
import instrumentToIconMap from "../utils/instrumentToIcon";
import getAllVenues from "../services/getAllVenues";
import getAllBands from "../services/getAllBands";
import postNewRider from "../services/postNewRider";

const RiderCreationContext = createContext();

export const RiderCreationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [instrumentInformation, setInstrumentInformation] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [instrumentScale, setInstrumentScale] = useState(1);
  const [filter, setFilter] = useState("");
  const [creatorStep, setCreatorStep] = useState(1);
  const [venues, setVenues] = useState(null);
  const [bands, setBands] = useState(null);
  const [riderBandID, setRiderBandID] = useState(0);
  const [riderVenueID, setRiderVenueID] = useState(0);
  const [riderTime, setRiderTime] = useState("");
  const [loading, setLoading] = useState(false);

  const { store: loginStore } = useLoginContext();
  const { store: appStore, actions: appActions } = useAppContext();

  const { isDesktop, isMobile, isTablet, translatedGear } = appStore;
  const { setIsDesktop, setIsMobile, setIsTablet } = appActions;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (!loginStore.loggedIn) {
        return;
      }

      const venuesResponse = await getAllVenues();
      const bandsResponse = await getAllBands();

      const fetchedVenues = venuesResponse.venues;
      const fetchedBands = bandsResponse;

      setVenues(fetchedVenues);
      setBands(fetchedBands);
    };
    fetchData();
    setLoading(false);
  }, [loginStore.loggedIn]);

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
  }, [instrumentInformation, size, isMobile, isTablet, isDesktop]);

  const handleFirstStepSubmit = (values) => {
    try {
      const bandID = bands.find((band) => band.name === values.banda)?.id;
      const venueID = venues.find((venue) => venue.name === values.sala)?.id;
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
      order: instrumentInformation.length + 1,
      id: instrumentInformation.length + 1,
      type,
      width: sizeMultiplier,
      height: sizeMultiplier,
      icon: `/icons/${instrumentToIconMap[type]}`,
      x: 0,
      y: 0,
      notes: "",
    };

    if (
      instrumentInformation.length < maxInstruments &&
      newInstrument.width < 8 &&
      newInstrument.height < 8
    ) {
      setInstrumentInformation([...instrumentInformation, newInstrument]);
    }
    resetForm();
  };

  const handleInstrumentInformation = (event, data, instrument) => {
    const updatedInstrumentInformation = [...instrumentInformation];
    const instrumentIndex = updatedInstrumentInformation.findIndex(
      (i) => i.id === instrument.id
    );
    if (instrumentIndex === -1) {
      updatedInstrumentInformation.push({
        order: instrument.order,
        id: instrument.id,
        coordinates_x: data.x,
        coordinates_y: data.y,
        type: instrument.type,
        notes: instrument.notes,
      });
    } else {
      updatedInstrumentInformation[instrumentIndex] = {
        ...updatedInstrumentInformation[instrumentIndex],
        coordinates_x: data.x,
        coordinates_y: data.y,
      };
    }
    setInstrumentInformation(updatedInstrumentInformation);
  };

  const getSavedPositions = (instrumentInformation) => {
    return instrumentInformation.reduce((positions, instrument) => {
      if (instrument.coordinates_x && instrument.coordinates_y) {
        positions[instrument.id] = {
          x: instrument.coordinates_x,
          y: instrument.coordinates_y,
        };
      }

      return positions;
    }, {});
  };

  const handleUpdateNotes = (instrument) => {
    const updatedInstrumentInformation = [...instrumentInformation];
    const instrumentIndex = updatedInstrumentInformation.findIndex(
      (i) => i.id === instrument.id
    );
    updatedInstrumentInformation[instrumentIndex] = {
      ...updatedInstrumentInformation[instrumentIndex],
      notes: instrument.notes,
    };
    setInstrumentInformation(updatedInstrumentInformation);
    toast.success("Notas guardadas correctamente");
  };

  const getVenueName = (id) => {
    const venue = venues.find((venue) => venue.id === id);
    return venue.name;
  };

  const getBandName = (id) => {
    const band = bands.find((band) => band.id === id);
    return band.name;
  };

  const getTime = () => {
    const date = riderTime.split(" ")[0].split("-").reverse().join("-");
    const time = riderTime.split(" ")[1].split(":").slice(0, 2).join(":");

    return `${date} ${time}`;
  };

  const getHours = () => {
    const time = riderTime.split(" ")[1].split(":").slice(0, 2).join(":");
    return time;
  };

  const getDate = () => {
    const date = riderTime.split(" ")[0];
    return date;
  };

  const submitRiderInformation = async () => {
    if (
      !riderBandID ||
      !riderVenueID ||
      !riderTime ||
      instrumentInformation.length === 0
    ) {
      toast.error("Falta información para generar el rider");
      return;
    }

    const riderInformation = {
      band_id: riderBandID,
      venue_id: riderVenueID,
      date: riderTime,
      gears: instrumentInformation.map((instrument) => ({
        order: instrument.order,
        gear_id: translatedGear.find(
          (translatedInstrument) =>
            translatedInstrument.type === instrument.type
        ).id,
        coordinates_x: instrument.coordinates_x,
        coordinates_y: instrument.coordinates_y,
        notes: instrument.notes,
      })),
    };

    const response = await postNewRider(riderInformation);
    if (response.status !== 200) {
      toast.error("Error al generar el rider");
      return;
    }

    toast.success("Rider generado correctamente");
    const timeout = setTimeout(() => {
      navigate("/dashboard");
      setCreatorStep(1);
      setInstrumentInformation([]);
      setRiderBandID(0);
      setRiderVenueID(0);
      setRiderTime("");
    }, 2000);
    return () => clearTimeout(timeout);
  };

  const store = {
    searchResults,
    instrumentInformation,
    size,
    instrumentScale,
    filter,
    creatorStep,
    venues,
    bands,
    riderVenueID,
    riderBandID,
    riderTime,
    loading,
  };

  const actions = {
    setSearchResults,
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
    handleUpdateNotes,
    getVenueName,
    getBandName,
    getTime,
    getHours,
    getDate,
    submitRiderInformation,
    setLoading,
  };

  return (
    <RiderCreationContext.Provider value={{ store, actions }}>
      {children}
    </RiderCreationContext.Provider>
  );
};

const useRiderCreationContext = () => useContext(RiderCreationContext);

export default useRiderCreationContext;
