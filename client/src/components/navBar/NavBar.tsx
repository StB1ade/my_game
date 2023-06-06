import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store/hook"
import { RootState } from "../../redux/store/store"
import { logoutUser } from "../../redux/store/userSlice"

export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userCheck = useAppSelector((state: RootState) => state.user.user)
  
  const fetchLogout = async () => {
    try {
      const response = await fetch ('http://localhost:3001/userapi/logout', {
        
        credentials: "include",
        
      })
      const result = response.status
      
      if(result === 200){
        dispatch(logoutUser({}))
      }      
    } catch (error) {
      console.log(error);
    }
  }  

  const clickLogout = async () => {
    await fetchLogout()
    navigate('/')
  }

  return (
<nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/">
        <div className=" flex ">

      <img
            className="mx-auto h-10 w-auto"
            src="../../../public/свояигра.png"
            alt="Your Company"
            />
        <p className="text-2xl font-bold text-blue-800 ml-4">YourMyGame</p>
            </div>
      </Link>
      <div className="flex justify-end">
        <Link to="/">
          <div className="mr-3 hover:text-blue-500 hover:te hover:underline">Home</div>
        </Link>

        {userCheck.id !== undefined ? (
          <>
          <Link to="/game">
          <div className="mr-3 hover:text-blue-500 hover:underline">Game</div>
        </Link>
        <Link to="/profile">
          <div className="mr-3 hover:text-blue-500 hover:underline">Profile {userCheck.userName}</div>
        </Link>
        <Link to="/">
          <div onClick={clickLogout}  className="mr-3 hover:text-blue-500 hover:underline">Logout</div>
        </Link> 
        <Link to="/login">
          <div className="mr-3 hover:text-blue-500 hover:underline hidden">Sign in</div>
        </Link>
        <Link to="/reg">
          <div className="hover:text-blue-500 hover:underline hidden">Sign up</div>
        </Link>
          </>
        ) : (
          <>
          <Link to="/game">
          <div className="mr-3 hover:text-blue-500 hover:underline hidden">Game</div>
        </Link>
        <Link to="/profile">
          <div className="mr-3 hover:text-blue-500 hover:underline hidden">Profile</div>
        </Link>
        <Link to="/">
          <div onClick={clickLogout}  className="mr-3 hover:text-blue-500 hover:underline hidden">Logout</div>
        </Link> 
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
    </nav>
  )
}
