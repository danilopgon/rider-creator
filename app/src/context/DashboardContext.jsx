import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useLoginContext from "./LoginContext";
import useRiderCreationContext from "./RiderCreationContext";
import { getBand } from "../services/getBand";
import getRidersByUserID from "../services/getRidersByUserID";
import getVenueByID from "../services/getVenueByID";
import getAllVenuesByManager from "../services/getAllVenuesByManager";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [bandData, setBandData] = useState(null);
  const [riderData, setRiderData] = useState(null);
  const [myVenues, setMyVenues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { store: riderStore } = useRiderCreationContext();
  const { store: loginStore } = useLoginContext();

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.venueManagerID) {
      return;
    }

    async function fetchData() {
      try {
        const respData = await getAllVenuesByManager(loginStore.venueManagerID);
        setMyVenues(respData.venues);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [loginStore.venueManagerID, loginStore.loggedIn]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.musicianID) {
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
  }, [loginStore.loggedIn, loginStore.musicianID]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.musicianID) {
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
  }, [loginStore.loggedIn, loginStore.musicianID]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.musicianID) {
      return;
    }

    if (
      riderStore.venues !== null &&
      riderStore.bands !== null &&
      bandData !== null &&
      riderData !== null
    ) {
      setIsLoading(false);
    }
  }, [
    loginStore.loggedIn,
    loginStore.musicianID,
    riderStore.venues,
    riderStore.bands,
    bandData,
    riderData,
  ]);

  const store = {
    bandData,
    riderData,
    isLoading,
    myVenues,
  };

  const actions = {
    setBandData,
    setRiderData,
    setIsLoading,
    setMyVenues,
  };

  return (
    <DashboardContext.Provider value={{ store, actions }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
