const checkTokenValidity = async (
  handleLogout,
  handleValidationLogin,
  handleRolePermissions
) => {
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

      handleRolePermissions(token);
      return handleValidationLogin();
    } catch (error) {
      console.error("Failed to validate token:", error);
      localStorage.removeItem("jwt-token");
    }
  }
};

export default checkTokenValidity;
