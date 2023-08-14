const getAllVenues = async () => {
  try {
    if (!localStorage.getItem("jwt-token"))
      throw new Error("Debes estar logueado para obtener esta información");

    const response = await fetch(`${import.meta.env.VITE_API_URL}api/venue/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getAllVenues;
