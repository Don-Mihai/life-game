import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Characteristic, initialState } from './types';
import axios from 'axios';
import { URL } from '../../utils';
import { LOCAL_STORAGE_KEY } from '../User/types';
import { mockCharacteristics } from './utils';

const API_URL = URL + '/characteristics';

export const getCharacteristics = createAsyncThunk('characteristic/getCharacteristics', async (id?: string): Promise<Characteristic[]> => {
  const userId = id || localStorage.getItem(LOCAL_STORAGE_KEY);
  const characteristics: Characteristic[] = (await axios.get(`${API_URL}/${userId}`)).data;
  return characteristics;
});

export const deleteCharacteristics = createAsyncThunk('characteristic/deleteCharacteristics', async (characteristicId?: string): Promise<Characteristic> => {
  const deletedCharacteristic: Characteristic = (await axios.delete(`${API_URL}/${characteristicId}`)).data;
  return deletedCharacteristic;
});

export const editCharacteristics = createAsyncThunk(
  'characteristic/editCharacteristics',
  async (newCharacteristic: Partial<Characteristic>): Promise<Characteristic> => {
    const editCharacteristics: Characteristic = (await axios.put(`${API_URL}/${newCharacteristic.id}`, newCharacteristic)).data;
    return editCharacteristics;
  }
);

const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCharacteristics.fulfilled, (state, action) => {
        state.characteristics = action.payload;
        state.isLoading = false;
      })
      .addCase(getCharacteristics.rejected, (state, action) => {
        state.characteristics = mockCharacteristics;
        state.isLoading = false;
      })
      .addCase(getCharacteristics.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editCharacteristics.fulfilled, (state, action) => {
        state.characteristics = state.characteristics.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.isLoading = false;
      })
      .addCase(editCharacteristics.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editCharacteristics.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCharacteristics.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        const deletedIndex = state.characteristics.findIndex((item) => item.id === deletedId);
        state.characteristics.splice(deletedIndex);
      });
  }
});

export default characteristicSlice.reducer;
