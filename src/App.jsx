import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import CrearPoliza from './Pages/CrearPoliza';
import EditarPoliza from './Pages/EditarPoliza';
import DetallePoliza from './Pages/DetallePoliza';
import Header from './Components/UI/Header';

function App() {
    return (      
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/crear" element={<CrearPoliza />} />
                <Route path="/editar/:id" element={<EditarPoliza />} />
                <Route path="/detalle/:id" element={<DetallePoliza />} />
            </Routes>
        </Router>
    );
}

export default App;