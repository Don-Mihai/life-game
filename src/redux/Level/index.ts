import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserId } from '../User/types.ts';
import { URL } from '../../utils.ts';
import { Level, initialState } from './types.ts';
import { OrganizationChartNodeData } from 'primereact/organizationchart';
import { SkillState } from '../Skill/types.ts';
import { updateSkillLocal } from '../Skill';

const API_URL = `${URL}/levels`;

export const addLevel = createAsyncThunk<Level, Partial<Level>>('levels/addLevel', async (newLevel, { getState, dispatch }) => {
  const response = await axios.post<Level>(API_URL, { ...newLevel, userId: getUserId() });

  const newLevelData = response.data;

  const state = getState() as { skill: SkillState };
  console.log(state);
  const skill = state.skill.skills.find((skill) => skill.id === newLevelData.skillId);
  console.log(skill);

  const newSkill = { ...skill, levels: [...(skill?.levels || []), newLevelData] };

  if (skill) {
    dispatch(updateSkillLocal(newSkill));
  }

  return newLevelData;
});

export const updateLevel = createAsyncThunk<Level, any>('levels/updateLevel', async (payload) => {
  const response = await axios.put<Level>(`${API_URL}/${payload.skillId}/update-data`, payload);
  return response.data;
});

export const getTreeLevelsById = createAsyncThunk<OrganizationChartNodeData, string>('levels/getTreeLevelsById', async (skillId) => {
  const response = await axios.get<OrganizationChartNodeData>(`${API_URL}/${skillId}/tree-levels`);
  return response.data;
});

export const updateNodePosition = createAsyncThunk<Level, any>('tree/updateNodePosition', async ({ levelId, newParentId, oldParentId }) => {
  const response = await axios.put(`${API_URL}/update-position`, {
    levelId,
    newParentId,
    oldParentId
  });
  return response.data;
});

const levelsSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTreeLevelsById.fulfilled, (state, action) => {
      state.levelsTree = action.payload;
    });
  }
});

export default levelsSlice.reducer;
