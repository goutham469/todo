import React, { useEffect, useState } from 'react'
import ProfilePic from './profile.png'
import './Home.css'
import ProfileWindow from './ProfileWindow/ProfileWindow'

import store from '../../store'

import { Outlet, useNavigate } from 'react-router-dom'

function Home() {
    const [profileWindowStatus,setProfileWindowStatus] = useState(0)
    const [ProfileDropdown,setProfileDropdown] = useState(0)
    const [navigationButton,SetNavigationButton] = useState(0)

    const navigate = useNavigate();

    useEffect(()=>{
        if(store.getState()&&store.getState().signed && store.getState().signed == 'true')
        {
            // console.log("ok, he is authorized");
            store.dispatch({type:"get_data"})
        }
        else
        {
            navigate('/')
        }
    })

    console.log(store.getState()) 

    
  return (
    <div>
        {
            profileWindowStatus == 0 ?
            <div>
                <div className='home-header'>
                    {
                        navigationButton == 0 ?
                        <button className='home-header-button-new'
                        onClick={()=>{SetNavigationButton(1);navigate('./new')}}
                        >+ new task</button>
                        :
                        <button className='home-header-button-new'
                        onClick={()=>{SetNavigationButton(0);navigate('./')}}
                        >Home</button>
                    }
                    
                    <label><b>{store.getState()&&store.getState().username}</b></label>
                    {
                        !ProfileDropdown ? 
                        <div style={{height:"100px",width:"100px"}}>
                            {/* {
                                store.getState()&&store.getState().userData&&store.getState().userData.profilePic ?
                                <div>
                                    <center>
                                        <img style={{borderRadius:"50px"}} width="70px" src={store.getState().userData.profilePic} 
                                
                                        onClick={()=>{setProfileWindowStatus(1)}}
                                        onMouseEnter={()=>setProfileDropdown(1)} 
                                        ></img>
                                    </center>
                                    <center><label>settings</label></center>
                                </div>
                                :
                                <img width="30px" src={ProfilePic} 
                                
                                onClick={()=>{setProfileWindowStatus(1)}}
                                onMouseEnter={()=>setProfileDropdown(1)}  
                                ></img>
                            } */}
                            {
                                <div>
                                    <center>
                                        <img style={{borderRadius:"50px"}} width="70px" src={store.getState().userData.profilePic} 

                                        onClick={()=>{setProfileWindowStatus(1)}}
                                        ></img>
                                    </center>
                                    <center><label>settings</label></center>
                                </div>
                            }
                        </div>
                        :
                        <div style={{display:ProfileDropdown?"block":"none",height:"100px",width:"100px"}}
                        
                                onMouseEnter={()=>setProfileDropdown(1)} 
                                onMouseLeave={()=>setProfileDropdown(0)}
                                >
                            {
                                store.getState()&&store.getState().userData&&store.getState().userData.profilePic ?
                                <img style={{borderRadius:"50px"}} width="70px" src={store.getState().userData.profilePic} 
                             
                                    onClick={()=>{setProfileWindowStatus(1)}} 
                                ></img>
                                :
                                <img width="30px" src={ProfilePic} 
                                
                                    onClick={()=>{setProfileWindowStatus(1)}} 
                                ></img>
                            }
                            <ul className='home-header-profile-icon-hover'
                                onMouseLeave={()=>setProfileDropdown(0)}
                                onClick={()=>{setProfileWindowStatus(1)}} 
                                >
                                <li className='home-header-profile-item'>{store.getState()&&store.getState().username}</li>
                                <li className='home-header-profile-item'>my notes</li>
                                <li className='home-header-profile-item'> settings</li>
                                <li className='home-header-profile-item'>theme</li>
                            </ul>
                        </div>
                    }
                    
                </div>

                <div className='home-outlet'>
                    <Outlet/>
                </div>
            </div>
            :
            <div>
                <button className='back-button-for-profile-window' onClick={()=>{setProfileWindowStatus(0)}}>
                    <label style={{fontSize:"20px"}}>&larr;</label>Back
                </button>
                <ProfileWindow/>
            </div>
        }

    </div>
  )
}

export default Home