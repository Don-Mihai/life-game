import React, { useState } from 'react';

import styles from './Tabs.module.scss';
import AddIcon from '@mui/icons-material/Add';

import { IconButton, Tabs as MaterialTabs, Tab as MaterialTab } from '@mui/material';
import SkillList from './SkillList';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

function TabPanel(props: any) {
  const { children, tab, index, ...other } = props;

  return (
    <div
      style={{ width: '100%', borderTop: '1px solid #e0e0e0' }}
      role="tabpanel"
      hidden={tab !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {tab === index && <div>{children}</div>}
    </div>
  );
}

const Tabs = ({ handleLevelClick, setOpenSkillModal }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tab, setTab] = React.useState(0);
  const [tabs, setTabs] = useState([{ label: 'Все навыки' }, { label: 'Мои навыки' }]);

  const handleChangeTab = (_: any, newValue: number) => {
    setTab(newValue);
  };

  //todo: добавление табов ( + редактирование навзания)
  //todo: добавить новое ствойство категории
  //todo: сделать перетаскивание табов между категориями

  const handleAddTab = () => {
    const newTab = { label: `Новая категория ${tabs.length + 1}` };
    setTabs([...tabs, newTab]);
  };

  return (
    <div className={styles.tabs}>
      <MaterialTabs
        value={tab}
        onChange={handleChangeTab}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        className={styles.tabsTop}
      >
        {tabs.map((tab, index) => (
          // контекст клика сделать через функцию onContext а не оборачивать
          <MaterialTab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
        <IconButton onClick={handleAddTab}>
          <AddIcon />
        </IconButton>
      </MaterialTabs>

      <TabPanel tab={tab} index={0}>
        <SkillList selectedTags={selectedTags} setSelectedTags={setSelectedTags} setOpenSkillModal={setOpenSkillModal} handleLevelClick={handleLevelClick} />
      </TabPanel>
      <TabPanel tab={tab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel tab={tab} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Tabs;
