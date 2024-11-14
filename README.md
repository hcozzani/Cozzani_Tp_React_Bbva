# Proyecto Integrador - Semillero BBVA

## Descripción
Este proyecto se enfoca en la gestión de pólizas de seguros para la empresa SegurAl, permitiendo a los usuarios gestionar, consultar, actualizar y eliminar pólizas de manera eficiente. La solución está dividida en un backend en Java con Spring Boot y un frontend en React.

## Estructura del Proyecto

### Backend (Spring Boot)
1. **Entidades**:
   - `Clientes`
   - `TiposSeguros`
   - `Polizas`
   - `Siniestros`

2. **Endpoints REST**:
   - `/api/polizas` (GET, POST, PUT, DELETE)
   - `/api/clientes` (GET, POST, PUT, DELETE)
   - `/api/tipos-seguros` (GET)
   - `/api/siniestros` (GET, POST)

3. **Autenticación y Seguridad**:
   - Implementación de Spring Security con JWT para la autenticación y autorización de los usuarios.
   - Protección de rutas críticas.

4. **DTOs**:
   - Implementación de DTOs para las entidades, ubicados en la carpeta `dtos`.

5. **Manejo de Errores**:
   - Respuestas claras para errores de validación de entrada y otros errores del servidor.

6. **Pruebas**:
   - Pruebas unitarias con JUnit y Mockito.
   - Pruebas de integración para la API y la capa de servicio.

### Frontend (React)
1. **Tecnologías**:
   - React.js
   - ViteJS para la configuración rápida del entorno de desarrollo.
   - Material-UI (MUI) para los componentes estilizados.
   - Axios para las solicitudes a la API.
   - Redux Toolkit para la gestión del estado global.
   - React Router para el ruteo.

2. **Características**:
   - Login con validación de usuario y contraseña.
   - Formularios para crear y editar pólizas, con validación de campos.
   - Visualización y gestión de pólizas con filtros y ordenamientos.
   - Mensajes de éxito y error al realizar operaciones.

3. **Estructura**:
   - Componentes modulares con responsabilidades específicas.
   - Uso de hooks `useState` y `useEffect` para la gestión del estado local y la lógica de la UI.

4. **Rutas**:
   - Página de inicio, login, dashboard, gestión de pólizas.

### Base de Datos
1. **Tablas**:
   - `clientes`
   - `tipos_seguros`
   - `polizas`
   - `siniestros`

2. **Consultas SQL**:
   - Operaciones CRUD (INSERT, SELECT, UPDATE, DELETE).
   - JOINs entre tablas relacionadas.
   - Funciones de agregación (COUNT, AVG, SUM).

---

## Requisitos Técnicos

1. **Backend**:
   - Java 17+
   - Spring Boot 3.x
   - JPA/Hibernate
   - JWT (JSON Web Tokens) para autenticación
   - Base de datos: MySQL o PostgreSQL
   - Maven para la gestión de dependencias

2. **Frontend**:
   - React 18.x
   - ViteJS
   - Material-UI (MUI)
   - Redux Toolkit
   - Axios
   - React Router

---

## Proceso de Implementación

1. **Fase 1**:
   - Configuración inicial de backend y frontend.
   - Definición de las entidades y relaciones en la base de datos.
   - Desarrollo de la API RESTful.
   
2. **Fase 2**:
   - Implementación del frontend con React y Redux.
   - Integración de la API en el frontend.

3. **Fase 3**:
   - Pruebas unitarias y de integración.
   - Despliegue de la aplicación.

---

## Tecnologías Usadas
- **Backend**: Java, Spring Boot, Spring Security, JWT, MySQL/PostgreSQL
- **Frontend**: React, ViteJS, Redux Toolkit, Material-UI, Axios

---

## Contactos

- **Nombre**: Hugo Cozzani
- **LinkedIn**: [www.linkedin.com/in/hacozzani](https://www.linkedin.com/in/hacozzani)
