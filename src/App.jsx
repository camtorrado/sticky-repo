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
import MetodoPago from "./componentes/MetodoPago";

function App() {
  const [estadoFormulario, setEstadoFormulario] = useState(false);
  const [estadoMetodo, setEstadoMetodo] = useState(false)
  const [orderID, setOrderID] = useState("");
  const [precioProceso, setPrecioProceso] = useState(0);
  const [hash, setHash] = useState("");

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
          <p id="stickers" className="text-center fs-5 parrafo">
            Aquí encontrarás una amplia variedad de diseños únicos y creativos,
            perfectos para personalizar tus objetos y expresar tu estilo.
          </p>
        </div>
      </div>
      <div  className="m-2"></div>
      <div className="section-card d-flex flex-wrap justify-content-center px-0 cards">
        <Cartas
          cantidad={2}
          precio={4000}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
          setOrderID={setOrderID}
          setPrecioProceso={setPrecioProceso}
          setHash={setHash}
        />
        <Cartas
          cantidad={5}
          precio={10000}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
          setOrderID={setOrderID}
          setPrecioProceso={setPrecioProceso}
          setHash={setHash}
        />
        <Cartas
          cantidad={10}
          precio={20000}
          estadoFormulario={estadoFormulario}
          setEstadoFormulario={setEstadoFormulario}
          setOrderID={setOrderID}
          setPrecioProceso={setPrecioProceso}
          setHash={setHash}
        />
      </div>
      <Formulario
        estadoFormulario={estadoFormulario}
        setEstadoFormulario={setEstadoFormulario}
        estadoMetodo={estadoMetodo}
        setEstadoMetodo={setEstadoMetodo}
        orderID={orderID}
      />
      <MetodoPago 
        estadoMetodo={estadoMetodo}
        setEstadoMetodo={setEstadoMetodo}
        orderID={orderID}
        precioProceso={precioProceso}
        hash={hash}
      />
      <div id="contacto">
        <Footer  />
      </div>
    </>
  );
}

export default App;
