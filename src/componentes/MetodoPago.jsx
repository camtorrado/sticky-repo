// import React from 'react'
import PropTypes from "prop-types";
import "../Styles/Formulario.css";
import LoadBoldPaymentButtonScript from "./LoadBoldPaymentButtonScript";

const MetodoPago = ({
  estadoMetodo,
  setEstadoMetodo,
  orderID,
  precioProceso,
  hash,
}) => {
  return (
    <>
      {estadoMetodo && (
        <div className="overlay">
          <div className="contenedorModal">
            <button
              className="botonCerrar"
              onClick={() => setEstadoMetodo(false)}
            >
              <i className="fas fa-times fw-bold"></i>
            </button>
            <h2 className="titulo-formato text-center text-primary my-4">
              Metodo de pago
            </h2>
            <div className="d-flex justify-content-center">
              <LoadBoldPaymentButtonScript
                orderID={orderID}
                precioProceso={precioProceso}
                hash={hash}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MetodoPago.propTypes = {
  estadoMetodo: PropTypes.bool.isRequired,
  setEstadoMetodo: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  precioProceso: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
};

export default MetodoPago;
