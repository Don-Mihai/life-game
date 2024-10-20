export interface UserState {
  user: IUser;
  token?: string;
  users: IUser[];
}

export interface IUser {
  id: number;
  token?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  url?: string;
}

export interface PAuth {
  email?: string;
  password?: string;
}
