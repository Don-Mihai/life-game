export interface UserState {
  user: null | IUser;
  users: IUser[];
}

export enum UserFields {
  NAME = 'firstName',
  EMAIL = 'email',
  PASSWORD = 'password'
}

export interface UserTag {
  title: string;
}

export interface IUser {
  id: string;
  [UserFields.NAME]: string;
  [UserFields.EMAIL]: string;
  [UserFields.PASSWORD]: string;
  characteristics: object[];
  tags: UserTag[];
  createdAt: string;
  updatedAt: string;
}

export interface PAuth {
  email?: string;
  password?: string;
}

export const LOCAL_STORAGE_KEY = 'GAME_USER_ID';
