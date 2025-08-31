// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const success = login(username, password);
        if (success) {
            navigate('/home');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom>Login to City Pulse</Typography>
            <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Login</Button>
        </Box>
    );
};
