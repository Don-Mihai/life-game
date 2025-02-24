import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { initValues, INPUTS_KEYS } from '../types';
import { useDispatch } from 'react-redux';
import { auth } from '@/redux/User';
import { AppDispatch } from '@/redux/store';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<any>(initValues);

  const onChange = (event: any) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSignIn = async () => {
    const payload = { email: formValues[INPUTS_KEYS.EMAIL], password: formValues[INPUTS_KEYS.PASSWORD] };
    const user: any = (await dispatch(auth(payload))).payload;

    if (user?.id) {
      navigate('/');
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
