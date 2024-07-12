import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import imagen from './imagenes/imagen.png';
import bike from './imagenes/bike.png';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Formulario from './componentes/Formulario';
import WhatsAppButton from './componentes/WhatsAppButton';
import Numbers from './componentes/Numbers';

function App() {
  const [estadoFormulario, setEstadoFormulario] = useState(false);
  const [numerosSeleccionados, setNumerosSeleccionados] = useState([]);
  const [reinicio, setReinicio] = useState(false);

  useEffect(() => {
    // Deshabilitar el menú contextual
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <WhatsAppButton />
            <Navbar />
            <div className="contenedor1">
              <h1 className="text-center titulo">
                ¡Bienvenidos a <span className="texto-titulo">Sticky World!</span>
              </h1>
              <p className="text-center fs-5 parrafo">
                Nos complace recibirte en Sticky World, tu destino definitivo para
                todos tus stickers favoritos. Explora nuestra colección y descubre
                cómo pequeños detalles pueden transformar tu mundo.
              </p>
              <div className="contenedor-imagen">
                <img src={bike} alt="" />
              </div>
              <div className="section">
                <h1 className="text-center fs-1 ">¡Personaliza tu mundo!</h1>
                <p id="stickers" className="text-center fs-5 parrafo">
                  Aquí encontrarás una amplia variedad de diseños únicos y creativos,
                  perfectos para personalizar tus objetos y expresar tu estilo.
                </p>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <Numbers estadoFormulario={estadoFormulario} setEstadoFormulario={setEstadoFormulario} numerosSeleccionados={numerosSeleccionados} setNumerosSeleccionados={setNumerosSeleccionados} reinicio={reinicio} />
            </div>
            <Formulario
              estadoFormulario={estadoFormulario}
              setEstadoFormulario={setEstadoFormulario}
              numerosSeleccionados={numerosSeleccionados}
              setNumerosSeleccionados={setNumerosSeleccionados}
              reinicio={reinicio}
              setReinicio={setReinicio}
            />
            <div id="contacto">
              <Footer />
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
