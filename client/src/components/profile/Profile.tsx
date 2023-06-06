import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hook";
import { setUserGames } from "../../redux/store/profileSlice";
import { RootState } from "../../redux/store/store";
import { ResultType} from "../../types/resultTypes"

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()

    const gamesData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:3001/profile', {
                credentials: "include",
                })
            const gamesData = await response.json()
            // console.log(gamesData);
            dispatch(setUserGames(gamesData))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
          }
    }

    useEffect(() => {
        gamesData()
      }, [])

      const userGames = useAppSelector((state: RootState) => state.userGames.userGames)
      console.log(userGames);
      
    return (
        <div className="mt-10 px-4 sm:px-0 ">
            <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">Твой Мой Профиль</h1>
            <div className="mt-10 flex justify-center">
            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Начать игру</button>
            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Продолжить игру</button>
            </div>  
            <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-center gap-x-6 py-5">
            <div className="flex gap-x-4">
             <div className="min-w-0 flex-auto">
              <p className="text-sm ftext-center font-bold leading-6 text-gray-900">Дата игры</p>
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm text-center font-bold leading-6 text-gray-900">Счет игры</p>
             </div>
          </li> 
        {userGames && userGames.map((el: ResultType) => (
            <li key={el.id} className="flex justify-center gap-x-10 py-5">
            <div className="flex gap-x-4">
             <div className="min-w-0 flex-auto">
              <p className="text-sm text-center font-semibold leading-6 text-gray-900">{el.createdAt?.slice(0, 10)}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
             <p className="text-sm text-center leading-6 text-gray-900">{el.total_score}</p>
             </div>
          </li>
        ))
        }
     </ul>
     </div>
    )
}

