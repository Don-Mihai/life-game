import React, { useEffect, useState } from 'react';
import { Modal, Typography, IconButton, TextField, Button } from '@mui/material';
import './LifeStats.scss';
import Profile from '../../components/Profile/index.jsx';
import AddIcon from '@mui/icons-material/Add';
import SplitButton from '../../components/DropDownButton/index.jsx';
import Skill from './Skill';
import ModalSkill from './ModalSkill';
import { fetchSkills } from '../../redux/Skill';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function GameProfile() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skill.skills);
  const skillsStatus = useSelector((state) => state.skill.status);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', levels: [] });
  const [newLevel, setNewLevel] = useState({ level: '', description: '', task: '' });
  const [editing, setEditing] = useState({ field: null, index: null });
  const [tempValue, setTempValue] = useState('');
  const [openSkillModal, setOpenSkillModal] = useState(false);

  useEffect(() => {
    if (skillsStatus === 'idle') {
      dispatch(fetchSkills());
    }
  }, [skillsStatus, dispatch]);

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

  const handleSave = async () => {
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

    try {
      // Сохраняем изменения в бэкенд (mockapi)
      await axios.put('https://mockapi.io/your-endpoint/skills', updatedSkills);
      setEditing({ field: null, index: null });
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  };

  const addSkill = async () => {
    try {
      const response = await axios.post('https://mockapi.io/your-endpoint/skills', newSkill);
      // После успешного добавления обновите список
      dispatch(fetchSkills()); // Обновление списка навыков после добавления нового
      setNewSkill({ name: '', levels: [] });
      setOpenSkillModal(false);
    } catch (error) {
      console.error('Error adding new skill:', error);
    }
  };

  const addLevelToSkill = async (skillName) => {
    const skillToUpdate = skills.find((skill) => skill.name === skillName);
    if (skillToUpdate) {
      const newLevel = {
        level: skillToUpdate.levels.length + 1,
        description: '',
        task: '',
      };
      skillToUpdate.levels.push(newLevel);

      try {
        // Обновляем конкретный навык с новым уровнем в бэкенде (mockapi)
        await axios.put(`https://mockapi.io/your-endpoint/skills/${skillToUpdate.id}`, skillToUpdate);
        dispatch(fetchSkills()); // Обновление списка навыков после добавления уровня
        setNewLevel({ level: '', description: '', task: '' });
      } catch (error) {
        console.error('Error adding level to skill:', error);
      }
    }
  };

  return (
    <div className="game-profile">
      <SplitButton />
      <Profile />
      {/* Навыки */}
      <div className="game-profile__skills">
        {skills?.map((skill) => (
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
