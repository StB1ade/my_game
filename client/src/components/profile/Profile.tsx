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
        <div>
            <div>
            <button>Начать игру</button>
            <button>Продолжить игру</button>
            </div>
            <h3>Profile</h3>   
         <div>
        {userGames && userGames.map((el: ResultType) => (
            <div key={el.id}>
                  <div>{el.createdAt?.slice(0, 10)}</div>
        <div>{el.total_score}</div>
        </div>
        ))
        }
     </div>
     </div>
    )
}

