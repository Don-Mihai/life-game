import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import styles from './Skill.module.scss';

const Skill = ({ handleLevelClick, skill, addLevelToSkill }) => {
  const [completedLevels, setCompletedLevels] = useState({});

  const handleMarkAsCompleted = (index) => {
    setCompletedLevels((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <>
      <div key={skill.name} className={styles.skill}>
        <div className={styles.skillName}>{skill.name}</div>
        <div className={styles.skillLevels}>
          {skill.levels.map((levelData, i) => (
            <React.Fragment key={i}>
              <ContextMenuTrigger id={`context-menu-${skill.name}-${i}`}>
                <div className={`${styles.level} ${completedLevels[i] ? styles.completed : ''}`} onClick={() => handleLevelClick(skill.name, levelData)}>
                  {levelData.level}
                </div>
              </ContextMenuTrigger>
              <ContextMenu id={`context-menu-${skill.name}-${i}`}>
                <ContextMenuItem onClick={() => handleMarkAsCompleted(i)}>Пометить как выполненный</ContextMenuItem>
              </ContextMenu>
            </React.Fragment>
          ))}

          <IconButton onClick={() => addLevelToSkill(skill.name)}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Skill;
