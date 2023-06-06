import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Category, GameType } from "../../types/gameTypes"
import { RootState } from "./store"

const initialState: GameType = {
    game: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
      saveQuestion: (state, action: PayloadAction<Category> ) => {
        state.game = action.payload
      },
    }
})

export const {saveQuestion} = gameSlice.actions

export const selectUser = (state: RootState) => state.game.game

export default gameSlice.reducer