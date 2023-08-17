import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useLoginContext from "./LoginContext";
import useRiderCreationContext from "./RiderCreationContext";
import { getBand } from "../services/getBand";
import getRidersByUserID from "../services/getRidersByUserID";
import getVenueByID from "../services/getVenueByID";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [bandData, setBandData] = useState([]);
  const [riderData, setRiderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { store: riderStore } = useRiderCreationContext();
  const { store: loginStore } = useLoginContext();

  useEffect(() => {
    if (!loginStore.loggedIn) {
      return;
    }

    if (
      riderStore.venues.length > 0 &&
      riderStore.bands.length > 0 &&
      bandData.length > 0 &&
      riderData.length > 0
    ) {
      setIsLoading(false);
    }
  }, [
    loginStore.loggedIn,
    riderStore.venues,
    riderStore.bands,
    bandData,
    riderData,
  ]);

  useEffect(() => {
    if (!loginStore.loggedIn) {
      return;
    }

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
  }, [loginStore.loggedIn]);

  useEffect(() => {
    if (!loginStore.loggedIn) {
      return;
    }

    async function fetchData() {
      try {
        const respData = await getRidersByUserID();

        setRiderData(respData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [loginStore.loggedIn]);

  const store = {
    bandData,
    riderData,
    isLoading,
  };

  const actions = {
    setBandData,
    setRiderData,
    setIsLoading,
  };

  return (
    <DashboardContext.Provider value={{ store, actions }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
