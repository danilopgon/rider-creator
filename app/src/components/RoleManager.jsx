import { useEffect } from "react";


export const RoleManager = () => {

    return (
        <section>
            <div className="container px-4 mx-auto shadow-md">
                <h1 className="flex justify-center mb-6 text-4xl font-bold">
                    Tu Rider
                </h1>
                <div className="mb-4">
                    <h1
                        className="block mb-2 text-sm font-bold text-base-content"
                    >
                        Lugar
                    </h1>
                </div>
                <div className="mb-4">
                    <h1
                        className="block mb-2 text-sm font-bold text-base-content"
                    >
                        dirección
                    </h1>
                </div>
                <div className="mb-4">
                    <h1
                        className="block mb-2 text-sm font-bold text-base-content"
                    >
                        Sala
                    </h1>
                </div>

                <div className="container flex flex-col justify-center gap-3 mx-auto">
                    <button className="w-full btn btn-primary" type="submit">
                        Ver riders
                    </button>

                    <button className="w-full btn btn-primary" type="button">
                        Editar
                    </button>
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