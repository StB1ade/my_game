import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { RootState } from "../../store/store"
import { logoutUser } from "../../store/userSlice"

export const NavBar = () => {
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  // const userCheck = useAppSelector((state: RootState) => state.user.user)
  // console.log(userCheck.id);


  // const fetchLogout = async () => {
  //   try {
  //     const response = await fetch ('http://localhost:3001/user/logout', {
        
  //       credentials: "include",
        
  //     })
  //     const result = response.status
      
  //     if(result === 200){
  //       dispatch(logoutUser({}))

  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  // const clickLogout = async () => {
  //   await fetchLogout()
    
  // }

  return (
    <>
    <div className="flex justify-between ">

      <div className="text-2xl font-bold text-green-600">MyGame</div>

      <div className="flex justify-end">
      <Link to="/">
        <div className="mr-3 hover:text-blue-500 hover:te hover:underline">Home</div>
        </Link>
        <Link to="/notebook">
        <div className="mr-3 hover:text-blue-500 hover:underline">NoteBook</div>
        </Link>
        {userCheck.id !== undefined ?
        (<Link to="/">
          <div onClick={clickLogout} className="mr-3 hover:text-blue-500 hover:underline">Logout</div>
        </Link>) :  
        (
          <>
        <Link to="/login">
          <div className="mr-3 hover:text-blue-500 hover:underline">Sign in</div>
        </Link>
         <Link to="/reg">
         <div className="hover:text-blue-500 hover:underline">Sign up</div>
       </Link>
          </>
        )}
     
       
      </div>
    </div>
    </>
  )
}
