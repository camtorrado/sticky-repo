// import React from 'react'
import { useEffect } from "react";
import PropTypes from "prop-types";
import "../Styles/BtnPago.css"

const LoadBoldPaymentButtonScript = ({ orderID, precioProceso, hash }) => {
    useEffect(() => {
        // Inyecta el script en el head del documento
        const script = document.createElement('script');
        script.src = "https://checkout.bold.co/library/boldPaymentButton.js";
        script.async = true;
        document.head.appendChild(script);
    
        return () => {
          // Limpia el script cuando el componente se desmonte
          document.head.removeChild(script);
        };
      }, []);
      return (
        
        <button className="btnPago">
          {/* Botón de pago con los atributos necesarios */}
          <script
            data-bold-button
            data-order-id={orderID}
            data-currency="COP"
            data-amount={precioProceso}
            data-api-key={process.env.TEST_IDENTITY_KEY}
            data-integrity-signature={hash}
            data-redirection-url="http://localhost:5173/rest"
          ></script>
        </button>
      );
    };
LoadBoldPaymentButtonScript.propTypes = {
  orderID: PropTypes.string.isRequired,
  precioProceso: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
};

export default LoadBoldPaymentButtonScript;