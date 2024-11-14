import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor para agregar el token en el encabezado
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const obtenerPoliza = () => api.get('http://localhost:8080/polizas/');
export const crearPoliza = (data) => api.post('http://localhost:8080/polizas/crear', data);
export const editarPoliza = (id, data) => api.put(`http://localhost:8080/polizas/actualizar/${id}`, data);
export const eliminarPoliza = (id) => api.delete(`http://localhost:8080/polizas/delete/${id}`);
export const buscarPorId = (id) => api.get(`http://localhost:8080/polizas/buscarId/${id}`);

export default api;