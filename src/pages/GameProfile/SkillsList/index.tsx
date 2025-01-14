import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { updateSkillsOrder } from '../../../redux/Skill';
import { Skill as SkillI } from '../../../redux/Skill/types';
import Skill from './Skill';
import styles from './SkillsList.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, FormControl, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { RootState } from '../../../redux/store';

const SkillsList = ({ handleLevelClick, setOpenSkillModal }: any) => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state: RootState) => state.skill);
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const filteredSkills = skills.filter((skill: SkillI) => {
    const tags = skill?.tags?.map?.((tag) => tag.title);
    return selectedTags.length === 0 || selectedTags.some((tag) => tags?.includes(tag));
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSkills = Array.from(skills);
    const [movedSkill] = reorderedSkills.splice(result.source.index, 1);
    reorderedSkills.splice(result.destination.index, 0, movedSkill);

    // @ts-ignore
    dispatch(updateSkillsOrder(reorderedSkills));
  };

  console.log(skills);

  return (
    <div className={styles.skills}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Теги</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {user?.tags?.map?.((tag) => (
            <MenuItem key={tag.title} value={tag.title}>
              <Checkbox checked={selectedTags.includes(tag.title)} />
              <ListItemText primary={tag.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <div className={styles.skillsList} {...provided.droppableProps} ref={provided.innerRef}>
              {skills.length === 0 ? (
                <h3>Добавьте навык</h3>
              ) : (
                filteredSkills.map((skill: any, index: number) => (
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
