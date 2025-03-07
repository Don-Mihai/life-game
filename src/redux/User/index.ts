import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, IUser, PAuth, LOCAL_STORAGE_KEY, PRegisterEmail, RCompleteRegistration } from './types';
import { URL } from '../../utils';

const API_URL = URL + '/users';

const initialState: UserState = {
  user: {} as IUser,
  users: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(action.payload.id));
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const editUser = createAsyncThunk('user/editUser', async (user: Partial<IUser>): Promise<IUser | undefined> => {
  const id = localStorage.getItem(LOCAL_STORAGE_KEY);
  const userRes = (await axios.put(`${API_URL}/${id}`, user)).data;

  return userRes;
});

export const getById = createAsyncThunk('user/getById', async (userId?: number): Promise<any> => {
  const id = localStorage.getItem(LOCAL_STORAGE_KEY) || String(userId);
  const user = (await axios.get(`${API_URL}/${id}`)).data;

  return user;
});

export const auth = createAsyncThunk('user/auth', async (payload: PAuth): Promise<IUser | undefined> => {
  const user = (await axios.post(`${API_URL}/auth`, payload)).data;
  localStorage.setItem(LOCAL_STORAGE_KEY, String(user.id));
  return user;
});

export const register = createAsyncThunk(
  'user/register',
  async (
    payload: any
  ): Promise<
    | {
        user: IUser,
        userId: number
      }
    | undefined
  > => {
    try {
      const response = await axios.post(API_URL + '/register', payload);
      if (response.data && response.data.id) {
        localStorage.setItem(LOCAL_STORAGE_KEY, String(response.data.id));
        return response.data.user;
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }
);

export const registerEmail = createAsyncThunk('user/registerEmail', async (payload: PRegisterEmail): Promise<any> => {
  try {
    const response = await axios.post(API_URL + '/register-email', payload);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const completeRegistration = createAsyncThunk('user/completeRegistration', async (payload: any): Promise<RCompleteRegistration | undefined> => {
  try {
    const response = (await axios.post(API_URL + '/complete-registration', payload)).data;
    localStorage.setItem(LOCAL_STORAGE_KEY, String(response.user.id));

    return response;
  } catch (error) {
    return;
  }
});
