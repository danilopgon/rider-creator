const checkTokenValidity = async (handleLogout, handleValidationLogin) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/auth/validate-token`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        handleLogout();
        return;
      }

      return handleValidationLogin();
    } catch (error) {
      console.error("Failed to validate token:", error);
      localStorage.removeItem("jwt-token");
    }
  }
};

export default checkTokenValidity;
