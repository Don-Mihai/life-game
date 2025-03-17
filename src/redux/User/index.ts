import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState, IUser, PAuth, LOCAL_STORAGE_KEY, PRegisterEmail, RCompleteRegistration } from './types';
import { axiosInstance } from '@/api';

const API_URL = '/users';

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

export const { setUser } = userSlice.actions;

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
  localStorage.setItem('accessToken', response?.data?.token);
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
    localStorage.setItem(LOCAL_STORAGE_KEY, String(response.user.id));

    return response.data;
  } catch (error) {
    return;
  }
});
