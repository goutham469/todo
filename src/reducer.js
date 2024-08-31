
function reducer(state={
    "signed":false,
    "username":'',
    "typeUser":'',
    "userData":{},
    "tasks":[],
    "set_profile_window_status":0
},action)
{
    
    let prevData ={} 
    switch(action.type)
    {
        case 'login':
            const now = new Date();
            const expireTime = now.getTime() + 10*60*1000 // 10*60*1000 milli-seconds , 10*60 seconds , 10 minutes

            console.log(action.data)

            localStorage.setItem('signed',true);
            localStorage.setItem('username',action.data.username);
            localStorage.setItem('typeLogin',action.data.typeLogin);
            localStorage.setItem( 'password',action.data.password);
            localStorage.setItem('userData',JSON.stringify(action.data.userData));
            localStorage.setItem('tasks',JSON.stringify(action.data.tasks));
            localStorage.setItem('profileWindowStatus',0)

            return {
                    ...state,
                    signed:true,
                    username:action.data.username,
                    typeLogin:action.data.typeLogin,
                    password:action.data.password,
                    userData:action.data.userData,
                    tasks:action.data.tasks
                    }
        case 'logout':

            localStorage.setItem('signed',false);
            localStorage.setItem('username','');
            localStorage.setItem('typeLogin','');
            localStorage.setItem( 'password','');
            localStorage.setItem('userData','');
            localStorage.setItem('tasks','');

            return state;
        case 'get_data' : 
               prevData.signed = localStorage.getItem('signed');
               prevData.username = localStorage.getItem('username');
               prevData.typeLogin = localStorage.getItem('typeLogin');
               prevData.password = localStorage.getItem( 'password');
               prevData.userData = localStorage.getItem('userData');
               prevData.userData = JSON.parse(prevData.userData);
               prevData.tasks = localStorage.getItem('tasks');

            //    console.log( prevData.tasks)
            //    console.log(prevData.userData)
               prevData.tasks = JSON.parse(prevData.tasks)

                return {...state,
                    signed:prevData.signed,
                    username:prevData.username,
                    typeLogin:prevData.typeLogin,
                    password:prevData.password,
                    tasks:prevData.tasks,
                    userData:prevData.userData
                };
        case 'set_profile_window_status' :
            if(localStorage.profileWindowStatus == 0)
            {
                localStorage.setItem('profileWindowStatus',1)
            }
            else
            {
                localStorage.setItem('profileWindowStatus',0)
            }
            return state
        default :
               prevData.signed = localStorage.getItem('signed');
               prevData.username = localStorage.getItem('username');
               prevData.typeLogin = localStorage.getItem('typeLogin');
               prevData.password = localStorage.getItem( 'password');
               prevData.userData = localStorage.getItem('userData');
               if(prevData.userData){prevData.userData = JSON.parse(prevData.userData);}
               prevData.tasks = localStorage.getItem('tasks');

            //    console.log( prevData.tasks)
            //    console.log(prevData.userData)
               if(prevData.tasks){prevData.tasks = JSON.parse(prevData.tasks)}

                return {...state,
                    signed:prevData.signed,
                    username:prevData.username,
                    typeLogin:prevData.typeLogin,
                    password:prevData.password,
                    tasks:prevData.tasks,
                    userData:prevData.userData
                };
    }
}

export default reducer;