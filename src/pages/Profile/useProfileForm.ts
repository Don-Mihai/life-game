import { useEffect, useState } from 'react';
import { IUser, UserFields } from '../../redux/User/types';

const initialValues: Partial<IUser> = {
  [UserFields.NAME]: '',
  [UserFields.EMAIL]: '',
  [UserFields.PASSWORD]: ''
};

export const useProfileForm = (user: IUser | null) => {
  const [formValues, setFormValues] = useState<IUser>(initialValues as IUser);

  useEffect(() => {
    setFormValues(user as IUser);
  }, [user?.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const key = event.target.name;
    setFormValues({ ...formValues, [key]: value });
  };

  const clearInputs = () => {
    setFormValues(initialValues as IUser);
  };

  return { formValues, handleChange, clearInputs };
};
