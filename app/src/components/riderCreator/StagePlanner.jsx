import Draggable from "react-draggable";

import useRiderCreationContext from "../../context/RiderCreationContext";
import InstrumentsSearchBarFormik from "./InstrumentsSearchBar";
import Instrument from "./Instrument";

const StagePlanner = () => {
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const {
    handleAddInstrument,
    handleInstrumentInformation,
    getSavedPositions,
  } = useRiderActions;
  const { instrumentInformation, instrumentScale, filter, creatorStep } =
    useRiderStore;

  return (
    <div className="flex flex-col md:flex-row-reverse h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-12 xl:gap-48 animate-fade">
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

      <div>
        <InstrumentsSearchBarFormik onSubmit={handleAddInstrument} />
      </div>
    </div>
  );
};

export default StagePlanner;
