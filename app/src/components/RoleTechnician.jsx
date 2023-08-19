import { Link } from "react-router-dom";

import useDashboardContext from "../context/DashboardContext";
import useRiderCreationContext from "../context/RiderCreationContext";
import DashboardCard from "./DashboardCard";
import RoleCardContainer from "./RoleContainer";

export const RoleTechnician = () => {
  const { store } = useDashboardContext();
  const { store: riderCreationStore } = useRiderCreationContext();
  const { bands, venues } = riderCreationStore;

  return (
    <section className="animate-fade-down animate-once animate-delay-100 animate-ease-in-out">
      <div className="container px-4 mx-auto mt-4 ">
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          ¿Estás buscando trabajo?
        </h1>
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <h2 className="mb-4 mr-8 text-2xl">Disponible</h2>
            <label className="relative inline-flex items-center cursor-pointer mb-3">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-6 bg-primary peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-base-content peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success"></div>
            </label>
          </div>
        </div>
        <Link
          className="w-full max-w-lg btn btn-secondary self-center my-5"
          type="button"
        >
          Busca trabajos
        </Link>
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Bolos
        </h1>
        <div className="flex flex-col gap-5  my-4">
          <RoleCardContainer>
            {store.techRiderData && store.techRiderData.length > 0 ? (
              store.techRiderData?.map((rider) => (
                <DashboardCard
                  key={rider.id}
                  title={
                    bands &&
                    bands.find((band) => band.id === rider.band_id)?.name
                  }
                  firstButton={"Editar"}
                >
                  <p className="badge badge-lg badge-outline badge-primary-content">
                    {venues &&
                      venues.find((venue) => venue.id === rider.venue_id)?.name}
                  </p>
                  <p className="badge badge-lg badge-outline badge-primary-content">
                    {rider.date}
                  </p>
                </DashboardCard>
              ))
            ) : (
              <p>No hay riders</p>
            )}
          </RoleCardContainer>
        </div>
      </div>
    </section>
  );
};
