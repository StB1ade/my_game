import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser, IUserState } from "../../types/userTypes"
import { RootState } from "./store"



const initialState: IUserState = {
  user: {},
  
}


export const UserSlice= createSlice({
  name: 'user',
  initialState,
  reducers: {
    regUser: (state, action: PayloadAction<Partial<IUser>> ) => {
      state.user = action.payload
    },
    logUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.user = action.payload
    },
    checkUser: (state, action: PayloadAction<Partial<IUser>> ) => {
      state.user = action.payload
    },
    logoutUser: (state, action: PayloadAction<Partial<IUser>> ) => {
      state.user = action.payload
    }
  }

})

export const { regUser, logUser, checkUser, logoutUser} = UserSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default UserSlice.reducer