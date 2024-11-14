//Editar poliza existente
import React from 'react';
import { useParams } from 'react-router-dom';
import FormularioPoliza from '../Components/FormularioPoliza';

const EditarPoliza = () => {
    const { id } = useParams();
    return <FormularioPoliza tipo="editar" id={id} />;
};

export default EditarPoliza;