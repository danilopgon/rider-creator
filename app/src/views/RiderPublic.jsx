import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRiderCreationContext from "../context/RiderCreationContext";

import Instrument from "../components/riderCreator/Instrument";
import getAllRiders from "../services/getAllRiders";
import getBandByID from "../services/getBandById";
import getVenueByID from "../services/getVenueByID";

const RiderPublic = () => {
  const [rider, setRider] = useState(null);
  const [venueName, setVenueName] = useState("No hay lugar seleccionado");
  const [bandName, setBandName] = useState("No hay banda seleccionada");
  const [time, setTime] = useState("No hay hora seleccionada");
  const [riderInfo, setRiderInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allRiders, setAllRiders] = useState(null);

  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();
  const { handleInstrumentInformation, getSavedPositions } = useRiderActions;
  const { instrumentScale, filter } = useRiderStore;

  const params = useParams();
  const { riderID } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRiders();
        setAllRiders(response.riders);
        const rider = response.riders.find((rider) => rider.id === riderID);
        setRider(rider);
        const band = await getBandByID(rider.band_id);
        setBandName(band.name);
        const venue = await getVenueByID(rider.venue_id);
        setVenueName(venue.name);
        setTime(rider.time);
        setRiderInfo(rider.gears);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [riderID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-12 xl:gap-48 animate-fade">
      <div className="w-80 h-80 md:scale-125 xl:scale-[1.75] border-4 border-base-content rounded-xl relative">
        {riderInfo.length > 0 &&
          riderInfo.map((instrument) => (
            <Instrument
              key={instrument.id}
              instrument={instrument}
              instrumentScale={instrumentScale}
              savedPositions={getSavedPositions(riderInfo)}
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
            {time}
          </div>
        </div>
        <h2 className="text-2xl font-bold ">Pistas:</h2>
        {riderInfo.length === 0 && (
          <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
            <div className="text-xl text-center pr-2 font-bold text-base-content">
              ¡Añade tus instrumentos!
            </div>
          </div>
        )}
        {riderInfo.length > 0 &&
          riderInfo.map((instrument) => (
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
  );
};

export default RiderPublic;
