// import React from 'react';
import PropTypes from "prop-types";
import "../Styles/Cartas.css";

const Cartas = ({ cantidad, precio, estadoFormulario, setEstadoFormulario, setOrderID, setPrecioProceso, setHash, setCantidadSeleccionada }) => {
  
  const handleSubmit = async precio => {
    setPrecioProceso(precio)
    try{
      let config = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: precio,
          currency: "COP"
        })
      }
      let res = await fetch("https://sticky-api-ten.vercel.app/api/orders", config)
      let json = await res.json()

      setCantidadSeleccionada(cantidad)
      setOrderID(json.orderId)
      setHash(json.hash)
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div
      className="contenido-carta d-flex flex-column justify-content-center align-items-center"
    >
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-box2-heart-fill icon"
          viewBox="0 0 16 16"
        >
          <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
        </svg>
      </div>
      <h5 className="text-center sub">Compra {cantidad} Stickers</h5>
      <p className="text-center texto">
        ¿Estás buscando algunos stickers para ti? Esta es una gran oportunidad
        para obtener {cantidad} stickers de alta calidad.
      </p>
      <div className="d-flex align-items-center">
        <button className="btnComprar" onClick={() => {setEstadoFormulario(!estadoFormulario); handleSubmit(precio)}}>Comprar</button>
        <p className="precio">${precio}</p>
      </div>
    </div>
  );
};
Cartas.propTypes = {
  estadoFormulario: PropTypes.bool.isRequired,
  setEstadoFormulario: PropTypes.func.isRequired,
  cantidad: PropTypes.number.isRequired,
  precio: PropTypes.number.isRequired,
  setOrderID: PropTypes.func.isRequired,
  setPrecioProceso: PropTypes.func.isRequired,
  setHash: PropTypes.func.isRequired
};

export default Cartas;
