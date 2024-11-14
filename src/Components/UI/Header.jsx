import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#004080' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    BBVA Seguros
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/home')}>
                        Home
                    </Button>
                    <Button color="inherit" onClick={() => navigate('')}>
                        Contratos
                    </Button>
                    <Button color="inherit" onClick={() => navigate('')}>
                        Empresas
                    </Button>
                    <Button color="inherit" onClick={() => navigate('')}>
                        Contacto
                    </Button>
                    <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
                        Cerrar Sesión
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;