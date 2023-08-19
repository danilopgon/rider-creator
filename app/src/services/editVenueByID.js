const editVenueByID = async (venueInfo, venueID) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/venue/${venueID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
        body: JSON.stringify(venueInfo),
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default editVenueByID;
