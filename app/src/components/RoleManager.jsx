import { useEffect, useState } from "react";
import { getBand } from "../services/getBand";

const mockData = [{
    name: 'sala maja',
    city: 'la papa gallega',
    street: 'gallego46'
},
{
    name: 'sala pica',
    city: 'barcelona',
    street: 'diputacio'
}]


export const RoleManager = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // const respData = await getBand();
                setRooms(mockData);
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
                    Tu Rider
                </h1>
                <div className="mb-4">
                    {rooms.map(room => (
                        <>
                            <div className="card card-compact w-full bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{room.name}</h2>
                                    <p>{room.city}</p>
                                    <p>{room.street}</p>
                                    <div className="card-actions flex flex-col justify-between items-stretch gap-3">
                                        <button className="btn btn-primary w-full">Ver Riders</button>
                                        <button className="btn btn-primary w-full">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div className="container px-4 mx-auto mt-4 shadow-md">
                <div className="container flex flex-col justify-center gap-3 mx-auto">
                    <button className="w-full btn btn-primary" type="button">
                        Añadir una sala
                    </button>
                </div>
            </div>
        </section>
    )
}