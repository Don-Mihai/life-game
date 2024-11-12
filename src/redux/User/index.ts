import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, IUser, PAuth, LOCAL_STORAGE_KEY } from './types.ts';

const API_URL = 'https://6715244433bc2bfe40b986f6.mockapi.io/users';
// const API_URL = 'https://671924ac7fc4c5ff8f4c9c00.mockapi.io/users';

const initialState: UserState = {
  user: {} as IUser,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(action.payload.id));
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload || null;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload && action.payload.user && action.payload.userId) {
          state.user = { ...action.payload.user, id: action.payload.userId };
        }
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const get = createAsyncThunk('user/get', async (): Promise<IUser[] | undefined> => {
  const user = (await axios.get(API_URL)).data;

  return user;
});

export const getById = createAsyncThunk('user/getById', async (userId?: number): Promise<IUser[] | undefined> => {
  const id = localStorage.getItem(LOCAL_STORAGE_KEY) || String(userId);
  const user = (await axios.get(`${API_URL}/${id}`)).data;

  return user;
});

export const auth = createAsyncThunk('user/auth', async (payload: PAuth): Promise<IUser | undefined> => {
  try {
    const user = (await axios.get(`${API_URL}/?email=${payload.email}&password=${payload.password}`)).data[0];
    localStorage.setItem(LOCAL_STORAGE_KEY, String(user.id));
    return user;
  } catch (error) {}
});

export const register = createAsyncThunk(
  'user/register',
  async (
    payload: any
  ): Promise<
    | {
        user: IUser,
        userId: number,
      }
    | undefined,
  > => {
    try {
      const response = await axios.post(API_URL, payload);
      if (response.data && response.data.user && response.data.userId) {
        localStorage.setItem(LOCAL_STORAGE_KEY, String(response.data.userId));
        return { user: response.data.user, userId: response.data.userId };
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }
);
