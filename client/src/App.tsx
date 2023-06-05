import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components/navBar/NavBar"
import { Registration } from "./components/registration/Registration"
import { Login } from "./components/login/Login"
import { Profile } from "./components/profile/Profile"

import { useEffect, useState } from "react"
import { useAppDispatch } from "./redux/store/hook"
import { checkUser } from "./redux/store/userSlice"


function App() {

  const [loading, setLoading] = useState(false)
    
  const dispatch = useAppDispatch()

  useEffect( () => {
  (async function () { try {
      const response = await fetch ('http://localhost:3001/userapi/check', {
      credentials: "include",
      })
      const result = await response.json()
     if(result.msg) {
      console.log(result.msg);      
     } else {
        dispatch(checkUser(result))       
      }
    } catch (error) {
      console.log(error);
    }      
      setLoading(true)     
    })()
  }, [])

  if(loading){

  return (
    <>
     <NavBar/>
     <Routes>
     <Route path="/reg" element={<Registration />}/>
     <Route path="/login" element={<Login />}/>
     <Route path='/profile' element={<Profile/>}/>
     </Routes>   
    </>
  )
}
}

export default App
