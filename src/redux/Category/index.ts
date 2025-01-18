import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../utils.ts';
import { Category, initialState } from './types.ts';
import { getUserId } from '../User/types.ts';
import { get } from 'lodash';

const API_URL = `${URL}/category`;

export const addCategory = createAsyncThunk<Category, Partial<Category>>('category/addCategory', async (newCategory) => {
  const userId = getUserId();
  const category = (await axios.post<Category>(API_URL + `/${userId}`, newCategory)).data;

  return category;
});

export const deleteCategory = createAsyncThunk<Category, string>('category/deleteCategory', async (categoryId) => {
  const category = (await axios.delete<Category>(API_URL + `/${categoryId}`)).data;

  return category;
});

export const editCategory = createAsyncThunk<Category, Partial<Category>>('category/editCategory', async (newCategory) => {
  const category = (await axios.put<Category>(API_URL + `/${newCategory.id}`, newCategory)).data;

  return category;
});

export const fetchCategories = createAsyncThunk<Category[]>('category/fetchCategories', async () => {
  const userId = getUserId();
  const categories = (await axios.get<Category[]>(API_URL + `/${userId}`)).data;

  return categories;
});

export const updateCategoryOrder = createAsyncThunk<Category[], Category[]>('category/updateCategoryOrder', async () => {
  return [] as Category[];
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {}
});

export default categorySlice.reducer;
