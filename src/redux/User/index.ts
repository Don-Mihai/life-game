import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, IUser, PAuth } from './types.ts';

const initialState: UserState = {
  user: {} as IUser,
  token: '',
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem('userId', String(action.payload.id));
      state.user = action.payload;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload || ({} as IUser);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      });
  },
});

export const { setUser, addToken } = userSlice.actions;

export default userSlice.reducer;

export const get = createAsyncThunk('user/get', async (): Promise<IUser[] | undefined> => {
  const user = (await axios.get('users')).data;

  return user;
});

export const getById = createAsyncThunk('user/getById', async (userId?: number): Promise<IUser[] | undefined> => {
  const id = localStorage.getItem('userId') || String(userId);
  const user = (await axios.get(`users/${id}`)).data;

  return user;
});

export const auth = createAsyncThunk('user/auth', async (payload: PAuth): Promise<IUser | undefined> => {
  try {
    const user = (await axios.get(`users?email=${payload.email}&password=${payload.password}`)).data[0];
    localStorage.setItem('userId', String(user.id));
    return user;
  } catch (error) {}
});

export const register = createAsyncThunk('user/register', async (payload: any): Promise<any> => {
  try {
    const { user, token } = (await axios.post('users/register', payload)).data;

    localStorage.setItem('token', token);
    return { user, token };
  } catch (error) {}
});
