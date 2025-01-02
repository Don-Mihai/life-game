import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { updateSkillsOrder } from '../../../redux/Skill';
import Skill from '../Skill';
import styles from './SkillsList.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { RootState } from '../../../redux/store';

const SkillsList = ({ handleLevelClick, setOpenSkillModal }: any) => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state: RootState) => state.skill);
  const { user } = useSelector((state: RootState) => state.user);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSkills = Array.from(skills);
    const [movedSkill] = reorderedSkills.splice(result.source.index, 1);
    reorderedSkills.splice(result.destination.index, 0, movedSkill);

    // @ts-ignore
    dispatch(updateSkillsOrder(reorderedSkills));
  };

  return (
    <div className={styles.skills}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <div className={styles.skillsList} {...provided.droppableProps} ref={provided.innerRef}>
              {skills.length === 0 ? (
                <h3>Добавьте навык</h3>
              ) : (
                skills.map((skill: any, index) => (
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
    </div>
  );
};

export default SkillsList;
