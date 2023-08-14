const getAllVenuesByManager = async (managerID) => {
  try {
    if (!localStorage.getItem("jwt-token")) {
      throw new Error(
        "Debes estar logueado para obtener la información de tus salas"
      );
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/venue/manager/${managerID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
      }
    );

    const data = await response.json(); 

    console.log(data.message); 

    return data; 
  } catch (error) {
    console.log(error);
  }
};

export default getAllVenuesByManager;
