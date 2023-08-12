import { useEffect } from "react";
import Draggable from "react-draggable";

import useAppContext from "../../context/AppContext";
import useRiderCreationContext from "../../context/RiderCreationContext";
import InstrumentsSearchBarFormik from "./InstrumentsSearchBar";
import instrumentToIconMap from "../../utils/instrumentToIcon";

const StagePlanner = () => {
  const { store: appStore, actions: appActions } = useAppContext();
  const { store: useRiderStore, actions: useRiderActions } =
    useRiderCreationContext();

  const { selectedInstruments, size, instrumentScale, filter } = useRiderStore;
  const { setSelectedInstruments, setSize, setInstrumentScale, setFilter } =
    useRiderActions;
  const { isDesktop, isMobile, isTablet, translatedGear } = appStore;
  const { setIsDesktop, setIsMobile, setIsTablet } = appActions;

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      setInstrumentScale(1.75);
    }
  }, [selectedInstruments, size, isMobile, isTablet, isDesktop]);

  const handleAddInstrument = (values, { resetForm }) => {
    const maxInstruments = 64;
    const findInstrument = translatedGear.find(
      (instrument) => instrument.type === values.searchQuery
    );

    const { type, size } = findInstrument;

    const sizeMultiplier = size === "Small" ? 1 : size === "Medium" ? 2 : 3;
    const newInstrument = {
      id: selectedInstruments.length + 1,
      type,
      width: sizeMultiplier,
      height: sizeMultiplier,
      icon: `./src/assets/icons/${instrumentToIconMap[type]}`,
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
      <div className=" w-80 h-80 md:scale-125 xl:scale-[1.75] border-4 border-red-200 relative">
        {selectedInstruments?.map((instrument) => (
          <Draggable
            key={instrument.id}
            bounds="parent"
            scale={instrumentScale}
          >
            <div
              className={`text-center aspect-square absolute flex justify-center items-center`}
              style={{
                height: `calc(16 * ${instrument.height}%)`,
                width: `calc(16 * ${instrument.width}%)`,
                mask: `url(${instrument.icon}) no-repeat center`,
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
