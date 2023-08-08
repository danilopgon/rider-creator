const getBand = async () => {
    try {
        const token = 'YOUR_JWT_TOKEN'; 
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}api/band/band_by_user`, {
            method: 'GET',
            headers: headers
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Error in getBand');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default getBand;
