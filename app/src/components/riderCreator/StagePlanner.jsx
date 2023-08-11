import { useEffect, useState } from "react";
import Draggable from "react-draggable";

import useAppContext from "../../context/AppContext";
import useRiderCreationContext from "../../context/RiderCreationContext";
import InstrumentsSearchBarFormik from "./InstrumentsSearchBar";

const StagePlanner = () => {
  const { store: appStore, actions: appActions } = useAppContext();
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { searchResults, selectedInstruments, size, instrumentScale } =
    useRiderStore;
  const { setSelectedInstruments, setSize, setInstrumentScale } =
    useRiderActions;
  const { isDesktop, isMobile, isTablet } = appStore;
  const { setIsDesktop, setIsMobile, setIsTablet } = appActions;

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width < 768) {
      setIsMobile(true);
      setIsDesktop(false);
      setIsTablet(false);
    } else if (size.width < 1024 && size.width > 768) {
      setIsTablet(true);
      setIsDesktop(false);
      setIsMobile(false);
    } else {
      setIsDesktop(true);
      setIsMobile(false);
      setIsTablet(false);
    }
  }, [size]);

  useEffect(() => {
    if (size.width < 768 && isMobile) {
      setInstrumentScale(1);
    } else if (size.width < 1024 && isTablet) {
      setInstrumentScale(1.25);
    } else if (size.width > 1024 && isDesktop) {
      setInstrumentScale(2);
    }
  }, [selectedInstruments, size, isMobile, isTablet, isDesktop]);

  const handleAddInstrument = (values, { resetForm }) => {
    const maxInstruments = 64;
    const newInstrument = {
      id: selectedInstruments.length + 1,
      width: values.width,
      height: values.height,
    };
    if (
      selectedInstruments.length < maxInstruments &&
      newInstrument.width < 8 &&
      newInstrument.height < 8
    ) {
      setSelectedInstruments([...selectedInstruments, newInstrument]);
    }
    resetForm();
  };

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen max-w-screen justify-center items-center md:gap-12 xl:gap-48">
      <div className=" w-80 h-80 md:scale-125 xl:scale-[2] border-4 border-red-200 relative">
        {selectedInstruments?.map((instrument) => (
          <Draggable
            key={instrument.id}
            bounds="parent"
            scale={instrumentScale}
          >
            <div
              className={`bg-red-500 p-5 text-center aspect-square text-white font-bold text-2xl] absolute`}
              style={{
                height: `calc(16 * ${instrument.height}%)`,
                width: `calc(16 * ${instrument.width}%)`,
              }}
            ></div>
          </Draggable>
        ))}
      </div>

      <div>
        <InstrumentsSearchBarFormik onSubmit={handleAddInstrument} />
        <div className="flex flex-col join max-h-20 overflow-y-scroll">
          {searchResults?.map((instrument) => (
            <div
              key={instrument.id}
              className="flex items-center gap-4 cursor-pointer"
            >
              {instrument.type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StagePlanner;
