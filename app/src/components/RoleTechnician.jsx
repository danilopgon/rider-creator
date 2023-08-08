import { Link } from "react-router-dom";

export const RoleTechnician = () => {

    const initialValues = {
        lugar: "",
        sala: "",
        tecnico: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

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
                    <h1 className="block mb-2 text-sm font-bold text-base-content">
                        Lugar
                    </h1>
                </div>
                <div className="mb-4">
                    <h1 className="block mb-2 text-sm font-bold text-base-content">
                        Sala
                    </h1>
                </div>
                <div className="mb-4">
                    <h1
                        className="block mb-2 text-sm font-bold text-base-content">
                        Rider disponible
                    </h1>
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