export const getBand = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/band/band_by_user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Error en getBand");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
