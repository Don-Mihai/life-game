import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './ModalLevel.module.scss';

import { updateLevel } from '../../../../../../redux/Level';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../redux/store';
import { useSelector } from 'react-redux';

import EditorJS, { BlockToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import LinkTool from '@editorjs/link';

import { processCodeBlocks, attachClickHandler } from '../../../../../../utils';

const SkillLevelModal = ({ selectedLevel, handleClose, handleChangeLevel }: any) => {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedLevel && selectedLevel.levelData) {
      // Уничтожаем предыдущий редактор, если он существует
      if (editorInstance) {
        editorInstance?.destroy?.();
        setEditorInstance(null);
      }

      // Инициализация Editor.js
      const editor = new EditorJS({
        holder: `editorjs-${selectedLevel.levelIndex}`,
        data: selectedLevel.levelData.description ? JSON.parse(selectedLevel.levelData.description) : {},
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            inlineToolbar: true // Включить inline-toolbar для удобства
          },
          // @ts-ignore
          embed: Embed,
          raw: Raw,
          simpleImage: SimpleImage,
          checklist: Checklist,
          list: {
            class: List as unknown as BlockToolConstructable,
            inlineToolbar: ['link']
          },
          quote: Quote,
          linkTool: {
            class: LinkTool as unknown as BlockToolConstructable,
            config: {
              endpoint: ''
            }
          },
          code: CodeTool
        },
        autofocus: true,
        onReady: () => {
          setEditorInstance(editor); // Устанавливаем редактор как готовый
          attachClickHandler(editor, selectedLevel); // Привязываем обработчик кликов
        },
        onChange: async () => {
          const savedData = await editor.save();

          // Обработка текста и поиск ссылок
          const finalDescription = processCodeBlocks(savedData);

          dispatch(
            updateLevel({
              skillId: selectedLevel.skill.id,
              id: selectedLevel.levelData.id,
              description: JSON.stringify(finalDescription) // Новые данные уровня
            })
          );
        }
      });
    }
    return () => {
      if (editorInstance) {
        editorInstance?.destroy?.();
        setEditorInstance(null);
      }
    };
  }, [selectedLevel]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
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
            <div className={styles.navigationButtons}>
              <IconButton onClick={() => handleChangeLevel(-1)} disabled={selectedLevel.levelIndex === 0} className={styles.arrowButton}>
                <ArrowBackIcon />
              </IconButton>

              <div>
                <h3 className={styles.subtitle}>Уровень: {selectedLevel.levelIndex + 1}</h3>
              </div>

              <IconButton
                onClick={() => handleChangeLevel(+1)}
                disabled={selectedLevel.levelIndex === selectedLevel.skill.levels.length - 1}
                className={styles.arrowButton}
              >
                <ArrowForwardIcon />
              </IconButton>
            </div>

            <div className={styles.editorContainer}>
              <div id={`editorjs-${selectedLevel.levelIndex}`} style={{ height: '100%', width: '100%' }}></div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SkillLevelModal;
