import { Category } from '../Category/types';

export interface UserState {
  user?: IUser;
  users?: IUser[];
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
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface PAuth {
  email?: string;
  password?: string;
}

export interface PRegisterEmail {
  firstName: string;
  email: string;
}

export interface RCompleteRegistration {
  token: string;
  user: IUser;
  message: string;
}

export const LOCAL_STORAGE_KEY = 'GAME_USER_ID';

export const getUserId = () => localStorage.getItem(LOCAL_STORAGE_KEY);
