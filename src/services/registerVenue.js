const registerVenue = async (venueInfo) => {
  try {
    if (!localStorage.getItem("jwt-token"))
      throw new Error(
        "Debes estar logueado para registrar un venue. token invalido"
      );

    const response = await fetch(`${import.meta.env.VITE_API_URL}api/venue/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
      body: JSON.stringify(venueInfo),
    });

    return response;
  } catch (error) {
    throw new Error("Error al registrar la sala" + error.message);
  }
};

export default registerVenue;
