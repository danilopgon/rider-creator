import { Link } from "react-router-dom";

import useDashboardContext from "../context/DashboardContext";
import DashboardCard from "./DashboardCard";
import RoleCardContainer from "./RoleContainer";

export const RoleManager = () => {
  const { store } = useDashboardContext();

  return (
    <section>
      <div className="container px-4 mx-auto mt-4 ">
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Salas
        </h1>
        <div className="flex flex-col gap-5 justify-center items-center my-4">
          <RoleCardContainer>
            {store.myVenues && store.myVenues.length > 0 ? (
              store.myVenues.map((venue) => (
                <DashboardCard
                  key={venue.id}
                  title={venue.name}
                  firstButton={"Editar"}
                >
                  <p className="badge badge-lg badge-outline badge-primary-content">
                    {`${venue.address.street} ${venue.address.number}, ${venue.address.city}, ${venue.address.country}`}
                  </p>
                  <p className="badge badge-lg badge-outline badge-primary-content">
                    Capacidad: {venue.capacity} personas
                  </p>
                </DashboardCard>
              ))
            ) : (
              <p>No hay salas</p>
            )}
          </RoleCardContainer>
          <Link
            to="/create-venue"
            className="w-full max-w-lg btn btn-secondary"
            type="button"
          >
            Crea una sala
          </Link>
        </div>
      </div>
    </section>
  );
};
