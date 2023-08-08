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
      x: values.x,
      y: values.y,
    };
    if (squares.length < maxSquares && newSquare.x < 8 && newSquare.y < 8) {
      setSquares([...squares, newSquare]);
    }
    resetForm();
  };

  return (
    <div className=" flex flex-col lg:flex-row-reverse min-h-screen max-w-screen justify-center items-center">
      <div className="flex justify-center items-center w-screen max-h-screen lg:w-3/5 aspect-square border-4 border-red-200 relative">
        {squares.map((square) => (
          <Draggable
            key={square.id}
            bounds="parent"
            grid={[8, 8]}
            defaultPosition={{ x: 0, y: 0 }}
          >
            <div
              className={`bg-red-500 aspect-square text-center text-white font-bold text-2xl] absolute`}
              style={{
                height: `calc(12.5% * ${square.y})`,
                width: `calc(12.5% * ${square.x})`,
              }}
            >
              {square.id}
            </div>
          </Draggable>
        ))}
      </div>
      <Formik
        initialValues={{ x: 1, y: 1 }}
        validationSchema={Yup.object({
          x: Yup.number().required("Required"),
          y: Yup.number().required("Required"),
        })}
        onSubmit={handleAddSquare}
      >
        <Form>
          <div>
            <label htmlFor="x">X:</label>
            <Field name="x" type="number" />
          </div>
          <div>
            <label htmlFor="y">Y:</label>
            <Field name="y" type="number" />
          </div>
          <button type="submit">Add Square</button>
        </Form>
      </Formik>
    </div>
  );
};

export default StagePlanner;
