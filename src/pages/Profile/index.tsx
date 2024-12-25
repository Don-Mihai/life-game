import { Avatar, TextField } from '@mui/material';
// @ts-ignore
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';
import { IUser, UserFields } from '../../redux/User/types';
import { editUser, getById } from '../../redux/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';

const initialValues: Omit<IUser, 'id'> = {
  [UserFields.NAME]: '',
  [UserFields.EMAIL]: '',
  [UserFields.PASSWORD]: ''
};

const Profile = () => {
  const [formValues, setFormValues] = useState<IUser>(initialValues as IUser);
  const user = useSelector((store: RootState) => store.user.user);

  const dispatch = useDispatch<AppDispatch>();

  const debauncedFormValues = useDebounce(formValues, 1000);

  useEffect(() => {
    dispatch(getById());
  }, []);

  useEffect(() => {
    setFormValues(user as IUser);
  }, [user?.id]);

  useEffect(() => {
    if (debauncedFormValues?.id) dispatch(editUser(formValues));
  }, [debauncedFormValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const key = event.target.name;
    setFormValues({ ...formValues, [key]: value });
  };

  const clearInputs = () => {
    setFormValues(initialValues as IUser);
  };

  return (
    <div className={styles.profile}>
      <h1>Профиль</h1>
      <Avatar className={styles.avatar}></Avatar>
      <div className={styles.form}>
        <TextField onChange={handleChange} value={formValues[UserFields.NAME]} name={UserFields.NAME} label="Имя" fullWidth />
        <TextField onChange={handleChange} value={formValues[UserFields.EMAIL]} name={UserFields.EMAIL} label="Почта" fullWidth />
        <TextField onChange={handleChange} value={formValues[UserFields.PASSWORD]} name={UserFields.PASSWORD} label="Пароль" fullWidth />
        <button onClick={clearInputs}>очистить</button>
      </div>
    </div>
  );
};
export default Profile;
