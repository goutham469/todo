import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'

import './Login.css'
import login_to_server from './controller'


function Login() { 
    
    const [form_data,setForm_data] = useState({
        email:"",
        password:""
    })

    function onSuccess(response)
    {
        console.log(response)
        const email = jwtDecode(response.credential).email
        alert(`email = ${email}`)
    }

  return (
    <div className='login-parent'>
        <div className='login-child'>
            <p className='login-header'>Login/ Sign up</p>
            <p>Continue with </p>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                <GoogleLogin
                buttonText="continue with google"
                onSuccess={onSuccess}
                >
                </GoogleLogin> 
            </GoogleOAuthProvider>
            <br/>
            <hr></hr>
            <label className='login-text-or'> (or) </label>
            <form>
                <label className='login-label-email'>username</label>
                <br/>
                <input onChange={(event)=>setForm_data(prevData=>({...prevData,email:event.target.value}))}
                 type='text' className='login-input-email'/>
                <br/>
                <label className='login-label-password'>password</label>
                <br/>
                <input onChange={(event)=>setForm_data(prevData=>({...prevData,password:event.target.value}))}
                 type='password' className='login-input-password'/>
                <br/>
                <button onClick={(event)=>{login_to_server(event,form_data)}} className='login-button-continue'>Continue</button>
            </form>
        </div>
    </div>
  )
}

export default Login