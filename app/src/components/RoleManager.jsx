import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllVenuesByManager from "../services/getAllVenuesByManager";
import useLoginContext from "../context/LoginContext";

export const RoleManager = () => {
    const { store } = useLoginContext();
    const [rooms, setRooms] = useState([]);
    const [expandRoom, setExpandRoom] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const respData = await getAllVenuesByManager(store.venueManagerID);
                setRooms(respData.venues);
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
                    Tus Salas
                </h1>
                <div className="mb-4 space-y-4">
                    {rooms.map((room, index) => (
                        <div key={index} className="card card-compact w-full bg-base-100 shadow-xl">
                            <div className="card-body">
                                <button
                                    className="text-blue-500 underline cursor-pointer"
                                    onClick={() =>
                                        setExpandRoom(
                                            expandRoom === room.id ? null : room.id
                                        )
                                    }
                                >
                                    <h2 className="card-title">{room.name}</h2>
                                </button>
                                {expandRoom === room.id && (
                                    <div className="mt-2 pl-4 border-l-2 border-blue-500 space-y-1">
                                        <p>Ciudad: {room.address.city}</p>
                                        <p>País: {room.address.country}</p>
                                        <p>Calle: {room.address.street}</p>
                                        <p>Codigo Postal: {room.address.number}</p>
                                        <p>Tipo: {room.address.type}</p>
                                        <p>Capacidad: {room.capacity}</p>
                                        <div className="card-actions flex flex-col justify-between items-stretch gap-3">
                                            <button className="btn btn-primary w-full">Ver Riders</button>
                                            <button className="btn btn-primary w-full">Editar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container px-4 mx-auto mt-4 shadow-md">
                <div className="container flex flex-col justify-center gap-3 mx-auto">
                    <Link to="/create-venue">
                        <button className="w-full btn btn-primary" type="button">
                            Añadir una sala
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
