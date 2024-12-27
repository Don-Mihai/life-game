import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Characteristics = () => {
  const characteristics = useSelector((state: RootState) => state);
  return <h2>Характеристики</h2>;
};

export default Characteristics;
