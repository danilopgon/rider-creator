const registerRole = async (role) => {
    try {
        if(role==='') throw new Error('Role is required')
        if(role!=='musician' && role!=='manager' && role !== 'technician') throw new Error('Role must be musician, manager or technician')
        if(!localStorage.getItem('jwt-token')) throw new Error('You must be logged in to register a role. token null o invalid')
        const userData = {
            role
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/role-register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to register role: ' + error.message);
    }
};

export default registerRole;