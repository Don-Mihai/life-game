import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getCharacteristics, deleteCharacteristics } from '../../redux/Characteristic';
import styles from './Characteristics.module.scss';

import Characteristic from './Characteristic';

const Characteristics = () => {
  const characteristics = useSelector((state: RootState) => state.characteristic.characteristics);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCharacteristics());
  }, []);

  return (
    <div>
      <h2>Характеристики</h2>
      {characteristics.map((item) => (
        <Characteristic key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Characteristics;
