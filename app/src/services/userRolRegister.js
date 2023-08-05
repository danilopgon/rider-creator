const registerRole = async (role) => {
  try {
    if (role === "") throw new Error("Role is required");
    if (role !== "musician" && role !== "manager" && role !== "technician")
      throw new Error("El rol debe ser músico, técnico o promotor");
    if (!localStorage.getItem("jwt-token"))
      throw new Error("Debes estar conectado para poder registrar tu rol");
    const userData = {
      role,
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/role-register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
        body: JSON.stringify(userData),
      }
    );

    return response;
  } catch (error) {
    throw new Error("Error al registrar el rol: " + error.message);
  }
};

export default registerRole;
