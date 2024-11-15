import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ModalLevel.module.scss';
import EditorJS from '@editorjs/editorjs';
import { updateSkillLevel } from '../../../redux/Skill';
import { useDispatch } from 'react-redux';

import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';

const SkillLevelModal = ({ selectedLevel, handleClose, handleChangeLevel }) => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);
  console.log('selectedLevel', selectedLevel);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLevel && selectedLevel.levelData) {
      // Инициализация Editor.js
      const editor = new EditorJS({
        holder: 'editorjs',
        data: selectedLevel.levelData.description ? JSON.parse(selectedLevel.levelData.description) : {},
        tools: {
          header: Header,
          embed: Embed,
          raw: Raw,
          simpleImage: SimpleImage,
          checklist: Checklist,
          list: List,
          quote: Quote
        },
        autofocus: true,
        onChange: async () => {
          const savedData = await editor.save();

          dispatch(
            updateSkillLevel({
              skillId: selectedLevel.skill.id, // ID навыка
              levelIndex: selectedLevel.levelIndex, // Индекс уровня
              updatedLevelData: { description: JSON.stringify(savedData) } // Новые данные уровня
            })
          );
        }
      });
      setEditorInstance(editor);
    }
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
        setEditorInstance(null);
      }
    };
  }, [selectedLevel]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleChangeLevel(-1);
      } else if (e.key === 'ArrowRight') {
        handleChangeLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleChangeLevel]);

  return (
    <>
      {selectedLevel && selectedLevel.levelData && (
        <Modal open={!!selectedLevel} onClose={handleClose}>
          <div className={styles.modalBox}>
            <IconButton onClick={handleClose} className={styles.closeButton}>
              <CloseIcon />
            </IconButton>

            <h2 className={styles.title}>{selectedLevel.skill.name}</h2>
            <h3 className={styles.subtitle}>Уровень: {selectedLevel.levelIndex + 1}</h3>
            <div className={styles.editorContainer}>
              <div id="editorjs" style={{ height: '100%', width: '100%' }}></div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SkillLevelModal;
