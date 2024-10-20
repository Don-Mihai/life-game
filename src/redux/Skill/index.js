import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_URL = 'https://6715244433bc2bfe40b986f6.mockapi.io/skills';

// Async thunks
export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (newSkill) => {
  const response = await axios.post(API_URL, newSkill);
  return response.data;
});

export const updateSkill = createAsyncThunk('skills/updateSkill', async (updatedSkill) => {
  const response = await axios.put(`${API_URL}/${updatedSkill.id}`, updatedSkill);
  return response.data;
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (skillId) => {
  await axios.delete(`${API_URL}/${skillId}`);
  return skillId;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.id !== action.payload);
      });
  },
});

export default skillsSlice.reducer;
