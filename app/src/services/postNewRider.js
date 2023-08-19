const postNewRider = async (data) => {
  const url = `${import.meta.env.VITE_API_URL}api/rider/`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt-token"),
    },
  });

  return response;
};

export default postNewRider;
