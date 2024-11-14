import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../Services/api';

const Login = () => {
    const [usuario, setUsuario] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await api.post(
                "http://localhost:8080/auth/login",
                {},
                {
                    headers: {
                        username: usuario.username,
                        password: usuario.password,
                    },
                }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (err) {
            console.error('Error de autenticación:', err);
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#004080',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={usuario.username}
                    onChange={(e) => setUsuario({...usuario, username: e.target.value})}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={usuario.password}
                    onChange={(e) => setUsuario({...usuario, password: e.target.value})}
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Ingresar
                </Button>
            </Container>
        </Box>
    );
};

export default Login;