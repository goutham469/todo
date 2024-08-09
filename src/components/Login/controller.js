async function login_to_server(data)
{ 
    
    console.log(data);
    data.dateCreated = getDate();

    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    response = await response.json()
    console.log(response)

    
    return response
}

function getDate()
{
    const date = new Date();

    return date.getTime
}



export default login_to_server;