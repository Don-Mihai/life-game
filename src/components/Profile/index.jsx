import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import './Profile.scss';

const Profile = () => {
  const [editingField, setEditingField] = useState(null);
  const [characteristics, setCharacteristics] = useState([
    { label: 'Имя', value: 'Иван Иванов' },
    { label: 'Возраст', value: 28 },
    { label: 'Профессия', value: 'Программист' },
  ]);

  const [newCharacteristic, setNewCharacteristic] = useState({ label: '', value: '' });
  const [showNewCharacteristicInputs, setShowNewCharacteristicInputs] = useState(false);

  const handleEditField = (label) => {
    setEditingField(label);
  };

  const handleChangeValue = (event, label) => {
    const newValue = event.target.value;
    setCharacteristics((prevCharacteristics) => prevCharacteristics.map((char) => (char.label === label ? { ...char, value: newValue } : char)));
  };

  const saveChanges = () => {
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
          marginLeft: '6px',
        },
      }}
    />
  );

  const handleAddCharacteristic = () => {
    if (newCharacteristic.label && newCharacteristic.value) {
      setCharacteristics([...characteristics, newCharacteristic]);
      setNewCharacteristic({ label: '', value: '' });
      setShowNewCharacteristicInputs(false);
    }
  };

  const handleDeleteCharacteristic = (label) => {
    setCharacteristics(characteristics.filter((char) => char.label !== label));
  };

  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src="https://i.gifer.com/origin/db/db773ee4aa154ea4f2cab588cff0ef9f_w200.gif" alt="User Avatar" className="profile__avatar-image" />
      </div>
      <div className="profile__info">
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
            <IconButton onClick={() => setShowNewCharacteristicInputs(true)}>
              <AddIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
