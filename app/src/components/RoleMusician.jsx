import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBand } from "../services/getBand";
import getVenueByID from "../services/getVenueByID";
import DashboardCard from "./DashboardCard";
import RoleCardContainer from "./RoleContainer";

export const RoleMusician = () => {
  const [bandData, setBandData] = useState([]);
  const [expandedBandId, setExpandedBandId] = useState(null);
  const [expandBand, setExpandBand] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const respData = await getBand();
        getVenueByID(respData.venue_id);
        console.log(bandData);
        console.log(expandedBandId);
        setBandData(respData);
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
          Tus riders
        </h1>
        <div className="flex flex-col gap-5 justify-center items-center my-4">
          <RoleCardContainer></RoleCardContainer>
        </div>
      </div>

      <div className="container px-4 mx-auto mt-4 shadow-md">
        <h1 className="flex justify-center mb-6 text-4xl font-bold">
          Tus Grupos
        </h1>
        <div className="flex flex-col gap-5 justify-center items-center my-4">
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
                      className="badge badge-lg badge-outline badge-primary-content"
                      key={member.id}
                    >
                      {member.name}
                    </p>
                  ))}
                  {band.members_not_registred.map((member) => (
                    <p
                      className="badge badge-lg  badge-outline badge-primary-content"
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
            className="w-full max-w-md btn btn-secondary"
            type="button"
          >
            Añadir una nueva banda
          </Link>
        </div>
      </div>
    </section>
  );
};
