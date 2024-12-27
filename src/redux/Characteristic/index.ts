import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

// Инициализация состояния
const initialState: InitialState = {
  characteristics: [],
  isLoading: false
};

// Слайс для хранения состояния
const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState,
  reducers: {}
});

export default characteristicSlice.reducer;
