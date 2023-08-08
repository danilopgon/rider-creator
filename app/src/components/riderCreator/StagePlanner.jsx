import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Draggable from "react-draggable";

const StagePlanner = () => {
  const [squares, setSquares] = useState([]);

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
    <div className=" flex flex-col lg:flex-row-reverse min-h-screen max-w-screen justify-center items-center">
      <div className="flex justify-center items-center w-80 h-80 md:w-[800px] md:h-[800px] border-4 border-red-200 relative">
        {squares.map((square) => (
          <Draggable key={square.id} bounds="parent" scale={1}>
            <div
              className={`bg-red-500 p-5 text-center aspect-square text-white font-bold text-2xl] absolute`}
              style={{
                height: `calc(10 * ${square.height}%)`,
                width: `calc(10 * ${square.width})%`,
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
        <Form>
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
