export const getBand = async () => {
    try {
      
        const token = localStorage.getItem('jwt-token'); 

        if (!token) {
            throw new Error('No se encontró ningún token en el localStorage.');
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}api/band/band_by_user`, {
            method: 'GET',
            headers: headers
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Error en getBand');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
