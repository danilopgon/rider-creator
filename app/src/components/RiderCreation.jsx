import React from "react";
import "../styles/RiderCreationStyles.css";
import "tailwindcss/tailwind.css"; 

const RiderCreation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-4 text-3xl font-bold">Crea tu rider</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="exampleInputText" className="form-label">
                Selecciona tu banda
              </label>
              <input
                type="text"
                className="form-input"
                id="exampleInputText"
                aria-describedby="Select your band"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputText2" className="form-label">
                ¿En qué sala?
              </label>
              <input
                type="text"
                className="form-input"
                id="exampleInputText2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputDate" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-input"
                id="exampleInputDate"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ¡Comienza a crear!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RiderCreation;
