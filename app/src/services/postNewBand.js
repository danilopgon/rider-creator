const postNewBand = async (band) => {
    console.log(band)
    if(!band) throw new Error('Band is empty')
    if(!band.members) throw new Error('Band members is empty')
    if(band.members.length === 0) throw new Error('Band members is empty')
    const parseBand = JSON.stringify(band)
    console.log(parseBand)
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/band/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer \"${localStorage.getItem('jwt-token')}\"`
        },
        body: parseBand,
        

    })
    console.log(response)
    if(!response.ok) throw new Error('Error in postNewBand')
    const data = await response.json()
    console.log(data)
    return data
}

export default postNewBand;