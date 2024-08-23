import {useState} from 'react'
import {Route,createBrowserRouter,createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from './Pages/HomePage';
import MainLayout from './layouts/MainLayout';
import ShowDetails from './Pages/ShowDetails';

const App = () => {
  const [error, seterror] = useState(null)
  
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout/>}>
            <Route index element={<HomePage error={error} seterror={seterror}/>} />
            <Route path='/show/:id' element={<ShowDetails/>}/>
        </Route>
    )
  )
    
  return <RouterProvider router={router} />
}

export default App