import React, { useState } from 'react';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import { useDispatch } from 'react-redux';
import { updateSkill } from '../../../../../redux/Skill';
import EmojiPicker from 'emoji-picker-react';
import styles from './Level.module.scss';

const Level = React.memo(({ skill, levelData, i, handleLevelClick }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(levelData.icon || null); // Состояние для выбранной эмодзи
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Состояние для отображения эмодзи-пикера

  const dispatch = useDispatch();

  const handleEmojiClick = async (emoji, index) => {
    setSelectedEmoji(emoji.emoji);
    const updatedLevels = skill.levels.map((level, i) => (i === index ? { ...level, icon: emoji.emoji } : level));

    const updatedSkill = {
      ...skill,
      levels: updatedLevels
    };

    await dispatch(updateSkill(updatedSkill));
    setShowEmojiPicker(false); // Закрываем пикер после выбора эмодзи
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker); // Переключаем отображение пикера
  };

  const handleMarkAsCompleted = (index) => {
    const updatedLevels = skill.levels.map((level, i) => (i === index ? { ...level, completed: true } : level));

    const updatedSkill = {
      ...skill,
      levels: updatedLevels
    };

    dispatch(updateSkill(updatedSkill));
  };

  const handleDeleteLevel = (index) => {
    const updatedSkill = {
      ...skill,
      levels: skill.levels.filter((_, i) => i !== index)
    };

    dispatch(updateSkill(updatedSkill));
  };

  return (
    <React.Fragment key={i}>
      <ContextMenuTrigger id={`context-menu-${skill.name}-${i}`}>
        <Tooltip title={levelData.description && JSON.parse(levelData.description).blocks[0]?.data.text} placement="top" arrow>
          <div
            className={`${styles.level} ${levelData.completed ? styles.completed : ''} ${selectedEmoji ? styles.levelWithIcon : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              handleLevelClick(skill, levelData, i);
            }}
          >
            {/* Использование выбранной эмодзи */}
            {selectedEmoji ? selectedEmoji : i + 1}
          </div>
        </Tooltip>
      </ContextMenuTrigger>
      <ContextMenu id={`context-menu-${skill.name}-${i}`}>
        <ContextMenuItem onClick={() => handleDeleteLevel(i)}>Удалить</ContextMenuItem>
        <ContextMenuItem onClick={() => handleMarkAsCompleted(i)}>Уровень пройден</ContextMenuItem>
        <ContextMenuItem onClick={toggleEmojiPicker}>Выбрать иконку для уровня</ContextMenuItem>
      </ContextMenu>
      <Dialog open={showEmojiPicker} onClose={toggleEmojiPicker}>
        <DialogTitle>Выберите иконку для уровня</DialogTitle>
        <DialogContent>
          <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji, i)} /> {/* Компонент выбора эмодзи */}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleEmojiPicker} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
export default Level;
