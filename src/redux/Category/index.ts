import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../utils';
import { Category, CategoryDeletePayload, initialState } from './types';
import { getUserId } from '../User/types';

const API_URL = `${URL}/category`;

export const addCategory = createAsyncThunk<Category, Partial<Category>>('category/addCategory', async (newCategory) => {
  const userId = getUserId();
  const category = (await axios.post<Category>(API_URL + `/${userId}`, newCategory)).data;

  return category;
});

export const deleteCategory = createAsyncThunk<Category[], string>('category/deleteCategory', async (categoryId) => {
  const userId = getUserId();

  const payload: CategoryDeletePayload = {
    categoryId,
    userId
  };

  const category = (await axios.post<Category[]>(API_URL + '/delete', payload)).data;

  return category;
});

export const editCategory = createAsyncThunk<Category, Partial<Category>>('category/editCategory', async (newCategory) => {
  const userId = getUserId();
  const payload = {
    ...newCategory,
    userId
  };
  const category = (await axios.put<Category>(API_URL + `/${newCategory.id}`, payload)).data;

  return category;
});

export const fetchCategories = createAsyncThunk<Category[]>('category/fetchCategories', async () => {
  const userId = getUserId();
  const categories = (await axios.get<Category[]>(API_URL + `/${userId}`)).data;

  return categories;
});

export const updateCategoryOrder = createAsyncThunk<Category[], Category[]>('category/updateCategoryOrder', async (reorderedTabs) => {
  const response = await axios.put<Category[]>(`${API_URL}/update-order`, {
    userId: getUserId(),
    categories: reorderedTabs.map((category, index) => ({ ...category, order: index }))
  });
  return response.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {}
});

export default categorySlice.reducer;
