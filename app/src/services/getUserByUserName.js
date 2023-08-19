const getUserByUserName = async (name) => {
    try{
        const userName = String(name);
        if(userName === "") throw new Error("User name is empty");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer \"${localStorage.getItem('jwt-token')}\"`);
        myHeaders.append("Content-Type", "application/json");
        
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        let response = await fetch(`${import.meta.env.VITE_API_URL}api/users/${userName}`, requestOptions)
        let data = await response.json()
        return data.users
    }
    catch(error){ 
        return error;
    }
}

export default getUserByUserName;