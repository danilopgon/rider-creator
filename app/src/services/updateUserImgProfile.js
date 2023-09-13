import { toast } from "react-hot-toast";

const updateUserImgProfile = async (img) => {
  try {
    if (!img) {
      toast.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", img);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/images/user-profile`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
        body: formData,
      }
    );

    const data = await response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default updateUserImgProfile;
