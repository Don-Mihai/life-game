import { useCallback, useState } from 'react';
import ModalLevel from './ModalLevel';
import { updateSkill } from '../../../../../redux/Skill';
import { addLevel, deleteLevel, reorderLevel } from '../../../../../redux/Level';
import { AppDispatch } from '../../../../../redux/store';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Level from '../Level';
import styles from './Levels.module.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Level as LevelI } from '../../../../../redux/Level/types';
import { Skill } from '../../../../../redux/Skill/types';

interface Props {
  skill: Skill;
}

const Levels = ({ skill }: Props) => {
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [levels, setLevels] = useState(skill?.levels || []);

  const dispatch = useDispatch<AppDispatch>();

  const handleLevelClick = useCallback((skill: any, levelData: any, levelIndex: number) => setSelectedLevel({ skill, levelData, levelIndex }), []);

  const handleCloseModal = () => setSelectedLevel(null);

  const handleEditSkill = async (skill: any, updatedLevel: any) => {
    try {
      const updatedSkill = {
        ...skill,
        levels: levels.map((level: any) => (level.level === updatedLevel.level ? updatedLevel : level))
      };
      await dispatch(updateSkill(updatedSkill)).unwrap();
      setSelectedLevel(null);
    } catch (err) {
      console.error('Error updating skill:', err);
    }
  };

  const changeLevel = (direction: number) => {
    if (!selectedLevel) return;

    const { skill, levelIndex } = selectedLevel;
    const newIndex = levelIndex + direction;

    if (newIndex < 0 || newIndex >= levels.length) {
      return;
    }

    setSelectedLevel({
      skill,
      levelData: levels[newIndex],
      levelIndex: newIndex
    });
  };

  const handleAddLevel = async () => {
    const newLevel = {
      skillId: skill.id,
      parentId: levels.length ? levels[levels.length - 1].id : null
    };

    const addedLevel = await dispatch(addLevel(newLevel)).unwrap();
    setLevels([...levels, addedLevel]);
  };

  const handleDeleteLevel = async (level: LevelI) => {
    try {
      await dispatch(deleteLevel(level)).unwrap();
      setLevels(levels.filter((l: LevelI) => l.id !== level.id));
    } catch (err) {
      console.error('Error deleting level:', err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    // Если позиция не изменилась - ничего не делаем
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const reorderedLevels = Array.from(levels);
    const [movedLevel] = reorderedLevels.splice(result.source.index, 1);
    reorderedLevels.splice(result.destination.index, 0, movedLevel);

    // Оптимистичное обновление UI
    setLevels(reorderedLevels);

    try {
      await dispatch(
        reorderLevel({
          levelId: (movedLevel as any).id,
          newIndex: result.destination.index
        })
      );
    } catch (err) {
      // Откат изменений при ошибке
      setLevels(levels);
      console.error('Error reordering level:', err);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="levelsDroppable" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={styles.skillLevels}>
              {levels.map((level: any, index: number) => (
                <Draggable key={level.id} draggableId={level.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className={`${styles.levelItem} ${snapshot.isDragging ? styles.dragging : ''}`}>
                      <Level
                        key={index}
                        skill={skill}
                        levelData={level}
                        i={index}
                        handleLevelClick={handleLevelClick}
                        handleDeleteLevel={handleDeleteLevel}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddLevel();
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Модальное окно для редактирования выбранного уровня */}
      {selectedLevel && (
        <ModalLevel selectedLevel={selectedLevel} handleClose={handleCloseModal} handleEdit={handleEditSkill} handleChangeLevel={changeLevel} />
      )}
    </>
  );
};

export default Levels;
