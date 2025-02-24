import React, { useState, useEffect } from 'react';

import { TextField, Autocomplete, IconButton } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from 'primereact/chip';

import { useDispatch } from 'react-redux';

import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import { generateSkillLevels, updateSkill, deleteSkill } from '../../../../redux/Skill';

import styles from './Skill.module.scss';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { useNavigate } from 'react-router-dom';
import Levels from './Levels';
import { Skill as SkillI } from '@/redux/Skill/types';
import { AppDispatch } from '@/redux/store';

interface Props {
  skill: SkillI;
  dragHandleProps: any;
}

const Skill = ({ skill, dragHandleProps }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [newSkillName, setNewSkillName] = useState(skill.name);
  const [tags, setTags] = useState(skill.tags || []);
  const [newTagInput, setNewTagInput] = useState('');

  const navigate = useNavigate();

  const handleDeleteSkill = () => {
    dispatch(deleteSkill(skill.id));
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSaveSkill();
    }
  };

  const handleEditSkill = () => {
    setIsEditing(true);
  };

  const handleSaveSkill = () => {
    dispatch(updateSkill({ ...skill, name: newSkillName }));
    setIsEditing(false);
  };

  const lastCompletedLevelIndex = skill.levels?.findIndex?.((level) => !level.completed) - 1;

  const handleGenerateLevels = () => {
    dispatch(generateSkillLevels({ skillId: skill.id, skillName: skill.name }));
  };

  const handleOpenTree = () => {
    navigate(`/tree/${skill.id}`);
  };

  const handleDeleteTag = (tagToDelete: any) => {
    setTags(tags.filter((tag) => tag.title !== tagToDelete.title));
  };

  const handleNewTagKeyDown = (event: any) => {
    if (event.key === 'Enter' && newTagInput.trim() !== '' && !tags.some((tag) => tag.title === newTagInput.trim())) {
      const updatedTags = [...tags, { title: newTagInput.trim() }];
      setTags(updatedTags);
      setNewTagInput('');
    }
  };

  return (
    <div className={styles.skill}>
      <ContextMenuTrigger id={`skill-context-menu-${skill.name}`}>
        <div className={styles.skillContainer}>
          <div className={styles.skillHeader}>
            <div {...dragHandleProps} className={styles.dragHandle}>
              <DragIndicatorIcon />
            </div>
            {isEditing ? (
              <TextField onKeyDown={handleKeyDown} value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} onBlur={handleSaveSkill} autoFocus />
            ) : (
              <>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <Chip key={index} label={tag.title} removable onRemove={() => handleDeleteTag(tag)} className={styles.tagChip} />
                  ))}
                  <div className={styles.addTag}>
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleNewTagKeyDown}
                      className={styles.addTagInput}
                      placeholder="Добавить тег"
                    />
                  </div>
                </div>
              </>
            )}
            {lastCompletedLevelIndex >= 0 && <div className={styles.completedLevel}>Уровень: {lastCompletedLevelIndex + 1}</div>}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenu className={styles.skillMenu} id={`skill-context-menu-${skill.name}`}>
        <ContextMenuItem className={styles.skillContext} onClick={handleOpenTree}>
          <DeleteIcon fontSize="small" style={{ marginRight: '8px' }} />
          Открыть в режиме дерева
        </ContextMenuItem>
        <ContextMenuItem className={styles.skillContext} onClick={handleGenerateLevels}>
          <AutoFixHighIcon fontSize="small" style={{ marginRight: '8px' }} />
          Генерировать уровни
        </ContextMenuItem>
        <ContextMenuItem className={styles.skillContext} onClick={handleEditSkill}>
          <EditIcon fontSize="small" style={{ marginRight: '8px' }} />
          Редактировать навык
        </ContextMenuItem>
        <ContextMenuItem className={styles.skillContext} onClick={handleDeleteSkill}>
          <DeleteIcon fontSize="small" style={{ marginRight: '8px' }} />
          Удалить навык
        </ContextMenuItem>
      </ContextMenu>
      <Levels skill={skill} />
    </div>
  );
};

export default Skill;
