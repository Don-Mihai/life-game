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
import ChartBuilder from '../../components/ChartBuilder/index.jsx';
import { getById } from '../../redux/User';

function GameProfile() {
  const dispatch = useDispatch();
  const { skills, status } = useSelector((state) => state.skill);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [isBuilderEnabled, setBuilderEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(getById());
  }, [dispatch]);

  const toggleBuilder = () => setBuilderEnabled((prev) => !prev);

  const handleLevelClick = (skill, levelData, levelIndex) => setSelectedSkill({ skill, levelData, levelIndex });

  const handleCloseModal = () => setSelectedSkill(null);

  const handleSkillNameChange = (e) => setNewSkillName(e.target.value);

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    try {
      await dispatch(addSkill({ name: newSkillName, levels: [] })).unwrap();
      setNewSkillName('');
      setOpenSkillModal(false);
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const handleEditSkill = async (skill, updatedLevel) => {
    if (!skill?.levels) {
      console.error('Invalid skill data');
      return;
    }

    try {
      const updatedSkill = {
        ...skill,
        levels: skill.levels.map((level) => (level.level === updatedLevel.level ? updatedLevel : level))
      };
      await dispatch(updateSkill(updatedSkill)).unwrap();
      setSelectedSkill(null);
    } catch (err) {
      console.error('Error updating skill:', err);
    }
  };

  const changeLevel = (direction) => {
    if (!selectedSkill) return;

    const { skill, levelIndex } = selectedSkill;
    const newIndex = levelIndex + direction;

    if (newIndex < 0 || newIndex >= skill.levels.length) {
      console.log(`Вы уже на ${newIndex < 0 ? 'первом' : 'последнем'} уровне.`);
      return;
    }

    setSelectedSkill({
      skill,
      levelData: skill.levels[newIndex],
      levelIndex: newIndex
    });
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className={styles.gameProfile}>
      <SplitButton />
      <Profile />
      {isBuilderEnabled && <ChartBuilder />}
      <button className={styles.builder} onClick={toggleBuilder}>
        Построить график
      </button>
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
          <TextField name="name" label="Имя навыка" value={newSkillName} onChange={handleSkillNameChange} fullWidth margin="normal" />
          <Button onClick={handleAddSkill} variant="contained" color="primary">
            Сохранить навык
          </Button>
        </div>
      </Modal>

      {/* Модальное окно для редактирования выбранного уровня */}
      {selectedSkill && (
        <ModalSkill selectedSkill={selectedSkill} handleClose={handleCloseModal} handleEdit={handleEditSkill} handleChangeLevel={changeLevel} />
      )}
    </div>
  );
}

export default GameProfile;
