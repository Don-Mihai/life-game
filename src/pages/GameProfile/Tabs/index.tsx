import React, { useEffect, useState } from 'react';

import styles from './Tabs.module.scss';
import AddIcon from '@mui/icons-material/Add';

import { IconButton, Tabs as MaterialTabs, Tab as MaterialTab } from '@mui/material';

import SkillList from './SkillList';
import TabContent from './TabContent';
import { a11yProps } from './utils';
import { Category } from '../../../redux/Category/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { addCategory, updateCategoryOrder } from '../../../redux/Category';

import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import Tab from './Tab';

const Tabs = ({ handleLevelClick }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState<Category[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeTab = (_: React.SyntheticEvent | null, newValue: number) => {
    setTabIndex(newValue);
  };

  //todo: добавить новое ствойство категории (на бэк осталось)
  //todo: сделать перетаскивание навыков между категориями

  useEffect(() => {
    if (user?.categories) {
      setTabs(user.categories);
    }
  }, [user?.categories]);

  const handleAddTab = async () => {
    const newTab = { label: `Новая категория ${tabs.length + 1}` };

    const tab = await dispatch(addCategory(newTab)).unwrap();

    setTabs([...tabs, tab]);
  };

  const onDragEnd = (result: DropResult<string>) => {
    if (!result.destination) return;

    const reorderedTabs = Array.from(tabs);
    console.log(reorderedTabs);

    const [movedTab] = reorderedTabs.splice(result.source.index - 1, 1);
    reorderedTabs.splice(result.destination.index - 1, 0, movedTab);

    console.log(reorderedTabs, movedTab, result.source.index, result.destination.index);

    dispatch(updateCategoryOrder(reorderedTabs));

    setTabs(reorderedTabs);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsTop}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabsDroppable" direction="horizontal">
            {(provided) => (
              <div className={styles.tabsContainer}>
                <MaterialTabs {...provided.droppableProps} ref={provided.innerRef} value={tabIndex} onChange={handleChangeTab} className={styles.tabsList}>
                  <Draggable key={'all'} draggableId={'all'} index={0}>
                    {(provided) => (
                      <MaterialTab
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.tabMaterial}
                        onClick={() => handleChangeTab(null, 0)}
                        key={'all'}
                        label={'Все навыки'}
                        {...a11yProps('all')}
                      />
                    )}
                  </Draggable>

                  {tabs.map((tab, index) => (
                    <Tab onChangeTab={handleChangeTab} tab={tab} index={index + 1} setTabs={setTabs} key={tab.id} />
                  ))}
                  {provided.placeholder}
                </MaterialTabs>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <IconButton className={styles.addTabButton} onClick={handleAddTab}>
          <AddIcon />
        </IconButton>
      </div>

      <TabContent tab={tabIndex} index={0}>
        <SkillList selectedTags={selectedTags} setSelectedTags={setSelectedTags} handleLevelClick={handleLevelClick} />
      </TabContent>
      {tabs.map((tab, index) => (
        <TabContent tab={tabIndex} index={index + 1} key={tab.id}>
          <SkillList tab={tab} selectedTags={selectedTags} setSelectedTags={setSelectedTags} handleLevelClick={handleLevelClick} />
        </TabContent>
      ))}
    </div>
  );
};

export default Tabs;
