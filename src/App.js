 import { useEffect, useState } from 'react';
import './App.css';

// components
import Login from './components/Login/Login';
import Home from './components/Dashboard/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tasks from './components/Dashboard/Tasks/Tasks';
import Admin from './components/Admin/Admin';
import CreateTask from './components/Dashboard/CreateTask/CreateTask';

function App() {
  console.log(process.env.REACT_APP_SERVER_BASE_URL)

  const router = createBrowserRouter([
    {
      path:'',
      element:<Login/>
    },
    {
      path:'/home',
      element:<Home/>,
      children:[
        {
          path:'',
          element:<Tasks/>
        },
        {
          path:'new',
          element:<CreateTask/>
        }
      ]
    },
    {
      path:'admin',
      element:<Admin/>
    }
  ])


  return (
    <div className="App">
      {/* <h1>client App</h1>
      <p>fetching data from server/API</p>
      {
        users.map(user=>
        <div style={{backgroundColor:"yellow" ,width:"fit-content",margin:"10px",borderRadius:"5px"}}>
          <p>name : {user.name}</p>
          <p>class : {user.class}</p>
        </div>)
      } */}
      {/* <Login/> */}

      {/* <Home/> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
