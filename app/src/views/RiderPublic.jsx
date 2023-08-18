import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAppContext from "../context/AppContext";
import useRiderCreationContext from "../context/RiderCreationContext";

import Instrument from "../components/riderCreator/Instrument";
import instrumentToIconMap from "../utils/instrumentToIcon";
import getRiderByUID from "../services/getRiderByUID";

const RiderPublic = () => {
  const [riderInfo, setRiderInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [instrumentInfo, setInstrumentInfo] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [bandName, setBandName] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setFilter(
          "invert(85%) sepia(3%) saturate(883%) hue-rotate(181deg) brightness(80%) contrast(94%)"
        )
      : setFilter(
          "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
        );
  }, []);

  const { store: appStore, actions: appActions } = useAppContext();
  const { isDesktop, isMobile, isTablet, translatedGear, defaultGear } =
    appStore;
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { handleInstrumentInformation } = useRiderActions;
  const { instrumentScale } = useRiderStore;

  const { uid } = useParams();

  const getSavedPositions = (instrumentInformation) => {
    return instrumentInformation.reduce((positions, instrument) => {
      if (instrument.x && instrument.y) {
        positions[instrument.id] = {
          x: instrument.x,
          y: instrument.y,
        };
      }

      return positions;
    }, {});
  };

  const convertGears = (gears) => {
    if (!defaultGear.length) return;

    const convertedGears = gears.map((gear, index) => {
      const findGear = defaultGear.find(
        (findGear) => findGear.id === gear.gear_id
      );
      const findInstrument = translatedGear.find(
        (instrument) => instrument.id === findGear.id
      );

      const type = findInstrument ? findInstrument.type : "";
      const sizeMultiplier =
        findGear.size === "Small" ? 1 : findGear.size === "Medium" ? 2 : 3;
      const newInstrument = {
        order: index,
        id: index + 1,
        type,
        width: sizeMultiplier,
        height: sizeMultiplier,
        icon: `.././src/assets/icons/${instrumentToIconMap[type]}`,
        x: gear.coordinates_x,
        y: gear.coordinates_y,
        notes: gear.notes,
      };

      return newInstrument;
    });
    setInstrumentInfo(convertedGears);
  };

  useEffect(() => {
    const getRiderInfo = async () => {
      const response = await getRiderByUID(uid);
      const rider = await response.rider;

      setRiderInfo(rider);
      convertGears(rider.gears);
      setVenueName(rider.venue_name);
      setBandName(rider.band_name);
      setDate(rider.date);
      setIsLoading(false);
    };
    getRiderInfo();
  }, [uid, defaultGear, translatedGear]);

  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
        <div
          className={` flex justify-center  xl:w-4/7 md:mx-10 backdrop-blur-md bg-base-200/50 p-5 rounded-lg my-10`}
        >
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen max-w-screen bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div
        className={`w-full xl:w-4/7 md:mx-10 backdrop-blur-md bg-base-200/50 p-5 rounded-lg my-10`}
      >
        <div className="flex flex-col md:flex-row-reverse h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-16 xl:gap-48 animate-fade">
          <div className="w-80 h-80 md:scale-125 xl:scale-[1.75] border-4 border-base-content rounded-xl relative">
            {instrumentInfo.length > 0 &&
              instrumentInfo.map((instrument) => (
                <Instrument
                  key={instrument.id}
                  instrument={instrument}
                  instrumentScale={instrumentScale}
                  savedPositions={getSavedPositions(instrumentInfo)}
                  handleInstrumentInformation={handleInstrumentInformation}
                  filter={filter}
                  creatorStep={4}
                />
              ))}
          </div>
          <div className="my-5 flex flex-col gap-4 md:gap-6 w-full md:w-1/2 xl:w-1/3">
            <h2 className="text-2xl font-bold ">Información del concierto:</h2>

            <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
              <div className="text-xl text-center pr-2 font-bold text-base-content">
                {venueName}
              </div>
            </div>
            <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
              <div className="text-xl text-center pr-2 font-bold text-base-content">
                {bandName}
              </div>
            </div>
            <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
              <div className="text-xl text-center pr-2 font-bold text-base-content">
                {riderInfo.date}
              </div>
            </div>
            <h2 className="text-2xl font-bold ">Pistas:</h2>
            {instrumentInfo.length === 0 && (
              <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
                <div className="text-xl text-center pr-2 font-bold text-base-content">
                  ¡No hay instrumentos aquí!
                </div>
              </div>
            )}
            {instrumentInfo.length > 0 &&
              instrumentInfo.map((instrument) => (
                <div
                  key={instrument.id}
                  className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary"
                >
                  <div className="inline-block text-xl text-center pr-2 font-bold text-base-content">
                    {instrument.order + 1}
                  </div>
                  <div className="inline text-lg font-medium text-base-content">
                    {instrument.type}
                  </div>

                  <div className="text-base-content">
                    {instrument.notes
                      ? instrument.notes
                      : "No hay notas para este instrumento"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderPublic;
