import { URL } from '../../utils';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы для состояния
interface ValidatorsState {
  isValid: boolean | null;
  loading: boolean;
  error: string | null;
}

// Инициализация состояния
const initialState: ValidatorsState = {
  isValid: null,
  loading: false,
  error: null
};

// Асинхронный экшен для проверки URL
export const validateLink = createAsyncThunk<
  boolean,
  string,
  {
    rejectValue: boolean
  }
>('validators/validateLink', async (url, { rejectWithValue }) => {
  try {
    const response: any = await axios.post(URL + '/validate-link', { url });
    return response.data.valid; // Возвращаем результат проверки
  } catch (error) {
    return rejectWithValue(false); // В случае ошибки или недоступности URL
  }
});

// Слайс для хранения состояния
const validatorsSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateLink.pending, (state) => {
        state.loading = true;
        state.isValid = null;
        state.error = null;
      })
      .addCase(validateLink.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.isValid = action.payload;
      })
      .addCase(validateLink.rejected, (state, action) => {
        state.loading = false;
        state.isValid = false;
        state.error = action.payload ? 'Ошибка при проверке URL' : 'URL недоступен';
      });
  }
});

export default validatorsSlice.reducer;
