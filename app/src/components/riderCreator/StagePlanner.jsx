import Draggable from "react-draggable";

import useRiderCreationContext from "../../context/RiderCreationContext";
import InstrumentsSearchBarFormik from "./InstrumentsSearchBar";

const StagePlanner = () => {
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { handleAddInstrument, handleInstrumentInformation } = useRiderActions;
  const {
    selectedInstruments,
    instrumentInformation,
    instrumentScale,
    filter,
  } = useRiderStore;

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen max-w-screen justify-center items-center md:gap-12 xl:gap-48">
      <div className=" w-80 h-80 md:scale-125 xl:scale-[1.75] border-4 border-base-content rounded-xl relative">
        {selectedInstruments?.map((instrument) => (
          <Draggable
            key={instrument.id}
            bounds="parent"
            scale={instrumentScale}
            onStop={(event, data) => {
              handleInstrumentInformation(event, data, instrument);
            }}
          >
            <div
              className={`text-center aspect-square absolute flex justify-center items-center`}
              style={{
                height: `calc(16 * ${instrument.height}%)`,
                width: `calc(16 * ${instrument.width}%)`,
                transform: `translate(${
                  instrumentInformation[instrument.id]?.x
                }px, ${instrumentInformation[instrument.id]?.y}px)`,
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: "100%",
                  height: "100%",
                  filter: filter,
                }}
              >
                <image href={instrument.icon} height="100%" width="100%" />
              </svg>
            </div>
          </Draggable>
        ))}
      </div>

      <div>
        <InstrumentsSearchBarFormik onSubmit={handleAddInstrument} />
      </div>
    </div>
  );
};

export default StagePlanner;
