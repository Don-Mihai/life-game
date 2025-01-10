import { TextField } from '@mui/material';
// @ts-ignore
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import useDebounce from './useDebounce';
import { UserFields } from '../../redux/User/types';
import { editUser, getById } from '../../redux/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Avatar, { genConfig } from 'react-nice-avatar';
import React from 'react';
import { useProfileForm } from './useProfileForm';

const Profile = () => {
  const user = useSelector((store: RootState) => store.user.user);

  const { formValues, handleChange, clearInputs } = useProfileForm(user);

  const config = genConfig(user?.email);

  const dispatch = useDispatch<AppDispatch>();

  const debauncedFormValues = useDebounce(formValues, 1000);

  useEffect(() => {
    dispatch(getById());
  }, []);

  useEffect(() => {
    if (debauncedFormValues?.id) dispatch(editUser(formValues));
  }, [debauncedFormValues]);

  return (
    <div className={styles.profile}>
      <h1>Профиль</h1>
      <Avatar className="profile__avatar-image" {...config} />
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
