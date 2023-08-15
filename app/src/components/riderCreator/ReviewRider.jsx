import useRiderCreationContext from "../../context/RiderCreationContext";
import Instrument from "./Instrument";

const ReviewRider = () => {
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { handleInstrumentInformation, getSavedPositions } = useRiderActions;
  const { instrumentInformation, instrumentScale, filter, creatorStep } =
    useRiderStore;

  return (
    <div className="flex flex-col  h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-12 xl:gap-48">
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
      <div className="flex flex-col gap-4 md:gap-6 w-full md:w-1/2 xl:w-1/3">
        <h2 className="text-2xl  font-bold ">Pistas:</h2>
        {instrumentInformation?.map((instrument) => (
          <div
            key={instrument.id}
            className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary"
          >
            <div className="inline-block  text-xl text-center pr-2  font-bold text-base-content">
              {instrument.order}
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
    </div>
  );
};

export default ReviewRider;
