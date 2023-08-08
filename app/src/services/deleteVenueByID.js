const deleteVenueByID = async (venueID) => {
  try {
    if (!localStorage.getItem("jwt-token"))
      throw new Error(
        "Debes estar logueado para registrar un venue. token invalido"
      );

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/venue/${venueID}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deleteVenueByID;
