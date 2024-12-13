import { Avatar, TextField } from '@mui/material';
// @ts-ignore
import styles from './Profile.module.scss';
import { useState } from 'react';

enum ProfileFields {
  NAME = 'fullName',
  EMAIL = 'email',
  PASSWORD = 'password'
}

interface ProfileI {
  [ProfileFields.NAME]: string;
  [ProfileFields.EMAIL]: string;
  [ProfileFields.PASSWORD]: string;
}

const initialValues: ProfileI = {
  [ProfileFields.NAME]: '',
  [ProfileFields.EMAIL]: '',
  [ProfileFields.PASSWORD]: ''
};

const Profile = () => {
  const [formValues, setFormValues] = useState<ProfileI>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const key = event.target.name;
    setFormValues({ ...formValues, [key]: value });
  };

  const clearInputs = () => {
    setFormValues(initialValues);
  };

  return (
    <div className={styles.profile}>
      <h1>Профиль</h1>
      <Avatar className={styles.avatar}></Avatar>
      <div className={styles.form}>
        <TextField onChange={handleChange} value={formValues[ProfileFields.NAME]} name={ProfileFields.NAME} label="Имя" fullWidth />
        <TextField onChange={handleChange} value={formValues[ProfileFields.EMAIL]} name={ProfileFields.EMAIL} label="Почта" fullWidth />
        <TextField onChange={handleChange} value={formValues[ProfileFields.PASSWORD]} name={ProfileFields.PASSWORD} label="Пароль" fullWidth />
        <button onClick={clearInputs}>очистить</button>
      </div>
    </div>
  );
};
export default Profile;
