import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserId } from '../User/types';
import { URL } from '../../utils';
import { Level, TreeNodeI, UpdateNodePositionPayload, initialState } from './types';
import { SkillState } from '../Skill/types';
import { updateSkillLocal } from '../Skill';

const API_URL = `${URL}/levels`;

export const addLevel = createAsyncThunk<Level, Partial<Level>>('levels/addLevel', async (newLevel, { getState, dispatch }) => {
  const response = await axios.post<Level>(API_URL, { ...newLevel, userId: getUserId() });

  const newLevelData = response.data;

  const state = getState() as { skill: SkillState };

  const skill = state.skill.skills.find((skill) => skill.id === newLevelData.skillId);

  const newSkill = { ...skill, levels: [...(skill?.levels || []), newLevelData] };

  if (skill) {
    dispatch(updateSkillLocal(newSkill));
  }

  return newLevelData;
});

export const updateLevel = createAsyncThunk<Level, Partial<Level>>('levels/updateLevel', async (payload) => {
  const updatedLevel = (await axios.put<Level>(`${API_URL}/${payload.skillId}/update-data`, payload)).data;

  return updatedLevel;
});

export const getTreeLevelsById = createAsyncThunk<TreeNodeI, string>('levels/getTreeLevelsById', async (skillId) => {
  const response = await axios.get<TreeNodeI>(`${API_URL}/${skillId}/tree-levels`);
  return response.data;
});

export const updateNodePosition = createAsyncThunk<Level, UpdateNodePositionPayload>(
  'tree/updateNodePosition',
  async ({ levelId, newParentId, oldParentId }) => {
    const response = await axios.put(`${API_URL}/update-position`, {
      levelId,
      newParentId,
      oldParentId
    });
    return response.data;
  }
);

export const deleteLevel = createAsyncThunk<Level, Level>('levels/deleteLevel', async (level, { getState, dispatch }) => {
  const updatedLevel = (await axios.delete<Level>(API_URL + `/${level.id}`)).data;

  const state = getState() as { skill: SkillState };

  const skill = state.skill.skills.find((skill) => skill.id === level.skillId);
  const newSkill = { ...skill, levels: skill?.levels.filter((level) => level.id !== updatedLevel.id) };

  if (skill) {
    dispatch(updateSkillLocal(newSkill));
  }

  return updatedLevel;
});

export const reorderLevel = createAsyncThunk('levels/reorder', async ({ levelId, newIndex }: { levelId: string, newIndex: number }) => {
  await axios.put(`${API_URL}/reorder`, { newIndex, id: levelId });
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
