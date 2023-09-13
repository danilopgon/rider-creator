const activeAccount = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/active/${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default activeAccount;
