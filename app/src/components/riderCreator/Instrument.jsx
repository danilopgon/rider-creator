import { useEffect } from "react";
import Draggable from "react-draggable";

const Instrument = ({
  instrument,
  instrumentScale,
  savedPositions,
  handleInstrumentInformation,
  filter,
  creatorStep,
}) => {
  return (
    <Draggable
      key={instrument.id}
      bounds="parent"
      scale={instrumentScale}
      defaultPosition={savedPositions[instrument.id]}
      onStop={(event, data) => {
        handleInstrumentInformation(event, data, instrument);
      }}
      disabled={creatorStep !== 2}
    >
      <div
        className={`text-center aspect-square absolute flex justify-center items-center`}
        style={{
          height: `calc(12 * ${instrument.height}%)`,
          width: `calc(12 * ${instrument.width}%)`,
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
  );
};

export default Instrument;
