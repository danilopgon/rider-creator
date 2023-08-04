const getUserByUserName = async (userName) => {
    try{
    if(!userName) throw new Error('userName is required')
    const user = {
        userName
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/find-user-email/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
    });
    if(response.status === 'error') throw new Error(response.message);
    const data = await response.json();
    return data.user;

    }
    catch(error){ 
        return error;
    }
}

export default getUserByUserName;