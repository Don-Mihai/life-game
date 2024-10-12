import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { INPUTS_KEYS } from '../types.ts';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../redux/store/User/index.ts';

const Login = ({ onChange, formValues }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignIn = async () => {
    const payload = { email: formValues.email, password: formValues.password };
    const user = (await dispatch(auth(payload))).payload;

    if (user?.id) {
      navigate('/game-profile');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="register-form">
      <h2 className="register-form__title">Вход</h2>
      <div className="register-form__inputs">
        <TextField onChange={onChange} value={formValues[INPUTS_KEYS.EMAIL]} label="Email" name="email" fullWidth />
        <TextField onChange={onChange} value={formValues[INPUTS_KEYS.PASSWORD]} label="Password" name="password" fullWidth />
        <Button onClick={onSignIn} variant="contained">
          Войти
        </Button>
      </div>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Не правильный пароль или почта
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
