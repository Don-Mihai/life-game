import React, { useState } from 'react';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import { useDispatch } from 'react-redux';
import { updateSkill } from '../../../../../redux/Skill';
import { deleteLevel, updateLevel } from '../../../../../redux/Level';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import styles from './Level.module.scss';
import { Skill } from '../../../../../redux/Skill/types';
import { Level as LevelI } from '../../../../../redux/Level/types';
import { AppDispatch } from '../../../../../redux/store';

interface Props {
  skill: Skill;
  levelData: LevelI;
  i: number;
  handleLevelClick: (skill: Skill, level: LevelI, i: number) => void;
  handleDeleteLevel: (level: LevelI) => void;
  dragHandleProps: any;
}

const Level = React.memo(({ skill, levelData, i, handleLevelClick, handleDeleteLevel, dragHandleProps }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(levelData.icon || null); // Состояние для выбранной эмодзи
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Состояние для отображения эмодзи-пикера
  const [level, setLevel] = useState(levelData);

  const dispatch = useDispatch<AppDispatch>();

  const handleEmojiClick = async (emoji: EmojiClickData, index: number) => {
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

  const handleMarkAsCompleted = async (levelData: LevelI) => {
    const newLevel: LevelI = {
      ...levelData,
      skillId: skill.id,
      completed: !levelData?.completed
    };

    const res = await dispatch(updateLevel(newLevel)).unwrap();

    setLevel(res);
  };

  return (
    <React.Fragment key={i}>
      <ContextMenuTrigger id={`context-menu-${skill.name}-${i}`}>
        <Tooltip title={level.description && JSON.parse(level.description).blocks[0]?.data.text} placement="top" arrow>
          <div
            className={`${styles.level} ${styles.dragHandle} ${level.completed ? styles.completed : ''} ${selectedEmoji ? styles.levelWithIcon : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              handleLevelClick(skill, level, i);
            }}
            {...dragHandleProps}
          >
            {/* Использование выбранной эмодзи */}
            {selectedEmoji ? selectedEmoji : i + 1}
          </div>
        </Tooltip>
      </ContextMenuTrigger>
      <ContextMenu id={`context-menu-${skill.name}-${i}`}>
        <ContextMenuItem onClick={() => handleDeleteLevel(level)}>Удалить</ContextMenuItem>
        <ContextMenuItem onClick={() => handleMarkAsCompleted(level)}>Уровень пройден</ContextMenuItem>
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

Level.displayName = 'Level';

export default Level;
