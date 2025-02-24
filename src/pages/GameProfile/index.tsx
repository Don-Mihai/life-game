import React, { useEffect, useState } from 'react';
import './LifeStats.module.scss';
import Profile from '@/components/Profile';
import { fetchSkills } from '../../redux/Skill';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LifeStats.module.scss';
import ChartBuilderModal from '../../components/ChartBuilderModal';
import { getById } from '../../redux/User';
import Tabs from './Tabs';
import BasicMenu from '../../components/MenuButton';
import { AppDispatch, RootState } from '../../redux/store';

const GameProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.skill);

  const [isBuilderEnabled, setBuilderEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(getById());
  }, []);

  const handleCloseBuilder = () => {
    setBuilderEnabled(false);
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className={styles.gameProfile}>
      <ChartBuilderModal isOpen={isBuilderEnabled} onClose={handleCloseBuilder} />
      <div className={styles.menu}>
        <BasicMenu setBuilderEnabled={setBuilderEnabled} />
      </div>

      <Profile />

      <Tabs />
    </div>
  );
};

export default GameProfile;
