import React from 'react';
import { IconButton, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ModalSkill.module.scss';

const SkillLevelModal = ({ selectedSkill, handleClose, handleSave, handleEdit }) => {
  const [tempValue, setTempValue] = React.useState('');

  React.useEffect(() => {
    if (selectedSkill && selectedSkill.levelData) {
      setTempValue(selectedSkill.levelData.description || '');
    }
  }, [selectedSkill]);

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'ArrowLeft') {
  //     handlePrevLevel();
  //   } else if (e.key === 'ArrowRight') {
  //     handleNextLevel();
  //   }
  // };

  return (
    <>
      {selectedSkill && selectedSkill.levelData && (
        <Modal open={!!selectedSkill} onClose={handleClose}>
          <div className={styles.modalBox}>
            <IconButton onClick={handleClose} className={styles.closeButton}>
              <CloseIcon />
            </IconButton>

            <h2 className={styles.title}>{selectedSkill.skill}</h2>
            <h3 className={styles.subtitle}>Уровень: {selectedSkill.levelData.level}</h3>
            <div className={styles.textBlock}>
              <strong>Описание:</strong>{' '}
              {selectedSkill.editingField === 'description' ? (
                <TextField value={tempValue} onChange={handleChange} onBlur={() => handleSave('description', tempValue)} autoFocus fullWidth />
              ) : (
                <>
                  {selectedSkill.levelData.description}
                  <IconButton size="small" onClick={() => handleEdit('description', selectedSkill)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>

            <div className={styles.textBlock}>
              <strong>Задача:</strong>{' '}
              {selectedSkill.editingField === 'task' ? (
                <TextField value={tempValue} onChange={handleChange} onBlur={() => handleSave('task', tempValue)} autoFocus fullWidth />
              ) : (
                <>
                  {selectedSkill.levelData.task}
                  <IconButton size="small" onClick={() => handleEdit('task', selectedSkill)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>

            <div className={styles.textBlock}>
              <strong>Полезные ресурсы:</strong>
              <ul className={styles.resourcesList}>
                {selectedSkill.levelData.resources &&
                  selectedSkill.levelData.resources.map((resource, index) => (
                    <li key={index}>
                      {selectedSkill.editingField === 'resources' && selectedSkill.editingIndex === index ? (
                        <TextField value={tempValue} onChange={handleChange} onBlur={() => handleSave('resources', tempValue, index)} autoFocus fullWidth />
                      ) : (
                        <>
                          <a href={resource} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                            {resource}
                          </a>
                          <IconButton size="small" onClick={() => handleEdit('resources', selectedSkill, index)}>
                            <EditIcon />
                          </IconButton>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SkillLevelModal;
