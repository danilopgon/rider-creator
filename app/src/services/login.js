const login = async (userInfo) => {
  const { email, password } = userInfo;

  console.log(userInfo);

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
    console.log(data);
    localStorage.setItem("jwt-token", data.token);
  } catch (error) {
    console.log(error);
  }
};

export default login;
