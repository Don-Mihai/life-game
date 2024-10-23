import React, { useEffect, useState } from 'react';
import { Modal, Typography, IconButton, TextField, Button } from '@mui/material';
import './LifeStats.module.scss';
import Profile from '../../components/Profile/index.jsx';
import AddIcon from '@mui/icons-material/Add';
import SplitButton from '../../components/DropDownButton/index.jsx';
import Skill from './Skill';
import ModalSkill from './ModalSkill';
import { addSkill, fetchSkills, updateSkill } from '../../redux/Skill';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LifeStats.module.scss';

function GameProfile() {
  const dispatch = useDispatch();
  const { skills, status, error } = useSelector((state) => state.skill); // Обновлено для соответствия структуре state
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSkills());
    }
  }, [status, dispatch]);

  const handleLevelClick = (skill, levelData) => {
    setSelectedSkill({ skill, levelData });
  };

  const handleClose = () => {
    setSelectedSkill(null);
  };

  const handleNewSkillChange = (event) => {
    setNewSkillName(event.target.value);
  };

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return; // Проверка на пустое имя
    try {
      const newSkill = {
        name: newSkillName,
        levels: [],
      };
      await dispatch(addSkill(newSkill)).unwrap();
      setNewSkillName('');
      setOpenSkillModal(false);
    } catch (error) {
      console.error('Error adding new skill:', error);
    }
  };

  const handleEditSkill = async (skill, updatedLevel) => {
    console.log('Received skill:', skill);
    console.log('Received updatedLevel:', updatedLevel);

    if (!skill || !Array.isArray(skill.levels)) {
      console.error('skill or skill.levels is not defined or not an array');
      return;
    }

    const updatedSkill = {
      ...skill,
      levels: skill.levels.map((level) => (level.level === updatedLevel.level ? updatedLevel : level)),
    };

    try {
      await dispatch(updateSkill(updatedSkill)).unwrap();
      setSelectedSkill(null);
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.gameProfile}>
      <SplitButton />
      <Profile />
      {/* Навыки */}
      <div className={styles.skills}>
        {skills?.map((skill) => (
          <Skill key={skill.id} skill={skill} handleLevelClick={handleLevelClick} />
        ))}

        <IconButton onClick={() => setOpenSkillModal(true)}>
          <AddIcon />
        </IconButton>
      </div>

      {/* Модальное окно для добавления навыка */}
      <Modal open={openSkillModal} onClose={() => setOpenSkillModal(false)}>
        <div className={styles.modalBox}>
          <Typography variant="h6">Добавить новый навык</Typography>
          <TextField name="name" label="Имя навыка" value={newSkillName} onChange={handleNewSkillChange} fullWidth margin="normal" />
          <Button onClick={handleAddSkill} variant="contained" color="primary">
            Сохранить навык
          </Button>
        </div>
      </Modal>

      {/* Модальное окно для редактирования выбранного уровня */}
      {selectedSkill && <ModalSkill selectedSkill={selectedSkill} handleClose={handleClose} handleEdit={handleEditSkill} FocusOn />}
    </div>
  );
}

export default GameProfile;
