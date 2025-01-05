import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getCharacteristics, deleteCharacteristics } from '../../redux/Characteristic';

const Characteristics = () => {
  const characteristics = useSelector((state: RootState) => state.characteristic.characteristics);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCharacteristics());
  }, []);

  const deleteCharacteristic = (id: string) => {
    dispatch(deleteCharacteristics(id));
  };

  return (
    <div>
      <h2>Характеристики</h2>
      {characteristics.map((item) => (
        <div key={item.id}>
          {item.label + ': ' + item.value} <button onClick={() => deleteCharacteristic(item.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
