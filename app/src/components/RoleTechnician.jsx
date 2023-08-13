import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBand } from "../services/getBand";

export const RoleTechnician = () => {
    const [bandData, setBandData] = useState([]);
    const [expandedBandId, setExpandedBandId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // const respData = await getBand();
                setBandData(mockData);
                // TO DO ENDPOINT RIDERS
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
                    Estas buscando trabajo?
                </h1>
                <div className="flex justify-center mb-4">
                    <div className="flex items-center">
                        <h2 className="mb-4 mr-8 text-2xl">Disponible</h2>
                        <label className="relative inline-flex items-center cursor-pointer mb-3">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-green-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-green-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                </div>
                <div className="container flex flex-col justify-center gap-3 mx-auto">
                    <button className="w-full btn btn-primary mb-4" type="submit">
                        Buscar trabajos
                    </button>
                </div>
            </div>

            <div className="container px-4 mx-auto shadow-md mt-8">
                <h1 className="flex justify-center mb-6 text-4xl font-bold">
                    Tus bolos
                </h1>
                <div className="mb-4">
                    <ul className="p-2 space-y-2">
                        {bandData.map((band, index) => (
                            <li key={index} className="mb-1">
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
                                        {band.riders.map((rider, index) => (
                                            <li key={index} className="mb-1 pl-2 flex items-center">
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
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container flex flex-col justify-center gap-3 mx-auto">
                    <button className="w-full btn btn-primary" type="submit">
                        Revisar rider
                    </button>
                    <button className="w-full btn btn-primary" type="button">
                        Contactar grupo
                    </button>
                </div>
            </div>
        </section>
    );
};
