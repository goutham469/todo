async function login_to_server(event,data)
{
    event.preventDefault();
    
    console.log(data);
    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    response = await response.json()
    console.log(response)
    
    if(response.login_status == true)
    {
        return {"status":"success"}
    }
    else
    {
        return {"status":"failed","message":response.message}
    }
}


export default login_to_server;