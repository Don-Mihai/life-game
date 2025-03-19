import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState, IUser, PAuth, LOCAL_STORAGE_TOKEN, PRegisterEmail, RCompleteRegistration } from './types';
import { axiosInstance } from '@/api';

const API_URL = '/users';

const initialState: UserState = {
  user: {} as IUser,
  users: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(completeRegistration.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;

export const editUser = createAsyncThunk('user/editUser', async (user: Partial<IUser>): Promise<IUser | undefined> => {
  const response = await axiosInstance.post(API_URL + '/edit', user);
  return response.data;
});

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (): Promise<IUser> => {
  const response = await axiosInstance.post(API_URL + '/me');
  return response.data;
});

export const auth = createAsyncThunk('user/auth', async (payload: PAuth): Promise<IUser | undefined> => {
  const response = await axiosInstance.post(API_URL + '/auth', payload);
  localStorage.setItem(LOCAL_STORAGE_TOKEN, response?.data?.token);
  return response?.data?.user;
});

export const registerEmail = createAsyncThunk('user/registerEmail', async (payload: PRegisterEmail): Promise<any> => {
  try {
    const response = await axiosInstance.post(API_URL + '/register-email', payload);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const completeRegistration = createAsyncThunk('user/completeRegistration', async (payload: any): Promise<RCompleteRegistration | undefined> => {
  try {
    const response = (await axiosInstance.post(API_URL + '/complete-registration', payload)).data;
    localStorage.setItem(LOCAL_STORAGE_TOKEN, response?.data?.token);

    return response.data;
  } catch (error) {
    return;
  }
});
