import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Draggable from "react-draggable";

const StagePlanner = () => {
  const [squares, setSquares] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [squareScale, setSquareScale] = useState(1);

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
      setSquareScale(1);
    } else if (size.width < 1024 && isTablet) {
      setSquareScale(1.25);
    } else if (size.width > 1024 && isDesktop) {
      setSquareScale(2);
    }
  }, [squares, size, isMobile, isTablet, isDesktop]);

  const handleAddSquare = (values, { resetForm }) => {
    const maxSquares = 64;
    const newSquare = {
      id: squares.length + 1,
      width: values.width,
      height: values.height,
    };
    if (
      squares.length < maxSquares &&
      newSquare.width < 8 &&
      newSquare.height < 8
    ) {
      setSquares([...squares, newSquare]);
    }
    resetForm();
  };

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen max-w-screen justify-center items-center md:gap-12 xl:gap-48">
      <div className=" w-80 h-80 md:scale-125 xl:scale-[2] border-4 border-red-200 relative">
        {squares.map((square) => (
          <Draggable key={square.id} bounds="parent" scale={squareScale}>
            <div
              className={`bg-red-500 p-5 text-center aspect-square text-white font-bold text-2xl] absolute`}
              style={{
                height: `calc(16 * ${square.height}%)`,
                width: `calc(16 * ${square.width}%)`,
              }}
            >
              {square.id}
            </div>
          </Draggable>
        ))}
      </div>
      <Formik
        initialValues={{ width: 1, height: 1 }}
        validationSchema={Yup.object({
          width: Yup.number().required("Required"),
          height: Yup.number().required("Required"),
        })}
        onSubmit={handleAddSquare}
      >
        <Form className=" m-10 grid-cols-1">
          <div>
            <label htmlFor="width">Width:</label>
            <Field name="width" type="number" />
          </div>
          <div>
            <label htmlFor="height">Height:</label>
            <Field name="height" type="number" />
          </div>
          <button type="submit">Add Square</button>
        </Form>
      </Formik>
    </div>
  );
};

export default StagePlanner;
