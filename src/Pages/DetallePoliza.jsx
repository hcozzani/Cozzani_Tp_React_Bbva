//mostrar poliza especifica
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { obtenerPoliza } from '../Services/api';

const DetallePoliza = () => {
    const { id } = useParams();
    const [poliza, setPoliza] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await obtenerPoliza(id);
            setPoliza(data);
        };
        fetchData();
    }, [id]);

    return (
        <Container>
            {poliza ? (
                <>
                    <Typography variant="h5">Detalle de la Póliza</Typography>
                    <Typography>Tipo de Seguro: {poliza.tipoSeguro}</Typography>
                    <Typography>Monto Asegurado: ${poliza.montoAsegurado}</Typography>
                    <Button variant="contained">Regresar</Button>
                </>
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Container>
    );
};

export default DetallePoliza;