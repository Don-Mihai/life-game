import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Modal, Typography, TextField, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { Skill as SkillI } from '../../../../redux/Skill/types';
import Skill from '../Skill';
import styles from './SkillList.module.scss';
import { useState } from 'react';
import { addSkill, updateSkillsOrder } from '../../../../redux/Skill';
import { Category } from '../../../../redux/Category/types';

interface Props {
  tab?: Category;
}

const SkillList = ({ tab }: Props) => {
  const { skills } = useSelector((state: RootState) => state.skill);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSkills = Array.from(skills);
    const [movedSkill] = reorderedSkills.splice(result.source.index, 1);
    reorderedSkills.splice(result.destination.index, 0, movedSkill);

    dispatch(updateSkillsOrder(reorderedSkills));
  };

  const handleSkillNameChange = (e: any) => setNewSkillName(e.target.value);

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    try {
      await dispatch(addSkill({ name: newSkillName, categories: tab ? [tab?.id] : undefined })).unwrap();
      setNewSkillName('');
      setOpenSkillModal(false);
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const filteredSkillsByCategories = tab ? skills.filter((skill: SkillI) => skill?.categories?.includes?.(tab.id)) : skills;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <div className={styles.skillsList} {...provided.droppableProps} ref={provided.innerRef}>
              {skills.length === 0 ? (
                <h3>Добавьте навык</h3>
              ) : (
                filteredSkillsByCategories.map((skill: SkillI, index: number) => (
                  <Draggable key={skill.id} draggableId={skill.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div className={`${styles.skillItem} ${snapshot.isDragging ? styles.dragging : ''}`} ref={provided.innerRef} {...provided.draggableProps}>
                        <Skill key={skill.id} skill={skill} dragHandleProps={provided.dragHandleProps} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <IconButton onClick={() => setOpenSkillModal(true)}>
        <AddIcon />
      </IconButton>

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
    </>
  );
};

export default SkillList;
