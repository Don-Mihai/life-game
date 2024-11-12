import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INPUTS_KEYS } from '../types.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../../../redux/User/index.ts';

const Register = ({ onChange, formValues }) => {
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignUp = async () => {
    const payload = {
      firstName: formValues[INPUTS_KEYS.FIRST_NAME],
      email: formValues[INPUTS_KEYS.EMAIL],
      password: formValues[INPUTS_KEYS.PASSWORD]
    };
    const resultAction = await dispatch(register(payload));

    if (resultAction.meta?.requestStatus === 'fulfilled') {
      navigate('/');
    } else {
      setError('Registration failed');
    }
  };

  const handleFocus = () => {
    setError({});
  };

  return (
    <div className="register-form">
      <h2 className="register-form__title">Создать аккаунт</h2>
      <div className="register-form__inputs">
        <TextField
          onFocus={handleFocus}
          error={Boolean(error[INPUTS_KEYS.FIRST_NAME]?.length)}
          helperText={error[INPUTS_KEYS.FIRST_NAME]}
          onChange={onChange}
          value={formValues[INPUTS_KEYS.FIRST_NAME]}
          label="Name"
          name={INPUTS_KEYS.FIRST_NAME}
          fullWidth
        />
        <TextField
          onFocus={handleFocus}
          error={Boolean(error[INPUTS_KEYS.EMAIL]?.length)}
          helperText={error[INPUTS_KEYS.EMAIL]}
          onChange={onChange}
          value={formValues[INPUTS_KEYS.EMAIL]}
          label="Email"
          name={INPUTS_KEYS.EMAIL}
          fullWidth
        />
        <TextField
          onFocus={handleFocus}
          error={Boolean(error[INPUTS_KEYS.PASSWORD]?.length)}
          helperText={error[INPUTS_KEYS.PASSWORD]}
          onChange={onChange}
          value={formValues[INPUTS_KEYS.PASSWORD]}
          label="Password"
          name={INPUTS_KEYS.PASSWORD}
          fullWidth
        />
        <Button onClick={onSignUp} variant="contained">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default Register;
