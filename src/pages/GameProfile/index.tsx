import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Typography, TextField, Button } from '@mui/material';
import './LifeStats.module.scss';
import Profile from '../../components/Profile/index.jsx';
import ModalLevel from './ModalLevel';
import { addSkill, fetchSkills, updateSkill } from '../../redux/Skill';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LifeStats.module.scss';
import ChartBuilderModal from '../../components/ChartBuilderModal/index.jsx';
import { getById } from '../../redux/User';
import SkillsList from './SkillsList';
import BasicMenu from '../../components/MenuButton';
import { AppDispatch, RootState } from '../../redux/store';

const GameProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.skill);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('Бэкэнд'); // Фронтенд
  const [isBuilderEnabled, setBuilderEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(getById());
  }, []);

  const handleCloseBuilder = () => {
    setBuilderEnabled(false);
  };

  const handleLevelClick = useCallback((skill: any, levelData: any, levelIndex: number) => setSelectedLevel({ skill, levelData, levelIndex }), []);

  const handleCloseModal = () => setSelectedLevel(null);

  const handleSkillNameChange = (e: any) => setNewSkillName(e.target.value);

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    try {
      await dispatch(addSkill({ name: newSkillName })).unwrap();
      setNewSkillName('');
      setOpenSkillModal(false);
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const handleEditSkill = async (skill: any, updatedLevel: any) => {
    if (!skill?.levels) {
      console.error('Invalid skill data');
      return;
    }

    try {
      const updatedSkill = {
        ...skill,
        levels: skill.levels.map((level: any) => (level.level === updatedLevel.level ? updatedLevel : level))
      };
      await dispatch(updateSkill(updatedSkill)).unwrap();
      setSelectedLevel(null);
    } catch (err) {
      console.error('Error updating skill:', err);
    }
  };

  const changeLevel = (direction: number) => {
    if (!selectedLevel) return;

    const { skill, levelIndex } = selectedLevel;
    const newIndex = levelIndex + direction;

    if (newIndex < 0 || newIndex >= skill.levels.length) {
      return;
    }

    setSelectedLevel({
      skill,
      levelData: skill.levels[newIndex],
      levelIndex: newIndex
    });
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className={styles.gameProfile}>
      <ChartBuilderModal isOpen={isBuilderEnabled} onClose={handleCloseBuilder} />
      <div className={styles.menu}>
        <BasicMenu setBuilderEnabled={setBuilderEnabled} />
      </div>

      <Profile />

      {/* Используем новый компонент SkillsList */}
      <SkillsList handleLevelClick={handleLevelClick} setOpenSkillModal={setOpenSkillModal} />

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
      {selectedLevel && (
        <ModalLevel selectedLevel={selectedLevel} handleClose={handleCloseModal} handleEdit={handleEditSkill} handleChangeLevel={changeLevel} />
      )}
    </div>
  );
};

export default GameProfile;
