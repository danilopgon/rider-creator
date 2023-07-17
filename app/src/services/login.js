const login = async (data) => {
  const { username, password } = data;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem("jwt-token", data.token);
    console.log(localStorage.getItem("jwt-token"));
  } catch (error) {
    console.log(error);
  }
};

export default login;
