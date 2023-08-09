import { Link } from "react-router-dom";
import { getBand } from "../services/getBand";
import { useEffect } from "react";

export const RoleMusician = () => {

  useEffect(() => {
    async function fetchData() {
        try {
            const bandData = await getBand();
            console.log(bandData);
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
            Lugar
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="block mb-2 text-sm font-bold text-base-content">
            Sala
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="block mb-2 text-sm font-bold text-base-content" >
            Técnico
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
          <h1 className="block mb-2 text-sm font-bold text-base-content">
            Lugar
          </h1>
        </div>
        <div className="container flex flex-col justify-center gap-3 mx-auto">
          <button className="w-full btn btn-primary" type="button">
            Editar
          </button>

          <Link
            to="/createband"
            className="w-full btn btn-primary"
            type="button"
          >
            Añadir
          </Link>
        </div>
      </div>

    </section>
  )
}