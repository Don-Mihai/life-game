import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../User/types.ts';
import { convertToEditorDescription } from '../../utils';
import OpenAI from 'openai';
import { URL } from '../../utils';

// API Base URL
const API_URL = URL + '/skills';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_API_KEY || '', // Замените "your-openai-api-key" на ваш ключ
  dangerouslyAllowBrowser: true
});

// Async thunks
export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const userId = localStorage.getItem(LOCAL_STORAGE_KEY);
  const response = await axios.get(API_URL, {
    params: { userId } // Фильтрация навыков по userId
  });
  return response.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (newSkill) => {
  const userId = localStorage.getItem(LOCAL_STORAGE_KEY);
  const skillWithUser = { ...newSkill, userId };
  const response = await axios.post(API_URL, skillWithUser);
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

export const updateSkillLevel = createAsyncThunk('skills/updateSkillLevel', async ({ skillId, levelIndex, description }) => {
  const payload = {
    levelIndex,
    description
  };

  const response = await axios.put(`${API_URL}/${skillId}/level`, payload);
  return response.data;
});

export const generateSkillLevels = createAsyncThunk('skills/generateSkillLevels', async ({ skillId, skillName }, { rejectWithValue }) => {
  try {
    // Шаг 1: Получение текущего навыка
    const response = await axios.get(`${API_URL}/${skillId}`);
    const skill = response.data;

    // Шаг 2: Отправка запроса в OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06', // Используем последнюю модель
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
        json_schema: {
          name: 'skill_levels_schema',
          schema: {
            type: 'object',
            properties: {
              levels: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    completed: { type: 'boolean', default: false },
                    description: {
                      type: 'string',
                      description: 'Editor.js JSON string including task, description, and resources'
                    }
                  },
                  required: ['completed', 'description']
                }
              }
            },
            required: ['levels']
          }
        }
      }
    });

    // Шаг 3: Получение сгенерированных уровней
    const generatedData = completion.choices[0].message.content;
    const generatedLevels = JSON.parse(generatedData).levels;

    console.log('Generated Levels:', generatedLevels);

    // Шаг 4: Обновление навыка с новыми уровнями
    skill.levels = generatedLevels;

    console.log('skill', skill);

    const updatedResponse = await axios.put(`${API_URL}/${skillId}`, skill);

    return updatedResponse.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    status: 'idle',
    error: null
  },
  reducers: {
    reorderSkills: (state, action) => {
      state.skills = action.payload;
    }
  },
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
      })
      .addCase(updateSkillLevel.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload; // Обновляем навык с обновленным уровнем
        }
      })
      .addCase(generateSkillLevels.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload; // Обновляем навык с новыми уровнями
        }
      });
  }
});

export const { reorderSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
