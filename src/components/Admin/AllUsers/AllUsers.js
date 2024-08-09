import React, { useEffect, useState } from 'react'
import './AllUsers.css'

// assets
import ProfilePicture from './profile.png'

function AllUsers() {
    const [users,setUsers] = useState([])

    async function getData()
    {
        try
        {
            let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/get-all-users`)
            // console.log(data)
            data = await data.json()
            console.log(data)

            setUsers(data)
        }
        catch(err){alert('unable to reach server.\nMay be your internet connection is lost ,or the server is not running!')}

        console.log("fetching completed")
    }

    useEffect(()=>{
        getData();
    },[])

    async function DeleteUser(event,username)
    {
        event.preventDefault();
        console.log(username)

        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/delete-user`,{
            headers:{"Content-Type":"application/json"},
            method:"DELETE",
            body:JSON.stringify({username:username})
        })
        data = await data.json()
        if(data.acknowledged == true)
        {
            alert(`deletion success`)
        }

    }

  return (
    <div>
        <h3>All users</h3>
        {
            users.map(user=>
                <div className='user-list-bar'>
                    <div className='allusers-profile-pic'>
                        {
                            user.profilePic ?
                            <img style={{borderRadius:"40px",width:"70px",marginTop:"10px"}} src={user.profilePic}/>
                            :
                            <img width="50px" height="50px" src={ProfilePicture}/>
                        }
                    </div>
                    <div>
                        <p style={{textAlign:"left",border:"1px solid white",borderRadius:"3px",padding:"2px"}}>{user.username}</p>
                        <p>from :- {user.location.locality},{user.location.city}</p>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <label>total={user.total}</label><br/>
                        <label>incomplete={user.inComplete}</label><br/>
                        <label>completed={user.completed}</label>
                    </div>
                    <div>
                        <p>a/c created on : {user.dateCreated?user.dateCreated:'not available'}</p>
                        <p>last online : {user.history[0]&&user.history[0].time?user.history[0].time:'not available'}</p>
                    </div>
                    <div style={{backgroundColor:"red",padding:"5px"}}>
                        <b style={{color:"yellow"}}>Actions</b>
                        <br/>
                        {
                            user.blocked ?
                            <button>un-block</button>
                            :
                            <button>block</button>
                        }
                        <br/>
                        <button onClick={(event)=>DeleteUser(event,user.username)}>delete</button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AllUsers