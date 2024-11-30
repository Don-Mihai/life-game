import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
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

  const handleDeleteSkill = () => {
    dispatch(deleteSkill(skill.id));
  };

  const handleEditSkill = () => {
    // Реализуйте функционал редактирования навыка
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

  return (
    <div className={styles.skill}>
      <ContextMenuTrigger id={`skill-context-menu-${skill.name}`}>
        <div className={styles.skillContainer}>
          <div className={styles.skillHeader} onClick={toggleExpand}>
            <div {...dragHandleProps} className={styles.dragHandle}>
              <DragIndicatorIcon />
            </div>
            <div className={styles.skillName}>{skill.name}</div>
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
