import { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useLoginContext from "./LoginContext";
import useRiderCreationContext from "./RiderCreationContext";
import useAppContext from "./AppContext";
import { getBand } from "../services/getBand";
import getRidersByUserID from "../services/getRidersByUserID";
import getVenueByID from "../services/getVenueByID";
import getAllVenuesByManager from "../services/getAllVenuesByManager";
import getRidersByTechnician from "../services/getRidersByTechnician";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [isSelect, setIsSelect] = useState(null);
  const [bandData, setBandData] = useState(null);
  const [riderData, setRiderData] = useState(null);
  const [techRiderData, setTechRiderData] = useState(null);
  const [myVenues, setMyVenues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(null);

  const { store: riderStore } = useRiderCreationContext();
  const { store: loginStore } = useLoginContext();
  const { store: appStore, actions: appActions } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    if (!loginStore.loggedIn) {
      return;
    }

    setImg(loginStore.myUser?.img);
  }, [loginStore.myUser, appStore.refreshData, loginStore.loggedIn]);

  useEffect(() => {
    setIsSelect(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.technicianID) {
      setTechRiderData([]);
      return;
    }

    const fetchTechRiders = async () => {
      try {
        const respData = await getRidersByTechnician();
        setTechRiderData(respData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechRiders();
  }, [loginStore.loggedIn, loginStore.technicianID, isSelect]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.venueManagerID) {
      setMyVenues([]);
      return;
    }

    const fetchData = async () => {
      try {
        const respData = await getAllVenuesByManager(loginStore.venueManagerID);
        setMyVenues(respData.venues || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loginStore.venueManagerID, loginStore.loggedIn, isSelect]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.musicianID) {
      setBandData([]);
      return;
    }

    async function fetchData() {
      try {
        const respData = await getBand();

        setBandData(respData || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [loginStore.loggedIn, loginStore.musicianID, isSelect]);

  useEffect(() => {
    if (!loginStore.loggedIn || !loginStore.musicianID) {
      setRiderData([]);
      return;
    }

    async function fetchData() {
      try {
        const respData = await getRidersByUserID();

        setRiderData(respData || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [loginStore.loggedIn, loginStore.musicianID, isSelect]);

  useEffect(() => {
    if (!loginStore.loggedIn) {
      return;
    }

    if (
      riderStore.venues !== null &&
      riderStore.bands !== null &&
      bandData !== null &&
      riderData !== null &&
      techRiderData !== null &&
      myVenues !== null
    ) {
      setIsLoading(false);
    }
  }, [
    loginStore.loggedIn,
    loginStore.musicianID,
    loginStore.technicianID,
    loginStore.venueManagerID,
    riderStore.venues,
    riderStore.bands,
    techRiderData,
    bandData,
    riderData,
    isSelect,
    appStore.refreshData,
    myVenues,
    isSelect,
  ]);

  const store = {
    bandData,
    riderData,
    isLoading,
    myVenues,
    techRiderData,
    isSelect,
    img,
  };

  const actions = {
    setBandData,
    setRiderData,
    setIsLoading,
    setMyVenues,
    setIsSelect,
  };

  return (
    <DashboardContext.Provider value={{ store, actions }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
