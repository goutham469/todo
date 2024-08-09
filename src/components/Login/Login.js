import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'

import './Login.css'
import login_to_server from './controller'

import { useNavigate } from 'react-router-dom'

 
function Login() { 

    const navigate = useNavigate();
    
    const [form_data,setForm_data] = useState({
        username:"",
        password:"",
        typeLogin:"",
        profilePic:""
    })
    const [error_data,setError_data] = useState({
        user_name_label:"username",
        password_label:"password",
        user_name_color:"black",
        passsword_color:"black",
        user_name_input_border_color:"black",
        password_input_border_color:"black",
        login_button_border_color:"black",
        login_button_text_color:"green"
    })

    async function onSuccess(response)
    {
        console.log(jwtDecode(response.credential))
        const profile_pic = jwtDecode(response.credential).picture
        const email = jwtDecode(response.credential).email
        // alert(`email = ${email}`)
        setForm_data(prevData=>({...prevData,username:email}))
        setForm_data(prevData=>({...prevData,typeLogin:"googleAuth"}))
        form_data.typeLogin = "googleAuth"
        form_data.username = email
        form_data.profilePic = profile_pic

        const return_data = await login_to_server(form_data)
        alert(`${return_data.status}\n message : ${return_data.message}`)

        if(return_data.status == "success")
        {
            navigate('/home');
        }
    }
    async function validate_form_data(event)
    {
        event.preventDefault();
        if(form_data.username)
        {
            setError_data(prevData=>({...prevData,user_name_label:"username",user_name_color:"black",user_name_input_border_color:"black",login_button_border_color:"black",login_button_text_color:"black"}))
        }
        else
        {
            setError_data(prevData=>({...prevData,user_name_label:"username",user_name_color:"red",user_name_input_border_color:"red",login_button_border_color:"red",login_button_text_color:"red"}))
        }
        if(form_data.password)
        {
            setError_data(prevData=>({...prevData,password_label:"password",passsword_color:"black",password_input_border_color:"black",login_button_border_color:"black",login_button_text_color:"black"}))
        }
        else
        {
            setError_data(prevData=>({...prevData,password_label:"password",passsword_color:"red",password_input_border_color:"red",login_button_border_color:"red",login_button_text_color:"red"}))
        }

        setForm_data(prevData=>({...prevData,typeLogin:"manual"}))
        form_data.typeLogin = "manual"
         
        const return_data = await login_to_server(form_data)
        alert(`${return_data.status}\n message : ${return_data.message}`)
        if(return_data.status == "success")
        {
            navigate('/home');
        }

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
                <label style={{color:error_data.user_name_color}} className='login-label-email'>{error_data.user_name_label}</label>
                <br/>
                <input style={{borderColor:error_data.user_name_input_border_color}}
                 onChange={(event)=>setForm_data(prevData=>({...prevData,username:event.target.value}))}
                 type='text' className='login-input-email'/>
                <br/>

                <label style={{color:error_data.passsword_color}} className='login-label-password'>{error_data.password_label}</label>
                <br/>
                <input style={{borderColor:error_data.password_input_border_color}}
                 onChange={(event)=>setForm_data(prevData=>({...prevData,password:event.target.value}))}
                 type='password' className='login-input-password'/>
                <br/>

                <button
                    style={{borderColor:error_data.login_button_border_color,color:error_data.login_button_text_color}}
                 onClick={(event)=>{validate_form_data(event)}} 
                 className='login-button-continue'
                 >Continue</button>
                 <br/>
                 <br/>
                 <label style={{textDecoration:"underline",fontSize:"10px"}} onClick={()=>navigate('/admin')}>admin login</label>
            </form>

        </div>
    </div>
  )
}

export default Login