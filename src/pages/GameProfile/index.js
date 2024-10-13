import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import './LifeStats.scss';
import { skills as initialSkills } from '../../utils.ts';
import CloseIcon from '@mui/icons-material/Close';
import Profile from '../../components/Profile/index.jsx';
import AddIcon from '@mui/icons-material/Add';

function GameProfile() {
  const [skills, setSkills] = useState(initialSkills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', levels: [] });
  const [newLevel, setNewLevel] = useState({ level: '', description: '', task: '' });

  const [openSkillModal, setOpenSkillModal] = useState(false); // Добавлено состояние для модального окна

  const handleLevelClick = (skill, levelData) => {
    setSelectedSkill({ skill, levelData });
  };

  const handleClose = () => {
    setSelectedSkill(null);
  };

  const handleNewSkillChange = (event) => {
    const { name, value } = event.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleNewLevelChange = (event) => {
    const { name, value } = event.target;
    setNewLevel({ ...newLevel, [name]: value });
  };

  const addSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: '', levels: [] });
    setOpenSkillModal(false); // Закрыть модальное окно после добавления
  };

  const addLevelToSkill = (skillName) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.name === skillName) {
        return { ...skill, levels: [...skill.levels, newLevel] };
      }
      return skill;
    });
    setSkills(updatedSkills);
    setNewLevel({ level: '', description: '', task: '' });
  };

  return (
    <div className="game-profile">
      <Profile />

      {/* Навыки */}
      <div className="game-profile__skills">
        {skills.map((skill) => (
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
        ))}

        <IconButton onClick={() => setOpenSkillModal(true)}>
          <AddIcon />
        </IconButton>
      </div>

      {/* Модальное окно для добавления навыка и уровня */}
      <Modal open={openSkillModal} onClose={() => setOpenSkillModal(false)}>
        <Box className="game-profile__modal-box">
          <Typography variant="h6">Добавить новый навык</Typography>
          <TextField name="name" label="Имя навыка" value={newSkill.name} onChange={handleNewSkillChange} />
          <Button onClick={addSkill}>Сохранить навык</Button>
          <Typography variant="h6">Добавить уровень к навыку</Typography>
          <TextField name="level" label="Уровень" value={newLevel.level} onChange={handleNewLevelChange} />
          <IconButton onClick={() => addLevelToSkill(newSkill.name)}>
            <AddIcon />
          </IconButton>
        </Box>
      </Modal>

      {/* Модальное окно для выбранного уровня навыка */}
      {selectedSkill && (
        <Modal open={!!selectedSkill} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '450px',
              bgcolor: 'rgba(255, 255, 255, 0.9)', // Белый полупрозрачный фон
              borderRadius: '20px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Гладкие тени
              backdropFilter: 'blur(10px)', // Эффект размытия, как у Apple
              p: 4,
              textAlign: 'center',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#333', // Тонкая и аккуратная кнопка
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"SF Pro Display", sans-serif',
                color: '#1d1d1f', // Тёмный, насыщенный цвет текста
                mb: 2,
                fontWeight: 600,
              }}
            >
              {selectedSkill.skill}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: '18px',
                fontFamily: '"SF Pro Text", sans-serif',
                color: '#6e6e73', // Светлый серый, как у Apple
                mb: 2,
              }}
            >
              Уровень: {selectedSkill.levelData.level}
            </Typography>

            {/* Описание задачи */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"SF Pro Text", sans-serif',
                color: '#1d1d1f',
                mb: 2,
              }}
            >
              <strong>Задача:</strong> {selectedSkill.levelData.task}
            </Typography>

            {/* Ресурсы */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"SF Pro Text", sans-serif',
                color: '#1d1d1f',
                mb: 2,
              }}
            >
              <strong>Полезные ресурсы:</strong>
            </Typography>

            <Box component="ul" sx={{ textAlign: 'left', pl: '24px', color: '#6e6e73' }}>
              {selectedSkill?.levelData?.resources?.map((resource, index) => (
                <li key={index}>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#007aff' }}>
                    {resource}
                  </a>
                </li>
              ))}
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default GameProfile;
