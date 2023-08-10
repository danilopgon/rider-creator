const getDefaultGear = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/default-gear/`
    );

    if (!response.ok) {
      throw new Error("Response not ok");
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getDefaultGear;
