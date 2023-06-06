import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ResultType, StateType } from "../../types/resultTypes"

const initialState: StateType = {
    userGames: [],
    allGames: []
}

export const profileSlice = createSlice({
    name: 'userGames',
    initialState,
    reducers: {
        setUserGames: (state, action: PayloadAction<ResultType[]>) => ({
            ...state,
            userGames: action.payload
        }),
        setAllGames: 
        (state, action: PayloadAction<ResultType[]>) => ({
            ...state,
            allGames: action.payload
        })
    }
})

export const {setUserGames, setAllGames} = profileSlice.actions

export default profileSlice.reducer