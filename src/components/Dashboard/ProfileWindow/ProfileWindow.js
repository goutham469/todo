import React, { useEffect, useState } from 'react'
import './ProfileWindow.css'
import store from '../../../store'
import { useNavigate } from 'react-router-dom'

function ProfileWindow({getDataFromChild}) {
  const navigate = useNavigate();
  const userData = store.getState().userData

  console.log(store.getState().userData)
  function handleDataFromChild()
  {
    getDataFromChild(1)
  }

  function logout()
  {
    store.dispatch({type:"logout"})
    window.location.href=`${process.env.REACT_APP_SERVER_BASE_URL}`
  }

  return (
    <div className='profile-window'>
      <center><h1>Profile</h1></center>
      <button className='back-button-for-profile-window' onClick={()=>{ handleDataFromChild()}}>
          <label style={{fontSize:"20px"}}>&larr;</label>Back
      </button> 

      <button className='profile-logout-button' onClick={()=>logout()}>log out</button>
      <br/>
      <img style={{width:"60px"}} src={userData.profilePic}/>
      <br/>
      <label>username : <b>{userData.username}</b></label><br/>
      <label>login method : {userData.typeLogin}</label><br/>
      <p>a/c created on : {userData.dateCreated}</p>
      <p>last online : {userData.lastOnline}</p>
      <p>total tasks made : {userData.total}</p>
      <p>completed tasks : {userData.completed}</p>
      <p>incomplete tasks : {userData.inComplete}</p>
      <p>Your high security encryption key : <b>{userData.high_security_key}</b></p>

      <div className='profile-window-locations'>
        <h3>Location details</h3>
        <br/>
        {
          console.log(store.getState())
          // getting empty object here
        }
        {
          
          userData.location ?
          <div>
            <a href={`https://www.latlong.net/c/?lat=${userData.location.latitude}&long=${userData.location.longitude}`} target="_blank">click here to see your location map</a>
            <br/>
            <label>latitude = <b>{userData.location.latitude}</b>, </label><br/>
            <label>longitude = <b>{userData.location.longitude}</b></label><br/>
            <label>{userData.location.countryName},{userData.location.continent}</label>
            <br/>
            <label><b>{userData.location.principalSubdivision},{userData.location.city},{userData.location.locality}</b></label>
            <br/>
            <label>postal code : {userData.location.postcode}</label>
            {
              userData.location.localityInfo.administrative.map(address=>{
                return <div className='profile-window-sub-locations'>
                  <label>name : {address.name}</label>
                  <br/>
                  <label>desc : {address.description}</label>
                </div>
              })
            }
          </div>
          :
          <p>location details not available</p>
        }
      </div>
    </div>
  )
}

export default ProfileWindow