import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'

import './Admin.css'
import AllUsers from './AllUsers/AllUsers'

function Admin() {
    const [signed,setSigned] = useState(false)

    async function onsuccess(response)
    {
        const decoded_data = jwtDecode(response.credential)
        if(decoded_data.email == process.env.REACT_APP_DEVELOPER_MAIL_ID)
        {
            setSigned(true)
        }
    }

  return (
    <div>
        <h1>TO DO App ADMIN Dashboard</h1>
        {
            signed ?
            <div className='admin-dashboard'>
                <p>authorized</p>
                <AllUsers/>

            </div>
            :
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <form className='admin-login-form'>
                    <h3 style={{color:"red"}}>Admin Login</h3>
                    <p>This application is to be logged with <b style={{color:"gold"}}>developer mail id only.</b></p>
                    <p>Logging with different mailid will not be considered.</p>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID} >
                        <center>
                            <GoogleLogin 
                            onSuccess={onsuccess}
                            />
                        </center>
                    </GoogleOAuthProvider>
                </form>
            </div>
        }
    </div>
  )
}

export default Admin