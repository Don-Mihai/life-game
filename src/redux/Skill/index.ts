import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import OpenAI from 'openai';
import { getUserId } from '../User/types.ts';
import { URL } from '../../utils.ts';
import { SKILL_LEVELS_JSON_SCHEMA, Skill, initialState } from './types.ts';
import { OPEN_AI_CONFIG } from './openAIConfig.ts';
import { Level } from '../Level/types.ts';

const API_URL = `${URL}/skills`;
const openai = new OpenAI(OPEN_AI_CONFIG);

export const fetchSkills = createAsyncThunk<Skill[]>('skills/fetchSkills', async () => {
  const response = await axios.get<Skill[]>(API_URL, { params: { userId: getUserId() } });
  return response.data;
});

export const addSkill = createAsyncThunk<Skill, Omit<Skill, 'id'>>('skills/addSkill', async (newSkill) => {
  const response = await axios.post<Skill>(API_URL, { ...newSkill, userId: getUserId() });
  return response.data;
});

export const updateSkill = createAsyncThunk<Skill, Skill>('skills/updateSkill', async (updatedSkill) => {
  const response = await axios.put<Skill>(`${API_URL}/${updatedSkill.id}`, updatedSkill);
  return response.data;
});

export const updateSkillsOrder = createAsyncThunk<Skill[], Skill[]>('skills/updateSkillsOrder', async (updatedSkills) => {
  const response = await axios.put<Skill[]>(`${API_URL}/update-order`, {
    userId: getUserId(),
    skills: updatedSkills.map((skill, index) => ({ id: skill.id, order: index }))
  });
  return response.data;
});

export const deleteSkill = createAsyncThunk<string, string>('skills/deleteSkill', async (skillId) => {
  await axios.delete(`${API_URL}/${skillId}`);
  return skillId;
});

export const generateSkillLevels = createAsyncThunk<Skill, { skillId: string, skillName: string }, { rejectValue: string }>(
  'skills/generateSkillLevels',
  async ({ skillId, skillName }, { rejectWithValue }) => {
    try {
      const response = await axios.get<Skill>(`${API_URL}/${skillId}`);
      const skill = response.data;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-2024-08-06',
        messages: [
          {
            role: 'system',
            content: `You are a professional curriculum developer for skills. Respond with a structured JSON for levels.`
          },
          {
            role: 'user',
            content: `Generate a detailed 10-level learning guide for the skill "${skillName}". Each level should provide:
- A clear, concise **goal** for what the learner will achieve.
- A detailed **methodology** or steps for learning the level.
- A curated list of **resources** including:
  - At least 2-3 high-quality YouTube videos with accurate URLs.
  - At least 1 article or documentation link.
  - Optionally, any additional learning tools (e.g., interactive platforms or tutorials).`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: SKILL_LEVELS_JSON_SCHEMA
        }
      });

      const generatedData = completion.choices[0].message.content || '{}';
      const generatedLevels: Level[] = JSON.parse(generatedData).levels;

      skill.levels = generatedLevels;

      const updatedResponse = await axios.put<Skill>(`${API_URL}/${skillId}`, skill);

      return updatedResponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Skills slice
const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    reorderSkills: (state, action) => {
      state.skills = action.payload;
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
      .addCase(updateSkillsOrder.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.id !== action.payload);
      })
      .addCase(generateSkillLevels.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      });
  }
});

export const { reorderSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
