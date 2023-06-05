import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ResultType, StateType } from "../../types/resultTypes"

const initialState: StateType = {
    userGames: []
}

export const profileSlice = createSlice({
    name: 'userGames',
    initialState,
    reducers: {
        setUserGames: (state, action: PayloadAction<ResultType[]>) => ({
            ...state,
            userGames: action.payload
        })
    }
})

export const {setUserGames} = profileSlice.actions

export default profileSlice.reducer