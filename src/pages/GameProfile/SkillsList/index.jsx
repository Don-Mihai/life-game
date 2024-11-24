import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { reorderSkills } from '../../../redux/Skill';
import Skill from '../Skill';
import styles from './SkillsList.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const SkillsList = ({ handleLevelClick, setOpenSkillModal }) => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skill);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSkills = Array.from(skills);
    const [movedSkill] = reorderedSkills.splice(result.source.index, 1);
    reorderedSkills.splice(result.destination.index, 0, movedSkill);

    dispatch(reorderSkills(reorderedSkills));
  };

  return (
    <div className={styles.skills}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <div className={styles.skillsList} {...provided.droppableProps} ref={provided.innerRef}>
              {skills.map((skill, index) => (
                <Draggable key={skill.id} draggableId={skill.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div className={`${styles.skillItem} ${snapshot.isDragging ? styles.dragging : ''}`} ref={provided.innerRef} {...provided.draggableProps}>
                      <Skill key={skill.id} skill={skill} handleLevelClick={handleLevelClick} dragHandleProps={provided.dragHandleProps} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <IconButton onClick={() => setOpenSkillModal(true)}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default SkillsList;
