import { Link, useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";
import RoleCardContainer from "./RoleContainer";
import useDashboardContext from "../context/DashboardContext";
import useRiderCreationContext from "../context/RiderCreationContext";

export const RoleMusician = () => {
  const { store } = useDashboardContext();
  const { store: riderCreationStore } = useRiderCreationContext();
  const { riderData, bandData } = store;
  const { bands, venues } = riderCreationStore;

  const navigate = useNavigate();

  const navigateToRider = (rider) => {
    navigate(`/rider/${rider.uid}`);
  };

  return (
    <section className="animate-fade-down animate-once animate-delay-100 animate-ease-in-out">
      <div className="container px-4 mx-auto mt-4 ">
        <h2 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Riders
        </h2>
        <div className="flex flex-col gap-5  my-4">
          <RoleCardContainer>
            {riderData && riderData.length > 0 ? (
              riderData?.map((rider) => (
                <DashboardCard
                  key={rider.id}
                  title={
                    bands &&
                    bands.find((band) => band.id === rider.band_id)?.name
                  }
                  firstButton={"Ver rider"}
                  handleFirstButton={() => {
                    navigateToRider(rider);
                  }}
                >
                  <p className="badge badge-lg badge-outline p-5 py-8 md:py-6 badge-primary-content">
                    {venues &&
                      venues.find((venue) => venue.id === rider.venue_id)?.name}
                  </p>
                  <p className="badge badge-lg badge-outline p-5 py-8 md:py-6 badge-primary-content">
                    {rider.date}
                  </p>
                </DashboardCard>
              ))
            ) : (
              <p>No hay riders</p>
            )}
          </RoleCardContainer>
          <Link
            to="/create-rider"
            className="w-full max-w-lg btn btn-secondary self-center"
            type="button"
          >
            Crea un rider
          </Link>
        </div>
      </div>

      <div className="container px-4 mx-auto mt-4 ">
        <h2 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Grupos
        </h2>
        <div className="flex flex-col gap-5 my-4">
          <RoleCardContainer>
            {bandData && bandData.length > 0 ? (
              bandData.map((band) => (
                <DashboardCard
                  key={band.id}
                  title={band.name}
                  firstButton={"Editar"}
                >
                  {band.members.map((member) => (
                    <p
                      className="badge badge-lg badge-outline p-5 py-8 md:py-6 badge-primary-content"
                      key={member.id}
                    >
                      {member.name}
                    </p>
                  ))}
                  {band.members_not_registred.map((member) => (
                    <p
                      className="badge badge-lg badge-outline p-5 py-8 md:py-6 badge-primary-content"
                      key={member.id}
                    >
                      {member.name}
                    </p>
                  ))}
                </DashboardCard>
              ))
            ) : (
              <p>No hay grupos</p>
            )}
          </RoleCardContainer>

          <Link
            to="/create-band"
            className="w-full max-w-lg btn btn-secondary self-center"
            type="button"
          >
            Añadir una nueva banda
          </Link>
        </div>
      </div>
    </section>
  );
};
