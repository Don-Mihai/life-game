import React, { useState } from 'react';

import { IconButton, Tooltip, TextField, Autocomplete } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import { generateSkillLevels, updateSkill, deleteSkill } from '../../../redux/Skill';
import styles from './Skill.module.scss';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const Skill = ({ handleLevelClick, skill, dragHandleProps }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillName, setNewSkillName] = useState(skill.name);

  const tags = [{ title: 'Тег 1' }, { title: 'Тег 2' }, { title: 'Тег 3' }];

  const handleDeleteSkill = () => {
    dispatch(deleteSkill(skill.id));
  };

  const handleKeyDown = (event) => {
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

  const handleAddLevel = () => {
    const newLevel = {
      task: '',
      completed: false
    };

    const updatedSkill = {
      ...skill,
      levels: [...skill.levels, newLevel]
    };

    dispatch(updateSkill(updatedSkill));
  };

  const handleMarkAsCompleted = (index) => {
    const updatedLevels = skill.levels.map((level, i) => (i === index ? { ...level, completed: true } : level));

    const updatedSkill = {
      ...skill,
      levels: updatedLevels
    };

    dispatch(updateSkill(updatedSkill));
  };

  const handleDeleteLevel = (index) => {
    const updatedSkill = {
      ...skill,
      levels: skill.levels.filter((_, i) => i !== index)
    };

    dispatch(updateSkill(updatedSkill));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const lastCompletedLevelIndex = skill.levels.findIndex((level) => !level.completed) - 1;

  const handleGenerateLevels = () => {
    dispatch(generateSkillLevels({ skillId: skill.id, skillName: skill.name }));
  };

  //

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
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={tags}
                  sx={{
                    '& .MuiAutocomplete-input': {
                      minWidth: '36px !important'
                    }
                  }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} placeholder="Теги" variant="standard" />}
                />
              </>
            )}
            {lastCompletedLevelIndex >= 0 && <div className={styles.completedLevel}>Уровень: {lastCompletedLevelIndex + 1}</div>}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenu className={styles.skillMenu} id={`skill-context-menu-${skill.name}`}>
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
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.skillContent}
      >
        <div className={styles.skillLevels}>
          {skill.levels.map((levelData, i) => (
            <React.Fragment key={i}>
              <ContextMenuTrigger id={`context-menu-${skill.name}-${i}`}>
                <Tooltip title={levelData.description && JSON.parse(levelData.description).blocks[0]?.data.text} placement="top" arrow>
                  <div
                    className={`${styles.level} ${levelData.completed ? styles.completed : ''}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleLevelClick(skill, levelData, i);
                    }}
                  >
                    {i + 1}
                  </div>
                </Tooltip>
              </ContextMenuTrigger>
              <ContextMenu id={`context-menu-${skill.name}-${i}`}>
                <ContextMenuItem onClick={() => handleDeleteLevel(i)}>Удалить</ContextMenuItem>
                <ContextMenuItem onClick={() => handleMarkAsCompleted(i)}>Уровень пройден</ContextMenuItem>
              </ContextMenu>
            </React.Fragment>
          ))}
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleAddLevel(skill);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Skill;
