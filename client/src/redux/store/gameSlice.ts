import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Category, GameType } from '../../types/gameTypes';
import { RootState } from './store';

const initialState: GameType = {
  game: [],
  score: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveQuestion: (state, action: PayloadAction<Category>) => {
      state.game = action.payload;
    },
    saveScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const { saveQuestion, saveScore } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;
export const selectScore = (state: RootState) => state.game.score;

export default gameSlice.reducer;
