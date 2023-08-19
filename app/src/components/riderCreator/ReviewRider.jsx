import useRiderCreationContext from "../../context/RiderCreationContext";
import Instrument from "./Instrument";

const ReviewRider = () => {
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const {
    handleInstrumentInformation,
    getSavedPositions,
    getBandName,
    getTime,
    getVenueName,
    submitRiderInformation,
  } = useRiderActions;
  const {
    instrumentInformation,
    instrumentScale,
    filter,
    creatorStep,
    riderVenueID,
    riderBandID,
    riderTime,
  } = useRiderStore;

  return (
    <div className="flex flex-col  h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-12 xl:gap-48 animate-fade">
      <div className=" w-80 h-80 md:scale-125 xl:scale-[1.75] border-4 border-base-content rounded-xl relative">
        {instrumentInformation?.map((instrument) => (
          <Instrument
            key={instrument.id}
            instrument={instrument}
            instrumentScale={instrumentScale}
            savedPositions={getSavedPositions(instrumentInformation)}
            handleInstrumentInformation={handleInstrumentInformation}
            filter={filter}
            creatorStep={creatorStep}
          />
        ))}
      </div>
      <div className="my-5 flex flex-col gap-4 md:gap-6 w-full md:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-bold ">Información del concierto:</h2>

        <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
          <div className="text-xl text-center pr-2  font-bold text-base-content">
            {riderVenueID
              ? getVenueName(riderVenueID)
              : "No hay lugar seleccionado"}
          </div>
        </div>
        <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
          <div className="text-xl text-center pr-2  font-bold text-base-content">
            {riderBandID
              ? getBandName(riderBandID)
              : "No hay banda seleccionada"}
          </div>
        </div>
        <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
          <div className="text-xl text-center pr-2  font-bold text-base-content">
            {riderTime ? getTime(riderTime) : "No hay hora seleccionada"}
          </div>
        </div>
        <h2 className="text-2xl  font-bold ">Pistas:</h2>
        {instrumentInformation?.length === 0 && (
          <div className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary">
            <div className="text-xl text-center pr-2  font-bold text-base-content">
              ¡Añade tus instrumentos!
            </div>
          </div>
        )}
        {instrumentInformation?.map((instrument) => (
          <div
            key={instrument.id}
            className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary"
          >
            <div className="inline-block  text-xl text-center pr-2  font-bold text-base-content">
              {instrument.order + 1}
            </div>
            <div className=" inline text-lg font-medium text-base-content ">
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
      <button
        className=" btn btn-primary text-white font-bold
              py-2 px-4 rounded w-full md:w-1/2 xl:w-1/3"
        onClick={() => submitRiderInformation()}
      >
        Enviar datos
      </button>
    </div>
  );
};

export default ReviewRider;
