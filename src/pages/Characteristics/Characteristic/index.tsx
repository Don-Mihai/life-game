import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import styles from './Characteristic.module.scss';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { deleteCharacteristics, editCharacteristics } from '../../../redux/Characteristic';
import { Characteristic as CharacteristicI } from '../../../redux/Characteristic/types';
import { useEffect, useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';

interface Props {
  item: CharacteristicI;
}

const Characteristic = ({ item }: Props) => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<CharacteristicI>(item);

  const dispatch = useDispatch<AppDispatch>();

  const deleteCharacteristic = (id: string) => {
    dispatch(deleteCharacteristics(id));
  };

  const handleEdit = () => {
    setFormValues(item);
    setIsEditingMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!isEqual(formValues, item)) dispatch(editCharacteristics(formValues));
    setIsEditingMode(false);
  };

  return (
    <div key={item.id} className={styles.characteristic}>
      {isEditingMode ? (
        <div className={styles.fields}>
          <TextField name="label" value={formValues.label} onChange={handleChange} className={styles.field} autoFocus variant="standard" />
          <div className={styles.dots}>:</div>
          <TextField name="value" value={formValues.value} onChange={handleChange} className={styles.field} autoFocus fullWidth variant="standard" />
        </div>
      ) : (
        <div>{item?.label + ': ' + item?.value}</div>
      )}

      <div className={styles.actions}>
        {isEditingMode ? (
          <IconButton size="small" onClick={handleSave} className="profile__edit-icon">
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={handleEdit} className="profile__edit-icon">
            <EditIcon />
          </IconButton>
        )}

        <IconButton size="small" onClick={() => deleteCharacteristic(item?.id)} className="profile__delete-icon">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Characteristic;
