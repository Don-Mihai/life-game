import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const Skill = ({ handleLevelClick, skill, addLevelToSkill }) => {
  return (
    <div key={skill.name} className="game-profile__skill">
      <div className="game-profile__skill-name">{skill.name}</div>
      <div className="game-profile__skill-levels">
        {skill.levels.map((levelData, i) => (
          <div key={i} className="game-profile__level" onClick={() => handleLevelClick(skill.name, levelData)}>
            {levelData.level}
          </div>
        ))}
        <IconButton onClick={() => addLevelToSkill(skill.name)}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Skill;
