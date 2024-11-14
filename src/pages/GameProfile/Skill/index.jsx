import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import styles from './Skill.module.scss';
import { updateSkill } from '../../../redux/Skill';
import { useDispatch } from 'react-redux';

const Skill = ({ handleLevelClick, skill, addLevelToSkill }) => {
  const dispatch = useDispatch();
  const [completedLevels, setCompletedLevels] = useState({});

  const handleAddLevel = async (skill) => {
    const newLevel = {
      level: skill.levels.length + 1,
      description: '',
      task: '',
      completed: false
    };

    const updatedSkill = {
      ...skill,
      levels: [...skill.levels, newLevel]
    };

    try {
      await dispatch(updateSkill(updatedSkill)).unwrap();
    } catch (error) {
      console.error('Error adding level:', error);
    }
  };

  const handleMarkAsCompleted = async (index) => {
    const updatedLevels = skill.levels.map((level, i) => (i === index ? { ...level, completed: true } : level));

    const updatedSkill = {
      ...skill,
      levels: updatedLevels
    };

    try {
      await dispatch(updateSkill(updatedSkill)).unwrap();
      setCompletedLevels((prev) => ({
        ...prev,
        [index]: true
      }));
    } catch (error) {
      console.error('Error marking level as completed:', error);
    }
  };

  const handleDeleteLevel = async (index) => {
    const updatedSkill = {
      ...skill,
      levels: skill.levels.filter((_, i) => i !== index)
    };

    try {
      await dispatch(updateSkill(updatedSkill)).unwrap();
    } catch (error) {
      console.error('Error deleting level:', error);
    }
  };

  return (
    <>
      <div key={skill.name} className={styles.skill}>
        <div className={styles.skillName}>{skill.name}</div>
        <div className={styles.skillLevels}>
          {skill.levels.map((levelData, i) => (
            <React.Fragment key={i}>
              <ContextMenuTrigger id={`context-menu-${skill.name}-${i}`}>
                <Tooltip title={levelData.description} placement="top" arrow>
                  <div
                    className={`${styles.level} ${completedLevels[i] || levelData.completed ? styles.completed : ''}`}
                    onClick={() => handleLevelClick(skill.name, levelData)}
                  >
                    {i + 1}
                  </div>
                </Tooltip>
              </ContextMenuTrigger>
              <ContextMenu id={`context-menu-${skill.name}-${i}`}>
                <ContextMenuItem onClick={() => handleMarkAsCompleted(i)}>Уровень пройден</ContextMenuItem>
                <ContextMenuItem onClick={() => handleDeleteLevel(i)}>Удалить</ContextMenuItem>
              </ContextMenu>
            </React.Fragment>
          ))}

          <IconButton onClick={() => handleAddLevel(skill)}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Skill;
