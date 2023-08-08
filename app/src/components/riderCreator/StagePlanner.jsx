import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Draggable from "react-draggable";

const StagePlanner = () => {
  const [squares, setSquares] = useState([]);

  const handleAddSquare = (values, { resetForm }) => {
    const maxSquares = 32;
    const newSquare = {
      id: squares.length + 1,
      x: values.x,
      y: values.y,
      position: "absolute",
    };
    if (squares.length < maxSquares && newSquare.x < 8 && newSquare.y < 4) {
      setSquares([...squares, newSquare]);
    }
    resetForm();
  };

  return (
    <>
      <div className="grid grid-cols-8 grid-rows-4 justify-center items-center w-screen lg:w-2/4 h-96 border-4 border-red-200 relative">
        {squares.map((square) => (
          <Draggable
            key={square.id}
            bounds="parent"
            defaultPosition={{ x: square.x, y: square.y }}
          >
            <div className="bg-red-500 col-span-1 row-span-1">{square.id}</div>
          </Draggable>
        ))}
      </div>
      <Formik
        initialValues={{ x: 0, y: 0 }}
        validationSchema={Yup.object({
          x: Yup.number().required("Required"),
          y: Yup.number().required("Required"),
        })}
        onSubmit={handleAddSquare}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="x">X:</label>
              <Field name="x" type="number" />
              {errors.x && touched.x ? <div>{errors.x}</div> : null}
            </div>
            <div>
              <label htmlFor="y">Y:</label>
              <Field name="y" type="number" />
              {errors.y && touched.y ? <div>{errors.y}</div> : null}
            </div>
            <button type="submit">Add Square</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StagePlanner;
