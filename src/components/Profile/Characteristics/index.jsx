import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../../redux/User';

const Characteristics = () => {
  const { user } = useSelector((state) => state.user);
  const [editingField, setEditingField] = useState(null);
  const [characteristics, setCharacteristics] = useState([]);

  const [newCharacteristic, setNewCharacteristic] = useState({ label: '', value: '' });
  const [showNewCharacteristicInputs, setShowNewCharacteristicInputs] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCharacteristics(user.characteristics || []);
  }, [user]);
  console.log(user);
  const handleEditField = (label) => {
    setEditingField(label);
  };

  const handleChangeValue = (event, label) => {
    const newValue = event.target.value;
    setCharacteristics((prevCharacteristics) =>
      prevCharacteristics.map((char) =>
        char.label === label
          ? {
              ...char,
              value: newValue
            }
          : char
      )
    );
  };

  const saveChanges = async () => {
    await dispatch(editUser({ characteristics }));
    setEditingField(null);
  };

  const renderTextField = (fieldName, value) => (
    <TextField
      name={fieldName}
      value={value}
      onChange={(e) => handleChangeValue(e, fieldName)}
      onBlur={saveChanges}
      autoFocus
      fullWidth
      variant="standard"
      InputProps={{
        disableUnderline: true,
        style: {
          fontSize: '20px',
          fontWeight: 500,
          color: '#333',
          marginLeft: '6px'
        }
      }}
    />
  );

  const handleAddCharacteristic = async () => {
    const payload = [...characteristics, newCharacteristic];
    if (newCharacteristic.label && newCharacteristic.value) {
      setCharacteristics(payload);
      await dispatch(editUser({ characteristics: payload }));
      setNewCharacteristic({ label: '', value: '' });
      setShowNewCharacteristicInputs(false);
    }
  };

  const handleDeleteCharacteristic = (label) => {
    setCharacteristics(characteristics.filter((char) => char.label !== label));
  };
  return (
    <>
      {characteristics.map(({ label, value }) => (
        <div key={label} className="profile__item">
          {label}:{' '}
          {editingField === label ? (
            renderTextField(label, value)
          ) : (
            <>
              {value}
              <div>
                <IconButton size="small" onClick={() => handleEditField(label)} className="profile__edit-icon">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteCharacteristic(label)} className="profile__delete-icon">
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="profile__add-characteristic">
        {showNewCharacteristicInputs ? (
          <>
            <TextField
              label="Характеристика"
              value={newCharacteristic.label}
              onChange={(e) => setNewCharacteristic({ ...newCharacteristic, label: e.target.value })}
              variant="standard"
              margin="none"
            />
            <TextField
              label="Значение"
              value={newCharacteristic.value}
              onChange={(e) => setNewCharacteristic({ ...newCharacteristic, value: e.target.value })}
              variant="standard"
              margin="none"
            />
            <IconButton onClick={handleAddCharacteristic}>
              <CheckIcon />
            </IconButton>
          </>
        ) : (
          // todo: добавление характеритсик пока уберу, потом подумать нужны ли они
          // <IconButton onClick={() => setShowNewCharacteristicInputs(true)}>
          //   <AddIcon />
          // </IconButton>
          <></>
        )}
      </div>
    </>
  );
};

export default Characteristics;
