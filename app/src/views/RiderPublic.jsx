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

  const { store: appStore, actions: appActions } = useAppContext();
  const { isDesktop, isMobile, isTablet, translatedGear, defaultGear } =
    appStore;
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { handleInstrumentInformation } = useRiderActions;
  const { instrumentScale } = useRiderStore;

  const { uid } = useParams();

  function convertDate(dateString) {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const dateObj = new Date(dateString);
    const day = days[dateObj.getUTCDay()];
    const date = dateObj.getUTCDate();
    const month = months[dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    const formattedDate = `${day}, ${date} de ${month} de ${year} a las ${hours}:${minutes}h`;

    return formattedDate;
  }

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
        icon: `/icons/${instrumentToIconMap[type]}`,
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
                {convertDate(riderInfo.date)}
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

            <h3 className="text-lg"> Comparte tu rider:</h3>
            <div className="sharing-buttons flex flex-wrap">
              <a
                className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-primary-content border-primary bg-primary hover:bg-primary-focus hover:border-primary-focus"
                target="_blank"
                rel="noreferrer"
                href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}&amp;text=Mira el rider que he preparado`}
                aria-label="Share on Facebook"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6"
                >
                  <title>Facebook</title>
                  <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z"></path>
                </svg>
              </a>
              <a
                className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-primary-content border-primary bg-primary hover:bg-primary-focus hover:border-primary-focus"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=${window.location.href}&amp;text=Mira el rider que he preparado`}
                aria-label="Share on Twitter"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6"
                >
                  <title>Twitter</title>
                  <path d="m459 152 1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 0 0 156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0 1 36 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 0 1 181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z"></path>
                </svg>
              </a>
              <a
                className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-primary-content border-primary bg-primary hover:bg-primary-focus hover:border-primary-focus"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/?text=Mira el rider que he preparado: ${window.location.href}`}
                aria-label="Share on Whatsapp"
                draggable="false"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6"
                >
                  <title>Whatsapp</title>
                  <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z"></path>
                </svg>
              </a>
              <a
                className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-primary-content border-primary bg-primary hover:bg-primary-focus hover:border-primary-focus"
                target="_blank"
                rel="noreferrer"
                href={`https://telegram.me/share/url?url=${window.location.href}&amp;text=Mira el rider que he preparado:`}
                aria-label="Share on Telegram"
                draggable="false"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6"
                >
                  <title>Telegram</title>
                  <path d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm115 169c-4 39-20 134-28 178-4 19-10 25-17 25-14 2-25-9-39-18l-56-37c-24-17-8-25 6-40 3-4 67-61 68-67l-1-4-5-1q-4 1-105 70-15 10-27 9c-9 0-26-5-38-9-16-5-28-7-27-16q1-7 18-14l145-62c69-29 83-34 92-34 2 0 7 1 10 3l4 7a43 43 0 0 1 0 10z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderPublic;
