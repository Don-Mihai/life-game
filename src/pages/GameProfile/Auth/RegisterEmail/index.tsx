// src/pages/RegisterEmail.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { registerEmail } from '@/redux/User'; // Ваш экшн для отправки email с подтверждением
import { PRegisterEmail } from '@/redux/User/types';
import { AppDispatch } from '@/redux/store';
import { INPUTS_KEYS } from '../types';

const initialValues: PRegisterEmail = { [INPUTS_KEYS.FIRST_NAME]: '', [INPUTS_KEYS.EMAIL]: '' };

const RegisterEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formValues, setFormValues] = useState<PRegisterEmail>(initialValues);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      await dispatch(registerEmail(formValues));
      setMessage('Письмо для подтверждения отправлено. Проверьте свою почту.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="register-email-form" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <TextField label="Имя" name="firstName" value={formValues.firstName} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Email" name="email" value={formValues.email} onChange={handleChange} fullWidth margin="normal" />
      <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
        Отправить подтверждение
      </Button>
    </div>
  );
};

export default RegisterEmail;
