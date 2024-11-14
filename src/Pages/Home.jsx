import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolizas, deletePoliza } from '../Redux/polizasSlize';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Snackbar, Alert, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/UI/Header';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { polizas, status } = useSelector((state) => state.polizas);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [selectedPolizaId, setSelectedPolizaId] = useState(null);
    const [montoFiltro, setMontoFiltro] = useState(''); // Estado del filtro de monto

    useEffect(() => {
        // Al regresar al Home, recargamos las pólizas
        dispatch(fetchPolizas());
    }, [dispatch]);

    // Manejo la apertura del Snackbar de confirmación
    const handleOpenSnackbar = (id) => {
        setSelectedPolizaId(id);
        setSnackbarOpen(true);
    };

    // Manejo la confirmación de eliminación
    const handleConfirmDelete = () => {
        if (selectedPolizaId) {
            dispatch(deletePoliza(selectedPolizaId));
            setSnackbarOpen(false);
            setSelectedPolizaId(null);
        }
    };

    // Manejo el cierre del Snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setSelectedPolizaId(null);
    };

    // Función para manejar el cambio en el input de monto
    const handleMontoChange = (e) => {
        setMontoFiltro(e.target.value);
    };

    // Filtra las pólizas por monto
    const filteredPolizas = montoFiltro
        ? polizas.filter(poliza => poliza.montoAsegurado == montoFiltro)
        : polizas;

    return (
        <div style={{ backgroundColor: '#e8e8e8', minHeight: '100vh', paddingBottom: '20px' }}>
            <Header />
            <Container sx={{ paddingTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gestión de Pólizas
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/crear')}
                    sx={{ marginBottom: 2 }}
                >
                    Crear Nueva Póliza
                </Button>

                {/* Card de filtro */}
                <Card sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <TextField
                            label="Busqueda por Monto"
                            variant="outlined"
                            type="text"
                            value={montoFiltro}
                            onChange={handleMontoChange}
                            placeholder="Ingrese monto..."
                            InputProps={{
                                inputProps: {
                                    style: { backgroundColor: '#ffffff' },
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                },
                            }}
                            sx={{ width: '100%' }}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cliente Id</TableCell>
                                    <TableCell>Tipo Seguro Id</TableCell>
                                    <TableCell>Fecha Emision</TableCell>
                                    <TableCell>Fecha Vencimiento</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Monto Asegurado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPolizas.map((poliza) => (
                                    <TableRow key={poliza.id}>
                                        <TableCell>{poliza.clienteId}</TableCell>
                                        <TableCell>{poliza.tipoSeguroId}</TableCell>
                                        <TableCell>{poliza.fechaEmision}</TableCell>
                                        <TableCell>{poliza.fechaVencimiento}</TableCell>
                                        <TableCell>{poliza.estado}</TableCell>
                                        <TableCell>${poliza.montoAsegurado}</TableCell>   
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => navigate(`/editar/${poliza.id}`)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleOpenSnackbar(poliza.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Container>

            <Snackbar
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="warning"
                    sx={{ width: '100%' }}
                    action={
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
                                NO
                            </Button>
                            <Button color="error" size="small" onClick={handleConfirmDelete}>
                                SI
                            </Button>
                        </Box>
                    }
                >
                    ¿Estás seguro de que deseas eliminar esta póliza?
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Home;