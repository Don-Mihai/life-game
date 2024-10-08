import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ onChange, formValues }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSignIn = async () => {
    //     // const user = await authenticate(formValues.email, formValues.password);
    //     // if (user?.id) {
    //     //   navigate('/game-profile');
    //     // } else {
    //     //   setOpen(true);
    //     // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="register-form">
      <h2 className="register-form__title">Вход</h2>
      <div className="register-form__inputs">
        <TextField onChange={onChange} value={formValues.email} label="Email" name="email" fullWidth />
        <TextField onChange={onChange} value={formValues.password} label="Password" name="password" fullWidth />
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
