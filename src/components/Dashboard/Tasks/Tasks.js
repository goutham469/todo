import React, { useEffect, useState } from 'react'
import './Tasks.css'
import CreateTask from '../CreateTask/CreateTask'

function Tasks() {
    const [navigatorTasks,SetNavigatorTasks] = useState(0)
    const [navigatorOutlet,setNavigatorOutlet] = useState(0)

    const [titleChange,setTitleChange] = useState(false)
    const [title,setTitle] = useState()

    const [bodyChange,setBodyChange] = useState(false)
    const [body,setBody] = useState()

    const [taskStatus,setTaskStatus] = useState('incomplete')
    const [taskDivChange,setTaskDivChange] = useState()

    const [tasks,setTasks] = useState([]);

    async function getData()
    {
        try
        {
            let result = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/posts/get-tasks-by-name/?username=goutham`)
            result = await result.json();
            setTasks(result);
        }
        catch(err){alert("unable to fetch server, may be server is not running !")}
    }

    useEffect(()=>{
        getData();
    },[tasks])

    async function update_changes(event,update_type,task_id)
    {
        event.preventDefault();
        const cur_time = new Date(); 
        console.log(cur_time)

       try
       {
            let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/posts/edit-task`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    id:task_id,
                    editItem:update_type,
                    newName:update_type=='title'?title:update_type=='body'?body:taskStatus,
                    time:`${cur_time}`
                })
            })
            response = await response.json();
            if(response.acknowledged == true)
            {
                setTasks(prevData=>prevData.map(task=>
                    task.id == task_id ?
                    {
                        ...task,
                        [update_type]:update_type=='title'?title:update_type=='body'?body:taskStatus
                    }
                    :
                    task
                ))

                // alert(`${update_type} updated`)
            }
            else{alert(`${update_type} update failed.`)}
       }
       catch(err){alert("unable to fetch the server , may be the server is not working or internet problem,")}
    }

    async function update_changes_status(event,update_type,task_id)
    {
        event.preventDefault();
        const cur_time = new Date(); 
        console.log(cur_time)

       try
       {
            let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/posts/edit-task`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    id:task_id,
                    editItem:"status",
                    newName:update_type=='completed'?'incomplete':'completed',
                    time:`${cur_time}`
                })
            })
            response = await response.json();
            if(response.acknowledged == true)
            {
                setTasks(prevData=>prevData.map(task=>
                    task.id == task_id ?
                    {
                        ...task,
                        [update_type]:update_type=='completed'?'incomplete':'completed'
                    }
                    :
                    task
                ))

                // alert(`${update_type} updated`)
            }
            else{alert(`${update_type} update failed.`)}
       }
       catch(err){alert("unable to fetch the server , may be the server is not working or internet problem,")}
    }



  return (
    <div className='tasks-main'>
        <div className='tasks-index'>
            <div className='tasks-list'>
                {
                    navigatorTasks == 0 ?
                    <div className=''>
                        <center>
                            <h4>Incomplete tasks</h4>
                            {
                                tasks.map(task=>
                                task.status == "incomplete" && 
                                <div className='task-item'
                                onClick={()=>setNavigatorOutlet(task.id)}
                                >
                                    <button className='tasks-change-status-button' 
                                    onClick={(event)=>{
                                        setTaskStatus(task.status == 'completed'?'incomplete':'completed');
                                        setTaskDivChange(false);
                                        update_changes_status(event,task.status,task.id);

                                    }}>{task.status == 'completed'?'set as incomplete':'set as completed'}</button>
                                    <br/>
                                    <b>{task.title}</b>
                                    <p>created on : {task.createdOn}</p>
                                    <p>{task.body}</p>
                                    <p>last modified on : {task.lastModifiedOn}</p>

                                </div>
                                )
                            }
                        </center>
                    </div>
                    :
                    <div>
                        <center>
                            <h4>completed tasks</h4>
                            {
                                tasks.map(task=>
                                task.status == "completed" && 
                                <div className='task-item'
                                onClick={()=>setNavigatorOutlet(task.id)}
                                >
                                    <button className='tasks-change-status-button' onClick={(event)=>{
                                        setTaskStatus(task.status == 'completed'?'incomplete':'completed');
                                        setTaskDivChange(false);
                                        update_changes_status(event,task.status,task.id);

                                    }}>{task.status == 'completed'?'set as incomplete':'set as completed'}</button>
                                    <br/>
                                    <b>{task.title}</b>
                                    <p>created on : {task.timeCreated},{task.timeCreated}</p>
                                    <p>{task.body}</p>
                                    <p>last modified on : {task.timeEdited},{task.dateEdited}</p>

                                </div>
                                )
                            }
                        </center>
                    </div>
                }
            </div>
            <div className='tasks-navigator'>
                <button className='tasks-navigate-buttons'
                 onClick={()=>SetNavigatorTasks(0)}
                 style={{backgroundColor: navigatorTasks==0 ? "black":"white",color:navigatorTasks == 0 ? "white" : "black"}}
                 >
                    in-complete
                </button>

                <button className='tasks-navigate-buttons'
                 onClick={()=>SetNavigatorTasks(1)}
                 style={{backgroundColor: navigatorTasks==1 ? "black":"white",color:navigatorTasks == 1 ? "white" : "black"}}
                 >
                    completed
                </button>
            </div>
        </div>
        <div className='tasks-content'>
            {
                navigatorOutlet == 0 ?
                <div>
                    <CreateTask/>
                </div>
                :
                <div className='tasks-outlet'>
                    {
                        tasks.map(task=>
                        task.id == navigatorOutlet && 
                        <div>
                            {
                                titleChange ?
                                <div>
                                    <input value={title} onChange={(event)=>setTitle(event.target.value)}/>
                                    <button onClick={(event)=>{setTitleChange(false);update_changes(event,"title",task.id)}}>save</button>
                                </div>
                                :
                                <b 
                                    className='tasks-task-title'
                                    onClick={()=>{setTitleChange(true);setTitle(task.title);}}
                                > {task.title}
                                </b>
                            }
                            <br/>
                            {
                                taskDivChange ?
                                <button onClick={(event)=>{
                                    setTaskStatus(task.status == 'completed'?'incomplete':'completed');
                                    setTaskDivChange(false);
                                    update_changes_status(event,task.status,task.id);

                                }}>{task.status == 'completed'?'set as incomplete':'set as completed'}</button>
                                :
                                <sub onClick={()=>{setTaskDivChange(true)}}>status : {task.status}</sub>
                            }
                            <br/>
                            <label>created on : {task.createdOn}</label>
                            <br/>
                            <label>last modified on : {task.lastModifiedOn}</label>
                            <br/>
                            {
                                bodyChange ?
                                <div>
                                    <textarea style={{height:"100px",width:"200px"}} value={body} onChange={(event)=>setBody(event.target.value)}></textarea>
                                    <br/>
                                    <button onClick={(event)=>{setBodyChange(false);update_changes(event,"body",task.id)}}>save</button>
                                </div>
                                :
                                <b 
                                    className='tasks-task-title'
                                    onClick={()=>{setBodyChange(true);setBody(task.body);}}
                                > {task.body}
                                </b>
                            } 
                        </div>
                    )
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default Tasks