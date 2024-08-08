import React, { useState } from 'react'
import './Tasks.css'
import CreateTask from '../CreateTask/CreateTask'

function Tasks() {
    const [navigatorTasks,SetNavigatorTasks] = useState(0)
    const [navigatorOutlet,setNavigatorOutlet] = useState(0)

    const [titleChange,setTitleChange] = useState(false)
    const [title,setTitle] = useState()

    const [bodyChange,setBodyChange] = useState(false)
    const [body,setBody] = useState()


    let tasks = [
        {
            "id":1,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":2,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":3,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        },
        {
            "id":6,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        },
        {
            
            "id":11,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":17,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        },
        {
            "id":21,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":15,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":125,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        },
        {
            "id":126,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        },
        {
            "id":178,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"incomplete"
        },
        {
            "id":149,
            "title":"abc",
            "body":"hello some one",
            "dateCreated":"10/06/2014",
            "timeCreated":"12:06:56",
            "dateEdited":"07/08/2024",
            "timeEdited":"23:21:20",
            "status":"complete"
        }
    ]
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
                                    <b>{task.title}</b>
                                    <p>created on : {task.timeCreated},{task.timeCreated}</p>
                                    <p>{task.body}</p>
                                    <p>last modified on : {task.timeEdited},{task.dateEdited}</p>
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
                                task.status == "complete" && 
                                <div className='task-item'
                                onClick={()=>setNavigatorOutlet(task.id)}
                                >
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
                <div>
                    {
                        tasks.map(task=>
                        task.id == navigatorOutlet && 
                        <div>
                            {
                                titleChange ?
                                <div>
                                    <input value={title} onChange={(event)=>setTitle(event.target.value)}/>
                                    <button onClick={()=>setTitleChange(false)}>save</button>
                                </div>
                                :
                                <b 
                                    className='tasks-task-title'
                                    onClick={()=>{setTitleChange(true);setTitle(task.title);}}
                                > {task.title}
                                </b>
                            }
                            <br/>
                            <sub>status : {task.status}</sub>
                            <br/>
                            <label>created on : {task.dateCreated} , {task.timeCreated}</label>
                            <br/>
                            <label>last modified on : {task.dateEdited} , {task.timeEdited}</label>
                            <br/>
                            {
                                bodyChange ?
                                <div>
                                    <textarea style={{height:"100px",width:"200px"}} value={body} onChange={(event)=>setBody(event.target.value)}></textarea>
                                    <button onClick={()=>setBodyChange(false)}>save</button>
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