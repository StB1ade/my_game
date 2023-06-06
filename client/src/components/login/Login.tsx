import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store/hook"
import { IUser } from "../../types/userTypes"
import { logUser } from "../../redux/store/userSlice"

import { useNavigate } from "react-router-dom"

const initState: Partial<IUser> = {
 
  email: "",
  password: ""
 }
 
export const Login = () => {

  const [login, setLogin] = useState(initState)


  const navigate = useNavigate()
  
  const dispatch = useAppDispatch()
  
  const changeLogHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const fetchLog = async () => {
    try {
      const response = await fetch ('http://localhost:3001/userapi/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(login),
      })
      const result = await response.json()
      if(result.msg){
        console.log(result.msg);
      } else {      
      dispatch(logUser(result))
      }
    } catch (error) {
      console.log(error);
    }
  }
    
  const submitLogHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetchLog()    
    navigate('/profile')
  }


  

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-52 w-auto"
            src="../../../public/свояигра.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitLogHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={changeLogHandler}
                  required
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={changeLogHandler}
                  required
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

      
        </div>
      </div>
    </>
  )
}
