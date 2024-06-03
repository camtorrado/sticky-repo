// import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import imagen from "./imagenes/imagen.png";
import Navbar from "./componentes/Navbar";
import Cartas from "./componentes/Cartas";
import Footer from "./componentes/Footer";
import Formulario from "./componentes/Formulario";

function App() {
  const [estadoFormulario, setEstadoFormulario] = useState(false);

  return (
    <>
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
          <img src={imagen} alt="" />
        </div>
        <div className="section">
          <h1 className="text-center fs-1 ">¡Personaliza tu mundo!</h1>
          <p className="text-center fs-5 parrafo">
            Aquí encontrarás una amplia variedad de diseños únicos y creativos,
            perfectos para personalizar tus objetos y expresar tu estilo.
          </p>
        </div>
      </div>
      <div className="section-card d-flex flex-wrap justify-content-center px-0 cards">
        <Cartas
          cantidad={3}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
        />
        <Cartas
          cantidad={5}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
        />
        <Cartas
          cantidad={10}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
        />
      </div>
      <Formulario
        estadoFormulario={estadoFormulario}
        setEstadoFormulario={setEstadoFormulario}
      />
      <Footer />
    </>
  );
}

export default App;
