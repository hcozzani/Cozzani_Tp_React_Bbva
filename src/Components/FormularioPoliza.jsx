import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Container, Typography, Card, CardContent, Box, Snackbar, Alert } from '@mui/material';
import Header from '../Components/UI/Header';
import { crearPoliza, editarPoliza, buscarPorId } from '../Services/api';
import { useNavigate } from 'react-router-dom';

function FormularioPoliza({ id }) {
  const navigate = useNavigate();
  const [poliza, setPoliza] = useState({ 
    clienteId: '', 
    tipoSeguroId: '', 
    estado: '', 
    montoAsegurado: '', 
    fechaEmision: '', 
    fechaVencimiento: '' 
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (id) {
      const fetchPoliza = async () => {
        try {
          const data = await buscarPorId(id);
          setPoliza(data);
        } catch (error) {
          console.error('Error al obtener la póliza:', error);
          setSnackbar({ open: true, message: 'Error al obtener la póliza', severity: 'error' });
        }
      };
      fetchPoliza();
    }
  }, [id]);

  const handleChange = (e) => {
    setPoliza({ ...poliza, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (poliza.montoAsegurado < 0) {
      formErrors.montoAsegurado = "El monto asegurado no puede ser menor a 0.";
      valid = false;
    }

    if (poliza.fechaVencimiento && poliza.fechaEmision && poliza.fechaVencimiento < poliza.fechaEmision) {
      formErrors.fechaVencimiento = "La fecha de vencimiento no puede ser anterior a la fecha de emisión.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (id) {
          await editarPoliza(id, poliza);
        } else {
          await crearPoliza(poliza);
        }
        setSnackbar({ open: true, message: 'Operación exitosa', severity: 'success' });
        //navigate('/'); // Redirigir al home después de la operación exitosa
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al realizar la operación', severity: 'error' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleVolver = () => {
    navigate('/home');
  };

  return (
    <div style={{ backgroundColor: '#e8e8e8', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
        <Card sx={{ maxWidth: 500, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              {id ? 'Editar Póliza' : 'Crear Póliza'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Cliente Id"
                name="clienteId"
                type="number"
                value={poliza.clienteId}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.clienteId}
                helperText={errors.clienteId}
              />
              <TextField
                label="Tipo de Seguro"
                name="tipoSeguroId"
                select
                value={poliza.tipoSeguroId}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.tipoSeguroId}
                helperText={errors.tipoSeguroId}
              >
                <MenuItem value="1">Auto</MenuItem>
                <MenuItem value="2">Moto</MenuItem>
                <MenuItem value="3">Barco</MenuItem>
                <MenuItem value="4">Celular</MenuItem>
              </TextField>
              <TextField
                label="Fecha de Emisión"
                name="fechaEmision"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={poliza.fechaEmision}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.fechaEmision}
                helperText={errors.fechaEmision}
              />
              <TextField
                label="Fecha de Vencimiento"
                name="fechaVencimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={poliza.fechaVencimiento}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.fechaVencimiento}
                helperText={errors.fechaVencimiento}
              />
              <TextField
                label="Estado de Seguro"
                name="estado"
                select
                value={poliza.estado}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.estado}
                helperText={errors.estado}
              >
                <MenuItem value="activa">Activa</MenuItem>
                <MenuItem value="vencida">Vencida</MenuItem>
              </TextField>
              <TextField
                label="Monto Asegurado"
                name="montoAsegurado"
                type="number"
                value={poliza.montoAsegurado}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.montoAsegurado}
                helperText={errors.montoAsegurado}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button type="submit" variant="contained">
                  {id ? 'Actualizar' : 'Crear'}
                </Button>
                <Button variant="outlined" onClick={handleVolver}>
                  Volver
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default FormularioPoliza;