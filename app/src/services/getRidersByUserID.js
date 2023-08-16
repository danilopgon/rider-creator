const getRidersByUserID = async () => {
  try {
    if (!localStorage.getItem("jwt-token")) {
      throw new Error(
        "Debes estar logueado para obtener la información de tus salas"
      );
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/rider/by-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
      }
    );
    const data = await response.json();

    return data.riders;
  } catch (error) {
    console.log(error);
  }
};

export default getRidersByUserID;
