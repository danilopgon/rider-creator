const recovery = async (userInfo) => {
  const { email } = userInfo;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default recovery;
