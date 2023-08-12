import { toast } from "react-hot-toast";

const updateUserImgProfile = async (img) => {

    try{
        if (!img) {
            toast.error('No image selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', img);
    
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/images/user-profile`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
            },
            body: formData
        })
        if (response.status === 401) {
            toast.error('Unauthorized');
            return;
        }
        if (response.status === 500) {
            toast.error('Server error');
            return;
        }
        if (response.status === 400) {
            toast.error('Bad request');
            return;
        }
        if (response.status === 404) {
            toast.error('Not found');
            return;
        }
        if (response.status === 200) {
            toast.success('Profile image updated');
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }

}

export default updateUserImgProfile;