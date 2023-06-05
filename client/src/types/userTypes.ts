export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

export interface IUserState {
  user: Partial<IUser>
}
