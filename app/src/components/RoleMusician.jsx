import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBand } from "../services/getBand";
import getVenueByID from "../services/getVenueByID";

export const RoleMusician = () => {
  const [bandData, setBandData] = useState([]);
  const [expandedBandId, setExpandedBandId] = useState(null);
  const [expandBand, setExpandBand] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const respData = await getBand();
        getVenueByID(respData.venue_id);
        console.log(bandData);
        console.log(expandedBandId);
        setBandData(respData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      <div className="container px-4 mx-auto shadow-md">
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          Tu Rider
        </h1>
        <div className="mb-4">
          <h1 className="block mb-2 text-sm font-bold text-base-content">
            {bandData.length > 0 ? (
              <ul>
                {bandData.map((band) => (
                  <li key={band.id}>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={() =>
                        setExpandBand(
                          expandBand === band.id ? null : band.id
                        )
                      }
                    >
                      <span className="font-semibold text-lg text-indigo-600">
                        {band.name}
                      </span>
                    </button>
                    {expandedBandId === band.id && (
                      <ul className="mt-2 pl-4 border-l-2 border-blue-500 space-y-1">
                        {band.riders.map((rider, index) => (
                          <>
                            <li
                              key={index}
                              className="mb-1 pl-2 flex items-center"
                            >
                              <span className="mr-2 text-blue-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-2a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zm-1 5a3 3 0 016 0H5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              {rider.technician_id}
                            </li>
                            <li
                              key={index}
                              className="mb-1 pl-2 flex items-center"
                            >
                              <span className="mr-2 text-blue-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-2a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zm-1 5a3 3 0 016 0H5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              {rider.venue_id}
                            </li>
                          </>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay grupos</p>
            )}
          </h1>
        </div>
        <div className="container flex flex-col justify-center gap-3 mx-auto">
          <button className="w-full btn btn-primary" type="submit">
            Buscar técnico
          </button>
          <button className="w-full btn btn-primary" type="button">
            Editar
          </button>
        </div>
      </div>

      <div className="container flex justify-center px-12 py-2 mx-auto">
        <button className="w-full btn btn-primary" type="button">
          Comienza a crear
        </button>
      </div>
      <div className="container px-4 mx-auto mt-4 shadow-md">
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Grupos
        </h1>
        <div className="mb-4">
          {bandData.length > 0 ? (
            <ul>
              {bandData.map((band) => (
                <li key={band.id}>
                  <button
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() =>
                      setExpandedBandId(
                        expandedBandId === band.id ? null : band.id
                      )
                    }
                  >
                    <span className="font-semibold text-lg text-indigo-600">
                      {band.name}
                    </span>
                  </button>
                  {expandedBandId === band.id && (
                    <ul className="mt-2 pl-4 border-l-2 border-blue-500 space-y-1">
                      {band.all_members.map((member, index) => (
                        <li
                          key={index}
                          className="mb-1 pl-2 flex items-center"
                        >
                          <span className="mr-2 text-blue-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-2a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zm-1 5a3 3 0 016 0H5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          {member.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay grupos</p>
          )}
        </div>
        <div className="container flex flex-col justify-center gap-3 mx-auto">
          <button className="w-full btn btn-primary" type="button">
            Editar
          </button>

          <Link to="/createband" className="w-full btn btn-primary" type="button">
            Añadir
          </Link>
        </div>
      </div>
    </section>
  );
};
