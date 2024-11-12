export interface UserState {
  user: null | IUser;
  users: IUser[];
}

export interface IUser {
  id: number;
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

export const LOCAL_STORAGE_KEY = 'GAME_USER_ID';
