import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store/hook"
import { setAllGames } from "../../redux/store/profileSlice"
import { RootState } from "../../redux/store/store"
import { ResultType } from "../../types/resultTypes"

export const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch =useAppDispatch()

    const gamesData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:3001/',  {credentials: "include",
                })
            const gamesData = await response.json()
            // console.log(gamesData);
            dispatch(setAllGames(gamesData))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
          }
    }

    useEffect(() => {
        gamesData()
      }, [])

      const allGames = useAppSelector((state: RootState) => state.userGames.allGames)
      console.log(allGames);
      
    return (
        <div>

<div className="mt-10 px-4 sm:px-0 ">
        <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">Твоя Моя Игра</h1>
        <p className="text-center mt-1 text-sm leading-6 text-gray-500">Для начала игры необходимо залогиниться или зарегестрироваться!</p>
      </div>
      <br/>
         <br/>
      <div className="px-4 sm:px-0 ">
        <div className="flex justify-center">
      <img className="h-auto max-w-lg rounded-lg" src="/Oleg.JPG" alt="Oleg"/></div>
         <br/>
         <br/>
            <h3 className="text-center text-base font-semibold leading-7 text-gray-700">Чемпионы игры</h3>
            <p className="text-center mt-1 text-sm leading-6 text-gray-500">Их уже обняли, приподняли и перевернули</p>
            </div>
         <ul role="list" className="text-center divide-y divide-gray-100">
         <li className="flex justify-center gap-x-6 py-5">
            <div className="flex gap-x-4">
             <div className="min-w-0 flex-auto">
              <p className="text-sm font-bold leading-6 text-gray-900">Имя игрока</p>
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm font-bold leading-6 text-gray-900">Счет игры</p>
             </div>
             <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm font-bold leading-6 text-gray-900">Дата игры</p>
             </div>
          </li> 
        {allGames && allGames.map((el: ResultType) => (
            <li key={el.id} className="flex justify-center gap-x-6 py-5">
            <div className="flex gap-x-4">
             <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{el.User.userName}</p>
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm leading-6 text-gray-900">{el.total_score}</p>
             </div>
             <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm leading-6 text-gray-500">{el.createdAt?.slice(0, 10)}</p>
          </div>
          </li>
        ))
        }
         </ul>
     </div>
     )
}
