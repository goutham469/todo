import React, { useState } from 'react'
import ProfilePic from './profile.png'
import './Home.css'
import ProfileWindow from './ProfileWindow/ProfileWindow'

import { Outlet, useNavigate } from 'react-router-dom'

function Home() {
    const [profileWindowStatus,setProfileWindowStatus] = useState(0)
    const [ProfileDropdown,setProfileDropdown] = useState(0)
    const [navigationButton,SetNavigationButton] = useState(0)

    const navigate = useNavigate();
    
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
                        >+ new</button>
                        :
                        <button className='home-header-button-new'
                        onClick={()=>{SetNavigationButton(0);navigate('./')}}
                        >Home</button>
                    }
                    
                    <label>gouth@gmail.com</label>
                    {
                        !ProfileDropdown ? 
                        <div style={{height:"100px",width:"100px"}}>
                            <img width="30px" src={ProfilePic}  
                                onClick={()=>{setProfileWindowStatus(1)}}
                                onMouseEnter={()=>setProfileDropdown(1)} 
                            ></img>
                        </div>
                        :
                        <div style={{display:ProfileDropdown?"block":"none",height:"100px",width:"100px"}}
                        
                                onMouseEnter={()=>setProfileDropdown(1)} 
                                onMouseLeave={()=>setProfileDropdown(0)}
                                >
                            <img width="30px" src={ProfilePic} 
                             
                                onClick={()=>{setProfileWindowStatus(1)}} 
                            ></img>
                            <ul className='home-header-profile-icon-hover'
                                onMouseLeave={()=>setProfileDropdown(0)}>
                                <li className='home-header-profile-item'>gouth@gmail.com</li>
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
                <button onClick={()=>{setProfileWindowStatus(0)}}>
                    back
                </button>
                <ProfileWindow/>
            </div>
        }

    </div>
  )
}

export default Home