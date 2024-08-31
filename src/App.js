import './App.css';

// components
import Login from './components/Login/Login';
import Home from './components/Dashboard/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tasks from './components/Dashboard/Tasks/Tasks';
import Admin from './components/Admin/Admin';
import CreateTask from './components/Dashboard/CreateTask/CreateTask';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  // console.log(process.env.REACT_APP_SERVER_BASE_URL)  // to check .env working

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
    },
    {
      path:'*',
      element:<h1>Path not found</h1>
    }
  ])

  console.log(store.getState())


  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </div>
  );
}

export default App;
