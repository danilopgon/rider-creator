const changePassword = async (values, token) => {
  const { password } = values;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/get-new-password/${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default changePassword;
