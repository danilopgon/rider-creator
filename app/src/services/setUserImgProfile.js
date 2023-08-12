const setUserImgProfile = async (img) => {
    console.log(img);
    
    const formData = new FormData();
    formData.append('file', img);
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/images/user-profile`, {
        method: 'POST',
        headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('jwt-token'),
        },
        body: formData
    });

    const data = await response.json();
    console.log(data);
    return data;
}

export default setUserImgProfile;