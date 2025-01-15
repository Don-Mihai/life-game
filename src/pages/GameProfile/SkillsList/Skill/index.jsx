import React, { useState, useEffect } from 'react';

import { TextField, Autocomplete, IconButton } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import { generateSkillLevels, updateSkill, deleteSkill } from '../../../../redux/Skill';
import { addLevel } from '../../../../redux/Level';
import styles from './Skill.module.scss';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import Level from './Level';
import { useNavigate } from 'react-router-dom';

const Skill = ({ handleLevelClick, skill, user, dragHandleProps }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillName, setNewSkillName] = useState(skill.name);

  const [options, setOptions] = useState(user.tags || []);
  const [tags, setTags] = useState(skill.tags || []);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleKeyDownTags = (event) => {
    if (event.key === 'Enter' && inputValue && !tags.some((tag) => tag.title === inputValue)) {
      const payload = [...tags, { title: inputValue }];
      setTags(payload);
      setInputValue('');
    }
  };

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
      skillId: skill.id,
      parentId: skill.levels.length ? skill.levels[skill.levels.length - 1].id : null
    };

    dispatch(addLevel(newLevel));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const lastCompletedLevelIndex = skill.levels.findIndex((level) => !level.completed) - 1;

  const handleGenerateLevels = () => {
    dispatch(generateSkillLevels({ skillId: skill.id, skillName: skill.name }));
  };

  const handleTagChange = (event, newValue) => {
    setTags(newValue);
  };

  const handleOpenTree = () => {
    navigate(`/tree/${skill.id}`);
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
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  value={tags}
                  onChange={handleTagChange}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                  onKeyDown={handleKeyDownTags}
                  sx={{
                    '& .MuiAutocomplete-input': {
                      minWidth: '36px !important'
                    }
                  }}
                  renderInput={(params) => <TextField {...params} placeholder="Теги" variant="standard" />}
                />
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
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.skillContent}
      >
        <div className={styles.skillLevels}>
          {skill.levels.map((levelData, i) => (
            <Level key={i} skill={skill} levelData={levelData} i={i} handleLevelClick={handleLevelClick} />
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
