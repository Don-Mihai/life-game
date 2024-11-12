import { useEffect, useState } from 'react';
import './Auth.scss';
import { AUTH_MODE, initValues } from './types.ts';
import SubLink from './SubLink';
import Register from './Register';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../../../redux/User/types.ts';
import { useSelector } from 'react-redux';

const Auth = () => {
  const [formValues, setFormValues] = useState(initValues);
  const [mode, setMode] = useState(AUTH_MODE.LOGIN);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onLoginLink = () => {
    setMode(AUTH_MODE.LOGIN);
  };

  const onRegLink = () => {
    setMode(AUTH_MODE.REGISTER);
  };
  return (
    <div className="auth">
      {mode === AUTH_MODE.REGISTER ? <Register formValues={formValues} onChange={onChange} /> : <Login formValues={formValues} onChange={onChange} />}
      {mode === AUTH_MODE.REGISTER ? (
        <SubLink text="Уже есть аккаунт?" onClick={onLoginLink} linkText="Войти" />
      ) : (
        <SubLink text="Нет аккаунта?" onClick={onRegLink} linkText="Создать аккаунт" />
      )}
    </div>
  );
};

export default Auth;
