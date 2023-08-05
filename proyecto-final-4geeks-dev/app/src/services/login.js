const login = async (userInfo) => {
  const { email, password } = userInfo;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    localStorage.setItem("jwt-token", data.token);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default login;
