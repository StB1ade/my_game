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
            <div>
            <h1>Твоя Моя Игра</h1>
            <h5>Для начала игры необходимо залогиниться или зарегестрироваться!</h5>
            </div>
            <h3>Чемпионы игры</h3>   
         <div>
        {allGames && allGames.map((el: ResultType) => (
            <div key={el.id}>

                <div>{el.User.userName}</div>
                <div>{el.total_score}</div>
                  <div>{el.createdAt?.slice(0, 10)}</div>
        
        </div>
        ))
        }
     </div>
     </div>
    )
}
