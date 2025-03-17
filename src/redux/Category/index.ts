import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category, CategoryDeletePayload, initialState } from './types';
import { axiosInstance } from '@/api';

const API_URL = `/category`;

export const addCategory = createAsyncThunk<Category, Partial<Category>>('category/addCategory', async (newCategory) => {
  const category = (await axiosInstance.post<Category>(API_URL, newCategory)).data;

  return category;
});

export const deleteCategory = createAsyncThunk<Category[], string>('category/deleteCategory', async (categoryId) => {
  const payload: CategoryDeletePayload = {
    categoryId
  };

  const category = (await axiosInstance.post<Category[]>(API_URL + '/delete', payload)).data;

  return category;
});

export const editCategory = createAsyncThunk<Category, Partial<Category>>('category/editCategory', async (newCategory) => {
  const payload = {
    ...newCategory
  };
  const category = (await axiosInstance.put<Category>(API_URL + `/${newCategory.id}`, payload)).data;

  return category;
});

export const fetchCategories = createAsyncThunk<Category[]>('category/fetchCategories', async () => {
  const categories = (await axiosInstance.get<Category[]>(API_URL)).data;

  return categories;
});

export const updateCategoryOrder = createAsyncThunk<Category[], Category[]>('category/updateCategoryOrder', async (reorderedTabs) => {
  const response = await axiosInstance.put<Category[]>(`${API_URL}/update-order`, {
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
