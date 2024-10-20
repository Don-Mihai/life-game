import React, { useState } from 'react';
import { Modal, Typography, IconButton, TextField, Button } from '@mui/material';
import './LifeStats.scss';
import { skills as initialSkills } from '../../utils.ts';
import Profile from '../../components/Profile/index.jsx';
import AddIcon from '@mui/icons-material/Add';
import SplitButton from '../../components/DropDownButton/index.jsx';
import Skill from './Skill';
import ModalSkill from './ModalSkill';

function GameProfile() {
  const [skills, setSkills] = useState(initialSkills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', levels: [] });
  const [newLevel, setNewLevel] = useState({ level: '', description: '', task: '' });
  const [editing, setEditing] = useState({ field: null, index: null });
  const [tempValue, setTempValue] = useState('');
  const [openSkillModal, setOpenSkillModal] = useState(false); // Добавлено состояние для модального окна

  const handleLevelClick = (skill, levelData) => {
    setSelectedSkill({ skill, levelData });
  };

  const handleClose = () => {
    setSelectedSkill(null);
    setEditing({ field: null, index: null });
  };

  const handleNewSkillChange = (event) => {
    const { name, value } = event.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleNewLevelChange = (event) => {
    const { name, value } = event.target;
    setNewLevel({ ...newLevel, [name]: value });
  };
  const handleEdit = (field, index = null) => {
    setEditing({ field, index });
    setTempValue(field === 'task' ? selectedSkill.levelData.task : selectedSkill.levelData.resources[index]);
  };

  const handleSave = () => {
    const updatedSkills = skills.map((skill) => {
      if (skill.name === selectedSkill.skill) {
        return {
          ...skill,
          levels: skill.levels.map((levelData) =>
            levelData.level === selectedSkill.levelData.level
              ? {
                  ...levelData,
                  task: editing.field === 'task' ? tempValue : levelData.task,
                  resources:
                    editing.field === 'resources'
                      ? levelData.resources.map((resource, index) => (index === editing.index ? tempValue : resource))
                      : levelData.resources,
                }
              : levelData
          ),
        };
      }
      return skill;
    });
    setSkills(updatedSkills);
    setEditing({ field: null, index: null });
  };

  const addSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: '', levels: [] });
    setOpenSkillModal(false); // Закрыть модальное окно после добавления
  };

  const addLevelToSkill = (skillName) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.name === skillName) {
        const lastLevel = skill.levels.length > 0 ? skill.levels[skill.levels.length - 1].level : 0;
        const newLevel = {
          level: parseInt(lastLevel) + 1,
          description: '',
          task: '',
        };
        return { ...skill, levels: [...skill.levels, newLevel] };
      }
      return skill;
    });
    setSkills(updatedSkills);
    setNewLevel({ level: '', description: '', task: '' });
  };

  return (
    <div className="game-profile">
      <SplitButton />
      <Profile />
      {/* Навыки */}
      <div className="game-profile__skills">
        {skills.map((skill) => (
          <Skill addLevelToSkill={addLevelToSkill} key={skill.name} skill={skill} handleLevelClick={handleLevelClick} />
        ))}

        <IconButton onClick={() => setOpenSkillModal(true)}>
          <AddIcon />
        </IconButton>
      </div>

      {/* Модальное окно для добавления навыка и уровня */}
      <Modal open={openSkillModal} onClose={() => setOpenSkillModal(false)}>
        <div className="game-profile__modal-box">
          <Typography variant="h6">Добавить новый навык</Typography>
          <TextField name="name" label="Имя навыка" value={newSkill.name} onChange={handleNewSkillChange} />
          <Button onClick={addSkill}>Сохранить навык</Button>
          <Typography variant="h6">Добавить уровень к навыку</Typography>
          <TextField name="level" label="Уровень" value={newLevel.level} onChange={handleNewLevelChange} />
          <IconButton onClick={() => addLevelToSkill(newSkill.name)}>
            <AddIcon />
          </IconButton>
        </div>
      </Modal>

      {/* Модальное окно для выбранного уровня навыка */}
      <ModalSkill
        selectedSkill={selectedSkill}
        editing={editing}
        handleClose={handleClose}
        handleEdit={handleEdit}
        handleSave={handleSave}
        setTempValue={setTempValue}
        tempValue={tempValue}
      />
    </div>
  );
}

export default GameProfile;
