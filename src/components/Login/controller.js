async function login_to_server(data)
{ 
    
    // console.log(data); 
    data.dateCreated = `"${getDate()}"`;
    console.log(getDate())

    let location_result = await getLocation();
    // console.log(result);
    data.location = location_result;


    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    response = await response.json()
    // console.log(response)

    
    return response
}

function getDate()
{
    const date = new Date();

    // return date.toUTCString()
    return date
}

async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // console.log(latitude, longitude);

                try {
                    let fetchResult = await fetch(`${process.env.REACT_APP_GEO_LOCATION_URL}/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                    fetchResult = await fetchResult.json();
                    // console.log(fetchResult);
                    resolve(fetchResult);
                } catch (error) {
                    console.error("Error fetching location data:", error);
                    reject(error);
                }
            },
            (error) => {
                alert("Error getting location");
                reject(error);
            }
        );
    });
}



export default login_to_server;