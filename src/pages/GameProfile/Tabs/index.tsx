import React, { useEffect, useState } from 'react';

import styles from './Tabs.module.scss';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Tabs as MaterialTabs, Tab as MaterialTab } from '@mui/material';

import SkillList from './SkillList';
import TabContent from './TabContent';
import { a11yProps } from './utils';
import { Category } from '../../../redux/Category/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { addCategory, deleteCategory, editCategory, updateCategoryOrder } from '../../../redux/Category';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const Tabs = ({ handleLevelClick }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState<Category[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  //todo: добавление табов ( + редактирование навзания)
  //todo: добавить новое ствойство категории
  //todo: сделать перетаскивание табов между категориями

  useEffect(() => {
    if (user?.categories) {
      setTabs(user.categories);
    }
  }, [user?.categories]);

  const handleDeleteTab = async (id: string) => {
    const category = await dispatch(deleteCategory(id)).unwrap();

    setTabs(tabs.filter((tab) => tab.id !== category.id));
  };

  const handleEditTab = async (id: string) => {
    const newTab = {
      id,
      label: 'new name'
    };

    const category = await dispatch(editCategory(newTab)).unwrap();

    setTabs(tabs.map((tab) => (tab.id === id ? category : tab)));
  };

  const handleAddTab = async () => {
    const newTab = { label: `Новая категория ${tabs.length + 1}` };

    const tab = await dispatch(addCategory(newTab)).unwrap();

    setTabs([...tabs, tab]);
  };

  const onDragEnd = (result: DropResult<string>) => {
    if (!result.destination) return;

    const reorderedTabs = Array.from(tabs);
    const [movedTab] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, movedTab);

    dispatch(updateCategoryOrder(reorderedTabs));
  };

  return (
    <div className={styles.tabs}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillsDroppable">
          {(provided) => (
            <MaterialTabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              className={styles.tabsTop}
            >
              <MaterialTab key={'all'} label={'Все навыки'} {...a11yProps('all')} />
              {tabs.map((tab, index) => (
                // контекст клика сделать через функцию onContext а не оборачивать
                <MaterialTab
                  icon={
                    <div {...provided.dragHandleProps} className={styles.dragHandle}>
                      <DragIndicatorIcon />
                    </div>
                  }
                  iconPosition="start"
                  key={index}
                  label={tab.label}
                  {...a11yProps(index)}
                />
              ))}
              <IconButton onClick={handleAddTab}>
                <AddIcon />
              </IconButton>
            </MaterialTabs>
          )}
        </Droppable>
      </DragDropContext>

      <TabContent tab={tab} index={0}>
        <SkillList selectedTags={selectedTags} setSelectedTags={setSelectedTags} handleLevelClick={handleLevelClick} />
      </TabContent>
      <TabContent tab={tab} index={1}>
        Item Two
      </TabContent>
      <TabContent tab={tab} index={2}>
        Item Three
      </TabContent>
    </div>
  );
};

export default Tabs;
