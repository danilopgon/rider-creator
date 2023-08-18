const getRiderByUID = async (uid) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}api/rider/public/${uid}`
  );
  if (!response.ok) {
    throw new Error("Response not ok");
  }

  return response.json();
};
export default getRiderByUID;
