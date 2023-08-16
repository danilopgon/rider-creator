import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import fetchRiderData from "../utils/fetchRiderData";
import { getBand } from "../services/getBand";
import getRidersByUserID from "../services/getRidersByUserID";
import getVenueByID from "../services/getVenueByID";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [bandData, setBandData] = useState([]);
  const [riderData, setRiderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bands, setBands] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    if (bands.length > 0 && venues.length > 0) {
      setIsLoading(false);
    }
  }, [bands, venues]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { venues, bands } = await fetchRiderData();
        console.log(venues, bands);
        setVenues(venues);
        setBands(bands);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const respData = await getBand();
        getVenueByID(respData.venue_id);

        setBandData(respData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const respData = await getRidersByUserID();

        setRiderData(respData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const store = {
    bandData,

    riderData,

    isLoading,

    bands,

    venues,
  };

  const actions = {
    setBandData,
    setRiderData,
    setIsLoading,
    setBands,
    setVenues,
    navigate,
  };

  return (
    <DashboardContext.Provider value={{ store, actions }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
