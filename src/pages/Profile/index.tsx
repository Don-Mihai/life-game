import { Avatar, TextField } from '@mui/material';
// @ts-ignore
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';

enum ProfileFields {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password'
}

interface ProfileI {
  id: string;
  [ProfileFields.NAME]: string;
  [ProfileFields.EMAIL]: string;
  [ProfileFields.PASSWORD]: string;
}

const initialValues: Omit<ProfileI, 'id'> = {
  [ProfileFields.NAME]: '',
  [ProfileFields.EMAIL]: '',
  [ProfileFields.PASSWORD]: ''
};

const PROFILE_URL = 'https://6762f51117ec5852cae7acd4.mockapi.io/users/1';

const Profile = () => {
  const [formValues, setFormValues] = useState<ProfileI>(initialValues as ProfileI);

  const editUser = () => {
    axios.put(PROFILE_URL, formValues);
  };

  const debauncedFormValues = useDebounce(formValues, 1000);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (debauncedFormValues?.id) editUser();
  }, [debauncedFormValues]);

  const getUser = async () => {
    const user: ProfileI = (await axios.get(PROFILE_URL)).data;
    setFormValues(user);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const key = event.target.name;
    setFormValues({ ...formValues, [key]: value });
  };

  const clearInputs = () => {
    setFormValues(initialValues as ProfileI);
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
