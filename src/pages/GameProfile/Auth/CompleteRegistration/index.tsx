// src/pages/CompleteRegistration.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { completeRegistration } from '@/redux/User'; // Ваш экшн для завершения регистрации
import { AppDispatch } from '@/redux/store';
import { INPUTS_KEYS } from '../types';

const CompleteRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [formValues, setFormValues] = useState({ [INPUTS_KEYS.PASSWORD]: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCompleteRegistration = async () => {
    try {
      const payload = { token, [INPUTS_KEYS.PASSWORD]: formValues.password };
      const resultAction = await dispatch(completeRegistration(payload));
      if (resultAction.meta?.requestStatus === 'fulfilled') {
        navigate('/');
      } else {
        setError('Ошибка завершения регистрации');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка завершения регистрации');
    }
  };

  return (
    <div className="complete-registration-form" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Завершение регистрации
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField label="Пароль" name="password" value={formValues.password} onChange={handleChange} fullWidth margin="normal" type="password" />
      <Button variant="contained" onClick={handleCompleteRegistration} fullWidth sx={{ mt: 2 }}>
        Завершить регистрацию
      </Button>
    </div>
  );
};

export default CompleteRegistration;
