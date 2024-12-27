import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Characteristic, InitialState } from './types';
import axios from 'axios';
import { URL } from '../../utils';
import { LOCAL_STORAGE_KEY } from '../User/types';
import { mockCharacteristics } from './utils';

// Инициализация состояния
const initialState: InitialState = {
  characteristics: [],
  isLoading: false
};

export const getCharacteristics = createAsyncThunk('characteristic/getCharacteristics', async (id?: string): Promise<Characteristic[]> => {
  const userId = id || localStorage.getItem(LOCAL_STORAGE_KEY);
  const characteristics: Characteristic[] = (await axios.get(`${URL}/characteristics/${userId}`)).data;
  return characteristics;
});

export const deleteCharacteristics = createAsyncThunk('characteristic/getCharacteristics', async (characteristicId?: string): Promise<Characteristic> => {
  const deletedCharacteristic: Characteristic = (await axios.delete(`${URL}/characteristics/${characteristicId}`)).data;
  return deletedCharacteristic;
});

// Слайс для хранения состояния
const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCharacteristics.fulfilled, (state, action) => {
        state.characteristics = action.payload;
      })
      .addCase(getCharacteristics.rejected, (state, action) => {
        state.characteristics = mockCharacteristics;
      })
      .addCase(deleteCharacteristics.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        const deletedIndex = state.characteristics.findIndex((item) => item.id === deletedId);
        state.characteristics.splice(deletedIndex);
      });
  }
});

export const {} = characteristicSlice.actions;

export default characteristicSlice.reducer;
