import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import styles from './Skill.module.scss';
import { generateSkillLevels, updateSkill } from '../../../redux/Skill';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const Skill = ({ handleLevelClick, skill }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddLevel = async (skill) => {
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

  const handleMarkAsCompleted = async (index) => {
    const updatedLevels = skill.levels.map((level, i) => (i === index ? { ...level, completed: true } : level));

    const updatedSkill = {
      ...skill,
      levels: updatedLevels
    };

    dispatch(updateSkill(updatedSkill));
  };

  const handleDeleteLevel = async (index) => {
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
      <div className={styles.skillContainer}>
        <div className={styles.skillHeader} onClick={toggleExpand}>
          <div className={styles.skillName}>{skill.name}</div>
          {lastCompletedLevelIndex >= 0 && <div className={styles.completedLevel}>Уровень: {lastCompletedLevelIndex + 1}</div>}
          <Tooltip title="Генерировать уровни" arrow>
            <AutoFixHighIcon className={styles.generateIcon} onClick={handleGenerateLevels} />
          </Tooltip>
        </div>
      </div>
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
                  <div className={`${styles.level} ${levelData.completed ? styles.completed : ''}`} onClick={() => handleLevelClick(skill, levelData, i)}>
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
      </motion.div>
    </div>
  );
};

export default Skill;
