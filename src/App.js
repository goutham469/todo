 import { useEffect, useState } from 'react';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_SERVER_BASE_URL)


  let [users,setUsers] = useState([])
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/users`).then(data=>data.json()).then(data=>{setUsers(data)})
  },[])
  return (
    <div className="App">
      <h1>client App</h1>
      <p>fetching data from server/API</p>
      {
        users.map(user=>
        <div style={{backgroundColor:"yellow",padding:"5px",width:"fit-content"}}>
          <p>name : {user.name}</p>
          <p>class : {user.class}</p>
        </div>)
      }
    </div>
  );
}

export default App;
