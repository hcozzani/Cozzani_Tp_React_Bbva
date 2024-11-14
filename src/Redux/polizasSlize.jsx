import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../Services/api';

// Acción para obtener todas las pólizas
export const fetchPolizas = createAsyncThunk('polizas/fetchPolizas', async () => {
  const response = await api.obtenerPoliza();
  
  return response.data;
});

// Acción para crear una póliza
export const createPoliza = createAsyncThunk('polizas/createPoliza', async (data) => {
  const response = await api.crearPoliza(data);
  return response.data;
});

// Acción para editar una póliza
export const updatePoliza = createAsyncThunk('polizas/updatePoliza', async ({ id, data }) => {
  const response = await api.editarPoliza(id, data);
  return response.data;
});

// Acción para eliminar una póliza
export const deletePoliza = createAsyncThunk('polizas/deletePoliza', async (id) => {
  await api.eliminarPoliza(id);
  return id;
});

const polizasSlice = createSlice({
  name: 'polizas',
  initialState: {
    polizas: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolizas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPolizas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.polizas = action.payload;
      })
      .addCase(fetchPolizas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPoliza.fulfilled, (state, action) => {
        state.polizas.push(action.payload);
      })
      .addCase(updatePoliza.fulfilled, (state, action) => {
        const index = state.polizas.findIndex((poliza) => poliza.id === action.payload.id);
        if (index >= 0) {
          state.polizas[index] = action.payload;
        }
      })
      .addCase(deletePoliza.fulfilled, (state, action) => {
        state.polizas = state.polizas.filter((poliza) => poliza.id !== action.payload);
      });
  },
});

export default polizasSlice.reducer;