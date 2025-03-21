import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Skill, initialState } from './types';
import { axiosInstance } from '@/api';

const API_URL = `/skills`;

export const fetchSkills = createAsyncThunk<Skill[]>('skills/fetchSkills', async () => {
  const response = await axiosInstance.get<Skill[]>(API_URL);
  return response.data;
});

export const addSkill = createAsyncThunk<Skill, Partial<Skill>>('skills/addSkill', async (newSkill) => {
  const response = await axiosInstance.post<Skill>(API_URL, { ...newSkill });
  return response.data;
});

export const updateSkill = createAsyncThunk<Skill, Skill>('skills/updateSkill', async (updatedSkill) => {
  const response = await axiosInstance.put<Skill>(`${API_URL}/${updatedSkill.id}`, updatedSkill);
  return response.data;
});

export const updateSkillsOrder = createAsyncThunk<Skill[], Skill[]>('skills/updateSkillsOrder', async (updatedSkills) => {
  const response = await axiosInstance.put<Skill[]>(`${API_URL}/update-order`, {
    skills: updatedSkills.map((skill, index) => ({ id: skill.id, order: index }))
  });
  return response.data;
});

export const deleteSkill = createAsyncThunk<string, string>('skills/deleteSkill', async (skillId) => {
  await axiosInstance.delete(`${API_URL}/${skillId}`);
  return skillId;
});

export const generateSkillLevels = createAsyncThunk<Skill, Skill>('skills/generateSkillLevels', async (skill) => {
  const response = await axiosInstance.post(`${API_URL}/generate-levels`, { skillId: skill.id });
  return response.data;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    reorderSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateSkillLocal: (state, action) => {
      const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
      if (index !== -1) state.skills[index] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(generateSkillLevels.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(updateSkillsOrder.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.id !== action.payload);
      });
  }
});

export const { reorderSkills, updateSkillLocal } = skillsSlice.actions;
export default skillsSlice.reducer;
