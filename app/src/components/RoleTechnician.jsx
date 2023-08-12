import { Link } from "react-router-dom";
import { getBand } from "../services/getBand";
import React, { useEffect, useState } from "react";

const mockData = [
    {
        "all_members": [
            {
                "email": "alexrofes1992@gmail.com",
                "id": 3,
                "name": "alexrofes"
            }
        ],
        "gigs": [],
        "id": 1,
        "members": [
            {
                "email": "alexrofes1992@gmail.com",
                "id": 3,
                "name": "alexrofes"
            }
        ],
        "members_not_registred": [],
        "name": "alex",
        "riders": [],
        "technicians": []
    },
    {
        "all_members": [
            {
                "email": "alexrofes1992@gmail.com",
                "id": 3,
                "name": "alexrofes"
            }
        ],
        "gigs": [],
        "id": 1,
        "members": [
            {
                "email": "alexrofes1992@gmail.com",
                "id": 3,
                "name": "alexrofes"
            }
        ],
        "members_not_registred": [],
        "name": "alex",
        "riders": [],
        "technicians": []
    }
]

export const RoleTechnician = () => {

    const [bandData, setBandData] = useState([]);
    const [expandedBandId, setExpandedBandId] = useState(null);
    const [selectedBand, setSelectedBand] = useState(null);
    const [riderData, setRiderData] = useState([]);
    const [selectedRider, setSelectedRider] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

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
                            <input type="checkbox" value="" className="sr-only peer" />
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
                    <details className="dropdown mb-32">
                        <summary className="m-1 btn">{selectedBand ? selectedBand.name : 'Nombre de la banda'}</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {bandData.map((band, index) => (<li key={index} onClick={() => setSelectedBand(band)}><a>{band.name}</a></li>))}
                        </ul>
                    </details>
                </div>
                <div className="mb-4">
                    <details className="dropdown mb-32">
                        <summary className="m-1 btn">{selectedRoom ? selectedRoom.name : 'Nombre de la sala'}</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {roomData.map((room, index) => (<li key={index} onClick={() => setSelectedRider(room)}><a>{room.name}</a></li>))}
                        </ul>
                    </details>
                </div>
                <div className="mb-4">
                    <details className="dropdown mb-32">
                        <summary className="m-1 btn">{selectedRider ? selectedRider.name : 'Rider disponible'}</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {riderData.map((rider, index) => (<li key={index} onClick={() => setSelectedRider(rider)}><a>{rider.name}</a></li>))}
                        </ul>
                    </details>
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
    )
}