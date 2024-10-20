import React from 'react';
import { IconButton, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ModalSkill.module.scss';

const SkillLevelModal = ({ selectedSkill, handleClose, setTempValue, handleSave, editing, tempValue, handleEdit }) => {
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
              {editing.field === 'description' ? (
                <TextField value={tempValue} onChange={(e) => setTempValue(e.target.value)} onBlur={handleSave} autoFocus fullWidth />
              ) : (
                <>
                  {selectedSkill.levelData.description}
                  <IconButton size="small" onClick={() => handleEdit('description')} className={styles.editIcon}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>

            <div className={styles.textBlock}>
              <strong>Задача:</strong>{' '}
              {editing.field === 'task' ? (
                <TextField value={tempValue} onChange={(e) => setTempValue(e.target.value)} onBlur={handleSave} autoFocus fullWidth />
              ) : (
                <>
                  {selectedSkill.levelData.task}
                  <IconButton size="small" onClick={() => handleEdit('task')} className={styles.editIcon}>
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
                      {editing.field === 'resources' && editing.index === index ? (
                        <TextField value={tempValue} onChange={(e) => setTempValue(e.target.value)} onBlur={handleSave} autoFocus fullWidth />
                      ) : (
                        <>
                          <a href={resource} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                            {resource}
                          </a>
                          <IconButton size="small" onClick={() => handleEdit('resources', index)} className={styles.editIcon}>
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
