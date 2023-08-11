import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Draggable from "react-draggable";

import instrumentToIconMap from "../../utils/instrumentToIcon";
import useAppContext from "../../context/AppContext";

const StagePlanner = () => {
  const [instruments, setInstruments] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [instrumentScale, setInstrumentScale] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const { store } = useAppContext();

  useEffect(() => {
    const filteredGear = store.defaultGear.filter((gear) => {
      return gear.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setSearchResults(filteredGear);
  }, []);

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
  }, [instruments, size, isMobile, isTablet, isDesktop]);

  const handleAddInstrument = (values, { resetForm }) => {
    const maxInstruments = 64;
    const newInstrument = {
      id: instruments.length + 1,
      width: values.width,
      height: values.height,
    };
    if (
      instruments.length < maxInstruments &&
      newInstrument.width < 8 &&
      newInstrument.height < 8
    ) {
      setInstruments([...instruments, newInstrument]);
    }
    resetForm();
  };

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen max-w-screen justify-center items-center md:gap-12 xl:gap-48">
      <div className=" w-80 h-80 md:scale-125 xl:scale-[2] border-4 border-red-200 relative">
        {instruments.map((instrument) => (
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
            >
              {instrumentToIcon(instrument)}
            </div>
          </Draggable>
        ))}
      </div>
      <Formik
        initialValues={{ searchQuery: "" }}
        onSubmit={(values) => {
          handleAddInstrument(values);
        }}
      >
        <Form className="m-10 grid-cols-1">
          <Field name="searchQuery">
            {({ field }) => (
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => alert(e.target.value)}
                {...field}
              />
            )}
          </Field>
          <button type="submit">Add instrument</button>
          {searchResults.map((result) => (
            <div key={result}>{result}</div>
          ))}
        </Form>
      </Formik>
    </div>
  );
};

export default StagePlanner;
