const getAllVenues = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/venue/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default getAllVenues;
