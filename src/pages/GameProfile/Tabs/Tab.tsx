import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Tab as MaterialTab, TextField } from '@mui/material';

import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';

import { Draggable } from '@hello-pangea/dnd';
import { a11yProps } from './utils';

import { deleteCategory, editCategory } from '../../../redux/Category';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { Category } from '../../../redux/Category/types';

import styles from './Tabs.module.scss';
import { useState } from 'react';

interface Props {
  tab: Category;
  index: number;
  setTabs: React.Dispatch<React.SetStateAction<Category[]>>;
  onChangeTab: (_: null, newValue: number) => void;
}

const Tab = ({ tab, index, setTabs, onChangeTab }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValue, setFormValue] = useState(tab.label);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(event.target.value);
  };

  const handleEditTab = async () => {
    if (formValue === tab.label) {
      setIsEditMode(false);
      return;
    }

    const newTab = {
      id: tab.id,
      label: formValue
    };

    const category = await dispatch(editCategory(newTab)).unwrap();

    setTabs((tabs: Category[]) => tabs.map((tab) => (tab.id === category.id ? category : tab)));

    setIsEditMode(false);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDeleteTab = async (id: string) => {
    const categories = await dispatch(deleteCategory(id)).unwrap();

    setTabs(categories);
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e?.preventDefault();
      handleEditTab();
    }
  };

  const changeTab = () => {
    onChangeTab(null, index);
  };

  return (
    <Draggable key={tab.id} draggableId={tab.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.tabItem} ${snapshot.isDragging ? styles.dragging : ''}`}
          onClick={changeTab}
        >
          <ContextMenuTrigger id={`tab-context-menu-${tab.id}`}>
            {isEditMode ? (
              <TextField variant="standard" value={formValue} onChange={handleChange} onBlur={handleEditTab} onKeyDown={handleEnterClick} />
            ) : (
              <MaterialTab className={styles.tabMaterial} icon={<DragIndicatorIcon />} iconPosition="start" label={tab.label} {...a11yProps(index)} />
            )}
          </ContextMenuTrigger>
          <ContextMenu id={`tab-context-menu-${tab.id}`}>
            <ContextMenuItem className={styles.tabContext} onClick={handleEditMode}>
              <EditIcon fontSize="small" style={{ marginRight: '8px' }} />
              Переименовать
            </ContextMenuItem>
            <ContextMenuItem className={styles.tabContext} onClick={() => handleDeleteTab(tab.id)}>
              <DeleteIcon fontSize="small" style={{ marginRight: '8px' }} />
              Удалить
            </ContextMenuItem>
          </ContextMenu>
        </div>
      )}
    </Draggable>
  );
};

export default Tab;
