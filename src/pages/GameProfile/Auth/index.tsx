import { useState } from 'react';
import './Auth.scss';
import { AUTH_MODE } from './types';
import SubLink from './SubLink';
import RegisterEmail from './RegisterEmail';
import Login from './Login';

const Auth = () => {
  const [mode, setMode] = useState(AUTH_MODE.LOGIN);

  const onLoginLink = () => {
    setMode(AUTH_MODE.LOGIN);
  };

  const onRegLink = () => {
    setMode(AUTH_MODE.REGISTER);
  };
  return (
    <div className="auth">
      {mode === AUTH_MODE.REGISTER ? <RegisterEmail /> : <Login />}
      {mode === AUTH_MODE.REGISTER ? (
        <SubLink text="Уже есть аккаунт?" onClick={onLoginLink} linkText="Войти" />
      ) : (
        <SubLink text="Нет аккаунта?" onClick={onRegLink} linkText="Создать аккаунт" />
      )}
    </div>
  );
};

export default Auth;
