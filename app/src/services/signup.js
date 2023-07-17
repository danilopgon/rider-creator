const signup = async (userInfo) => {
  const { username, password, email } = userInfo;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default signup;
