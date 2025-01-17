import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Modal,
  Typography,
  TextField,
  Button
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { Skill as SkillI } from '../../../../redux/Skill/types';
import Skill from '../Skill';
import styles from './SkillList.module.scss';
import { useState } from 'react';
import { addSkill, updateSkillsOrder } from '../../../../redux/Skill';

interface Props {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  handleLevelClick: (skill: SkillI, levelData: any, levelIndex: number) => void;
}

const SkillList = ({ selectedTags, setSelectedTags, handleLevelClick }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { skills } = useSelector((state: RootState) => state.skill);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

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
      await dispatch(addSkill({ name: newSkillName })).unwrap();
      setNewSkillName('');
      setOpenSkillModal(false);
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  console.log(skills);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <div className={styles.skillsList} {...provided.droppableProps} ref={provided.innerRef}>
              {skills.length === 0 ? (
                <h3>Добавьте навык</h3>
              ) : (
                skills.map((skill: SkillI, index: number) => (
                  <Draggable key={skill.id} draggableId={skill.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div className={`${styles.skillItem} ${snapshot.isDragging ? styles.dragging : ''}`} ref={provided.innerRef} {...provided.draggableProps}>
                        <Skill key={skill.id} skill={skill} user={user} handleLevelClick={handleLevelClick} dragHandleProps={provided.dragHandleProps} />
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
